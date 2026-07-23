import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookDetailPage from '../../../app/(site)/books/[slug]/page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    book: {
      findUnique: vi.fn().mockImplementation(async ({ where }: { where: { slug: string } }) => {
        if (where.slug !== 'valid-slug') {
          return null;
        }

        return {
          slug: 'valid-slug',
          title: 'Verma Legacy Novel',
          subtitle: null,
          genre: 'Thriller',
          seriesName: 'Verma Saga',
          volumeNumber: 1,
          shortDescription: 'Details about the Verma family secrets.',
          fullSynopsis: 'Details about the Verma family secrets.',
          releaseDate: '2026',
          pages: 320,
          coverUrl: '',
          samplePdfUrl: null,
          amazonLink: null,
          pocketFmLink: null,
          kukuFmLink: null,
          audibleLink: null,
        };
      }),
      findMany: vi.fn().mockResolvedValue([
        {
          slug: 'valid-slug',
          title: 'Verma Legacy Novel',
        },
      ]),
    },
  },
}));

describe('BookDetailPage Routing Component', () => {
  it('renders breadcrumbs and featured details dynamically', async () => {
    const resolvedParams = Promise.resolve({ slug: 'valid-slug' });
    render(await BookDetailPage({ params: resolvedParams }));

    expect(screen.getByRole('link', { name: /verma legacy novel/i })).toHaveAttribute(
      'href',
      '/books/valid-slug'
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /verma legacy novel/i })
    ).toBeInTheDocument();
  });
});
