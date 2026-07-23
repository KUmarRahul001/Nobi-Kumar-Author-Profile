/**
 * src/app/admin/messages/page.tsx
 * Admin Messages — view contact form submissions
 */
import * as React from 'react';
import { prisma } from '@/lib/prisma';

export default async function AdminMessagesPage() {
  let messages: any[] = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {}

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-black text-white">Messages</h1>
        <p className="text-sm text-white/40 mt-1 font-mono">
          {messages.filter((m) => !m.read).length} unread · {messages.length} total
        </p>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-white/30 font-mono text-sm">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white/5 border rounded-2xl p-5 transition-all ${
                !msg.read ? 'border-red-700/40 bg-red-900/5' : 'border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {!msg.read && (
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    )}
                    <span className="font-semibold text-white text-sm">{msg.name}</span>
                    <span className="text-xs text-white/30 font-mono">{msg.email}</span>
                  </div>
                  {msg.subject && (
                    <div className="text-xs font-mono text-white/50 mb-2">Re: {msg.subject}</div>
                  )}
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                    {msg.message}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-white/25 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
