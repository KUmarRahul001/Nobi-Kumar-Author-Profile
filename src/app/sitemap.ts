import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 3600; // Cache sitemap for 1 hour to boost performance

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://nobikumar.netlify.app';

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
    {
      url: `${baseUrl}/reading-order`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic books from Supabase
  let bookRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: dbBooks } = await supabase.from('Book').select('slug, updatedAt');
    if (dbBooks && dbBooks.length > 0) {
      bookRoutes = dbBooks.flatMap((b) => [
        {
          url: `${baseUrl}/books/${b.slug}`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/books/${b.slug}/sample`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        },
      ]);
    }
  } catch {}

  // Dynamic blog posts from Supabase
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: dbPosts } = await supabase
      .from('Post')
      .select('slug, updatedAt, publishedAt')
      .eq('status', 'published');
    if (dbPosts && dbPosts.length > 0) {
      blogRoutes = dbPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified:
          p.updatedAt || p.publishedAt ? new Date(p.updatedAt || p.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));
    }
  } catch {}

  return [...staticRoutes, ...bookRoutes, ...blogRoutes];
}
