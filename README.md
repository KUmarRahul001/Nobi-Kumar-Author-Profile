# Nobi Kumar — Author Platform

> The official author website and content management platform for **Nobi Kumar**, storyteller of the **Nobi Narrative Universe (NNU)** — a merged literary universe of 7 interconnected novels spanning suspense, emotion, and imagination.

---

## ✨ Features

### Public Site
- **Homepage** — Hero, featured books, author bio, newsletter CTA
- **Books Catalogue** — Full library with filtering, affiliate buy links, sample PDFs
- **Book Detail Pages** — Full synopsis, cover, trailer, retailer links (Amazon IN/US, Kobo, Apple Books, Pocket FM, Audible)
- **Universe Map** — Interactive SVG character/story relationship map (Nobi Narrative Universe)
- **Blog** — Author essays, writing updates, lore posts
- **Contact Form** — Rate-limited, Zod-validated, XSS-sanitised
- **Newsletter Signup** — Mailchimp + Prisma dual-sync subscriber list
- **Search Overlay** — Full-text search across books, posts, and universe nodes
- **Dynamic Sitemap & robots.txt** — Auto-generated for Google Search Console indexing

### Admin Dashboard (`/admin`)
- **Books CRUD** — Create, edit, delete books with Cloudinary image upload
- **Blog CRUD** — Manage posts with slug, tags, and status control
- **Subscribers** — View and manage newsletter subscriber list
- **Messages** — View contact form submissions
- **Settings** — Site configuration panel
- **Auth** — Supabase session + cookie-based admin guard via middleware

### Infrastructure
- **Zero raw SQL** — 100% Prisma ORM parameterised queries (SQL injection proof)
- **Rate limiting** — Upstash Redis sliding window on all public endpoints
- **Input validation** — Zod schemas on every API route
- **XSS sanitisation** — HTML entity encoding on all user text inputs
- **File upload security** — MIME whitelist + binary magic byte signature check
- **Admin auth guard** — Middleware-level redirect on all `/admin/**` routes
- **Security headers** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Animation** | Framer Motion |
| **Database** | PostgreSQL via Supabase |
| **ORM** | Prisma v7 (PrismaPg adapter, PgBouncer pooling) |
| **Auth** | Supabase Auth + `admin_session` HTTP-only cookie |
| **Media CDN** | Cloudinary |
| **Cache / Rate limit** | Upstash Redis |
| **Email marketing** | Mailchimp Marketing API |
| **Forms** | React Hook Form + Zod |
| **Testing** | Vitest + Testing Library |
| **Git hooks** | Husky + lint-staged |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (site)/           # Public pages: /, /books, /blog, /universe, /contact
│   │   ├── admin/            # Protected admin dashboard
│   │   ├── api/              # REST API routes
│   │   ├── sitemap.ts        # Dynamic sitemap.xml
│   │   └── robots.ts         # Dynamic robots.txt
│   ├── components/
│   │   ├── atoms/            # Primitive UI components
│   │   ├── molecules/        # Composed UI blocks
│   │   ├── organisms/        # Full sections (Navbar, Footer, Hero)
│   │   ├── books/            # Book-specific components
│   │   └── admin/            # Admin dashboard components
│   ├── lib/                  # Prisma, Supabase, Cloudinary, Redis, Mailchimp clients
│   ├── content/              # Static content: books (MDX), posts (MDX), universe map
│   ├── types/                # TypeScript interfaces
│   ├── schemas/              # Zod validation schemas
│   ├── constants/            # Genres, languages, series data
│   └── proxy.ts              # Next.js middleware (auth guard)
├── prisma/
│   ├── schema.prisma         # Database models
│   ├── seed.ts               # Database seed script
│   └── migrations/           # Migration history
├── supabase/
│   └── migrations/           # Supabase SQL migrations (comments, forms)
├── docs/                     # Full project documentation (48 docs)
├── public/assets/            # Author images and static assets
├── .env.local.example        # Environment variable template
├── vercel.json               # Vercel deployment + security headers config
└── vitest.config.ts          # Test configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nobi-kumar-author-profile.git
cd nobi-kumar-author-profile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local` (see [Environment Variables](#environment-variables) below).

### 4. Push the database schema

```bash
npm run db:push
```

### 5. (Optional) Seed the database

```bash
npx ts-node prisma/seed.ts
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site is live.

