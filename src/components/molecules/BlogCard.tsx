import * as React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/db';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft';

  return (
    <article className="group bg-card rounded-lg overflow-hidden border border-border p-6 transition-all duration-300 hover:border-crimson hover:shadow-lg flex flex-col space-y-4">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-neutral-800 text-muted">
            {post.category}
          </span>
          <time className="text-[10px] font-mono text-muted" dateTime={post.publishedAt || ''}>
            {formattedDate}
          </time>
        </div>
        <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-crimson transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
      </header>

      <p className="text-sm text-muted font-sans line-clamp-3 leading-relaxed flex-1">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono bg-neutral-900 text-muted px-2 py-0.5 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-border/40 flex justify-between items-center">
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-mono text-foreground font-semibold hover:text-crimson transition-colors"
        >
          Read Article →
        </Link>
      </div>
    </article>
  );
}
