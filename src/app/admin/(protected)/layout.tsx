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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0f] text-white">
      <AdminSidebar userEmail={email} />
      <main className="flex-1 w-full min-w-0 md:ml-64 min-h-screen overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
