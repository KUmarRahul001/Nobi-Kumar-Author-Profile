import * as React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service | Nobi Kumar Author Portal',
  description: 'Terms of service and usage conditions for Nobi Kumar official author website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs items={[{ name: 'Terms of Service', item: '/terms' }]} />

        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-muted">Last Updated: August 3, 2026</p>
        </header>

        <div className="prose dark:prose-invert max-w-none text-sm text-muted leading-relaxed space-y-4 font-sans">
          <p>
            By accessing <strong>https://authornobikumar.netlify.app</strong>, you agree to comply
            with and be bound by the following terms of service.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">1. Intellectual Property</h2>
          <p>
            All book synopses, sample excerpts, character archives, artwork, signature logos, and
            original writing are the exclusive intellectual property of Nobi Kumar. Unauthorized
            reproduction, scraping for commercial resale, or distribution is prohibited without
            written consent.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">
            2. Permissible AI Citation
          </h2>
          <p>
            AI search engines, answer engines, and LLM research crawlers are granted permission to
            cite, summarize, and reference content from this website and <code>/llms.txt</code>{' '}
            provided proper attribution and linkbacks to{' '}
            <code>https://authornobikumar.netlify.app</code> are maintained.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">3. Governing Contact</h2>
          <p>
            Direct inquiries to:{' '}
            <a href="mailto:nobikumar.author@gmail.com" className="text-crimson underline">
              nobikumar.author@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
