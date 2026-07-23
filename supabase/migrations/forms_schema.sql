-- Supabase Database Migration
-- Setup: Newsletter Subscribers & Contact Messages Schemas

-- =========================================================================
-- 1. NEWSLETTER SUBSCRIBERS TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'unsubscribed')) DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for lookup checks
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers(status);

-- RLS Activation
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public inserts to subscribers"
    ON public.subscribers FOR INSERT
    WITH CHECK (status = 'active'); -- Force active state on insert

CREATE POLICY "Allow admins to manage subscribers"
    ON public.subscribers FOR ALL
    USING (public.is_admin());

-- =========================================================================
-- 2. CONTACT MESSAGES TABLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    body TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('read', 'unread', 'archived')) DEFAULT 'unread',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for lookup checks
CREATE INDEX IF NOT EXISTS idx_messages_status ON public.messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);

-- RLS Activation
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public inserts to messages"
    ON public.messages FOR INSERT
    WITH CHECK (status = 'unread'); -- Force unread state on insert

CREATE POLICY "Allow admins to manage messages"
    ON public.messages FOR ALL
    USING (public.is_admin());
