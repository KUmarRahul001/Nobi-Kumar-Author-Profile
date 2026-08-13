/**
 * src/lib/seo/schema.ts
 * Production-grade Schema.org JSON-LD generators for Google Rich Results & Knowledge Graph
 */

import { AUTHOR_ENTITY } from '@/constants/author';

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : AUTHOR_ENTITY.canonicalUrl;

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#author`,
    name: AUTHOR_ENTITY.name,
    alternateName: AUTHOR_ENTITY.alternateName,
    url: BASE_URL,
    image: `${BASE_URL}${AUTHOR_ENTITY.profileImage}`,
    jobTitle: AUTHOR_ENTITY.title,
    description: AUTHOR_ENTITY.bio,
    knowsAbout: AUTHOR_ENTITY.knowsAbout,
    sameAs: Object.values(AUTHOR_ENTITY.sameAs),
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: `${AUTHOR_ENTITY.name} Official Author Portal`,
    url: BASE_URL,
    description: `Official website of ${AUTHOR_ENTITY.name} - ${AUTHOR_ENTITY.title}`,
    publisher: {
      '@id': `${BASE_URL}/#author`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBookSchema(book: {
  title: string;
  slug: string;
  synopsis?: string;
  coverImage?: string;
  isbn?: string;
  publishedYear?: number;
  genre?: string;
  price?: number;
  inStock?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${BASE_URL}/books/${book.slug}#book`,
    name: book.title,
    url: `${BASE_URL}/books/${book.slug}`,
    image: book.coverImage || `${BASE_URL}${AUTHOR_ENTITY.profileImage}`,
    description: book.synopsis || `Read ${book.title} by ${AUTHOR_ENTITY.name}.`,
    isbn: book.isbn || undefined,
    genre: book.genre || 'Psychological Thriller',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#author`,
      name: AUTHOR_ENTITY.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nobi Narrative Universe Press',
    },
    workExample: book.price
      ? {
          '@type': 'Book',
          bookFormat: 'https://schema.org/Paperback',
          offers: {
            '@type': 'Offer',
            price: book.price,
            priceCurrency: 'INR',
            availability:
              book.inStock !== false
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            url: `${BASE_URL}/books/${book.slug}`,
          },
        }
      : undefined,
  };
}

export function getArticleSchema(article: {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${article.slug}#article`,
    headline: article.title,
    url: `${BASE_URL}/blog/${article.slug}`,
    image: article.coverImage ? [article.coverImage] : undefined,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#author`,
      name: AUTHOR_ENTITY.name,
    },
    publisher: {
      '@type': 'Organization',
      name: `${AUTHOR_ENTITY.name} Official Portal`,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}${AUTHOR_ENTITY.profileImage}`,
      },
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith('http') ? it.item : `${BASE_URL}${it.item}`,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
