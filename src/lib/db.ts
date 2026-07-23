import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Schema Contracts based on Database/Data Models specification
export interface Book {
  slug: string;
  title: string;
  format: 'kindle' | 'pocketfm' | 'other';
  seriesName?: string;
  volumeNumber?: number;
  status: 'published' | 'upcoming';
  synopsis: string;
  coverUrl?: string;
  buyLinks?: { label: string; url: string }[];
  publicationDate?: string;
  featured?: boolean;
  content: string; // Excerpt/Full page MDX body
  sampleExcerpt?: string; // Distraction-free chapter preview
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  publishedAt: string | null; // Null means draft status
  coverUrl?: string;
  content: string;
}

export interface UniverseNode {
  id: string;
  slug: string;
  label: string;
  type: 'character' | 'story' | 'location';
  summary: string;
  bookId?: string;
  positionX: number;
  positionY: number;
  bio?: string;
}

export interface UniverseEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationType: string;
}

export interface UniverseData {
  nodes: UniverseNode[];
  edges: UniverseEdge[];
}

const BOOKS_DIR = path.join(process.cwd(), 'src/content/books');
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const UNIVERSE_DIR = path.join(process.cwd(), 'src/content/universe');

// Helper to ensure directories exist
const ensureDirExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export async function getBooks(): Promise<Book[]> {
  ensureDirExists(BOOKS_DIR);
  const files = fs.readdirSync(BOOKS_DIR).filter((file) => file.endsWith('.mdx'));

  return files.map((file) => {
    const filePath = path.join(BOOKS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.mdx$/, '');

    return {
      slug,
      title: data.title || '',
      format: data.format || 'other',
      seriesName: data.seriesName,
      volumeNumber: data.volumeNumber,
      status: data.status || 'published',
      synopsis: data.synopsis || '',
      coverUrl: data.coverUrl,
      buyLinks: data.buyLinks || [],
      publicationDate: data.publicationDate,
      featured: !!data.featured,
      content,
      sampleExcerpt: data.sampleExcerpt,
    };
  });
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  ensureDirExists(BOOKS_DIR);
  const filePath = path.join(BOOKS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || '',
    format: data.format || 'other',
    seriesName: data.seriesName,
    volumeNumber: data.volumeNumber,
    status: data.status || 'published',
    synopsis: data.synopsis || '',
    coverUrl: data.coverUrl,
    buyLinks: data.buyLinks || [],
    publicationDate: data.publicationDate,
    featured: !!data.featured,
    content,
    sampleExcerpt: data.sampleExcerpt,
  };
}

export async function getPosts(): Promise<Post[]> {
  ensureDirExists(POSTS_DIR);
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx'));

  return files
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        body: content,
        category: data.category || 'General',
        tags: data.tags || [],
        publishedAt: data.publishedAt || null,
        coverUrl: data.coverUrl,
        content,
      };
    })
    .filter((post) => post.publishedAt !== null); // Filter out drafts in production listing
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureDirExists(POSTS_DIR);
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    body: content,
    category: data.category || 'General',
    tags: data.tags || [],
    publishedAt: data.publishedAt || null,
    coverUrl: data.coverUrl,
    content,
  };
}

export async function getUniverseData(): Promise<UniverseData> {
  ensureDirExists(UNIVERSE_DIR);
  const filePath = path.join(UNIVERSE_DIR, 'map.json');
  if (!fs.existsSync(filePath)) {
    return { nodes: [], edges: [] };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as UniverseData;
}
