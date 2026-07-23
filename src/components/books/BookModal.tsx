'use client';

import * as React from 'react';
import Image from 'next/image';
import { Book } from '@/types/book';
import {
  X,
  ExternalLink,
  Calendar,
  BookOpen,
  Globe,
  Award,
  ShieldAlert,
  FileText,
} from 'lucide-react';
import BookShare from './BookShare';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Trap focus and close on Escape (NFR-02 Accessibility)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const focusable = containerRef.current?.querySelectorAll(
        'input, select, textarea, button, a, [tabindex="0"]'
      );
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
  }, [onClose]);

  // Prevent scroll propagation on body when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
    >
      <div className="bg-card border border-border/80 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row my-8 max-h-[90vh]">
        {/* Close Button overlay */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-neutral-900/80 border border-border/60 text-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
          aria-label="Close detail modal"
        >
          <X size={20} />
        </button>

        {/* Cover Artwork Banner Frame */}
        <div className="w-full md:w-80 bg-neutral-950 aspect-[2/3] md:aspect-auto relative shrink-0">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={`High definition cover of ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-neutral-900 text-muted">
              <BookOpen size={48} className="text-crimson/40 mb-2" />
              <span className="text-xs font-serif font-bold text-foreground text-center">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Main Details Panel Layout scrollable */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <header className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-neutral-900 border border-border text-muted">
                  {book.genre}
                </span>
                {book.status === 'coming-soon' && (
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-amber-950/40 border border-amber-500/30 text-amber-400">
                    Coming Soon
                  </span>
                )}
              </div>
              <h2
                id="book-modal-title"
                className="text-2xl md:text-3xl font-serif font-black tracking-tight leading-tight text-foreground"
              >
                {book.title}
              </h2>
              {book.subtitle && (
                <p className="text-sm font-serif italic text-muted leading-relaxed">
                  {book.subtitle}
                </p>
              )}
            </header>

            {/* Structured Specifications Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-border/30 py-3 text-xs font-mono text-muted">
              {book.pages && (
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-500">
                    Pages
                  </span>
                  <span className="text-foreground font-bold">{book.pages}</span>
                </div>
              )}
              {book.readingTime && (
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-wider text-neutral-500">
                    Reading Time
                  </span>
                  <span className="text-foreground font-bold">{book.readingTime}</span>
                </div>
              )}
              <div className="space-y-0.5">
                <span className="block text-[8px] uppercase tracking-wider text-neutral-500">
                  Language
                </span>
                <span className="text-foreground font-bold">{book.language}</span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-[8px] uppercase tracking-wider text-neutral-500">
                  Release Date
                </span>
                <span className="text-foreground font-bold">{book.releaseDate}</span>
              </div>
            </div>

            {/* Synopsis Body Copy */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-crimson font-bold">
                Synopsis
              </h3>
              <p className="text-sm leading-relaxed text-muted font-sans whitespace-pre-wrap">
                {book.fullSynopsis || book.shortDescription}
              </p>
            </div>

            {/* Content Warning & Author Notes (optional) */}
            {book.contentWarning && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-xs flex items-start gap-2.5 text-crimson">
                <ShieldAlert size={16} className="shrink-0 pt-0.5" />
                <div className="space-y-0.5">
                  <span className="block font-bold font-mono text-[9px] uppercase tracking-wider">
                    Content Warning
                  </span>
                  <p className="text-muted leading-relaxed font-sans">{book.contentWarning}</p>
                </div>
              </div>
            )}

            {book.authorNotes && (
              <div className="space-y-1.5 p-4 rounded-lg bg-neutral-900/60 border border-border/40 text-xs">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-crimson font-bold">
                  Author Notes
                </span>
                <p className="text-muted leading-relaxed font-sans italic">"{book.authorNotes}"</p>
              </div>
            )}

            {/* Awards section if present */}
            {book.awards && book.awards.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-1.5">
                  <Award size={14} /> Awards & Recognitions
                </h3>
                <ul className="list-disc list-inside text-xs text-muted font-sans pl-1 space-y-1">
                  {book.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Social share widget & purchase anchors panel */}
          <div className="pt-4 border-t border-border/30 space-y-4">
            <BookShare title={book.title} slug={book.slug} />

            {/* Purchase Grid (Task 9.4) */}
            <div className="space-y-2">
              <span className="block text-[9px] font-mono text-muted uppercase tracking-wider">
                Retail Outlets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(book.buyLinks).map(([store, url]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={store}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 rounded text-[10px] font-mono uppercase font-bold tracking-widest border border-border bg-neutral-900 text-center hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-crimson"
                    >
                      {store} <ExternalLink size={10} />
                    </a>
                  );
                })}
                {book.samplePdfUrl && (
                  <a
                    href={book.samplePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded text-[10px] font-mono uppercase font-bold tracking-widest border border-crimson bg-crimson/10 text-crimson text-center hover:bg-crimson/25 transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-crimson"
                  >
                    Sample PDF <FileText size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
