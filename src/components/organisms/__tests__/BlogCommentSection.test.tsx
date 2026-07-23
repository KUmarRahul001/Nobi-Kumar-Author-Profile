import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BlogCommentSection from '../BlogCommentSection';

// Mock fetch global object
const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('BlogCommentSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders comments lists and processes API form submissions triggers', async () => {
    // Mock GET response returning one approved comment
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 'comment-1',
          name: 'Jane Doe',
          email_hash: 'hash123',
          body: 'Love this story updates!',
          created_at: '2026-07-21T00:00:00Z',
        },
      ],
    });

    render(<BlogCommentSection postSlug="welcome-post" />);

    // Check loader GET called with encode parameters
    expect(fetchMock).toHaveBeenCalledWith('/api/comments?postSlug=welcome-post');

    // Confirm comment renders on screen
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Love this story updates!')).toBeInTheDocument();
    });

    // Mock POST submit response
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Populate form fields
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/^comment \*/i), {
      target: { value: 'Fascinating theories.' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit comment/i }));

    // Verify submit loader and success message
    await waitFor(() => {
      expect(
        screen.getByText(/Your comment has been submitted and is awaiting moderation/i)
      ).toBeInTheDocument();
    });
  });
});
