import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import JsonLd from '@/components/atoms/JsonLd';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Official Nobi Kumar Reading Order & Bibliography',
  description:
    'The complete chronological and publication reading order for Nobi Kumar thrillers, fetched live from the official catalog.',
};

async function getBooksFromSupabase() {
  try {
    const supabase = await createClient();
    const { data: books } = await supabase
      .from('Book')
      .select('*')
      .order('displayOrder', { ascending: true });
    if (books && books.length > 0) return books;
  } catch (err) {
    console.error('Failed to fetch books from Supabase for reading order:', err);
  }
  return [];
}

export default async function ReadingOrderPage() {
  const booksFromDb = await getBooksFromSupabase();

  const books =
    booksFromDb.length > 0
      ? booksFromDb.map((b, idx) => ({
          order: idx + 1,
          title: b.title,
          genre: b.genre || 'Psychological Thriller',
          slug: b.slug,
          description: b.shortDescription || b.fullSynopsis || '',
        }))
      : [
          {
            order: 1,
            title: 'The Verma Legacy',
            genre: 'Psychological Thriller / Family Mystery',
            slug: 'the-verma-legacy',
            description:
              'The foundational novel of the NNU universe. Traces three generations of estate secrets, trauma, and psychological warfare.',
          },
          {
            order: 2,
            title: 'The Shadow Who Watched',
            genre: 'Dark Campus Mystery / Suspense',
            slug: 'the-shadow-who-watched',
            description:
              'A chilling campus thriller exploring surveillance, obsession, and academic rivalries.',
          },
          {
            order: 3,
            title: 'Shadows of Mumbai',
            genre: 'Noir / Crime Thriller',
            slug: 'shadows-of-mumbai',
            description:
              'An intense investigation through Mumbai’s rainy streets and shadowy underworld.',
          },
        ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the recommended reading order for Nobi Kumar books?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The recommended reading order for Nobi Kumar thrillers is: ${books
            .map((b) => `${b.order}. ${b.title}`)
            .join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Are Nobi Kumar novels standalone or connected?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While each Nobi Kumar book contains a self-contained mystery, they all share the Nobi Narrative Universe (NNU) with subtle character crossovers and recurring lore.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 font-sans">
      <JsonLd data={faqSchema} />
      <div className="max-w-4xl mx-auto space-y-10">
        <Breadcrumbs items={[{ name: 'Reading Order & Bibliography', item: '/reading-order' }]} />

        <header className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold">
            Official Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight">
            Nobi Kumar Reading Order
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Follow the chronological path through the Nobi Narrative Universe (NNU). Discover how
            character storylines, mystery arcs, and locations intertwine.
          </p>
          <div className="w-20 h-1 bg-crimson mx-auto" />
        </header>

        <div className="space-y-6">
          {books.map((b) => (
            <div
              key={b.slug}
              className="p-6 border border-border/60 rounded-xl bg-card/40 space-y-3 shadow-sm hover:border-crimson/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-crimson font-bold uppercase tracking-widest">
                  Book #{b.order} in Reading Order
                </span>
                <span className="text-[10px] font-mono text-muted bg-background px-2.5 py-1 rounded border border-border/40">
                  {b.genre}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                <Link href={`/books/${b.slug}`} className="hover:text-crimson transition-colors">
                  {b.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{b.description}</p>
              <div>
                <Link
                  href={`/books/${b.slug}`}
                  className="text-xs font-mono font-bold text-crimson hover:underline"
                >
                  READ SYNOPSIS & BUY LINKS →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="pt-8 border-t border-border/60 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-foreground text-center uppercase">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-5 border border-border/40 rounded-xl bg-card/20 space-y-2">
              <h3 className="text-sm font-serif font-bold text-foreground">
                Where should I start reading Nobi Kumar’s books?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                We strongly recommend starting with{' '}
                <strong>{books[0]?.title || 'The Verma Legacy'}</strong> as it lays the
                psychological foundation for the Verma family arc and the broader NNU universe.
              </p>
            </div>
            <div className="p-5 border border-border/40 rounded-xl bg-card/20 space-y-2">
              <h3 className="text-sm font-serif font-bold text-foreground">
                Can I read the books as standalone novels?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Yes! Every book has a complete resolution to its central mystery, though reading in
                order reveals hidden Easter eggs and character crossovers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
