import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';

// Mock next-themes useTheme hook
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: vi.fn(),
  }),
}));

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [],
    });
  });

  const mockBooks = [
    {
      slug: 'the-verma-legacy',
      title: 'The Verma Legacy',
      synopsis: 'Test synopsis',
    },
  ] as unknown as import('@/lib/db').Book[];

  const mockPosts = [
    {
      slug: 'chronicles-entry',
      title: 'Chronicles Entry',
      excerpt: 'Post excerpt',
    },
  ] as unknown as import('@/lib/db').Post[];

  it('renders navbar logo identity and navigation links', () => {
    render(<Navbar books={mockBooks} posts={mockPosts} />);

    expect(screen.getByText('NOBI KUMAR')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('opens search overlay when trigger is clicked', () => {
    render(<Navbar books={mockBooks} posts={mockPosts} />);

    const searchBtn = screen.getByRole('button', { name: /open search dialog/i });
    fireEvent.click(searchBtn);

    expect(screen.getByPlaceholderText(/search novels, chronicles, and lore/i)).toBeInTheDocument();
  });
});
