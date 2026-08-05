'use client';

import * as React from 'react';
import { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  variant?: 'card' | 'inline' | 'hero';
  className?: string;
}

export default function NewsletterSignup({
  title = 'Join The Nobi Kumar Chronicles',
  subtitle = 'Receive classified case file alerts, early chapter previews, and dark psychological thriller insights directly to your inbox.',
  variant = 'card',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe.');
      }

      setMessage({
        type: 'success',
        text:
          data.message ||
          "Thanks for subscribing!\nYou'll receive exclusive updates, free chapters, behind-the-scenes content, and early access to upcoming books.",
      });
      setEmail('');

      // Track Subscription Events in GA4 and GTM
      try {
        sendGAEvent('event', 'newsletter_signup', {
          method: 'beehiiv',
          location: variant,
        });

        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'newsletter_signup',
            publication_id: 'pub_f065d229-fd93-42da-8257-d761649484cd',
            location: variant,
          });
        }
      } catch {}
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err?.message || 'Failed to subscribe. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <div className={`space-y-3 ${className}`}>
        <h4 className="text-xs font-mono uppercase tracking-widest text-crimson font-bold">
          {title}
        </h4>
        <p className="text-xs text-muted leading-relaxed font-sans">{subtitle}</p>

        {message && (
          <div
            className={`p-3 rounded text-[10px] font-mono ${
              message.type === 'success'
                ? 'bg-green-950/60 text-green-400 border border-green-700/40'
                : 'bg-red-950/60 text-crimson border border-crimson/40'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col xs:flex-row sm:flex-row gap-2 w-full"
        >
          <label htmlFor="newsletter-email-inline" className="sr-only">
            Email Address
          </label>
          <input
            id="newsletter-email-inline"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 w-full min-w-0 bg-card/60 border border-border/80 rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-crimson placeholder:text-muted/60 focus:ring-1 focus:ring-crimson transition-all"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full xs:w-auto sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono uppercase font-bold bg-crimson hover:bg-crimson/90 text-white disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-crimson shadow-md whitespace-nowrap"
          >
            {isSubmitting ? '...' : 'Subscribe'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <section
      className={`p-8 md:p-10 rounded-2xl bg-card/60 border border-border/60 shadow-xl space-y-6 ${className}`}
    >
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <span className="text-xs font-mono text-crimson uppercase tracking-widest font-bold block">
          Official Newsletter · Beehiiv
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-foreground uppercase">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">{subtitle}</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-mono text-center max-w-md mx-auto ${
            message.type === 'success'
              ? 'bg-green-950/60 text-green-400 border border-green-700/40'
              : 'bg-red-950/60 text-crimson border border-crimson/40'
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <label htmlFor="newsletter-email-card" className="sr-only">
          Email Address
        </label>
        <input
          id="newsletter-email-card"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:border-crimson placeholder:text-muted/60 focus:ring-1 focus:ring-crimson transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-mono uppercase font-bold bg-crimson hover:bg-crimson/90 text-white disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-crimson shadow-lg hover:scale-105"
        >
          {isSubmitting ? 'Joining…' : 'Subscribe Free'}
        </button>
      </form>

      <p className="text-[10px] font-mono text-muted/70 text-center">
        🔒 Zero spam. Unsubscribe at any time. Powered by Beehiiv.
      </p>
    </section>
  );
}
