# Nobi Kumar Author Website Documentation Package

This `/docs` package is the implementation source of truth for the Nobi Kumar author website.

## Product summary
A premium psychological-thriller author website focused on:
- direct book purchase links
- sample chapter reading
- novel list / bibliography
- interactive NNU / Verma Saga universe map
- blog
- about page
- contact page
- newsletter capture
- site search
- dark mode
- comments on blog posts (moderated)

## Content principles
- Canonical source for the author brand
- Thriller-first, cinematic, dark, minimal, intelligent
- Conversion-focused without feeling commercial
- Strong SEO for book discovery and author identity
- Easy for an AI coding agent to implement with minimal ambiguity

## Assumed implementation baseline
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- MDX for editorial content
- Supabase Postgres for comments, newsletter, and contact records
- Amazon/retailer outbound purchase links rather than on-site checkout

## Folder map
- 01_* strategy and business docs
- 02_* product and requirements docs
- 03_* UX / design docs
- 04_* architecture / implementation docs
- 05_* delivery / quality docs

## Traceability
Each requirement in the PRD/SRS is referenced by IDs such as:
- BR-xxx business requirement
- PR-xxx product requirement
- SR-xxx system requirement
- FR-xxx functional requirement
- NFR-xxx non-functional requirement

Those IDs are reused across design, architecture, acceptance criteria, tests, and implementation notes.
