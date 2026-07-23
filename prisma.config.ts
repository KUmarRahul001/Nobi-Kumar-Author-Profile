// prisma.config.ts — Prisma 7 with Supabase PostgreSQL
// DATABASE_URL     → PgBouncer pooled URL (port 6543) — used at runtime
// DIRECT_URL       → Direct connection URL (port 5432) — used for migrations only
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL!,
  },
});