---

## 🔑 Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials.

| Variable | Service | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | ✅ |
| `DATABASE_URL` | Supabase PostgreSQL (pooled) | ✅ |
| `DIRECT_URL` | Supabase PostgreSQL (direct) | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary | ✅ |
| `MAILCHIMP_API_KEY` | Mailchimp | ✅ |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp | ✅ |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp | ✅ |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis | ✅ |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis | ✅ |
| `ADMIN_EMAILS` | Admin whitelist (comma-separated) | ✅ |
| `ADMIN_PASSCODE` | API route passcode | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | ✅ |

> ⚠️ **Never commit `.env.local`** — it is gitignored. Use `.env.local.example` as the safe template.

---

## 🗄️ Database Scripts

```bash
npm run db:push          # Push schema to database (dev)
npm run db:migrate       # Create a new migration (dev)
npm run db:migrate:prod  # Deploy migrations (production)
npm run db:studio        # Open Prisma Studio (GUI)
npm run db:generate      # Regenerate Prisma Client
```

---

## 🧪 Testing

```bash
npm run test    # Run all Vitest tests
npm run lint    # ESLint check
```

---

## 🚢 Deployment

The project is configured for **Vercel** deployment.

1. Push to GitHub
2. Connect the repository in [Vercel Dashboard](https://vercel.com)
3. Add all environment variables from `.env.local.example` to Vercel project settings
4. Deploy — Vercel auto-runs `prisma generate && next build`

Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are applied globally via `vercel.json`.

---

## 📡 API Routes

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/manage-books` | GET | Public | List all books |
| `/api/manage-books` | POST/PUT/DELETE | Admin | Create/update/delete book |
| `/api/manage-posts` | GET | Public | List all posts |
| `/api/manage-posts` | POST/PUT/DELETE | Admin | Create/update/delete post |
| `/api/upload` | POST | Admin | Upload image to Cloudinary |
| `/api/contact` | POST | Public (rate-limited) | Submit contact form |
| `/api/subscribe` | POST | Public (rate-limited) | Newsletter subscription |
| `/api/comments` | GET/POST | Public (rate-limited) | Blog comments |
| `/api/search` | GET | Public | Search index |
| `/api/admin/login` | POST/DELETE | — | Admin sign in / sign out |

---

## 🔐 Security

- **SQL Injection** — Zero raw SQL; all queries via Prisma ORM parameterised queries
- **XSS** — HTML entity encoding on all user-submitted text before database insertion
- **CSRF** — `SameSite=Lax` cookies; admin actions require session cookie or passcode header
- **File Uploads** — MIME type + file extension whitelist + binary magic byte signature check
- **Rate Limiting** — Upstash Redis sliding windows on all public write endpoints
- **Admin Guard** — Middleware-level redirect for all `/admin/**` routes; not just client-side
- **Auth Headers** — HTTP-only, secure, `SameSite=Lax` session cookies

---

## 📚 Documentation

Full project documentation lives in [`/docs`](./docs/):

- Architecture, HLD/LLD, system design
- Database schema, API specification, data models
- SEO strategy, accessibility (WCAG 2.2 AA), performance requirements
- Security requirements, CI/CD plan, testing strategy
- Business requirements, product requirements, author brand guidelines

---

## 👤 Author

**Nobi Kumar** — Storyteller of the Nobi Narrative Universe (NNU)

> *"A storyteller driven by a deep passion for weaving suspense, emotion, and imagination into unforgettable tales."*

---

## 📄 License

Private — All rights reserved © Nobi Kumar.
