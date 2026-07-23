/**
 * src/app/admin/page.tsx
 * Admin Dashboard — overview stats, quick actions
 */
import * as React from 'react';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

async function getStats() {
  try {
    const [books, posts, subscribers, messages] = await Promise.all([
      prisma.book.count(),
      prisma.post.count(),
      prisma.subscriber.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
    return { books, posts, subscribers, unreadMessages: messages };
  } catch {
    return { books: 0, posts: 0, subscribers: 0, unreadMessages: 0 };
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const stats = await getStats();

  const cards = [
    {
      label: 'Total Books',
      value: stats.books,
      icon: '📚',
      href: '/admin/books',
      color: 'from-red-800 to-red-900',
    },
    {
      label: 'Blog Posts',
      value: stats.posts,
      icon: '✍️',
      href: '/admin/blog',
      color: 'from-emerald-800 to-emerald-900',
    },
    {
      label: 'Subscribers',
      value: stats.subscribers,
      icon: '📧',
      href: '/admin/subscribers',
      color: 'from-purple-800 to-purple-900',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      icon: '💬',
      href: '/admin/messages',
      color: 'from-blue-800 to-blue-900',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-black text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1 font-mono">Welcome back, {user?.email}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition-transform group`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-4xl font-black text-white mb-1">{card.value}</div>
            <div className="text-xs font-mono text-white/60 group-hover:text-white/80 transition-colors">
              {card.label}
            </div>
          </a>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-5">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Book', href: '/admin/books/new', icon: '➕' },
            { label: 'View Site', href: '/', icon: '🌐', target: '_blank' },
            { label: 'View Books', href: '/books', icon: '📖', target: '_blank' },
            { label: 'Messages', href: '/admin/messages', icon: '📩' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.target}
              className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white transition-all"
            >
              <span>{item.icon}</span>
              <span className="font-mono text-xs">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
