'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';

interface SampleReaderProps {
  bookTitle: string;
  bookSlug: string;
  excerpt: string;
}

export default function SampleReader({ bookTitle, bookSlug, excerpt }: SampleReaderProps) {
  const [fontSize, setFontSize] = React.useState<number>(18); // default comfortable 18px font
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);
  const readerRef = React.useRef<HTMLDivElement>(null);

  // Calculate reading progress as a percentage of scroll length
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const wordCount = excerpt.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // ~200 WPM

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 26));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 14));

  return (
    <article className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col font-sans">
      {/* Distraction-free header with controls */}
      <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 py-4 flex items-center justify-between">
        <Link
          href={`/books/${bookSlug}`}
          className="flex items-center gap-2 text-xs font-mono text-muted hover:text-crimson transition-colors"
          aria-label={`Return to ${bookTitle} details`}
        >
          <ArrowLeft size={16} />
          <span>Exit Reader</span>
        </Link>

        <div className="text-center hidden sm:block">
          <h1 className="text-sm font-serif font-bold text-foreground">{bookTitle}</h1>
          <p className="text-[10px] font-mono text-muted">
            Sample Chapter • {readingTime} min read
          </p>
        </div>

        {/* Readability Adjustment Controls */}
        <div className="flex items-center gap-3" aria-label="Reading Controls">
          <button
            onClick={decreaseFont}
            disabled={fontSize <= 14}
            className="p-2 rounded border border-border bg-card text-muted hover:text-foreground disabled:opacity-50 transition-colors"
            title="Decrease Text Size"
            aria-label="Decrease Text Size"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-mono w-8 text-center" aria-live="polite">
            {fontSize}px
          </span>
          <button
            onClick={increaseFont}
            disabled={fontSize >= 26}
            className="p-2 rounded border border-border bg-card text-muted hover:text-foreground disabled:opacity-50 transition-colors"
            title="Increase Text Size"
            aria-label="Increase Text Size"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </header>

      {/* Reading Progress Indicator Bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 bg-border sticky top-[57px] z-10 w-full"
      >
        <div
          className="h-full bg-crimson transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Body Container - Comfortable Width and Spacing */}
      <div className="flex-1 w-full max-w-2xl mx-auto py-12 px-6 flex flex-col justify-between">
        <div
          ref={readerRef}
          className="prose prose-invert max-w-none space-y-6"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          <p className="font-serif leading-relaxed text-foreground whitespace-pre-wrap">
            {excerpt}
          </p>
        </div>

        <footer className="pt-16 border-t border-border mt-16 text-center space-y-6">
          <p className="text-sm text-muted italic font-sans max-w-md mx-auto">
            You have finished the sample preview of &ldquo;{bookTitle}&rdquo;. Discover the rest of
            the mystery.
          </p>
          <Link
            href={`/books/${bookSlug}`}
            className="inline-block px-6 py-3 rounded text-xs font-mono uppercase font-semibold bg-crimson text-white hover:bg-red-700 transition-colors"
          >
            Go back to buy novel
          </Link>
        </footer>
      </div>
    </article>
  );
}
