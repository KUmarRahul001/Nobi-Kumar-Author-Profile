import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeaturedBookPanel from '../FeaturedBookPanel';
import { Book } from '@/lib/db';

const mockBook: Book = {
  slug: 'test-novel',
  title: 'The Crimson Shadow',
  format: 'kindle',
  seriesName: 'Verma Saga',
  volumeNumber: 1,
  status: 'published',
  synopsis: 'A gripping mystery novel.',
  coverUrl: '',
  buyLinks: [{ label: 'Amazon Store', url: 'https://amazon.com' }],
  content: 'Novel body content.',
  sampleExcerpt: 'Excerpt text.',
};

describe('FeaturedBookPanel Component', () => {
  it('renders book details and external buy links', () => {
    render(<FeaturedBookPanel book={mockBook} />);

    // Check title
    expect(
      screen.getByRole('heading', { level: 2, name: /the crimson shadow/i })
    ).toBeInTheDocument();

    // Check buy links
    expect(screen.getByRole('link', { name: /amazon store/i })).toHaveAttribute(
      'href',
      'https://amazon.com'
    );

    // Check format badge
    expect(screen.getByText(/kindle edition/i)).toBeInTheDocument();
  });
});
