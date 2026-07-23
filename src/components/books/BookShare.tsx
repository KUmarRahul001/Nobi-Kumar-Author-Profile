'use client';

import * as React from 'react';
import { Share2, Link, Twitter, Send, Mail } from 'lucide-react';

interface BookShareProps {
  title: string;
  slug: string;
}

export default function BookShare({ title, slug }: BookShareProps) {
  const [copied, setCopied] = React.useState(false);

  // Resolve absolute path link URL safely on browser mount
  const shareUrl = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/books/${slug}`;
    }
    return '';
  }, [slug]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out Nobi Kumar's novel: ${title}`,
          url: shareUrl,
        });
      } catch {
        // Fallback silently if user cancels native share dialog
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Share Lore:</span>
      <button
        onClick={handleNativeShare}
        className="p-1.5 rounded bg-neutral-900 border border-border text-muted hover:text-foreground hover:bg-neutral-800 transition-colors"
        aria-label="Share via system dialog"
      >
        <Share2 size={14} />
      </button>
      <button
        onClick={handleCopyLink}
        className="p-1.5 rounded bg-neutral-900 border border-border text-muted hover:text-foreground hover:bg-neutral-800 transition-colors relative flex items-center gap-1.5"
        aria-label="Copy link to clipboard"
      >
        <Link size={14} />
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-crimson text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
            Copied!
          </span>
        )}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Explore "${title}" by Nobi Kumar`)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded bg-neutral-900 border border-border text-muted hover:text-foreground hover:bg-neutral-800 transition-colors"
        aria-label="Share on X"
      >
        <Twitter size={14} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${title}" by Nobi Kumar: ${shareUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded bg-neutral-900 border border-border text-muted hover:text-foreground hover:bg-neutral-800 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <Send size={14} />
      </a>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Discover Nobi Kumar's psychological thriller: ${shareUrl}`)}`}
        className="p-1.5 rounded bg-neutral-900 border border-border text-muted hover:text-foreground hover:bg-neutral-800 transition-colors"
        aria-label="Share via Email"
      >
        <Mail size={14} />
      </a>
    </div>
  );
}
