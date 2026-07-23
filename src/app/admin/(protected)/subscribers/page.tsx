/**
 * src/app/admin/subscribers/page.tsx
 * Admin Subscribers — view newsletter subscribers
 */
import * as React from 'react';
import { prisma } from '@/lib/prisma';

export default async function AdminSubscribersPage() {
  let subscribers: any[] = [];
  try {
    subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {}

  const active = subscribers.filter((s) => s.status === 'active').length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-black text-white">Subscribers</h1>
        <p className="text-sm text-white/40 mt-1 font-mono">
          {active} active · {subscribers.length} total
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-mono text-white/30 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-white/30 font-mono text-sm">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3 text-white/80 font-mono text-xs">{sub.email}</td>
                  <td className="px-5 py-3 text-white/50 text-sm">{sub.name ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        sub.status === 'active'
                          ? 'bg-green-900/40 text-green-400 border border-green-700/40'
                          : 'bg-white/10 text-white/30 border border-white/10'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white/30 text-xs font-mono">
                    {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
