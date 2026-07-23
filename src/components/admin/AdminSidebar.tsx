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
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d0d14] border-r border-white/[0.06] flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow shadow-red-900/50">
            <span className="text-sm font-serif font-black text-white">N</span>
          </div>
          <div>
            <div className="text-sm font-serif font-bold text-white">Nobi Kumar</div>
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && (pathname?.startsWith(item.href) ?? false));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-red-700/20 text-red-400 border border-red-700/30'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-mono">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + sign out */}
      <div className="px-4 py-5 border-t border-white/[0.06] space-y-3">
        <div className="px-2">
          <div className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-1">
            Signed in as
          </div>
          <div className="text-xs text-white/50 truncate">{userEmail}</div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-white/40 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-800/30 transition-all"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
