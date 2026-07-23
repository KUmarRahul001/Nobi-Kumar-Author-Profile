import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BookListContainer from '../BookListContainer';
import { Book } from '@/lib/db';

const mockBooks: Book[] = [
  {
    slug: 'novel-1',
    title: 'The Shadows in the Room',
    format: 'kindle',
    seriesName: 'Verma Saga',
    volumeNumber: 1,
    status: 'published',
    synopsis: 'First novel details.',
    coverUrl: '',
    buyLinks: [],
    content: 'Shadows book content.',
  },
  {
    slug: 'novel-2',
    title: 'Echoes of the Legacy',
    format: 'pocketfm',
    seriesName: 'Verma Saga',
    volumeNumber: 2,
    status: 'published',
    synopsis: 'Second novel details.',
    coverUrl: '',
    buyLinks: [],
    content: 'Echoes book content.',
  },
];

describe('BookListContainer Component', () => {
  it('filters books by format when filter buttons are clicked', () => {
    render(<BookListContainer initialBooks={mockBooks} />);

    // Default should show both books
    expect(screen.getByText('The Shadows in the Room')).toBeInTheDocument();
    expect(screen.getByText('Echoes of the Legacy')).toBeInTheDocument();

    // Filter to Kindle
    const kindleButton = screen.getByRole('button', { name: /kindle edition/i });
    fireEvent.click(kindleButton);

    expect(screen.getByText('The Shadows in the Room')).toBeInTheDocument();
    expect(screen.queryByText('Echoes of the Legacy')).not.toBeInTheDocument();

    // Filter to Pocket FM
    const pocketFmButton = screen.getByRole('button', { name: /pocket fm audio/i });
    fireEvent.click(pocketFmButton);

    expect(screen.queryByText('The Shadows in the Room')).not.toBeInTheDocument();
    expect(screen.getByText('Echoes of the Legacy')).toBeInTheDocument();
  });
});
