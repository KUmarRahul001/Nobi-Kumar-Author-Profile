import * as React from 'react';
import { notFound } from 'next/navigation';
import { getBookBySlug, getBooks } from '@/lib/db';
import SampleReader from '@/components/organisms/SampleReader';

interface SamplePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export default async function SamplePage({ params }: SamplePageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book || !book.sampleExcerpt) {
    notFound();
  }

  return <SampleReader bookTitle={book.title} bookSlug={book.slug} excerpt={book.sampleExcerpt} />;
}
