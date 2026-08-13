import * as React from 'react';
import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';
import { AUTHOR_ENTITY } from '@/constants/author';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-border bg-card/30 transition-colors duration-300 py-16 px-4"
      role="contentinfo"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Beehiiv Newsletter Signup (Footer) */}
        <div className="space-y-4">
          <NewsletterSignup
            variant="inline"
            title={`The ${AUTHOR_ENTITY.name} Newsletter`}
            subtitle="Subscribe to receive classified case file alerts, early chapter previews, and thriller insights."
          />
        </div>

        {/* Dynamic Navigation Sitemaps and Copyright Claims */}
        <div className="flex flex-col space-y-6 md:items-end md:text-right">
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted">Navigation</h4>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-muted justify-start md:justify-end">
              <Link href="/reading-order" className="hover:text-crimson text-crimson font-bold">
                Start Reading
              </Link>
              <Link href="/books" className="hover:text-crimson">
                Novels
              </Link>
              <Link href="/newsletter" className="hover:text-crimson">
                Newsletter
              </Link>
              <Link href="/universe" className="hover:text-crimson">
                Universe Map
              </Link>
              <Link href="/blog" className="hover:text-crimson">
                Chronicles
              </Link>
              <Link href="/about" className="hover:text-crimson">
                About
              </Link>
              <Link href="/contact" className="hover:text-crimson">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-crimson">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-crimson">
                Terms
              </Link>
              <Link href="/editorial-policy" className="hover:text-crimson">
                Editorial
              </Link>
              <Link href="/press" className="hover:text-crimson">
                Press Kit
              </Link>
            </div>
          </div>

          {/* Social Channels Link Row (FR-10) */}
          <div className="flex items-center gap-4 justify-start md:justify-end text-muted">
            <a
              href={AUTHOR_ENTITY.sameAs.x}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-crimson transition-colors"
              aria-label={`Follow ${AUTHOR_ENTITY.name} on X`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={AUTHOR_ENTITY.sameAs.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-crimson transition-colors"
              aria-label={`Follow ${AUTHOR_ENTITY.name} on Instagram`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={AUTHOR_ENTITY.sameAs.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-crimson transition-colors"
              aria-label={`Subscribe to ${AUTHOR_ENTITY.name} on YouTube`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
          </div>

          {/* Ko-fi Support Block */}
          <div className="p-4 rounded-xl bg-card/60 border border-border/60 space-y-2 text-left md:text-right">
            <p className="text-xs font-mono text-foreground font-semibold">
              Enjoying my stories? Support my writing on Ko-fi.
            </p>
            <div>
              <a
                href={AUTHOR_ENTITY.sameAs.kofi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
                aria-label={`Support ${AUTHOR_ENTITY.name} on Ko-fi`}
              >
                <span>☕ Support on Ko-fi</span>
              </a>
            </div>
          </div>

          <div className="text-[10px] font-mono text-muted space-y-1">
            <p>
              © {currentYear} {AUTHOR_ENTITY.name}. All rights reserved.
            </p>
            <p>{AUTHOR_ENTITY.tagline}</p>
            <p className="text-[9px] opacity-70 pt-1">
              As an Amazon Associate, {AUTHOR_ENTITY.name} earns from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
