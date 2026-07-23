'use client';

import * as React from 'react';
import { Book } from '@/lib/db';
import BookCard from '@/components/molecules/BookCard';

interface BookListContainerProps {
  initialBooks: Book[];
}

type FilterFormat = 'all' | 'kindle' | 'pocketfm';

export default function BookListContainer({ initialBooks }: BookListContainerProps) {
  const [activeFilter, setActiveFilter] = React.useState<FilterFormat>('all');

  const filteredBooks = React.useMemo(() => {
    if (activeFilter === 'all') return initialBooks;
    return initialBooks.filter((book) => book.format === activeFilter);
  }, [initialBooks, activeFilter]);

  return (
    <div className="space-y-8">
      {/* Format Filter Badges Controls (Task 8.4) */}
      <div className="flex justify-center gap-3">
        {(['all', 'kindle', 'pocketfm'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-crimson focus:ring-offset-2 focus:ring-offset-background ${
              activeFilter === filter
                ? 'bg-crimson text-white border border-transparent'
                : 'border border-border text-muted hover:text-foreground hover:bg-neutral-800'
            }`}
          >
            {filter === 'all'
              ? 'All Formats'
              : filter === 'kindle'
                ? 'Kindle Edition'
                : 'Pocket FM Audio'}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted font-mono text-xs border border-dashed border-border rounded-lg">
          No novels found matching the selected format.
        </div>
      )}
    </div>
  );
}
