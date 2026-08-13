import * as React from 'react';
import { getBooks } from '@/lib/db';
import HeroSection from '@/components/organisms/HeroSection';
import StartHereSection from '@/components/organisms/StartHereSection';
import FeaturedBookPanel from '@/components/organisms/FeaturedBookPanel';
import FreeReaderMagnet from '@/components/organisms/FreeReaderMagnet';

export const revalidate = 3600;

export default async function Home() {
  const books = await getBooks();
  const featuredBook = books.find((b) => b.featured) || books[0];

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Editorial Nobi Archive Hero */}
      <HeroSection />

      {/* Start Here Reader Onboarding Section */}
      <StartHereSection />

      {/* Currently in the Archive Featured Book Section */}
      {featuredBook && (
        <section className="w-full py-12 px-4 border-b border-border/40">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
                CURRENTLY IN THE ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase text-foreground">
                FEATURED CASE FILE
              </h2>
            </div>
            <FeaturedBookPanel book={featuredBook} />
          </div>
        </section>
      )}

      {/* The Shadow File Free Reader Magnet */}
      <FreeReaderMagnet />
    </div>
  );
}
