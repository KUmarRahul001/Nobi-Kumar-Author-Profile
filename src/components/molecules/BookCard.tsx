import * as React from 'react';
import Link from 'next/link';
import { Book } from '@/lib/db';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="group bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 hover:border-crimson hover:shadow-lg flex flex-col h-full">
      {/* Cover container using stable aspect ratio to prevent layout shifts (CLS) */}
      <div className="relative aspect-[2/3] w-full bg-neutral-900 overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Cover art for ${book.title}`}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted font-mono text-xs">
            No Cover Art
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-black/80 text-foreground border border-border">
            {book.format}
          </span>
          {book.status === 'upcoming' && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-crimson text-white">
              Upcoming
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 space-y-3">
        <header className="space-y-1">
          {book.seriesName && (
            <p className="text-[10px] font-mono text-crimson uppercase tracking-wider">
              {book.seriesName} {book.volumeNumber && `#${book.volumeNumber}`}
            </p>
          )}
          <h3 className="text-lg font-serif font-bold text-foreground line-clamp-1 group-hover:text-crimson transition-colors">
            <Link href={`/books/${book.slug}`}>{book.title}</Link>
          </h3>
        </header>

        <p className="text-xs text-muted font-sans line-clamp-3 leading-relaxed flex-1">
          {book.synopsis}
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            href={`/books/${book.slug}`}
            className="w-full text-center py-2 rounded text-xs font-medium bg-crimson text-white hover:bg-red-700 transition-colors"
          >
            View Details
          </Link>

          {book.sampleExcerpt && (
            <Link
              href={`/books/${book.slug}/sample`}
              className="w-full text-center py-2 rounded text-xs font-medium border border-border text-foreground hover:bg-neutral-800 transition-colors"
            >
              Read Sample
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
