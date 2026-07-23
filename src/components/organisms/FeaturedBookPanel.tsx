import * as React from 'react';
import Link from 'next/link';
import { Book } from '@/lib/db';

interface FeaturedBookPanelProps {
  book: Book;
}

export default function FeaturedBookPanel({ book }: FeaturedBookPanelProps) {
  return (
    <section aria-labelledby="featured-book-title" className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="border border-border rounded-xl p-6 md:p-8 bg-card flex flex-col md:flex-row gap-8 items-center">
        {/* Cover panel aspect controller */}
        <div className="w-48 sm:w-56 md:w-64 flex-shrink-0 aspect-[2/3] bg-neutral-900 rounded-lg overflow-hidden border border-border">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Cover art for featured book: ${book.title}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted font-mono text-xs">
              No Cover Art Available
            </div>
          )}
        </div>

        <div className="flex-1 space-y-5 text-center md:text-left">
          <header className="space-y-2">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase bg-crimson/15 text-crimson rounded-full font-semibold border border-crimson/20 animate-pulse">
                Featured Release
              </span>
              {book.format && (
                <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase bg-violet/15 text-violet rounded-full font-semibold border border-violet/20">
                  {book.format === 'kindle'
                    ? 'Kindle Edition'
                    : book.format === 'pocketfm'
                      ? 'Pocket FM Audio'
                      : book.format}
                </span>
              )}
            </div>
            {book.seriesName && (
              <p className="text-xs font-mono text-muted uppercase tracking-wider">
                {book.seriesName} {book.volumeNumber && `Volume #${book.volumeNumber}`}
              </p>
            )}
            <h2
              id="featured-book-title"
              className="text-3xl sm:text-4xl font-serif font-bold text-foreground"
            >
              {book.title}
            </h2>
          </header>

          <p className="text-muted leading-relaxed font-sans text-sm sm:text-base">
            {book.synopsis}
          </p>

          <div className="pt-2 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href={`/books/${book.slug}`}
                className="px-6 py-3 rounded text-sm font-medium bg-crimson text-white hover:bg-red-700 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-background"
              >
                Learn More
              </Link>

              {book.sampleExcerpt && (
                <Link
                  href={`/books/${book.slug}/sample`}
                  className="px-6 py-3 rounded text-sm font-medium border border-border text-foreground hover:bg-neutral-800 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2 focus:ring-offset-background"
                >
                  Read Sample Chapter
                </Link>
              )}
            </div>

            {book.buyLinks && book.buyLinks.length > 0 && (
              <div className="space-y-2 text-center md:text-left">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-muted">
                  Available On:
                </span>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {book.buyLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded text-xs font-mono border border-border bg-neutral-900/50 hover:bg-neutral-800 hover:border-crimson text-muted hover:text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-1 focus:ring-offset-background"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
