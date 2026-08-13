/**
 * src/lib/idempotency.ts
 * Hardened Atomic Idempotency & Execution Lock Manager for AI Blog Generation & Newsletter Dispatch
 * Supports:
 * - Deterministic execution IDs for scheduled runs (e.g. blog:scheduled:2026-08-14T09:00, blog:scheduled:2026-08-14T21:00)
 * - Unique manual admin run IDs (e.g. blog:manual:<uuid>)
 * - Atomic claiming via Redis SETNX with automatic lock expiration (preventing concurrent races)
 * - Stale-run recovery (if a run crashed mid-flight > 15 mins ago)
 * - Result caching so retries of the SAME run ID return the identical post/newsletter response
 */

import { redis } from './redis';

export interface GenerationRunState {
  runId: string;
  triggerType: 'scheduled' | 'manual_admin';
  scheduledFor?: string;
  status: 'running' | 'completed' | 'failed';
  postId?: string;
  postSlug?: string;
  postTitle?: string;
  newsletterStatus?: string;
  beehiivPostId?: string;
  providerUsed?: string;
  startedAt: string;
  completedAt?: string;
  error?: string;
}

const STALE_RUN_MS = 15 * 60 * 1000; // 15 minutes
const RUN_TTL_SECONDS = 86400 * 7; // 7 days retention for run state

/**
 * Generate a deterministic generationRunId based on request input or current IST time slot
 */
export function resolveGenerationRunId(req?: Request, explicitRunId?: string): string {
  if (explicitRunId) return explicitRunId;

  // 1. Check for custom header or query string
  if (req) {
    const url = new URL(req.url);
    const runHeader = req.headers.get('x-generation-run-id') || url.searchParams.get('runId');
    if (runHeader) return runHeader;

    const isManual =
      url.searchParams.get('type') === 'manual' || req.headers.get('x-trigger-type') === 'manual';
    if (isManual) {
      return `blog:manual:${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }
  }

  // 2. Default Scheduled Run ID based on IST Time Slot (09:00, 18:00, or 21:00 slot support)
  const now = new Date();
  // IST offset: UTC + 5.5 hours
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const dateStr = istTime.toISOString().split('T')[0]; // YYYY-MM-DD
  const hour = istTime.getUTCHours();

  // Slot: <12 -> 09:00, 12-19 -> 18:00 (6 PM IST), >=20 -> 21:00 slot
  const slotStr = hour < 12 ? '09:00' : hour < 20 ? '18:00' : '21:00';
  return `blog:scheduled:${dateStr}T${slotStr}`;
}

/**
 * Atomically claim execution of a generationRunId.
 * Returns { claimed: true } if this call won the claim, or { claimed: false, existingState } if already claimed or completed.
 */
export async function claimGenerationRun(runId: string): Promise<{
  claimed: boolean;
  state?: GenerationRunState;
}> {
  const stateKey = `run:state:${runId}`;
  const lockKey = `run:lock:${runId}`;

  // 1. Check existing state
  try {
    const existingStr = await redis.get<string>(stateKey);
    if (existingStr) {
      const existing: GenerationRunState =
        typeof existingStr === 'string' ? JSON.parse(existingStr) : existingStr;

      if (existing.status === 'completed') {
        return { claimed: false, state: existing };
      }

      if (existing.status === 'running') {
        const startedTime = new Date(existing.startedAt).getTime();
        const isStale = Date.now() - startedTime > STALE_RUN_MS;

        if (!isStale) {
          return { claimed: false, state: existing };
        }
        console.warn(`[Idempotency] Stale run detected for ${runId} (>15m). Recovering.`);
      }
    }
  } catch (err) {
    console.error('[Idempotency] Redis error during state check:', err);
  }

  // 2. Atomic Lock Claim using SETNX (NX flag)
  try {
    const acquired = await redis.set(lockKey, 'locked', { nx: true, ex: 900 }); // 15 min lock
    if (!acquired) {
      // Lock held by another active process
      const existingStr = await redis.get<string>(stateKey);
      const existingState = existingStr
        ? typeof existingStr === 'string'
          ? JSON.parse(existingStr)
          : existingStr
        : undefined;
      return { claimed: false, state: existingState };
    }
  } catch (err) {
    console.error('[Idempotency] Redis SETNX failed, allowing execution safely:', err);
  }

  // 3. Register state as RUNNING
  const newState: GenerationRunState = {
    runId,
    triggerType: runId.includes(':manual:') ? 'manual_admin' : 'scheduled',
    status: 'running',
    startedAt: new Date().toISOString(),
  };

  try {
    await redis.set(stateKey, JSON.stringify(newState), { ex: RUN_TTL_SECONDS });
  } catch {}

  return { claimed: true, state: newState };
}

/**
 * Persist final state for a completed or failed generation run.
 */
export async function finalizeGenerationRun(
  runId: string,
  update: Partial<GenerationRunState>
): Promise<GenerationRunState> {
  const stateKey = `run:state:${runId}`;
  const lockKey = `run:lock:${runId}`;

  let current: GenerationRunState = {
    runId,
    triggerType: runId.includes(':manual:') ? 'manual_admin' : 'scheduled',
    status: 'completed',
    startedAt: new Date().toISOString(),
  };

  try {
    const existingStr = await redis.get<string>(stateKey);
    if (existingStr) {
      current = typeof existingStr === 'string' ? JSON.parse(existingStr) : existingStr;
    }
  } catch {}

  const finalState: GenerationRunState = {
    ...current,
    ...update,
    completedAt: new Date().toISOString(),
  };

  try {
    await redis.set(stateKey, JSON.stringify(finalState), { ex: RUN_TTL_SECONDS });
    await redis.del(lockKey); // Release execution lock
  } catch {}

  return finalState;
}
