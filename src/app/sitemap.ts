import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { FALLBACK_BOOKS } from '@/data/fallbackBooks';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://authornobikumar.netlify.app';

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/universe`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Load books dynamically from Prisma with fallback dataset
  let bookSlugs: string[] = [];
  try {
    const dbBooks = await prisma.book.findMany({
      select: { slug: true },
    });
    if (dbBooks && dbBooks.length > 0) {
      bookSlugs = dbBooks.map((b) => b.slug);
    } else {
      bookSlugs = FALLBACK_BOOKS.map((b) => b.slug);
    }
  } catch {
    bookSlugs = FALLBACK_BOOKS.map((b) => b.slug);
  }

  const bookRoutes: MetadataRoute.Sitemap = bookSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/books/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books/${slug}/sample`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]);

  // Load blog posts dynamically from Prisma
  let blogSlugs: string[] = ['welcome-to-the-universe'];
  try {
    const dbPosts = await prisma.post.findMany({
      where: { status: 'published' },
      select: { slug: true, publishedAt: true },
    });
    if (dbPosts && dbPosts.length > 0) {
      blogSlugs = dbPosts.map((p) => p.slug);
    }
  } catch {}

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...bookRoutes, ...blogRoutes];
}
