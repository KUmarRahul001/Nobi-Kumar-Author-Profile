'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, X, Book, FileText, User } from 'lucide-react';
import { SearchItem } from '@/lib/search';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = React.useState('');
  const [searchItems, setSearchItems] = React.useState<SearchItem[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Fetch consolidated search index on open
  React.useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);

      const fetchSearchIndex = async () => {
        try {
          const response = await fetch('/api/search');
          if (response.ok) {
            const data = await response.json();
            setSearchItems(data);
          }
        } catch {
          // Fallback gracefully on fetch error
        }
      };

      fetchSearchIndex();
    }
  }, [isOpen]);

  // Trap focus & ESC close (NFR-02 Accessibility)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const focusable = containerRef.current?.querySelectorAll('input, [role="option"], button');
      if (!focusable) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search filter matching algorithms (Case insensitive)
  const filteredResults = query.trim()
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const resultsCount = filteredResults.length;
  const hasQuery = query.trim().length > 0;

  // Keyboard navigation inside result items
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (resultsCount === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % resultsCount);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + resultsCount) % resultsCount);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault();
        const items = containerRef.current?.querySelectorAll('[role="option"]');
        if (items && items[activeIndex]) {
          (items[activeIndex] as HTMLElement).click();
        }
      }
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <Book size={16} className="text-crimson shrink-0" />;
      case 'post':
        return <FileText size={16} className="text-purple-400 shrink-0" />;
      default:
        return <User size={16} className="text-crimson shrink-0" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex justify-center pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div className="w-full max-w-xl flex flex-col space-y-4">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <Search className="text-muted" size={20} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleListKeyDown}
            placeholder="Search novels, chronicles, and lore..."
            className="flex-1 bg-transparent text-foreground placeholder-neutral-600 focus:outline-none text-base font-sans"
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-muted hover:text-foreground transition-colors"
            aria-label="Close search overlay"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results Drawer */}
        <div
          id="search-results-list"
          role="listbox"
          aria-label="Search Results"
          className="flex-1 overflow-y-auto max-h-[400px] space-y-2 pr-2"
        >
          {hasQuery ? (
            resultsCount > 0 ? (
              filteredResults.map((item, idx) => {
                const isFocused = idx === activeIndex;
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={onClose}
                    role="option"
                    aria-selected={isFocused}
                    className={`flex items-center gap-3 p-3 rounded transition-colors text-left border block ${
                      isFocused
                        ? 'bg-crimson/10 border-crimson text-foreground'
                        : 'bg-card border-border text-muted hover:text-foreground'
                    }`}
                  >
                    {getItemIcon(item.type)}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-serif font-bold text-foreground">
                          {item.title}
                        </span>
                        <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-muted">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted line-clamp-1">{item.excerpt}</span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-xs font-mono text-muted text-center py-8">
                No matching secrets found.
              </p>
            )
          ) : (
            <p className="text-xs font-mono text-neutral-600 text-center py-8">
              Type to search novels, files, and annotations.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
