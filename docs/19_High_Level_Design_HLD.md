# High-Level Design (HLD)

## System overview
The website is a content-first, responsive web application with public pages, lightweight interactive features, and a minimal backend for forms, comments, and newsletter capture.

## Architectural style
- Next.js App Router frontend
- Server components for content rendering
- Client components only where interaction is needed
- Postgres-backed persistence for user-generated records
- CDN-backed media delivery

## Major subsystems
### Public content subsystem
Pages, book data, blog posts, universe content, SEO metadata.

### Interaction subsystem
Search, theme toggle, comments, newsletter, contact, form validation.

### Admin/content workflow subsystem
Content publishing, comment moderation, contact triage.

### Analytics subsystem
CTA clicks, search terms, sample reads, newsletter submissions.

## Data flow summary
Visitor request -> route -> content fetch -> render -> CTA or interaction -> backend record -> confirmation.

## Scalability assumptions
- Content will grow over time
- Book count will expand
- Blog volume will increase
- Universe map nodes will expand

## Design decisions
- Outbound purchases instead of payments
- Markdown/MDX for editorial efficiency
- Supabase/Postgres for lightweight persistence
- Search optimized for catalog and blog discovery
