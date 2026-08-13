import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://nobikumar.netlify.app';

export const metadata: Metadata = {
  title: 'Subscription Confirmed | Nobi Kumar Reader’s Club',
  description:
    'Your place in the Nobi Kumar archive is confirmed. Welcome to the official reader community.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${baseUrl}/newsletter/success`,
  },
};

export default function NewsletterSuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 space-y-8 text-center">
        <Breadcrumbs
          items={[
            { name: 'Home', item: '/' },
            { name: 'Newsletter', item: '/newsletter' },
            { name: 'Success', item: '/newsletter/success' },
          ]}
        />

        <div className="p-8 md:p-12 rounded-2xl bg-card/60 border border-border/60 shadow-xl space-y-6">
          <div className="w-16 h-16 bg-crimson/15 text-crimson rounded-full flex items-center justify-center mx-auto text-2xl font-mono border border-crimson/30">
            ✓
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
              ACCESS GRANTED
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-tight text-foreground">
              WELCOME TO THE NOBI KUMAR READER’S CLUB
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans pt-1">
              Your place in the archive is confirmed. You will receive exclusive case files, free
              sample chapters, behind-the-scenes notes, and early access to upcoming novels.
            </p>
          </div>

          <div className="w-16 h-0.5 bg-crimson mx-auto" />

          {/* Recommended Next Actions */}
          <div className="space-y-4 pt-4">
            <span className="text-xs font-mono uppercase tracking-widest text-foreground font-bold block">
              WHERE WOULD YOU LIKE TO GO NEXT?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <Link
                href="/books"
                className="p-4 rounded-xl bg-background border border-border/50 hover:border-crimson/50 transition-all space-y-2 group"
              >
                <span className="text-[10px] font-mono text-crimson uppercase font-bold block">
                  EXPLORE
                </span>
                <h2 className="text-sm font-serif font-bold text-foreground group-hover:text-crimson transition-colors">
                  Read the Books →
                </h2>
              </Link>

              <Link
                href="/universe"
                className="p-4 rounded-xl bg-background border border-border/50 hover:border-crimson/50 transition-all space-y-2 group"
              >
                <span className="text-[10px] font-mono text-crimson uppercase font-bold block">
                  MAP
                </span>
                <h2 className="text-sm font-serif font-bold text-foreground group-hover:text-crimson transition-colors">
                  Enter Universe →
                </h2>
              </Link>

              <Link
                href="/blog"
                className="p-4 rounded-xl bg-background border border-border/50 hover:border-crimson/50 transition-all space-y-2 group"
              >
                <span className="text-[10px] font-mono text-crimson uppercase font-bold block">
                  FILES
                </span>
                <h2 className="text-sm font-serif font-bold text-foreground group-hover:text-crimson transition-colors">
                  Read Chronicles →
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
