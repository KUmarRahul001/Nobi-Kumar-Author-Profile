import * as React from 'react';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/db';
import BlogCommentSection from '@/components/organisms/BlogCommentSection';
import Breadcrumbs from '@/components/molecules/Breadcrumbs';
import NewsletterSignup from '@/components/organisms/NewsletterSignup';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const coverImage = post.coverUrl || '/assets/nobi-author.png';
  const description = post.excerpt ? post.excerpt.slice(0, 155) + '...' : '';

  return {
    title: `${post.title} | Nobi Kumar Chronicles`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: ['Nobi Kumar'],
      tags: post.tags,
      images: [{ url: coverImage, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft';

  // Structured JSON-LD Data for the Blog Post (FR-12, NFR-06)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Nobi Kumar',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 bg-background text-foreground transition-colors duration-300 py-16 px-4">
        <article className="max-w-2xl mx-auto space-y-8">
          {/* Navigation Breadcrumbs (Task 15.5) */}
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

          <header className="space-y-3 pb-6 border-b border-border">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-card text-muted border border-border">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <span>By Nobi Kumar</span>
              <span>•</span>
              <time dateTime={post.publishedAt || ''}>{formattedDate}</time>
            </div>
          </header>

          {/* Blog Post Content Body */}
          <div className="prose prose-invert max-w-none text-muted leading-relaxed font-sans text-sm sm:text-base whitespace-pre-wrap">
            {post.body}
          </div>

          {/* Continue Exploring Loop & Newsletter Signup */}
          <div className="pt-8 space-y-8 border-t border-border">
            <NewsletterSignup
              title="Enjoyed this Case File?"
              subtitle="Subscribe to receive new author case files, writing insights, and early chapter releases."
              variant="card"
            />

            <div className="p-6 rounded-2xl bg-card/40 border border-border/60 space-y-4 text-center">
              <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
                CONTINUE EXPLORING
              </span>
              <h3 className="text-xl font-serif font-black uppercase text-foreground">
                DISCOVER THE NOBI NARRATIVE UNIVERSE
              </h3>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <a
                  href="/books"
                  className="px-5 py-2.5 rounded-lg bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all"
                >
                  Explore Novels →
                </a>
                <a
                  href="/universe"
                  className="px-5 py-2.5 rounded-lg bg-background border border-border hover:border-crimson/50 text-foreground text-xs font-mono font-bold uppercase tracking-wider transition-all"
                >
                  Enter Universe Map →
                </a>
              </div>
            </div>
          </div>

          {/* Comments Section Component (FR-07) */}
          <Suspense
            fallback={<div className="text-xs font-mono text-muted py-8">Loading comments…</div>}
          >
            <BlogCommentSection postSlug={post.slug} />
          </Suspense>
        </article>
      </div>
    </>
  );
}
