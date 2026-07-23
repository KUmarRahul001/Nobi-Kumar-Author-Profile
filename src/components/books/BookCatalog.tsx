'use client';

import * as React from 'react';
import { Book } from '@/types/book';
import Link from 'next/link';
import {
  BookOpen,
  ExternalLink,
  ShoppingBag,
  Headphones,
  Radio,
  Sparkles,
  FileText,
  Search,
  Tag,
  Calendar,
  Star,
} from 'lucide-react';

interface BookCatalogProps {
  initialBooks: Book[];
}

// Skeleton shimmer loader for novel cards
export function BookCardSkeleton() {
  return (
    <div className="bg-card border border-border/40 rounded-xl p-4 space-y-4 animate-pulse">
      <div className="w-full h-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      <div className="space-y-2">
        <div className="h-5 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
      </div>
      <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
      <div className="flex gap-2">
        <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded flex-1" />
        <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded flex-1" />
      </div>
    </div>
  );
}

export default function BookCatalog({ initialBooks }: BookCatalogProps) {
  const [books, setBooks] = React.useState<Book[]>(initialBooks);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>('');
  const [selectedGenre, setSelectedGenre] = React.useState<string>('all');

  const genres = React.useMemo(() => {
    const set = new Set<string>();
    initialBooks.forEach((b) => {
      if (b.genre) set.add(b.genre);
    });
    return Array.from(set);
  }, [initialBooks]);

  const filteredBooks = React.useMemo(() => {
    return books.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || b.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [books, search, selectedGenre]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Header Bar with Lucide Icons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/60 p-4 rounded-xl border border-border/40 backdrop-blur-md">
        {/* Search Input with Search Icon */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search novels, topics, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-lg text-xs font-sans text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-crimson/50"
          />
        </div>

        {/* Genre Pill Selector Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
          <button
            onClick={() => setSelectedGenre('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              selectedGenre === 'all'
                ? 'bg-crimson text-white font-bold shadow-md'
                : 'bg-background text-muted border border-border/60 hover:text-foreground'
            }`}
          >
            <Tag className="w-3 h-3" /> All Genres
          </button>

          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                selectedGenre === g
                  ? 'bg-crimson text-white font-bold shadow-md'
                  : 'bg-background text-muted border border-border/60 hover:text-foreground'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog View Grid / Shimmer Loading / Empty State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <BookCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.slug}
              className="group bg-card border border-border/60 hover:border-crimson/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cover Image Container with Badges & Dynamic Icons */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                <img
                  src={book.coverUrl || '/assets/nobi-author.png'}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> {book.genre}
                  </span>
                  {book.isBestseller && (
                    <span className="px-2.5 py-0.5 bg-amber-500 text-black text-[10px] font-mono font-bold uppercase rounded-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" /> Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-crimson transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  {book.subtitle && (
                    <p className="text-xs font-mono text-muted uppercase tracking-widest line-clamp-1">
                      {book.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-muted leading-relaxed font-sans line-clamp-3">
                    {book.shortDescription}
                  </p>
                </div>

                {/* Platform Streaming & Purchase Badges */}
                <div className="pt-2 border-t border-border/40 space-y-3">
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-muted">
                    {book.seriesName && (
                      <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800/80 rounded flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {book.seriesName}
                      </span>
                    )}
                    {book.releaseDate && (
                      <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800/80 rounded flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {book.releaseDate}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      href={`/books/${book.slug}`}
                      className="flex-1 py-2 px-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" /> Details
                    </Link>

                    {book.buyLinks?.amazon && (
                      <a
                        href={book.buyLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Amazon
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card/40 rounded-xl border border-border/40 space-y-4">
          <BookOpen className="w-12 h-12 text-muted mx-auto" />
          <h3 className="text-lg font-serif font-bold text-foreground">No novels found</h3>
          <p className="text-xs text-muted">
            Try resetting your search query or selecting a different genre.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGenre('all');
            }}
            className="px-4 py-2 bg-crimson text-white text-xs font-mono font-bold rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
