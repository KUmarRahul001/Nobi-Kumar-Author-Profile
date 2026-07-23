# System Architecture

## Layers
### Presentation layer
Next.js UI, layouts, pages, components.

### Application layer
Content mapping, search, forms, theme handling, routing logic.

### Data layer
Content files, MDX, JSON manifests, Postgres tables, media storage.

### Integration layer
Newsletter provider, analytics, email service, retailer links, optional CMS.

## Key properties
- Content-first
- Low latency
- SEO-friendly
- Easy to maintain
- AI-agent friendly

## Request lifecycle
1. Request enters app
2. Route resolves
3. Content loads from filesystem or data source
4. UI renders
5. Client-side interactions call APIs when needed
6. Analytics records event

## Security boundaries
- Public pages are read-only
- Forms are validated server-side
- Admin routes are protected
- Secrets never exposed in client bundles
