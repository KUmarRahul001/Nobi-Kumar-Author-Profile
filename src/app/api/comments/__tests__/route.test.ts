import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, GET } from '../route';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
  },
}));

describe('Comments API Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET returns 400 when postSlug query param is missing', async () => {
    const response = await GET(new Request('http://localhost/api/comments'));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Missing postSlug');
  });

  it('POST sanitizes text tags and hashes email', async () => {
    const mockSelect = vi.fn().mockResolvedValue({ data: [{ id: '123' }], error: null });
    const mockInsert = vi.fn().mockReturnValue({
      select: mockSelect,
    });
    supabase.from = vi.fn().mockReturnValue({
      insert: mockInsert,
    });

    const payload = {
      name: '<b>Bad Actor</b>',
      email: 'TestEmail@Example.com',
      text: '<script>alert(1)</script>Safe comment text',
      postSlug: 'welcome-post',
    };

    const response = await POST(
      new Request('http://localhost/api/comments', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    );

    expect(response.status).toBe(200);

    const emailHash = crypto.createHash('md5').update('testemail@example.com').digest('hex');

    // Confirm insert called with sanitized values
    expect(mockInsert).toHaveBeenCalledWith({
      post_id: 'welcome-post',
      name: 'Bad Actor',
      email_hash: emailHash,
      body: 'alert(1)Safe comment text',
      status: 'pending',
    });
  });
});
