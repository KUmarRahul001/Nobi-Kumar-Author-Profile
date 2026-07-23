/**
 * src/app/admin/(protected)/layout.tsx
 * Protected admin layout — sidebar + content area.
 * Only reached after proxy.ts verifies Supabase session + email whitelist.
 * Server-side double-check here as defence-in-depth.
 */
import * as React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';

import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin — Nobi Kumar',
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get('admin_session')?.value;

  const email = user?.email || adminCookie;

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase());

  // Defence in depth — proxy.ts is primary gate
  if (!email || !adminEmails.includes(email.toLowerCase())) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <AdminSidebar userEmail={email} />
      <main className="flex-1 ml-64 min-h-screen overflow-auto">{children}</main>
    </div>
  );
}
