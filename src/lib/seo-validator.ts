/**
 * src/lib/seo-validator.ts
 * SEO Metadata Validator for Automated Blog Articles
 */

export interface SEOMetadata {
  title: string;
  metaDescription: string;
  slug: string;
  excerpt: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
}

export function generateAndValidateSEO(title: string, excerpt: string, slug: string): SEOMetadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://authornobikumar.netlify.app';

  const cleanTitle = title.trim().slice(0, 60);
  const cleanDescription = (excerpt || title).trim().slice(0, 155);
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');

  return {
    title: `${cleanTitle} | Nobi Kumar Chronicles`,
    metaDescription: cleanDescription,
    slug: cleanSlug,
    excerpt: cleanDescription,
    keywords: ['Nobi Kumar', 'Psychological Thriller', 'NNU Universe', 'Verma Saga', 'Case Files'],
    canonicalUrl: `${siteUrl}/blog/${cleanSlug}`,
    ogTitle: cleanTitle,
    ogDescription: cleanDescription,
  };
}
