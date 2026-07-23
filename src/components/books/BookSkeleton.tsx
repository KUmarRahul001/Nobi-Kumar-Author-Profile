import * as React from 'react';

export default function BookSkeleton() {
  return (
    <div className="w-full bg-card/40 border border-border/60 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-neutral-800 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-neutral-800 rounded w-1/4" />
        <div className="h-4 bg-neutral-800 rounded w-3/4" />
        <div className="h-3 bg-neutral-800 rounded w-1/2" />
        <div className="h-10 bg-neutral-800 rounded w-full pt-4" />
      </div>
    </div>
  );
}
