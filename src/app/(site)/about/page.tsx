import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterSignup from '@/components/organisms/NewsletterSignup';

export const metadata: Metadata = {
  title: 'About Nobi Kumar | Author & Storyteller',
  description:
    'Learn about Nobi Kumar, author of dark Indian psychological thrillers, campus mysteries, and the Verma Saga of the Nobi Narrative Universe.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold">
            Author Biography & Journey
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight uppercase text-foreground">
            About Nobi Kumar
          </h1>
          <div className="w-24 h-1 bg-crimson mx-auto" />
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-xl max-w-xs">
              <img
                src="/assets/nobi-author.png"
                alt="Nobi Kumar Author Portrait"
                className="w-full h-auto object-cover filter contrast-105"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-foreground/90 font-sans">
            <p className="text-base font-serif italic text-muted">
              "Every shadow leaves a story behind."
            </p>
            <p>
              Writing under his pen name, Nobi Kumar creates novels that blend gripping
              psychological plots with powerful human experiences, leaving readers both haunted and
              inspired.
            </p>
            <p>
              When he isn’t writing, Nobi spends his time exploring ideas, observing life’s hidden
              details, and shaping them into stories that stay with readers long after the last
              page. His mission is simple—one story at a time, to spark curiosity and connect with
              hearts across the world.
            </p>
            <p>
              His work explores themes of guilt, trauma, surveillance, justice, and the unbearable
              weight of silence through the interconnected Verma Saga of the Nobi Narrative Universe
              (NNU).
            </p>
          </div>
        </div>

        {/* Support the Author Section (Requirement 3) */}
        <section className="p-8 md:p-10 rounded-2xl bg-card/60 border border-border/60 shadow-xl text-center space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
              Independent Author Support
            </span>
            <h2 className="text-2xl font-serif font-bold text-foreground uppercase">
              Support the Author
            </h2>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed font-sans max-w-lg mx-auto">
            If you've enjoyed my psychological thrillers and want to help me create more stories,
            you can support my writing on Ko-fi.
          </p>
          <div className="pt-2">
            <a
              href={process.env.NEXT_PUBLIC_KOFI_URL || 'https://ko-fi.com/nobikumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson/90 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-105"
              aria-label="Support Nobi Kumar on Ko-fi"
            >
              <span>☕ Support on Ko-fi</span>
            </a>
          </div>
        </section>

        {/* Beehiiv Newsletter Section */}
        <NewsletterSignup
          title="Stay Inside The Nobi Narrative Universe"
          subtitle="Subscribe to receive exclusive author updates, early release announcements, and behind-the-scenes case files."
          variant="card"
          className="max-w-2xl mx-auto"
        />

        {/* Back Links */}
        <div className="text-center pt-4">
          <Link
            href="/books"
            className="text-xs font-mono uppercase tracking-widest text-muted hover:text-crimson transition-colors"
          >
            ← Explore Published Novels
          </Link>
        </div>
      </div>
    </div>
  );
}
