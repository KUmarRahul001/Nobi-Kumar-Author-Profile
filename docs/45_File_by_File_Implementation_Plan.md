# File-by-File Implementation Plan

## App routes
- `src/app/layout.tsx` global shell
- `src/app/(site)/page.tsx` home
- `src/app/(site)/books/page.tsx` books index
- `src/app/(site)/books/[slug]/page.tsx` book detail
- `src/app/(site)/books/[slug]/sample/page.tsx` sample
- `src/app/(site)/universe/page.tsx` universe map
- `src/app/(site)/blog/page.tsx` blog index
- `src/app/(site)/blog/[slug]/page.tsx` blog detail
- `src/app/(site)/about/page.tsx` about
- `src/app/(site)/contact/page.tsx` contact
- `src/app/(site)/search/page.tsx` search

## Components
- `src/components/organisms/HeroSection.tsx`
- `src/components/organisms/FeaturedBookPanel.tsx`
- `src/components/organisms/UniverseMapPanel.tsx`
- `src/components/organisms/BlogFeedSection.tsx`
- `src/components/molecules/BookCard.tsx`
- `src/components/molecules/BlogCard.tsx`
- `src/components/molecules/NewsletterForm.tsx`
- `src/components/molecules/ContactForm.tsx`
- `src/components/molecules/SearchBar.tsx`
- `src/components/molecules/ThemeToggle.tsx`

## Content files
- `src/content/books/*.mdx`
- `src/content/posts/*.mdx`
- `src/content/universe/*.json`

## Libraries
- `src/lib/seo.ts`
- `src/lib/search.ts`
- `src/lib/db.ts`
- `src/lib/validation.ts`
- `src/lib/analytics.ts`
