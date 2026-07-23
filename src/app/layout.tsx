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

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(playfair.variable, geist.variable)}>
      <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
