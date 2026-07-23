# Folder Structure

## Recommended repository structure
```text
src/
  app/
    (site)/
      page.tsx
      books/
      universe/
      blog/
      about/
      contact/
      search/
    api/
    layout.tsx
    globals.css
  components/
    atoms/
    molecules/
    organisms/
  content/
    books/
    posts/
    universe/
    pages/
  data/
    navigation.json
    site.json
  lib/
    seo.ts
    search.ts
    db.ts
    validation.ts
    analytics.ts
  styles/
  types/
public/
  images/
  covers/
  og/
docs/
```

## Folder rules
- `content/` for editable editorial material
- `components/` for reusable UI
- `lib/` for business logic and helpers
- `app/` for route composition only
- `docs/` for this package
