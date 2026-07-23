'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { Book, Post } from '@/lib/db';
import SearchOverlay from './SearchOverlay';

interface NavbarProps {
  books: Book[];
  posts: Post[];
}

export default function Navbar({ books, posts }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar on the Home / Landing Page ("/") exactly like chetanbhagat.com landing portal
  if (pathname === '/') {
    return <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />;
  }

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav
        className="w-full bg-white dark:bg-[#0a0a0f] border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 transition-colors duration-300 shadow-sm"
        role="navigation"
        aria-label="Primary Navigation"
      >
        {/* Top Contact Notice Bar */}
        <div className="w-full bg-neutral-900 text-neutral-300 text-[11px] font-mono py-1.5 px-4 text-center border-b border-neutral-800">
          <span>Official Media Queries & Publishing Contact: </span>
          <a href="mailto:kumarrahulraj468@gmail.com" className="text-red-400 hover:underline">
            kumarrahulraj468@gmail.com
          </a>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Signature Logo Identity */}
          <Link href="/" className="flex items-center gap-2 group py-1">
            <div className="bg-white p-1.5 rounded-lg border border-neutral-200 shadow-sm group-hover:border-red-600 transition-all">
              <img
                src="/assets/nobi-signature.png"
                alt="Nobi Kumar Signature"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-serif font-black tracking-widest text-neutral-900 dark:text-white group-hover:text-red-600 transition-colors">
                NOBI KUMAR
              </span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest -mt-1">
                Author & Storyteller
              </span>
            </div>
          </Link>

          {/* Large Screen Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/books"
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition-colors"
            >
              Books
            </Link>
            <Link
              href="/universe"
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition-colors"
            >
              Universe
            </Link>
            <Link
              href="/blog"
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition-colors"
            >
              Chronicles
            </Link>
            <Link
              href="/contact"
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
              aria-label="Open Search Dialog"
            >
              <Search size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
              aria-label="Toggle Dark and Light Mode"
            >
              {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0f] px-4 py-4 space-y-3 flex flex-col items-start transition-all">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 py-1 w-full"
            >
              Home
            </Link>
            <Link
              href="/books"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 py-1 w-full"
            >
              Books
            </Link>
            <Link
              href="/universe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 py-1 w-full"
            >
              Universe
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 py-1 w-full"
            >
              Chronicles
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 py-1 w-full"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>

      {/* Embedded Search Dialog Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
