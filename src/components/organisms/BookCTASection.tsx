import * as React from 'react';
import Link from 'next/link';

interface BookCTASectionProps {
  className?: string;
  bookTitle?: string;
  amazonReviewUrl?: string;
}

export default function BookCTASection({
  className = '',
  bookTitle,
  amazonReviewUrl,
}: BookCTASectionProps) {
  return (
    <section
      id="newsletter"
      className={`p-8 md:p-10 rounded-2xl bg-card/60 border border-border/60 shadow-xl space-y-8 ${className}`}
    >
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
          Reader Community
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-foreground uppercase">
          Want More?
        </h3>
        <div className="w-12 h-0.5 bg-crimson mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Join Newsletter CTA */}
        <div className="p-6 rounded-xl bg-background border border-border/60 flex flex-col justify-between space-y-4 text-center sm:text-left">
          <div className="space-y-2">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-crimson">
              Join the Newsletter
            </h4>
            <p className="text-xs text-muted leading-relaxed font-sans">
              Every month I share exclusive chapters, writing updates, behind-the-scenes notes, and
              previews of upcoming novels.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono uppercase font-bold bg-crimson text-white hover:bg-crimson/90 transition-all shadow"
            >
              <span>Join</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Leave a Review CTA */}
        <div className="p-6 rounded-xl bg-background border border-border/60 flex flex-col justify-between space-y-4 text-center sm:text-left">
          <div className="space-y-2">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-crimson">
              Leave a Review
            </h4>
            <p className="text-xs text-muted leading-relaxed font-sans">
              Your review helps other readers discover my stories
              {bookTitle ? ` and support ${bookTitle}` : ''}.
            </p>
          </div>
          <div className="pt-2">
            <a
              href={amazonReviewUrl || 'https://www.amazon.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg text-xs font-mono uppercase font-bold bg-foreground text-background hover:bg-foreground/90 transition-all shadow"
            >
              Write a Review
            </a>
          </div>
        </div>

        {/* Share with a Friend CTA */}
        <div className="p-6 rounded-xl bg-background border border-border/60 flex flex-col justify-between space-y-4 text-center sm:text-left">
          <div className="space-y-2">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-crimson">
              Share with a Friend
            </h4>
            <p className="text-xs text-muted leading-relaxed font-sans">
              If you enjoyed the book, recommend it to someone who loves psychological thrillers.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/books"
              className="inline-block px-4 py-2 rounded-lg text-xs font-mono uppercase font-bold border border-border hover:bg-card transition-all text-foreground"
            >
              Share Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
