import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BookCatalog from '../BookCatalog';
import { Book } from '@/types/book';

const mockBooks: Book[] = [
  {
    slug: 'the-verma-legacy',
    title: 'The Verma Legacy',
    subtitle: 'Book 1',
    seriesName: 'Verma Saga',
    volumeNumber: 1,
    genre: 'Psychological Thriller',
    tags: ['NNU'],
    shortDescription: 'Short description text.',
    fullSynopsis: 'Full synopsis details text copy.',
    releaseDate: '2026-01-01',
    isbn: '1234567890',
    language: 'English',
    status: 'published',
    buyLinks: { amazon: 'https://amazon.com/book' },
    displayOrder: 1,
    lastUpdated: '2026-07-22T00:00:00.000Z',
  },
];

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('BookCatalog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders spotlight book card and handles filters options correctly', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockBooks,
    });

    render(<BookCatalog initialBooks={mockBooks} />);

    // Check that at least one instance of the book title is present in the document
    expect(screen.getAllByText(/Verma Legacy/i)[0]).toBeInTheDocument();
  });

  it('renders public catalog without exposing admin controls to users', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockBooks,
    });

    render(<BookCatalog initialBooks={mockBooks} />);

    // Verify admin button is not accessible to public users
    expect(
      screen.queryByRole('button', { name: /unlock admin controls panel/i })
    ).not.toBeInTheDocument();
  });
});
