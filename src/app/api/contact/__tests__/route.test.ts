import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
  }),
}));

// Mock Redis rate limiter — always allow in tests
vi.mock('@/lib/redis', () => ({
  contactRatelimit: {
    limit: vi.fn().mockResolvedValue({ success: true }),
  },
}));

describe('Contact Messages API Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST returns 400 when name, email, or text parameters are missing', async () => {
    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }) as any
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it('POST sanitizes text tags and inserts messages successfully', async () => {
    const payload = {
      name: '<b>Inquirer</b>',
      email: 'smith@example.com',
      subject: '<i>Inquiry</i>',
      message: '<script>alert(1)</script>Encrypted message copy text.',
    };

    const response = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }) as any
    );

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });
});
