import { z } from 'zod';

export const purchaseLinksSchema = z.object({
  amazon: z.string().url().optional().or(z.literal('')),
  googlePlay: z.string().url().optional().or(z.literal('')),
  appleBooks: z.string().url().optional().or(z.literal('')),
  kobo: z.string().url().optional().or(z.literal('')),
  paperback: z.string().url().optional().or(z.literal('')),
  hardcover: z.string().url().optional().or(z.literal('')),
  officialWebsite: z.string().url().optional().or(z.literal('')),
  custom: z.string().url().optional().or(z.literal('')),
});

export const bookFormSchema = z.object({
  title: z.string().min(1, 'Book Title is required'),
  subtitle: z.string().optional(),
  seriesName: z.string().optional(),
  volumeNumber: z.number().int().nonnegative().optional().or(z.nan()),
  genre: z.string().min(1, 'Genre is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  fullSynopsis: z.string().min(20, 'Full synopsis must be at least 20 characters'),
  releaseDate: z.string().min(1, 'Release date is required'),
  isbn: z.string().optional(),
  language: z.string().min(1, 'Language is required'),
  pages: z.number().int().positive().optional().or(z.nan()),
  readingTime: z.string().optional(),
  status: z.enum(['published', 'coming-soon', 'draft']),
  coverUrl: z.string().url().optional().or(z.literal('')),
  bannerUrl: z.string().url().optional().or(z.literal('')),
  trailerLink: z.string().url().optional().or(z.literal('')),
  buyLinks: purchaseLinksSchema,
  samplePdfUrl: z.string().url().optional().or(z.literal('')),
  previewUrl: z.string().url().optional().or(z.literal('')),
  awards: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  isEditorsChoice: z.boolean().optional(),
  displayOrder: z.number().int().nonnegative().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  socialShareImage: z.string().url().optional().or(z.literal('')),
  authorNotes: z.string().optional(),
  ageRating: z.string().optional(),
  contentWarning: z.string().optional(),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;
