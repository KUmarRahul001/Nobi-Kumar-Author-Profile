import { getBooks, getPosts, getUniverseData } from './db';

export interface SearchItem {
  id: string;
  title: string;
  excerpt: string;
  type: 'book' | 'post' | 'universe';
  url: string;
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const items: SearchItem[] = [];

  // 1. Ingest Books
  const books = await getBooks();
  books.forEach((book) => {
    items.push({
      id: `book-${book.slug}`,
      title: book.title,
      excerpt: book.synopsis,
      type: 'book',
      url: `/books/${book.slug}`,
    });
  });

  // 2. Ingest Posts
  const posts = await getPosts();
  posts.forEach((post) => {
    items.push({
      id: `post-${post.slug}`,
      title: post.title,
      excerpt: post.excerpt,
      type: 'post',
      url: `/blog/${post.slug}`,
    });
  });

  // 3. Ingest Universe Nodes
  const universe = await getUniverseData();
  universe.nodes.forEach((node) => {
    items.push({
      id: `universe-${node.id}`,
      title: node.label,
      excerpt: node.bio || node.summary || '',
      type: 'universe',
      url: `/universe`, // Node details are visible on the map interface
    });
  });

  return items;
}
