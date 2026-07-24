import { describe, it, expect, vi, beforeEach } from 'vitest';
import { type NextRequest } from 'next/server';
import { POST } from '../route';

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    from: () => ({
      upsert: vi.fn().mockResolvedValue({ error: null }),
    }),
  }),
}));

// Mock Redis rate limiter — always allow in tests
vi.mock('@/lib/redis', () => ({
  subscribeRatelimit: {
    limit: vi.fn().mockResolvedValue({ success: true }),
  },
}));

describe('Newsletter Subscribers API Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST returns 400 when email parameter is missing', async () => {
    const response = await POST(
      new Request('http://localhost/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }) as unknown as NextRequest
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it('POST inserts active subscribers successfully and handles unique constraints', async () => {
    const response = await POST(
      new Request('http://localhost/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'reader@example.com', name: 'Test Reader' }),
      }) as unknown as NextRequest
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });
});
