import * as React from 'react';
import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/db';
import SampleReader from '@/components/organisms/SampleReader';

export const dynamic = 'force-dynamic';

interface SamplePageProps {
  params: Promise<{ slug: string }>;
}

export default async function SamplePage({ params }: SamplePageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book || !book.sampleExcerpt) {
    notFound();
  }

  return <SampleReader bookTitle={book.title} bookSlug={book.slug} excerpt={book.sampleExcerpt} />;
}
