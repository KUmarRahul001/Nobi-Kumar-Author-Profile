/**
 * src/lib/__tests__/idempotency.test.ts
 * Unit Tests for Generation Run IDs, Atomic Claims, Idempotency, and Multi-Slot Scheduling
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resolveGenerationRunId, claimGenerationRun, finalizeGenerationRun } from '../idempotency';
vi.mock('../redis', () => {
  const store = new Map<string, any>();
  return {
    redis: {
      get: vi.fn(async (key: string) => {
        return store.get(key) ?? null;
      }),
      set: vi.fn(async (key: string, value: any, options?: any) => {
        if (options?.nx && store.has(key)) {
          return null;
        }
        store.set(key, typeof value === 'string' ? value : JSON.stringify(value));
        return 'OK';
      }),
      del: vi.fn(async (...keys: string[]) => {
        let count = 0;
        for (const k of keys) {
          if (store.delete(k)) count++;
        }
        return count;
      }),
    },
  };
});

describe('Idempotency & Scheduler Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves deterministic run IDs for 09:00 and 21:00 IST slots', () => {
    const runIdDefault = resolveGenerationRunId();
    expect(runIdDefault).toMatch(/^blog:scheduled:\d{4}-\d{2}-\d{2}T(09|21):00$/);
  });

  it('resolves manual run IDs for admin triggers', () => {
    const mockReq = {
      url: 'http://localhost/api/cron/generate-blog?type=manual',
      headers: new Headers(),
    } as unknown as Request;

    const runIdManual = resolveGenerationRunId(mockReq);
    expect(runIdManual).toMatch(/^blog:manual:/);
  });

  it('atomically claims a generation run and prevents duplicate claims', async () => {
    const runId = `test:run:${Date.now()}`;
    const claim1 = await claimGenerationRun(runId);
    expect(claim1.claimed).toBe(true);

    const claim2 = await claimGenerationRun(runId);
    expect(claim2.claimed).toBe(false);
  });

  it('finalizes a run and preserves completed state on subsequent claims', async () => {
    const runId = `test:run:finalize:${Date.now()}`;
    await claimGenerationRun(runId);

    await finalizeGenerationRun(runId, {
      status: 'completed',
      postId: 'post-123',
      postSlug: 'test-slug',
      postTitle: 'Test Title',
      newsletterStatus: 'sent',
    });

    const claimRetry = await claimGenerationRun(runId);
    expect(claimRetry.claimed).toBe(false);
    expect(claimRetry.state?.status).toBe('completed');
    expect(claimRetry.state?.postId).toBe('post-123');
  });
});
