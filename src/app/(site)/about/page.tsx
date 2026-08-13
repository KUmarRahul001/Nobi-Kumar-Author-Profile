import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import NewsletterSignup from '@/components/organisms/NewsletterSignup';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { AUTHOR_ENTITY } from '@/constants/author';

export const metadata: Metadata = {
  title: `About ${AUTHOR_ENTITY.name} | ${AUTHOR_ENTITY.title}`,
  description: AUTHOR_ENTITY.bio,
  openGraph: {
    title: `About ${AUTHOR_ENTITY.name} | Official Biography`,
    description: AUTHOR_ENTITY.bio,
    images: [{ url: AUTHOR_ENTITY.profileImage }],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        <Breadcrumbs items={[{ name: 'About Author', item: '/about' }]} />
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold">
            Author Biography & Journey
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight uppercase text-foreground">
            About {AUTHOR_ENTITY.name}
          </h1>
          <p className="text-xs sm:text-sm font-mono text-muted uppercase tracking-wider">
            {AUTHOR_ENTITY.title}
          </p>
          <div className="w-24 h-1 bg-crimson mx-auto" />
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-xl max-w-xs">
              <img
                src={AUTHOR_ENTITY.profileImage}
                alt={`${AUTHOR_ENTITY.name} Author Portrait`}
                className="w-full h-auto object-cover filter contrast-105"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-foreground/90 font-sans">
            <p className="text-base font-serif italic text-muted">
              "Every shadow leaves a story behind."
            </p>
            <p>{AUTHOR_ENTITY.bio}</p>
            <p>
              Writing under his official author name, {AUTHOR_ENTITY.name} crafts suspenseful
              fiction that blends dark campus mysteries, psychological twists, and deep emotional
              resonance.
            </p>
            <p>
              His work explores themes of guilt, trauma, surveillance, justice, and the unbearable
              weight of silence through the interconnected Verma Saga of the Nobi Narrative Universe
              (NNU).
            </p>
          </div>
        </div>

        {/* Support the Author Section */}
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
            you can support my writing directly on Ko-fi.
          </p>
          <div className="pt-2">
            <a
              href={AUTHOR_ENTITY.sameAs.kofi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson/90 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-105"
              aria-label={`Support ${AUTHOR_ENTITY.name} on Ko-fi`}
            >
              <span>☕ Support on Ko-fi</span>
            </a>
          </div>
        </section>

        {/* Beehiiv Newsletter Section */}
        <NewsletterSignup
          title={`Stay Inside The ${AUTHOR_ENTITY.tagline}`}
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
