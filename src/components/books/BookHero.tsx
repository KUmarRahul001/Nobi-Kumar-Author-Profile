'use client';

import * as React from 'react';
import Image from 'next/image';
import { Book } from '@/types/book';
import { Sparkles, Calendar, BookOpen, ExternalLink } from 'lucide-react';

interface BookHeroProps {
  book?: Book;
  onOpenDetails: (book: Book) => void;
}

export default function BookHero({ book, onOpenDetails }: BookHeroProps) {
  if (!book) return null;

  const defaultPlaceholder =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PedhcmtseS1ncmF5IiBmaWxsPSIjMWExYTFmIi8+PC9zdmc+';
  const primaryBuyUrl =
    book.buyLinks.amazon ||
    book.buyLinks.officialWebsite ||
    Object.values(book.buyLinks).find((v) => !!v);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-neutral-950 mb-8 min-h-[360px] md:min-h-[440px] flex items-center">
      {/* Background Graphic Overlay banner */}
      <div className="absolute inset-0 z-0">
        {book.bannerUrl || book.coverUrl ? (
          <Image
            src={book.bannerUrl || book.coverUrl || ''}
            alt="Cinematic background lore banner illustration"
            fill
            className="object-cover opacity-25 blur-[4px]"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent md:bg-gradient-to-r md:from-neutral-950 md:via-neutral-950/90 md:to-transparent" />
      </div>

      {/* Hero Body Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="w-48 md:w-60 aspect-[2/3] shrink-0 shadow-2xl relative border border-border/40 rounded-lg overflow-hidden group">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={`Cover of featured book ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 240px"
              priority
              placeholder="blur"
              blurDataURL={defaultPlaceholder}
            />
          ) : (
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
              <BookOpen size={48} className="text-crimson/50" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <span className="bg-crimson/15 text-crimson font-mono font-bold tracking-widest text-[9px] uppercase px-2.5 py-1 rounded-full border border-crimson/25 flex items-center gap-1">
              <Sparkles size={10} /> Featured Novel
            </span>
            {book.seriesName && (
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                {book.seriesName}
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight text-foreground">
            {book.title}
          </h2>
          {book.subtitle && (
            <p className="text-sm sm:text-base font-serif italic text-muted leading-relaxed">
              {book.subtitle}
            </p>
          )}

          <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed font-sans line-clamp-3">
            {book.shortDescription}
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2 items-center justify-center md:justify-start">
            <button
              onClick={() => onOpenDetails(book)}
              className="py-2.5 px-6 rounded text-xs font-mono uppercase font-bold tracking-widest bg-white text-black hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
            >
              Explore Details
            </button>
            {primaryBuyUrl && (
              <a
                href={primaryBuyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 rounded text-xs font-mono uppercase font-bold tracking-widest bg-crimson text-white hover:bg-red-700 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-crimson"
              >
                Purchase Now <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
