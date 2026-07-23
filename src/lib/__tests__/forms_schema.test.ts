import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Supabase Subscribers and Messages Database Schemas Migration', () => {
  it('defines correct status constraint rules, index declarations, and RLS policies', () => {
    const migrationPath = path.join(process.cwd(), 'supabase/migrations/forms_schema.sql');
    const sqlContent = fs.readFileSync(migrationPath, 'utf-8');

    // Check subscribers schema requirements present in SQL statements
    expect(sqlContent).toContain('subscribers');
    expect(sqlContent).toContain('email TEXT UNIQUE NOT NULL');
    expect(sqlContent).toContain("CHECK (status IN ('active', 'unsubscribed'))");
    expect(sqlContent).toContain("DEFAULT 'active'");

    // Check subscribers indexing strategies
    expect(sqlContent).toContain('CREATE INDEX IF NOT EXISTS idx_subscribers_email');
    expect(sqlContent).toContain('CREATE INDEX IF NOT EXISTS idx_subscribers_status');

    // Check subscribers RLS policies
    expect(sqlContent).toContain('ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY');
    expect(sqlContent).toContain("WITH CHECK (status = 'active')");

    // Check messages schema requirements present in SQL statements
    expect(sqlContent).toContain('messages');
    expect(sqlContent).toContain("CHECK (status IN ('read', 'unread', 'archived'))");
    expect(sqlContent).toContain("DEFAULT 'unread'");

    // Check messages indexing strategies
    expect(sqlContent).toContain('CREATE INDEX IF NOT EXISTS idx_messages_status');
    expect(sqlContent).toContain('CREATE INDEX IF NOT EXISTS idx_messages_created_at');

    // Check messages RLS policies
    expect(sqlContent).toContain('ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY');
    expect(sqlContent).toContain("WITH CHECK (status = 'unread')");
  });
});
