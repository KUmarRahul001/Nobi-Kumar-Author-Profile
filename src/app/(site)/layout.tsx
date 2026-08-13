/**
 * src/app/(site)/layout.tsx
 * Public site layout — Navbar + Footer only for public pages.
 * Admin pages are completely separate and never inherit this.
 */
import * as React from 'react';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import { getBooks, getPosts } from '@/lib/db';

import JsonLd from '@/components/atoms/JsonLd';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Fetch data server-side to populate Navbar search index
  const books = await getBooks();
  const posts = await getPosts();

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://nobikumar.netlify.app';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nobi Kumar',
    alternateName: 'Author Nobi Kumar',
    url: baseUrl,
    image: `${baseUrl}/assets/nobi-author.png`,
    jobTitle: 'Author / Novelist',
    knowsAbout: [
      'Psychological Thrillers',
      'Campus Mystery Novels',
      'Fiction Writing',
      'Verma Legacy',
      'Nobi Narrative Universe',
    ],
    sameAs: [
      'https://x.com',
      'https://instagram.com',
      'https://youtube.com',
      'https://ko-fi.com/nobikumar',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nobi Kumar Official Author Portal',
    url: baseUrl,
    publisher: {
      '@type': 'Person',
      name: 'Nobi Kumar',
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={[personSchema, websiteSchema]} />
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-crimson text-white px-4 py-2 rounded text-xs font-mono font-bold z-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to content
      </a>

      <Navbar books={books} posts={posts} />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
