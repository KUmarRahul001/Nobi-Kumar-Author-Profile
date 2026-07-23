import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Supabase Comments Database Schema Migration', () => {
  it('defines correct status constraint rules, index declarations, and RLS policies', () => {
    const migrationPath = path.join(process.cwd(), 'supabase/migrations/comments_schema.sql');
    const sqlContent = fs.readFileSync(migrationPath, 'utf-8');

    // Check key requirements present in SQL statements
    expect(sqlContent).toContain('comments');
    expect(sqlContent).toContain('status');
    expect(sqlContent).toContain("CHECK (status IN ('pending', 'approved', 'rejected'))");
    expect(sqlContent).toContain("DEFAULT 'pending'");

    // Check indexing strategies
    expect(sqlContent).toContain('CREATE INDEX IF NOT EXISTS idx_comments_post_id');
    expect(sqlContent).toContain('CREATE INDEX IF NOT EXISTS idx_comments_status');

    // Check RLS policies
    expect(sqlContent).toContain('ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY');
    expect(sqlContent).toContain("status = 'approved'");
    expect(sqlContent).toContain("status = 'pending'");
  });
});
