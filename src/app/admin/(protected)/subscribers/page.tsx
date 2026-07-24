/**
 * src/app/admin/subscribers/page.tsx
 * Admin Subscribers — view newsletter subscribers
 */
import * as React from 'react';
import { createClient } from '@/lib/supabase/server';

export default async function AdminSubscribersPage() {
  let subscribers: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('Subscriber')
      .select('*')
      .order('createdAt', { ascending: false });
    if (data) subscribers = data;
  } catch {}

  const active = subscribers.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">Subscribers</h1>
        <p className="text-xs sm:text-sm text-white/40 mt-1 font-mono">
          {active} active · {subscribers.length} total
        </p>
      </div>

      {/* Mobile Card List (<640px) */}
      <div className="block sm:hidden space-y-3">
        {subscribers.length === 0 ? (
          <div className="p-8 text-center text-white/30 font-mono text-xs bg-white/5 rounded-2xl border border-white/10">
            No subscribers yet.
          </div>
        ) : (
          subscribers.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-white/90 truncate font-semibold">
                  {sub.email}
                </span>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider ${
                    sub.status === 'active'
                      ? 'bg-green-900/40 text-green-400 border border-green-700/40'
                      : 'bg-white/10 text-white/30 border border-white/10'
                  }`}
                >
                  {sub.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/40 font-mono pt-1 border-t border-white/5">
                <span>{sub.name ?? 'No Name'}</span>
                <span>
                  {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tablet & Desktop Table (>=640px) */}
      <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
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
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-white/30 font-mono text-sm"
                  >
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
    </div>
  );
}
