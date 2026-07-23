import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookDetailPage from '../../../app/(site)/books/[slug]/page';

// Mock Next.js dynamic routing and headers
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  getBookBySlug: vi.fn().mockImplementation(async (slug: string) => {
    if (slug === 'valid-slug') {
      return {
        slug: 'valid-slug',
        title: 'Verma Legacy Novel',
        format: 'kindle',
        seriesName: 'Verma Saga',
        volumeNumber: 1,
        status: 'published',
        synopsis: 'Details about the Verma family secrets.',
        coverUrl: '',
        buyLinks: [],
        content: 'Content here.',
      };
    }
    return null;
  }),
  getBooks: vi.fn().mockResolvedValue([]),
}));

describe('BookDetailPage Routing Component', () => {
  it('renders breadcrumbs and featured details dynamically', async () => {
    // Resolve Async Component params Promise wrapper
    const resolvedParams = Promise.resolve({ slug: 'valid-slug' });
    const rendered = render(await BookDetailPage({ params: resolvedParams }));

    // Check breadcrumbs nodes
    expect(screen.getByRole('link', { name: /books/i })).toHaveAttribute('href', '/books');

    // Check novel title specifically as heading
    expect(
      screen.getByRole('heading', { level: 2, name: /verma legacy novel/i })
    ).toBeInTheDocument();
  });
});
