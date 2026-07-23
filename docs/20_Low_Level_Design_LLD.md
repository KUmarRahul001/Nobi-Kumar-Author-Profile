# Low-Level Design (LLD)

## Home page implementation
- Fetch featured book from content source
- Render hero with CTA stack
- Render latest release block
- Render universe teaser with entry point
- Track CTA clicks

## Book detail implementation
- Static route based on slug
- Metadata fetched from content source
- Sample excerpt rendered from markdown
- Buy links rendered from retailer list
- Related titles derived from series graph

## Universe map implementation
- Graph data as JSON or content model
- Node types: book, series, character, location, timeline event
- Edge types: sequel, prequel, parallel, appears-in, reference
- UI supports zoom, focus, and node detail panel

## Blog implementation
- MDX posts with frontmatter
- Static generation with incremental revalidation
- Comment thread loaded client-side
- Moderation status stored in DB

## Search implementation
- Local index for content metadata
- Optional server-side search endpoint
- Search targets: books, posts, tags, entities

## Forms implementation
- Zod validation
- Server action or API endpoint
- Rate limiting
- Spam honeypot / captcha alternative

## Theme implementation
- Persist theme in cookie or local storage
- Default dark
- Respect system preference optionally
