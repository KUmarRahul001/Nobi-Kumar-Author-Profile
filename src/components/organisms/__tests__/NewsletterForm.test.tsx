import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NewsletterForm from '../NewsletterForm';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('NewsletterForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input elements and processes newsletter API subscriptions successfully', async () => {
    render(<NewsletterForm />);

    expect(screen.getByPlaceholderText(/enter email address/i)).toBeInTheDocument();

    // Mock response returning success true
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    fireEvent.change(screen.getByPlaceholderText(/enter email address/i), {
      target: { value: 'reader@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/You have successfully subscribed to the newsletter/i)
      ).toBeInTheDocument();
    });
  });
});
