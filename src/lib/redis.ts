/**
 * src/lib/redis.ts
 * Upstash Redis client for caching & rate limiting
 * Uses @upstash/redis and @upstash/ratelimit
 */
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Global Redis client singleton
const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ??
  new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

// ─── Rate Limiters ─────────────────────────────────────────────────────────

/** Contact form: 5 submissions per 10 minutes per IP */
export const contactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix: 'ratelimit:contact',
});

/** Newsletter subscribe: 3 attempts per 5 minutes per IP */
export const subscribeRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '5 m'),
  analytics: true,
  prefix: 'ratelimit:subscribe',
});

/** Book API: 100 reads per minute (public), 20 writes per minute (admin) */
export const booksReadRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:books:read',
});

export const booksWriteRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: 'ratelimit:books:write',
});

// ─── Cache Helpers ──────────────────────────────────────────────────────────

const CACHE_TTL_SECONDS = 300; // 5 minutes default

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    return await redis.get<T>(key);
  } catch {
    return null;
  }
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttl: number = CACHE_TTL_SECONDS
): Promise<void> {
  try {
    await redis.set(key, value, { ex: ttl });
  } catch {
    // Cache failures are non-fatal
  }
}

export async function cacheDel(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch {
    // Cache failures are non-fatal
  }
}

export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  } catch {
    // Cache failures are non-fatal
  }
}
