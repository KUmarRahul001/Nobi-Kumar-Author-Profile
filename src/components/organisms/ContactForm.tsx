'use client';

import * as React from 'react';

export default function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!name.trim() || !email.trim() || !body.trim()) {
      setMessage({ type: 'error', text: 'Name, email, and message details are required.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // POST requests submitted to sanitized API endpoint routing (Task 24.3)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          text: body,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to send message.');
      }

      setMessage({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully.',
      });
      setName('');
      setEmail('');
      setSubject('');
      setBody('');
    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text:
          err instanceof Error ? err.message : 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-xl p-6 rounded-lg border border-border bg-card"
    >
      <h2 className="text-sm font-mono text-crimson uppercase tracking-wider font-semibold">
        Send a Classified Message
      </h2>
      <p className="text-xs text-muted leading-relaxed font-sans">
        For interviews, inquiries, or case file updates, use the encrypted communication channel
        below.
      </p>

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
          <label htmlFor="contact-name" className="block text-xs font-mono text-muted">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-email" className="block text-xs font-mono text-muted">
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-subject" className="block text-xs font-mono text-muted">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-body" className="block text-xs font-mono text-muted">
          Message Body *
        </label>
        <textarea
          id="contact-body"
          required
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full bg-neutral-900 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2.5 rounded text-xs font-mono uppercase font-semibold bg-crimson text-white hover:bg-red-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-crimson"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
