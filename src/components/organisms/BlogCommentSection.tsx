'use client';

import * as React from 'react';
import Image from 'next/image';

interface Comment {
  id: string;
  name: string;
  email_hash?: string;
  body: string;
  created_at: string;
}

interface BlogCommentSectionProps {
  postSlug: string;
}

export default function BlogCommentSection({ postSlug }: BlogCommentSectionProps) {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [body, setBody] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Fetch approved comments on load (Task 18.2: Dynamic Comments Loader GET API)
  React.useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postSlug=${encodeURIComponent(postSlug)}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data as Comment[]);
        }
      } catch {
        // Fallback gracefully on fetch error
      }
    };

    fetchComments();
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!name.trim() || !body.trim() || !email.trim()) {
      setMessage({ type: 'error', text: 'All fields are required.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // POST requests submitted to sanitized comments API endpoint (Task 18.3)
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          text: body,
          postSlug,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit comment.');
      }

      setMessage({
        type: 'success',
        text: 'Thank you! Your comment has been submitted and is awaiting moderation.',
      });
      setName('');
      setEmail('');
      setBody('');
    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text:
          err instanceof Error ? err.message : 'Failed to submit comment. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="space-y-8 pt-8 border-t border-border"
      aria-labelledby="comments-section-title"
    >
      <h2 id="comments-section-title" className="text-xl font-serif font-bold text-foreground">
        Comments ({comments.length})
      </h2>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-4" role="feed" aria-busy={isSubmitting}>
          {comments.map((comment) => {
            const gravatarUrl = comment.email_hash
              ? `https://www.gravatar.com/avatar/${comment.email_hash}?d=identicon&s=80`
              : null;

            return (
              <article
                key={comment.id}
                className="p-4 rounded-lg bg-card border border-border flex items-start gap-4"
              >
                {/* Gravatar Profile Images Dynamic Fallbacks (Task 18.5) */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-border flex-shrink-0">
                  {gravatarUrl ? (
                    <Image
                      src={gravatarUrl}
                      alt={`${comment.name}'s avatar`}
                      width={40}
                      height={40}
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted">
                      {comment.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <footer className="flex items-center justify-between text-xs font-mono text-muted">
                    <span className="font-bold text-foreground">{comment.name}</span>
                    <time dateTime={comment.created_at}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </time>
                  </footer>
                  <p className="text-sm leading-relaxed text-muted font-sans whitespace-pre-wrap">
                    {comment.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-muted font-mono italic">
          No comments approved yet. Be the first to share your thoughts.
        </p>
      )}

      {/* Comments Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 rounded-lg border border-border bg-card max-w-xl"
      >
        <h3 className="text-sm font-mono text-crimson uppercase tracking-wider font-semibold">
          Leave a Comment
        </h3>

        {message && (
          <div
            className={`p-3 rounded text-xs font-mono ${
              message.type === 'success'
                ? 'bg-green-800/10 text-green-400 border border-green-500/20'
                : 'bg-red-800/10 text-crimson border border-crimson/20'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="comment-name" className="block text-xs font-mono text-muted">
              Display Name *
            </label>
            <input
              id="comment-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="comment-email" className="block text-xs font-mono text-muted">
              Email * (Not public, used for Gravatar avatar)
            </label>
            <input
              id="comment-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="comment-body" className="block text-xs font-mono text-muted">
            Comment *
          </label>
          <textarea
            id="comment-body"
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2.5 rounded text-xs font-mono uppercase font-semibold bg-crimson text-white hover:bg-red-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </section>
  );
}
