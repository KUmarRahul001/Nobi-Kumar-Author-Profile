import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { Book } from '@/types/book';
import Link from 'next/link';
import { Metadata } from 'next';
import Book3DCover from '@/components/atoms/Book3DCover';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Books by Nobi Kumar | Official Bibliography & Novels',
  description:
    'Discover all blockbuster novels, psychological thrillers, and audiobooks written by author Nobi Kumar.',
};

function mapDbToBook(dbBook: any): Book {
  return {
    slug: dbBook.slug,
    title: dbBook.title,
    subtitle: dbBook.subtitle || '',
    seriesName: dbBook.seriesName || '',
    volumeNumber: dbBook.volumeNumber || undefined,
    genre: dbBook.genre,
    tags: dbBook.tags ? dbBook.tags.split(',').filter(Boolean) : [],
    shortDescription: dbBook.shortDescription,
    fullSynopsis: dbBook.fullSynopsis,
    releaseDate: dbBook.releaseDate,
    isbn: dbBook.isbn || '',
    language: dbBook.language,
    pages: dbBook.pages || undefined,
    readingTime: dbBook.readingTime || '',
    status: dbBook.status as 'published' | 'coming-soon' | 'draft',
    coverUrl: dbBook.coverUrl || '',
    bannerUrl: dbBook.bannerUrl || '',
    trailerLink: dbBook.trailerLink || '',
    buyLinks: {
      amazon: dbBook.amazonLink || '',
      googlePlay: dbBook.googlePlayLink || '',
      appleBooks: dbBook.appleBooksLink || '',
      kobo: dbBook.koboLink || '',
      paperback: dbBook.paperbackLink || '',
      hardcover: dbBook.hardcoverLink || '',
      officialWebsite: dbBook.officialWebsiteLink || '',
      custom: dbBook.customLink || '',
    },
    samplePdfUrl: dbBook.samplePdfUrl || '',
    previewUrl: dbBook.previewUrl || '',
    awards: dbBook.awards ? dbBook.awards.split(',').filter(Boolean) : [],
    isFeatured: !!dbBook.isFeatured,
    isBestseller: !!dbBook.isBestseller,
    isEditorsChoice: !!dbBook.isEditorsChoice,
    displayOrder: dbBook.displayOrder,
    seoTitle: dbBook.seoTitle || '',
    seoDescription: dbBook.seoDescription || '',
    socialShareImage: dbBook.socialShareImage || '',
    authorNotes: dbBook.authorNotes || '',
    ageRating: dbBook.ageRating || '',
    contentWarning: dbBook.contentWarning || '',
    lastUpdated: dbBook.lastUpdated.toISOString(),
  };
}

async function loadBooksFromPrisma(): Promise<Book[]> {
  try {
    const dbBooks = await prisma.book.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return dbBooks.map(mapDbToBook);
  } catch {
    return [];
  }
}

export default async function BooksPage() {
  const books = await loadBooksFromPrisma();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Main Grid Layout: Left Books Sidebar + Right Books Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Vertical Book Titles Navigation List */}
          <div className="lg:col-span-3 border-r border-border/60 pr-6 space-y-6">
            <div className="border-b border-border/60 pb-3">
              <h2 className="text-xl font-serif font-bold text-foreground tracking-wider uppercase">
                Books
              </h2>
            </div>

            <ul className="space-y-3 font-sans text-xs">
              {books.map((b) => (
                <li key={b.slug} className="border-b border-border/30 pb-2">
                  <Link
                    href={`/books/${b.slug}`}
                    className="block text-muted hover:text-crimson transition-colors font-medium"
                  >
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Author Biography + Full Books Listing Stack */}
          <div className="lg:col-span-9 space-y-12">
            {/* Author Intro Biography Summary */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-muted font-sans border-b border-border/40 pb-6 space-y-3">
              <p className="text-sm sm:text-base text-foreground font-serif font-medium leading-relaxed">
                <strong>Nobi Kumar</strong> is a storyteller driven by a deep passion for weaving
                suspense, emotion, and imagination into unforgettable tales.
              </p>
              <p className="text-muted leading-relaxed">
                Writing under his pen name, he creates novels that blend gripping plots with
                powerful human experiences, leaving readers both haunted and inspired. When he isn’t
                writing, Nobi spends his time exploring ideas, observing life’s hidden details, and
                shaping them into stories that stay with readers long after the last page. His
                mission is simple—one story at a time, to spark curiosity and connect with hearts
                across the world.
              </p>
            </div>

            {/* Books Listing Stack Cards */}
            <div className="space-y-10">
              {books.map((book) => (
                <div
                  key={book.slug}
                  id={`book-${book.slug}`}
                  className="p-6 border border-border/60 rounded-xl bg-card/40 space-y-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Book 3D Hardcover Cover */}
                    <div className="sm:col-span-4 flex justify-center sm:justify-start">
                      <Link href={`/books/${book.slug}`}>
                        <Book3DCover
                          coverUrl={book.coverUrl || '/assets/nobi-author.png'}
                          title={book.title}
                          className="w-40 sm:w-48"
                        />
                      </Link>
                    </div>

                    {/* Book Summary & Action Links */}
                    <div className="sm:col-span-8 space-y-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground hover:text-crimson transition-colors">
                          <Link href={`/books/${book.slug}`}>{book.title}</Link>
                        </h3>
                        {book.subtitle && (
                          <p className="text-[11px] font-mono text-muted uppercase tracking-widest mt-1">
                            {book.subtitle}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans line-clamp-4">
                        {book.fullSynopsis || book.shortDescription}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-4 items-center">
                        <Link
                          href={`/books/${book.slug}`}
                          className="text-xs font-mono font-bold text-crimson hover:text-crimson/80 uppercase tracking-wider underline flex items-center gap-1"
                        >
                          KNOW MORE →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
