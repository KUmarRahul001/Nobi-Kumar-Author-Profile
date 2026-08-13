import * as React from 'react';
import Link from 'next/link';
import JsonLd from '@/components/atoms/JsonLd';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'https://nobikumar.netlify.app';

  const fullItems = [{ name: 'Home', item: '/' }, ...items];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.item.startsWith('http') ? breadcrumb.item : `${baseUrl}${breadcrumb.item}`,
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className="py-2 px-1 text-xs font-mono text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={item.item} className="flex items-center gap-2">
                {idx > 0 && <span className="text-muted/50">/</span>}
                {isLast ? (
                  <span className="font-semibold text-foreground" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.item} className="hover:text-crimson transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
