export interface PurchaseLinks {
  amazon?: string;
  googlePlay?: string;
  appleBooks?: string;
  kobo?: string;
  paperback?: string;
  hardcover?: string;
  officialWebsite?: string;
  custom?: string;
}

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  seriesName?: string;
  volumeNumber?: number;
  genre: string;
  tags: string[];
  shortDescription: string;
  fullSynopsis: string;
  releaseDate: string;
  isbn?: string;
  language: string;
  pages?: number;
  readingTime?: string;
  status: 'published' | 'coming-soon' | 'draft';
  coverUrl?: string;
  bannerUrl?: string;
  trailerLink?: string;
  buyLinks: PurchaseLinks;
  samplePdfUrl?: string;
  previewUrl?: string;
  awards?: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isEditorsChoice?: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  socialShareImage?: string;
  authorNotes?: string;
  ageRating?: string;
  contentWarning?: string;
  lastUpdated: string;
}
