import * as React from 'react';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/db';
import BlogCommentSection from '@/components/organisms/BlogCommentSection';
import Breadcrumbs from '@/components/molecules/Breadcrumbs';

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

  return {
    title: `${post.title} | Nobi Kumar Chronicles`,
    description: post.excerpt.slice(0, 155) + '...',
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 155),
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: ['Nobi Kumar'],
      tags: post.tags,
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
