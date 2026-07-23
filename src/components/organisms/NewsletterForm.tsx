'use client';

import * as React from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // POST requests submitted to sanitized subscribe API endpoint (Task 22.3)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to subscribe.');
      }

      if (resData.alreadySubscribed) {
        setMessage({
          type: 'success',
          text: 'You are already subscribed to our newsletter!',
        });
      } else {
        setMessage({
          type: 'success',
          text: 'Thank you! You have successfully subscribed to the newsletter.',
        });
      }
      setEmail('');
    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to subscribe. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-sm">
      <h3 className="text-xs font-mono uppercase tracking-widest text-crimson font-bold">
        Newsletter
      </h3>
      <p className="text-xs text-muted leading-relaxed font-sans">
        Subscribe to receive classified case file alerts and early chapters releases.
      </p>

      {message && (
        <div
          className={`p-3 rounded text-[10px] font-mono ${
            message.type === 'success'
              ? 'bg-green-800/10 text-green-400 border border-green-500/20'
              : 'bg-red-800/10 text-crimson border border-crimson/20'
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubscribe} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email Address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="flex-1 bg-neutral-900 border border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-crimson placeholder-neutral-600 focus:ring-2 focus:ring-crimson"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded text-[10px] font-mono uppercase font-semibold bg-crimson text-white hover:bg-red-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
        >
          {isSubmitting ? '...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
