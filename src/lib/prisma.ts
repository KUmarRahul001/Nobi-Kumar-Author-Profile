/**
 * src/lib/prisma.ts
 * Global Prisma Client using @prisma/adapter-pg (Supabase PostgreSQL)
 * Uses PgBouncer-compatible connection pooling via DATABASE_URL
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ||
    'postgresql://postgres.ifttnlxhpqlccpjymqgc:8789RAHUl%21%40%23%24@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1';

  const adapter = new PrismaPg({
    connectionString,
    max: 5,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
