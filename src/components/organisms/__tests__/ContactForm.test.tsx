import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from '../ContactForm';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders inputs and processes contact message API submissions successfully', async () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();

    // Mock response returning success true
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Agent Smith' } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'smith@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Inquiry' } });
    fireEvent.change(screen.getByLabelText(/message body/i), {
      target: { value: 'This is a message body copy text.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Your message has been sent successfully/i)).toBeInTheDocument();
    });
  });
});
