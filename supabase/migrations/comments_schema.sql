-- Supabase Database Migration
-- Setup: Comments Schema & RLS Policies

-- =========================================================================
-- 1. TABLE CREATION
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id TEXT NOT NULL, -- references the local MDX blog post slug
    name TEXT NOT NULL,
    email_hash TEXT, -- MD5 hash of email for Gravatar support
    body TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    moderation_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================================
-- 2. INDEXING STRATEGY
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON public.comments(status);

-- =========================================================================
-- 3. ROW-LEVEL SECURITY (RLS) ACTIVATION
-- =========================================================================
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- 4. RLS POLICIES
-- =========================================================================

-- 4.1 Allow public read access to approved comments
CREATE POLICY "Allow public read access to approved comments"
    ON public.comments FOR SELECT
    USING (status = 'approved' OR public.is_admin());

-- 4.2 Allow public inserts (anonymous users can submit comments)
CREATE POLICY "Allow public to submit comments"
    ON public.comments FOR INSERT
    WITH CHECK (status = 'pending'); -- Restrict inserts to 'pending' state only

-- 4.3 Allow admins full access to comments
CREATE POLICY "Allow admins to manage all comments"
    ON public.comments FOR ALL
    USING (public.is_admin());
