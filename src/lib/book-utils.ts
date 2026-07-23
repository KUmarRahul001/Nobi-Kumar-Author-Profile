import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Book } from '@/types/book';

const BOOKS_DIR = path.join(process.cwd(), 'src/content/books');

export function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export async function saveBookToDisk(book: Book): Promise<void> {
  ensureDirExists(BOOKS_DIR);
  const filePath = path.join(BOOKS_DIR, `${book.slug}.mdx`);

  // Destructure content and rest of data to build frontmatter
  const { ...frontmatter } = book;

  const fileContent = matter.stringify('', frontmatter);
  fs.writeFileSync(filePath, fileContent, 'utf-8');
}

export async function deleteBookFromDisk(slug: string): Promise<void> {
  ensureDirExists(BOOKS_DIR);
  const filePath = path.join(BOOKS_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
