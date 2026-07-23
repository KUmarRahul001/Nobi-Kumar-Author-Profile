import { describe, it, expect, vi } from 'vitest';
import { getSearchIndex } from '../search';

vi.mock('../db', () => ({
  getBooks: vi
    .fn()
    .mockResolvedValue([
      { slug: 'book-one', title: 'Novel One', synopsis: 'Book summary description text.' },
    ]),
  getPosts: vi
    .fn()
    .mockResolvedValue([
      { slug: 'post-one', title: 'Post One', excerpt: 'Blog post excerpt text.' },
    ]),
  getUniverseData: vi.fn().mockResolvedValue({
    nodes: [{ id: 'node-one', label: 'Character One', bio: 'Character bio information.' }],
    edges: [],
  }),
}));

describe('Search Index Aggregator Compiler', () => {
  it('maps books, posts, and universe nodes correctly into search item schemas', async () => {
    const index = await getSearchIndex();

    expect(index.length).toBe(3);

    // Check book mapping properties
    const bookItem = index.find((item) => item.type === 'book');
    expect(bookItem?.title).toBe('Novel One');
    expect(bookItem?.url).toBe('/books/book-one');

    // Check post mapping properties
    const postItem = index.find((item) => item.type === 'post');
    expect(postItem?.title).toBe('Post One');
    expect(postItem?.url).toBe('/blog/post-one');

    // Check universe node mapping properties
    const universeItem = index.find((item) => item.type === 'universe');
    expect(universeItem?.title).toBe('Character One');
    expect(universeItem?.url).toBe('/universe');
  });
});
