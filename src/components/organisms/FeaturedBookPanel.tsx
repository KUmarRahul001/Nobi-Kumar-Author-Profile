import * as React from 'react';
import Link from 'next/link';
import { Book } from '@/lib/db';
import { Sparkles, BookOpen, Clock } from 'lucide-react';

interface FeaturedBookPanelProps {
  book?: Book | null;
}

export default function FeaturedBookPanel({ book }: FeaturedBookPanelProps) {
  if (!book) {
    return (
      <section aria-labelledby="featured-book-title" className="w-full max-w-4xl mx-auto py-8 px-4">
        <div className="border border-border/80 rounded-2xl p-8 md:p-12 bg-card/90 backdrop-blur-md flex flex-col items-center text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#b21f2d0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="p-4 rounded-2xl bg-crimson/10 border border-crimson/30 text-crimson mb-2">
            <BookOpen className="w-8 h-8 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-crimson uppercase tracking-widest font-bold">
            ARCHIVE IN PROGRESS
          </span>
          <h2
            id="featured-book-title"
            className="text-2xl sm:text-3xl font-serif font-black uppercase text-foreground"
          >
            Upcoming Novel Release Coming Soon
          </h2>
          <p className="text-muted text-xs sm:text-sm max-w-lg leading-relaxed font-sans">
            The next official Nobi Narrative Universe novel published by the author will appear here
            directly from the live archive. In the meantime, explore our active case files and
            universe maps.
          </p>
          <div className="pt-3 flex flex-wrap gap-3 justify-center">
            <Link
              href="/universe"
              className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-crimson hover:bg-crimson/90 text-white transition-all shadow-lg"
            >
              Explore Universe Lore →
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-border/80 bg-neutral-900/80 hover:bg-neutral-800 text-foreground transition-all"
            >
              Read Author Chronicles
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="featured-book-title" className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="border border-border/80 rounded-2xl p-6 md:p-8 bg-card/90 backdrop-blur-md flex flex-col md:flex-row gap-8 items-center shadow-2xl relative overflow-hidden">
        {/* Cover panel aspect controller */}
        <div className="w-48 sm:w-56 md:w-64 flex-shrink-0 aspect-[2/3] bg-neutral-950 rounded-xl overflow-hidden border border-border/80 shadow-2xl relative group">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Cover art for featured book: ${book.title}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-muted font-mono text-xs p-4 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-crimson/60" />
              <span>Official NNU Novel</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-5 text-center md:text-left">
          <header className="space-y-2">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase bg-crimson/15 text-crimson rounded-full font-semibold border border-crimson/30">
                Featured Release
              </span>
              {book.format && (
                <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase bg-violet/15 text-violet rounded-full font-semibold border border-violet/30">
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
              className="text-3xl sm:text-4xl font-serif font-black text-foreground uppercase tracking-tight"
            >
              {book.title}
            </h2>
          </header>

          <p className="text-muted leading-relaxed font-sans text-xs sm:text-sm">{book.synopsis}</p>

          <div className="pt-2 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href={`/books/${book.slug}`}
                className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-crimson hover:bg-crimson/90 text-white transition-all shadow-[0_0_20px_rgba(178,31,45,0.4)] text-center"
              >
                Learn More
              </Link>

              {book.sampleExcerpt && (
                <Link
                  href={`/books/${book.slug}/sample`}
                  className="px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border border-border/80 text-foreground bg-neutral-900/80 hover:bg-neutral-800 transition-all text-center"
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
                      className="px-4 py-2 rounded-lg text-xs font-mono border border-border/80 bg-neutral-950/80 hover:border-crimson text-muted hover:text-foreground transition-all"
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
