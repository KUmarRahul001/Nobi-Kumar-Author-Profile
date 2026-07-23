'use client';

import * as React from 'react';
import Image from 'next/image';
import { Book } from '@/types/book';
import { Award, BookOpen, ExternalLink, Bookmark } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onOpenDetails: (book: Book) => void;
}

export default function BookCard({ book, onOpenDetails }: BookCardProps) {
  const defaultPlaceholder =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PedhcmtseS1ncmF5IiBmaWxsPSIjMWExYTFmIi8+PC9zdmc+';

  // Get key buy link
  const primaryBuyUrl =
    book.buyLinks.amazon ||
    book.buyLinks.officialWebsite ||
    book.buyLinks.custom ||
    Object.values(book.buyLinks).find((v) => !!v);

  return (
    <div className="group relative bg-card border border-border/60 rounded-xl overflow-hidden shadow-lg hover:shadow-crimson/10 hover:border-crimson/40 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5">
      {/* Cover Artwork Wrapper */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`Book cover of ${book.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            placeholder="blur"
            blurDataURL={defaultPlaceholder}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center border-b border-border/20">
            <BookOpen size={40} className="text-crimson/50 mb-2" />
            <span className="text-xs font-serif font-bold text-foreground line-clamp-2">
              {book.title}
            </span>
          </div>
        )}

        {/* Floating Accent Badges (FR-03) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {book.isBestseller && (
            <span className="bg-amber-600 text-white font-mono font-bold tracking-widest text-[8px] uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Award size={10} /> Bestseller
            </span>
          )}
          {book.isEditorsChoice && (
            <span className="bg-purple-600 text-white font-mono font-bold tracking-widest text-[8px] uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Bookmark size={10} /> Editor Choice
            </span>
          )}
        </div>

        {/* Floating status tag */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span
            className={`text-[8px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow border ${
              book.status === 'published'
                ? 'bg-neutral-900/90 text-green-400 border-green-500/30'
                : book.status === 'coming-soon'
                  ? 'bg-neutral-900/90 text-amber-400 border-amber-500/30'
                  : 'bg-neutral-900/90 text-muted border-border/30'
            }`}
          >
            {book.status === 'coming-soon' ? 'Coming Soon' : book.status}
          </span>
        </div>
      </div>

      {/* Book Metadata Context */}
      <div className="p-4 flex flex-col flex-1 space-y-3 bg-neutral-950/40">
        <header className="space-y-1">
          {book.seriesName && (
            <span className="text-[9px] font-mono text-crimson uppercase tracking-widest block">
              {book.seriesName} {book.volumeNumber ? `— Vol. ${book.volumeNumber}` : ''}
            </span>
          )}
          <h3 className="text-base font-serif font-black tracking-tight leading-tight text-foreground line-clamp-1">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-[10px] text-muted line-clamp-1 italic font-serif">{book.subtitle}</p>
          )}
        </header>

        <p className="text-xs text-muted line-clamp-2 leading-relaxed font-sans flex-1">
          {book.shortDescription}
        </p>

        {/* Badge details */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[9px] font-mono bg-neutral-900 border border-border text-muted px-2 py-0.5 rounded uppercase">
            {book.genre}
          </span>
          {book.pages && (
            <span className="text-[9px] font-mono bg-neutral-900 border border-border text-muted px-2 py-0.5 rounded uppercase">
              {book.pages} Pages
            </span>
          )}
        </div>

        {/* Buttons Controls Action Panel */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/30">
          <button
            onClick={() => onOpenDetails(book)}
            className="w-full py-2 px-2.5 rounded text-[10px] font-mono uppercase font-bold tracking-widest text-center bg-neutral-900 text-foreground border border-border hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
          >
            Read More
          </button>
          {primaryBuyUrl ? (
            <a
              href={primaryBuyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2.5 rounded text-[10px] font-mono uppercase font-bold tracking-widest text-center bg-crimson text-white hover:bg-red-700 transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-crimson"
            >
              Buy Now <ExternalLink size={10} />
            </a>
          ) : (
            <button
              disabled
              className="w-full py-2 px-2.5 rounded text-[10px] font-mono uppercase font-bold tracking-widest text-center bg-neutral-950 text-muted border border-border/20 cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
