import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Book3DCover from '@/components/atoms/Book3DCover';

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

import { FALLBACK_BOOKS } from '@/data/fallbackBooks';

function mapFallbackToPrismaFormat(b: any) {
  return {
    ...b,
    amazonLink: b.buyLinks?.amazon || '',
    googlePlayLink: b.buyLinks?.googlePlay || '',
    appleBooksLink: b.buyLinks?.appleBooks || '',
    pocketFmLink: b.buyLinks?.pocketFm || '',
    kukuFmLink: b.buyLinks?.kukuFm || '',
    audibleLink: b.buyLinks?.audible || '',
  };
}

async function getBookBySlugFromPrisma(slug: string) {
  try {
    const book = await prisma.book.findUnique({ where: { slug } });
    if (book) return book;
  } catch {}
  const fb = FALLBACK_BOOKS.find((b) => b.slug === slug);
  return fb ? mapFallbackToPrismaFormat(fb) : null;
}

async function getAllBooksFromPrisma() {
  try {
    const books = await prisma.book.findMany({ orderBy: { displayOrder: 'asc' } });
    if (books && books.length > 0) return books;
  } catch {}
  return FALLBACK_BOOKS.map(mapFallbackToPrismaFormat);
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlugFromPrisma(slug);

  if (!book) {
    return { title: 'Book Not Found | Nobi Kumar' };
  }

  return {
    title: `${book.title} | Nobi Kumar Thrillers`,
    description: (book.fullSynopsis || book.shortDescription).slice(0, 155),
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { slug } = await params;
  const currentBook = await getBookBySlugFromPrisma(slug);
  const allBooks = await getAllBooksFromPrisma();

  if (!currentBook) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main 2-Column Layout: Left Books Navigation Sidebar + Right Detailed Book View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Persistent Vertical Books Navigation List */}
          <div className="lg:col-span-3 border-r border-border/60 pr-6 space-y-8 sticky top-24">
            {/* Active Book Sub Menu */}
            <div className="space-y-2 border-b border-border/60 pb-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted">
                {currentBook.title}
              </h3>
              <ul className="space-y-1 text-xs font-sans">
                <li>
                  <span className="font-bold text-foreground block py-1 border-l-2 border-crimson pl-2">
                    Synopsis
                  </span>
                </li>
                {currentBook.samplePdfUrl && (
                  <li>
                    <a
                      href={currentBook.samplePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-crimson block py-1 pl-2 transition-colors"
                    >
                      Sample Preview 📄
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Other Books List */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted border-b border-border/60 pb-2">
                Other Books
              </h3>
              <ul className="space-y-2 text-xs font-sans max-h-[60vh] overflow-y-auto pr-1">
                {allBooks.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/books/${b.slug}`}
                      className={`block transition-colors hover:text-crimson ${
                        b.slug === currentBook.slug ? 'font-bold text-crimson' : 'text-muted'
                      }`}
                    >
                      {b.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Hero Book Detail View */}
          <div className="lg:col-span-9 relative space-y-8 min-h-[600px] bg-card/40 border border-border/60 rounded-2xl p-6 md:p-10 shadow-xl">
            {/* Title Header */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-[10px] font-mono text-crimson uppercase tracking-widest block font-bold">
                {currentBook.genre}
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-foreground uppercase">
                {currentBook.title}
              </h1>
              {currentBook.subtitle && (
                <p className="text-xs font-mono text-muted uppercase tracking-widest">
                  {currentBook.subtitle}
                </p>
              )}
              <div className="w-16 h-0.5 bg-crimson mx-auto mt-3" />
            </div>

            {/* Content Flex: Cover Image + Detailed Synopsis + Watermark Portrait */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-8 items-start pt-4">
              {/* Cover 3D Hardcover */}
              <div className="sm:col-span-5 flex justify-center sm:justify-start">
                <Book3DCover
                  coverUrl={currentBook.coverUrl || '/assets/nobi-author.png'}
                  title={currentBook.title}
                  className="w-48 sm:w-56"
                />
              </div>

              {/* Synopsis & Purchase Links */}
              <div className="sm:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-mono text-muted uppercase tracking-widest font-bold">
                    Synopsis & Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans whitespace-pre-line">
                    {currentBook.fullSynopsis || currentBook.shortDescription}
                  </p>
                </div>

                {/* Meta information badges */}
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-muted">
                  {currentBook.seriesName && (
                    <span className="px-2.5 py-1 bg-background rounded-md border border-border/40">
                      📖 {currentBook.seriesName}{' '}
                      {currentBook.volumeNumber ? `(Vol. ${currentBook.volumeNumber})` : ''}
                    </span>
                  )}
                  {currentBook.releaseDate && (
                    <span className="px-2.5 py-1 bg-background rounded-md border border-border/40">
                      🗓 {currentBook.releaseDate}
                    </span>
                  )}
                  {currentBook.pages && (
                    <span className="px-2.5 py-1 bg-background rounded-md border border-border/40">
                      📄 {currentBook.pages} pages
                    </span>
                  )}
                </div>

                {/* Purchase & Audio Links */}
                <div className="pt-4 border-t border-border/40 space-y-3">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest block font-bold">
                    Order & Listen Now:
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {currentBook.amazonLink && (
                      <a
                        href={currentBook.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-foreground text-background hover:bg-foreground/90 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                      >
                        ORDER ON AMAZON
                      </a>
                    )}
                    {currentBook.pocketFmLink && (
                      <a
                        href={currentBook.pocketFmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-crimson text-white hover:bg-crimson/90 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                      >
                        POCKET FM
                      </a>
                    )}
                    {currentBook.kukuFmLink && (
                      <a
                        href={currentBook.kukuFmLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                      >
                        KUKU FM
                      </a>
                    )}
                    {currentBook.audibleLink && (
                      <a
                        href={currentBook.audibleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-amber-600 text-white hover:bg-amber-700 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                      >
                        AUDIBLE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Watermark Portrait Background in exact Chetan Bhagat style */}
            <div className="absolute right-0 top-12 w-96 h-96 pointer-events-none opacity-5 dark:opacity-10 filter grayscale">
              <img
                src="/assets/nobi-author.png"
                alt="Nobi Kumar Background Watermark"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
