/**
 * src/app/admin/settings/page.tsx
 * Admin Settings — profile info
 */
import * as React from 'react';
import { createClient } from '@/lib/supabase/server';

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif font-black text-white">Settings</h1>
        <p className="text-sm text-white/40 mt-1 font-mono">Admin account configuration</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-sm font-mono text-white/50 uppercase tracking-widest">Account</h2>

        <div className="grid gap-4">
          <div>
            <label className="text-xs font-mono text-white/30 uppercase tracking-wider block mb-1.5">
              Email
            </label>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 font-mono">
              {user?.email}
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-white/30 uppercase tracking-wider block mb-1.5">
              User ID
            </label>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/30 font-mono truncate">
              {user?.id}
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-white/30 uppercase tracking-wider block mb-1.5">
              Last Sign In
            </label>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 font-mono">
              {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('en-IN') : '—'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-mono text-white/50 uppercase tracking-widest">Credentials</h2>
        <p className="text-xs text-white/30">
          To add or remove admin users, update the{' '}
          <code className="text-white/50 bg-white/5 px-1.5 py-0.5 rounded">ADMIN_EMAILS</code>{' '}
          environment variable in your Vercel/hosting dashboard. Only emails listed there can access
          this panel.
        </p>
      </div>
    </div>
  );
}
