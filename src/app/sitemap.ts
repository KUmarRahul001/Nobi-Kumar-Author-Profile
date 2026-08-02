import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://nextorra.netlify.app';

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

  // Load books dynamically from Supabase
  let bookSlugs: string[] = [];
  try {
    const supabase = await createClient();
    const { data: dbBooks } = await supabase.from('Book').select('slug');
    if (dbBooks && dbBooks.length > 0) {
      bookSlugs = dbBooks.map((b) => b.slug);
    }
  } catch {}

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

  // Load blog posts dynamically from Supabase
  let blogSlugs: string[] = ['welcome-to-the-universe'];
  try {
    const supabase = await createClient();
    const { data: dbPosts } = await supabase
      .from('Post')
      .select('slug, publishedAt')
      .eq('status', 'published');
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
