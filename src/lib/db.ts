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
  try {
    const { createClientSafe } = await import('@/lib/supabase/server');
    const supabase = await createClientSafe();
    if (!supabase) throw new Error('Supabase client unavailable');
    const { data: items, error } = await supabase
      .from('Book')
      .select('*')
      .order('displayOrder', { ascending: true });

    if (!error && items && items.length > 0) {
      return items.map((item: any) => ({
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle || '',
        format: item.format || 'kindle',
        seriesName: item.seriesName,
        volumeNumber: item.volumeNumber,
        status: item.status || 'published',
        synopsis: item.fullSynopsis || item.shortDescription || '',
        coverUrl: item.coverUrl,
        bannerUrl: item.bannerUrl,
        buyLinks: [
          item.amazonLink && { label: 'Amazon Kindle', url: item.amazonLink },
          item.googlePlayLink && { label: 'Google Play', url: item.googlePlayLink },
          item.appleBooksLink && { label: 'Apple Books', url: item.appleBooksLink },
          item.koboLink && { label: 'Kobo', url: item.koboLink },
          item.paperbackLink && { label: 'Paperback', url: item.paperbackLink },
          item.audibleLink && { label: 'Audible', url: item.audibleLink },
          item.kukuFmLink && { label: 'Kuku FM', url: item.kukuFmLink },
          item.pocketFmLink && { label: 'Pocket FM', url: item.pocketFmLink },
          item.customLink && { label: 'Buy Now', url: item.customLink },
        ].filter(Boolean),
        publicationDate: item.releaseDate || item.createdAt || null,
        featured: !!item.isFeatured,
        isBestseller: !!item.isBestseller,
        isEditorsChoice: !!item.isEditorsChoice,
        content: item.fullSynopsis || item.shortDescription || '',
        sampleExcerpt: item.samplePdfUrl || item.previewUrl,
        tags: Array.isArray(item.tags)
          ? item.tags
          : (item.tags || '')
              .split(',')
              .map((t: string) => t.trim())
              .filter(Boolean),
        genre: item.genre || '',
        pages: item.pages,
        readingTime: item.readingTime,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        trailerLink: item.trailerLink,
        authorNotes: item.authorNotes,
      }));
    }
  } catch (err) {
    console.warn('[db.ts] Supabase getBooks query failed, falling back to local MDX:', err);
  }

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
  try {
    const { createClientSafe } = await import('@/lib/supabase/server');
    const supabase = await createClientSafe();
    if (!supabase) throw new Error('Supabase client unavailable');
    const { data: item, error } = await supabase.from('Book').select('*').eq('slug', slug).single();

    if (!error && item) {
      return {
        slug: item.slug,
        title: item.title,
        format: item.format || 'kindle',
        seriesName: item.seriesName,
        volumeNumber: item.volumeNumber,
        status: item.status || 'published',
        synopsis: item.synopsis || item.description || '',
        coverUrl: item.coverUrl,
        buyLinks: Array.isArray(item.buyLinks) ? item.buyLinks : [],
        publicationDate: item.publicationDate || item.createdAt || null,
        featured: !!item.featured,
        content: item.content || item.synopsis || '',
        sampleExcerpt: item.sampleExcerpt,
      };
    }
  } catch (err) {
    console.warn(
      `[db.ts] Supabase getBookBySlug query failed for ${slug}, falling back to local MDX:`,
      err
    );
  }

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
  try {
    const { createClientSafe } = await import('@/lib/supabase/server');
    const supabase = await createClientSafe();
    if (!supabase) throw new Error('Supabase client unavailable');
    const { data, error } = await supabase
      .from('Post')
      .select('*')
      .eq('status', 'published')
      .order('publishedAt', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((item: any) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || '',
        body: item.content || '',
        category: item.category || 'General',
        tags: Array.isArray(item.tags)
          ? item.tags
          : typeof item.tags === 'string'
            ? item.tags
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : [],
        publishedAt: item.publishedAt || item.createdAt || null,
        coverUrl: item.coverUrl,
        content: item.content || '',
      }));
    }
  } catch (err) {
    console.warn('[db.ts] Supabase getPosts query failed, falling back to local MDX:', err);
  }

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
    .filter((post) => post.publishedAt !== null);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { createClientSafe } = await import('@/lib/supabase/server');
    const supabase = await createClientSafe();
    if (!supabase) throw new Error('Supabase client unavailable');
    const { data: item, error } = await supabase.from('Post').select('*').eq('slug', slug).single();

    if (!error && item) {
      return {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || '',
        body: item.content || '',
        category: item.category || 'General',
        tags: Array.isArray(item.tags)
          ? item.tags
          : typeof item.tags === 'string'
            ? item.tags
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : [],
        publishedAt: item.publishedAt || item.createdAt || null,
        coverUrl: item.coverUrl,
        content: item.content || '',
      };
    }
  } catch (err) {
    console.warn(
      `[db.ts] Supabase getPostBySlug query failed for ${slug}, falling back to local MDX:`,
      err
    );
  }

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

export async function getUniverseData(): Promise<UniverseData & { timeline?: any[] }> {
  try {
    ensureDirExists(UNIVERSE_DIR);
    const filePath = path.join(UNIVERSE_DIR, 'map.json');
    if (!fs.existsSync(filePath)) {
      return { nodes: [], edges: [], timeline: [] };
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return {
      nodes: Array.isArray(data.nodes) ? data.nodes : [],
      edges: Array.isArray(data.edges) ? data.edges : [],
      timeline: Array.isArray(data.timeline) ? data.timeline : [],
    };
  } catch (err) {
    console.warn('[db.ts] getUniverseData failed, returning empty universe:', err);
    return { nodes: [], edges: [], timeline: [] };
  }
}
