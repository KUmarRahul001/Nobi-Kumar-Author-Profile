import type { Metadata } from 'next';
import NewsletterSignup from '@/components/organisms/NewsletterSignup';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import JsonLd from '@/components/atoms/JsonLd';
import Link from 'next/link';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://authornobikumar.netlify.app';

export const metadata: Metadata = {
  title: 'Join the Newsletter | Nobi Kumar Official',
  description:
    'Subscribe to the official Nobi Kumar newsletter for exclusive updates, free sample chapters, behind-the-scenes content, character dossiers, and early access to upcoming psychological thriller novels.',
  alternates: {
    canonical: `${baseUrl}/newsletter`,
  },
  openGraph: {
    title: 'Join the Nobi Kumar Newsletter',
    description:
      'Subscribe to the official Nobi Kumar newsletter for exclusive updates, free sample chapters, behind-the-scenes content, character dossiers, and early access to upcoming psychological thriller novels.',
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
      'Get early access to new psychological thrillers, free sample chapters, character dossiers, and deleted scenes.',
    images: [`${baseUrl}/assets/nobi-author.png`],
  },
};

export default function NewsletterPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/newsletter#webpage`,
        url: `${baseUrl}/newsletter`,
        name: 'Join the Nobi Kumar Newsletter',
        description:
          'Official newsletter subscription page for psychological thriller author Nobi Kumar.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          name: 'Nobi Kumar Official Website',
          url: baseUrl,
        },
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#author`,
        name: 'Nobi Kumar',
        jobTitle: 'Author & Storyteller',
        description: 'Author of psychological thrillers, mysteries, and dark suspense novels.',
        url: baseUrl,
        image: `${baseUrl}/assets/nobi-author.png`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans py-10 md:py-16">
      <JsonLd data={structuredData} />
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <Breadcrumbs
          items={[
            { name: 'Home', item: '/' },
            { name: 'Newsletter', item: '/newsletter' },
          ]}
        />

        {/* Page Title Header */}
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

        {/* Author Photo & Bio Block */}
        <div className="p-6 md:p-8 rounded-2xl bg-card/60 border border-border/60 shadow-xl flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-crimson shadow-md flex-shrink-0">
            <img
              src="/assets/nobi-author.png"
              alt="Nobi Kumar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-lg font-serif font-bold text-foreground">
              Hi, I&apos;m Nobi Kumar.
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
              I write psychological thrillers, mysteries, and stories that stay with you long after
              the last page. Join fellow readers and never miss a new release.
            </p>
          </div>
        </div>

        {/* Author-Specific Benefits List */}
        <div className="p-6 md:p-8 rounded-2xl bg-card/40 border border-border/60 shadow-lg space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-crimson">
            Subscriber Benefits Include:
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-foreground/90 font-sans">
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Early access to new psychological
              thrillers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Free sample chapters
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Character dossiers & case files
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Exclusive deleted scenes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Writing progress & behind-the-scenes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Cover reveals & ARC opportunities
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Subscriber-only giveaways
            </li>
            <li className="flex items-center gap-2">
              <span className="text-crimson font-bold">✓</span> Reader Q&A sessions
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Form */}
        <div className="max-w-2xl mx-auto space-y-3">
          <NewsletterSignup
            variant="card"
            title="Claim Your VIP Reader Access"
            subtitle="Enter your primary email address below to join."
          />
          {/* Social Proof */}
          <p className="text-center text-xs font-mono text-muted">
            👥 Join fellow readers and never miss a new release.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-card/40 border border-border/60 shadow-lg space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold">
              Sneak Peek
            </span>
            <h2 className="text-xl font-serif font-black uppercase text-foreground">Coming Soon</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-foreground/90 font-sans">
            <li className="p-3 rounded-xl bg-background border border-border/50 flex justify-between items-center">
              <div>
                <span className="font-bold text-foreground block">The Watchers (NNU Series)</span>
                <span className="text-xs text-muted">Psychological Thriller Novel</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-crimson/10 text-crimson font-bold border border-crimson/20">
                In Progress
              </span>
            </li>
            <li className="p-3 rounded-xl bg-background border border-border/50 flex justify-between items-center">
              <div>
                <span className="font-bold text-foreground block">The Verma Saga</span>
                <span className="text-xs text-muted">Mystery & Crime Thriller</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-crimson/10 text-crimson font-bold border border-crimson/20">
                Upcoming
              </span>
            </li>
          </ul>
          <div className="text-center pt-2">
            <Link
              href="/universe"
              className="text-xs font-mono text-crimson hover:underline font-semibold"
            >
              Explore the Nobi Kumar Universe Map →
            </Link>
          </div>
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
