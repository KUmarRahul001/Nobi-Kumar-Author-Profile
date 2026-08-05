import type { Metadata } from 'next';
import NewsletterSignup from '@/components/organisms/NewsletterSignup';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://authornobikumar.netlify.app';

export const metadata: Metadata = {
  title: 'Join the Newsletter | Nobi Kumar Official',
  description:
    'Subscribe to the official Nobi Kumar newsletter for exclusive updates, free sample chapters, behind-the-scenes content, and early access to upcoming psychological thriller novels.',
  alternates: {
    canonical: `${baseUrl}/newsletter`,
  },
  openGraph: {
    title: 'Join the Nobi Kumar Newsletter',
    description:
      'Subscribe to the official Nobi Kumar newsletter for exclusive updates, free sample chapters, behind-the-scenes content, and early access to upcoming psychological thriller novels.',
    url: `${baseUrl}/newsletter`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/assets/nobi-author.png`,
        alt: 'Nobi Kumar Author Newsletter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Nobi Kumar Newsletter',
    description:
      'Get exclusive updates, free sample chapters, behind-the-scenes content, and early access to upcoming novels.',
    images: [`${baseUrl}/assets/nobi-author.png`],
  },
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <Breadcrumbs
          items={[
            { name: 'Home', item: '/' },
            { name: 'Newsletter', item: '/newsletter' },
          ]}
        />

        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
            Official Reader Community
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-foreground uppercase">
            Join the Nobi Kumar Newsletter
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
            Be the first to receive exclusive updates, secret case file releases, and early access
            to upcoming psychological thrillers.
          </p>
          <div className="w-16 h-0.5 bg-crimson mx-auto mt-2" />
        </div>

        {/* Exclusive Benefits List */}
        <div className="p-6 md:p-8 rounded-2xl bg-card/40 border border-border/60 shadow-lg space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-crimson">
            Be the first to receive:
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-foreground/90 font-sans">
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Exclusive updates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Free sample chapters
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Behind-the-scenes content
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Early access to upcoming novels
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> New release announcements
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Special reader-only content
            </li>
          </ul>
        </div>

        {/* Existing Newsletter Signup Form */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup
            variant="card"
            title="Claim Your VIP Reader Access"
            subtitle="Enter your primary email address below to join."
          />
        </div>

        {/* Privacy Promise Section */}
        <div className="max-w-2xl mx-auto text-center p-6 rounded-xl bg-card/20 border border-border/40 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
            Privacy Promise
          </h3>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Your email will only be used for author updates. No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
