/**
 * src/app/layout.tsx — ROOT layout
 * Bare shell only: HTML, fonts, providers.
 * Navbar/Footer live in (site)/layout.tsx.
 * Admin has its own layout at admin/(protected)/layout.tsx.
 */
import * as React from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Geist } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Nobi Kumar | Official Author Website',
  description: 'Explore the psychological thriller, mystery, and horror novels of Nobi Kumar.',
  keywords: [
    'Nobi Kumar',
    'Author Website',
    'Psychological Thriller',
    'Mystery Novels',
    'Verma Legacy',
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleVerificationToken = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning className={cn(playfair.variable, geist.variable)}>
      <head>
        {googleVerificationToken && (
          <meta name="google-site-verification" content={googleVerificationToken} />
        )}
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-300">
        <Providers>{children}</Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  );
}
