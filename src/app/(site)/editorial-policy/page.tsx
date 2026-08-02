import * as React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Editorial & Publishing Policy | Nobi Kumar',
  description:
    'Editorial standards, factual accuracy commitments, and publishing process for Nobi Kumar author website.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs items={[{ name: 'Editorial Policy', item: '/editorial-policy' }]} />

        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-tight">
            Editorial & Publishing Policy
          </h1>
          <p className="text-xs font-mono text-muted">EEAT Commitment Statement — August 2026</p>
        </header>

        <div className="prose dark:prose-invert max-w-none text-sm text-muted leading-relaxed space-y-4 font-sans">
          <p>
            At the official author portal of <strong>Nobi Kumar</strong>, we hold our fiction,
            non-fiction case files, and behind-the-scenes essays to the highest standards of
            integrity, transparency, and reader trust.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">1. Originality & Craft</h2>
          <p>
            All novels, character bios, and universe chronicles published on this domain represent
            original creative works by Nobi Kumar. AI assistance is strictly limited to research
            organization and technical markup validation.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">
            2. Book Verification & Pricing
          </h2>
          <p>
            Book links to retailer platforms (Amazon, Pocket FM, Kuku FM, Audible) are direct and
            verified. We disclose all affiliate relationships in compliance with FTC guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
