'use client';

import * as React from 'react';
import { Book } from '@/types/book';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  onOpenDetails: (book: Book) => void;
}

export default function BookGrid({ books, onOpenDetails }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 p-8 border border-dashed border-border/80 rounded-2xl bg-card/20">
        <h3 className="text-sm font-mono text-crimson uppercase tracking-widest font-bold mb-2">
          No Lore Discovered
        </h3>
        <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
          No novels match your current filter parameters. Try adjusting your search query keyword
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard key={book.slug} book={book} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}
