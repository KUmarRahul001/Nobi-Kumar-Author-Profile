'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: '⚡' },
  { label: 'Books', href: '/admin/books', icon: '📚' },
  { label: 'Blog', href: '/admin/blog', icon: '✍️' },
  { label: 'Subscribers', href: '/admin/subscribers', icon: '📧' },
  { label: 'Messages', href: '/admin/messages', icon: '💬' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = React.useState(false);

  async function handleSignOut() {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
      await supabase.auth.signOut();
    } catch {
      // Ignore sign out error
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  }

  return (
    <>
      {/* Mobile Top App Header Bar (Visible under 768px) */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-[#0d0d14]/95 backdrop-blur border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow shadow-red-900/50">
            <span className="text-xs font-serif font-black text-white">N</span>
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-white">Nobi Kumar</div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
              Admin Portal
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all"
          aria-label="Toggle Navigation Drawer"
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Slide-out Drawer (Mobile) / Permanent Fixed Sidebar (Desktop) */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#0d0d14] border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header Logo */}
        <div className="px-6 py-6 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow shadow-red-900/50">
              <span className="text-sm font-serif font-black text-white">N</span>
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-white">Nobi Kumar</div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                Admin Control
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white/40 hover:text-white p-1"
            aria-label="Close Mobile Navigation"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && (pathname?.startsWith(item.href) ?? false));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-red-700/20 text-red-400 border border-red-700/30 font-semibold'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base sm:text-lg">{item.icon}</span>
                <span className="font-mono">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile + sign out footer */}
        <div className="px-4 py-5 border-t border-white/[0.06] space-y-3">
          <div className="px-2">
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-1">
              Signed in as
            </div>
            <div className="text-xs text-white/60 truncate font-mono">{userEmail}</div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-white/50 hover:text-red-400 hover:bg-red-950/40 border border-white/10 hover:border-red-800/40 transition-all"
          >
            <span>🚪</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
