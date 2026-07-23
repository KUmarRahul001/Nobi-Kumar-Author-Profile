import * as React from 'react';
import ContactForm from '@/components/organisms/ContactForm';

export default function ContactPage() {
  return (
    <div className="flex-1 bg-background text-foreground transition-colors duration-300 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono text-crimson uppercase tracking-widest">
            Inquiries
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Get In Touch</h1>
          <p className="text-sm text-muted font-sans leading-relaxed">
            Reach out to Nobi Kumar regarding booking details, media inquiries, or updates about the
            Verma Legacy chronicles.
          </p>
        </header>

        <div className="h-px w-24 bg-border mx-auto" />

        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
