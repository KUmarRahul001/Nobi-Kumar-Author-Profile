import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Nobi Kumar Author Portal',
  description:
    'Privacy policy and data protection transparency details for visitors of Nobi Kumar official website.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs items={[{ name: 'Privacy Policy', item: '/privacy' }]} />

        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-muted">Last Updated: August 3, 2026</p>
        </header>

        <div className="prose dark:prose-invert max-w-none text-sm text-muted leading-relaxed space-y-4 font-sans">
          <p>
            Welcome to the official author website of <strong>Nobi Kumar</strong> (
            <code>https://nobikumar.netlify.app</code>). Your privacy is important to us.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">1. Data Collection</h2>
          <p>
            We collect minimal analytics data via Google Analytics and Microsoft Clarity to
            understand page performance, reading behavior, and user engagement. If you subscribe to
            our newsletter, your email address is stored securely via Beehiiv.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">2. Cookies & Advertising</h2>
          <p>
            This website uses cookies for analytics and performance optimization. Non-intrusive
            banner advertisements are served via Adsterra on specific non-transactional pages. Book
            sales and purchase pages remain strictly ad-free.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">3. Affiliate Disclosure</h2>
          <p>
            Nobi Kumar participates in the Amazon Services LLC Associates Program. As an Amazon
            Associate, Nobi Kumar earns from qualifying purchases made through external affiliate
            links.
          </p>

          <h2 className="text-lg font-serif font-bold text-foreground">4. Contact Information</h2>
          <p>
            For any privacy inquiries or data requests, please contact:{' '}
            <a href="mailto:nobikumar.author@gmail.com" className="text-crimson underline">
              nobikumar.author@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
