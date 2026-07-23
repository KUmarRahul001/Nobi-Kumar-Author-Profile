import { MetadataRoute } from 'next';

export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://authornobikumar.netlify.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
