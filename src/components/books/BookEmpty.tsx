import * as React from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';

interface BookEmptyProps {
  onClearFilters?: () => void;
}

export default function BookEmpty({ onClearFilters }: BookEmptyProps) {
  return (
    <div className="text-center py-20 p-8 border border-dashed border-border/80 rounded-2xl bg-card/20 space-y-4 max-w-lg mx-auto">
      <div className="mx-auto w-12 h-12 rounded-full bg-neutral-900 border border-border flex items-center justify-center text-crimson">
        <BookOpen size={24} />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-serif font-bold text-foreground">No Book Archives Found</h3>
        <p className="text-xs text-muted leading-relaxed font-sans max-w-sm mx-auto">
          We couldn't locate any records matching your search queries or category filters. Try
          resetting your configuration.
        </p>
      </div>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 rounded text-[10px] font-mono uppercase font-bold tracking-widest bg-crimson text-white hover:bg-red-700 transition-colors focus:outline-none"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}
