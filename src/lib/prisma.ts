/**
 * src/lib/prisma.ts
 * Global Prisma Client using @prisma/adapter-pg (Supabase PostgreSQL)
 * Uses PgBouncer-compatible connection pooling via DATABASE_URL
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  // PrismaPg uses pg Pool internally — supports PgBouncer / Supabase pooler
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    max: 5, // max pool connections (kept low for serverless edge)
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
