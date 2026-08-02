import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Author Press Kit & Media Assets | Nobi Kumar',
  description:
    'Official media kit, high-resolution author portraits, book cover assets, press release bios, and interview guidelines for author Nobi Kumar.',
};

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <Breadcrumbs items={[{ name: 'Press & Media Kit', item: '/press' }]} />

        <header className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold">
            Media & Press Resources
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight">
            Author Press Kit
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Official assets, downloadable high-res author portraits, book cover graphics, short &
            long bios, and media contact details for journalists, reviewers, and podcasters.
          </p>
          <div className="w-20 h-1 bg-crimson mx-auto" />
        </header>

        {/* Short Bio Block */}
        <section className="p-6 border border-border/60 rounded-xl bg-card/40 space-y-3">
          <h2 className="text-lg font-serif font-bold text-foreground uppercase">
            Short Bio (50 Words)
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed italic">
            "Nobi Kumar is an Indian author who writes psychological thrillers, dark campus
            mysteries, and interconnected thriller fiction. He is the creator of the Nobi Narrative
            Universe (NNU) and the acclaimed Verma Legacy series. His novels explore themes of
            memory distortion, guilt, and justice."
          </p>
        </section>

        {/* Medium Bio Block */}
        <section className="p-6 border border-border/60 rounded-xl bg-card/40 space-y-3">
          <h2 className="text-lg font-serif font-bold text-foreground uppercase">
            Standard Bio (150 Words)
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Nobi Kumar is a storyteller driven by a deep passion for weaving suspense, emotion, and
            imagination into unforgettable psychological thrillers. Writing under his pen name, he
            creates novels that blend gripping plots with powerful human experiences, leaving
            readers both haunted and inspired. His works explore themes of guilt, trauma,
            surveillance, and family secrets through the interconnected Verma Saga of the Nobi
            Narrative Universe (NNU). When he isn’t writing, Nobi spends his time exploring ideas
            and shaping them into stories that stay with readers long after the last page.
          </p>
        </section>

        {/* Media Assets Downloads */}
        <section className="p-6 border border-border/60 rounded-xl bg-card/40 space-y-4">
          <h2 className="text-lg font-serif font-bold text-foreground uppercase">
            Official Assets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-border/40 rounded-lg bg-background space-y-2">
              <span className="text-xs font-mono font-bold text-foreground block">
                Author Portrait (High-Res)
              </span>
              <p className="text-[11px] text-muted">Official press photo of Nobi Kumar.</p>
              <a
                href="/assets/nobi-author.png"
                download
                className="inline-block text-xs font-mono font-bold text-crimson hover:underline"
              >
                DOWNLOAD PORTRAIT ↓
              </a>
            </div>
            <div className="p-4 border border-border/40 rounded-lg bg-background space-y-2">
              <span className="text-xs font-mono font-bold text-foreground block">
                Signature Logo (Vector/PNG)
              </span>
              <p className="text-[11px] text-muted">
                Transparent official author signature brand logo.
              </p>
              <a
                href="/assets/nobi-signature.png"
                download
                className="inline-block text-xs font-mono font-bold text-crimson hover:underline"
              >
                DOWNLOAD LOGO ↓
              </a>
            </div>
          </div>
        </section>

        {/* Press Contact Block */}
        <section className="p-8 rounded-2xl bg-card/60 border border-border/60 text-center space-y-4">
          <h2 className="text-xl font-serif font-bold text-foreground uppercase">
            Media & Interview Requests
          </h2>
          <p className="text-xs text-muted max-w-lg mx-auto leading-relaxed">
            For podcast bookings, literary interviews, review copy requests, or translation rights:
          </p>
          <a
            href="mailto:nobikumar.author@gmail.com"
            className="inline-block px-6 py-3 bg-crimson hover:bg-crimson/90 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
          >
            CONTACT MEDIA TEAM →
          </a>
        </section>
      </div>
    </div>
  );
}
