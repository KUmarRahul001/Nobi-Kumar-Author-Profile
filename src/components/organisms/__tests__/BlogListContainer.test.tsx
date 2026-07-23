import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BlogListContainer from '../BlogListContainer';
import { Post } from '@/lib/db';

const mockPosts: Post[] = [
  {
    slug: 'post-1',
    title: 'Welcome to NNU',
    excerpt: 'Intro post.',
    body: 'Body text.',
    category: 'Announcements',
    tags: ['nnu'],
    publishedAt: '2026-07-20T00:00:00Z',
    content: 'Full content.',
  },
  {
    slug: 'post-2',
    title: 'Deep Lore of Verma Family',
    excerpt: 'Lore post.',
    body: 'Body text.',
    category: 'Lore',
    tags: ['verma'],
    publishedAt: '2026-07-21T00:00:00Z',
    content: 'Full content.',
  },
];

describe('BlogListContainer Component', () => {
  it('filters posts dynamically by category selection triggers', () => {
    render(<BlogListContainer initialPosts={mockPosts} />);

    // Default shows all posts
    expect(screen.getByText('Welcome to NNU')).toBeInTheDocument();
    expect(screen.getByText('Deep Lore of Verma Family')).toBeInTheDocument();

    // Select Lore filter category
    const loreButton = screen.getByRole('button', { name: /^lore$/i });
    fireEvent.click(loreButton);

    expect(screen.queryByText('Welcome to NNU')).not.toBeInTheDocument();
    expect(screen.getByText('Deep Lore of Verma Family')).toBeInTheDocument();
  });
});
