import * as React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full text-[10px] font-mono uppercase tracking-wider text-muted py-2"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-crimson transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li className="select-none" aria-hidden="true">
                /
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="text-foreground font-semibold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-crimson transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
