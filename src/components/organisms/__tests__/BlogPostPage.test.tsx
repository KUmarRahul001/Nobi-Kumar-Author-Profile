import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogPostPage from '../../../app/(site)/blog/[slug]/page';

// Mock Next.js dynamic routing and headers
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  getPostBySlug: vi.fn().mockImplementation(async (slug: string) => {
    if (slug === 'valid-post') {
      return {
        slug: 'valid-post',
        title: 'Verma Secrets Unveiled',
        excerpt: 'Summary of the lore secrets.',
        body: 'Deep lore analysis text copy.',
        category: 'Lore',
        tags: ['secrets'],
        publishedAt: '2026-07-21T00:00:00Z',
        content: 'Unveiled post content.',
      };
    }
    return null;
  }),
  getPosts: vi.fn().mockResolvedValue([]),
}));

// Mock BlogCommentSection since it performs supabase queries
vi.mock('@/components/organisms/BlogCommentSection', () => ({
  default: () => <div data-testid="comments-mock">Comments Section</div>,
}));

describe('BlogPostPage Routing Component', () => {
  it('renders breadcrumbs, meta header elements, and content body details', async () => {
    const resolvedParams = Promise.resolve({ slug: 'valid-post' });
    render(await BlogPostPage({ params: resolvedParams }));

    // Check breadcrumbs nodes
    expect(screen.getByRole('link', { name: /^blog$/i })).toHaveAttribute('href', '/blog');

    // Check article title specifically as h1
    expect(
      screen.getByRole('heading', { level: 1, name: /verma secrets unveiled/i })
    ).toBeInTheDocument();

    // Check content text
    expect(screen.getByText('Deep lore analysis text copy.')).toBeInTheDocument();
  });
});
