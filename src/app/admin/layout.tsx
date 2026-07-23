/**
 * src/app/admin/layout.tsx
 * Root admin layout — forces dynamic server rendering for ALL /admin routes
 * (login, unauthorized, protected dashboard pages) to prevent build-time static prerendering.
 */
import * as React from 'react';

export const dynamic = 'force-dynamic';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
