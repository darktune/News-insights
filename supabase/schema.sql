-- ==============================================================================
-- ORIENTAL TIMES - SUPABASE DATABASE SCHEMA & SEED DATA
-- Project Ref: fxgpsxyffpensqzuqafv
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#0ea5e9',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content JSONB,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    featured_image_url TEXT,
    is_breaking BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    views_count BIGINT DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by slug and category
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_status_created ON public.articles(status, created_at DESC);

-- 4. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL DEFAULT 'Reader',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_comments_article ON public.comments(article_id);

-- 5. HOMEPAGE LAYOUT CONFIG
CREATE TABLE IF NOT EXISTS public.homepage_layout (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
    secondary_article_ids JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_layout ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Categories: Public read, authenticated write
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert categories" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update categories" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');

-- Articles: Public read published, authenticated full access
CREATE POLICY "Allow public read published articles" ON public.articles FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert articles" ON public.articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update articles" ON public.articles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete articles" ON public.articles FOR DELETE USING (auth.role() = 'authenticated');

-- Comments: Public read, public/auth insert
CREATE POLICY "Allow public read comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Allow public insert comments" ON public.comments FOR INSERT WITH CHECK (true);

-- Homepage Layout: Public read, authenticated update
CREATE POLICY "Allow public read homepage_layout" ON public.homepage_layout FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update homepage_layout" ON public.homepage_layout FOR ALL USING (auth.role() = 'authenticated');

-- Newsletter: Public insert
CREATE POLICY "Allow public insert newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- STORAGE SETUP (Media Bucket)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for Media
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated Uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Authenticated Deletes" ON storage.objects FOR DELETE USING (bucket_id = 'media');

-- ==============================================================================
-- SEED DATA (Default Categories & Sample News)
-- ==============================================================================
INSERT INTO public.categories (name, slug, description, color) VALUES
('Politics', 'politics', 'National affairs, governance, policy, and elections', '#e11d48'),
('Business', 'business', 'Markets, macroeconomic trends, trade, and industry', '#2563eb'),
('Technology', 'technology', 'Startups, venture capital, fintech, and digital innovation', '#059669'),
('Money', 'money', 'Personal finance, real estate, and wealth management', '#d97706'),
('Sports', 'sports', 'Football, athletics, combat sports, and national teams', '#7c3aed'),
('Opinion', 'opinion', 'Editorials, thought leadership, and expert commentary', '#475569')
ON CONFLICT (slug) DO NOTHING;

-- Sample Seed Articles
INSERT INTO public.articles (title, slug, excerpt, content, category_id, featured_image_url, is_breaking, status)
SELECT 
    'Central Bank of Nigeria Announces Comprehensive Forex Regulatory Overhaul',
    'cbn-announces-comprehensive-forex-regulatory-overhaul',
    'The Central Bank of Nigeria has issued fresh operational guidelines for the foreign exchange market to enhance liquidity and transparency.',
    '"<p>In a decisive move to stabilize the domestic currency market, the <strong>Central Bank of Nigeria (CBN)</strong> today unveiled a comprehensive series of monetary policy updates...</p><p>Market analysts expect this initiative to alleviate FX backlog pressure and promote direct capital inflows into critical infrastructure sectors.</p>"'::jsonb,
    id,
    'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?auto=format&fit=crop&q=80&w=1200',
    true,
    'published'
FROM public.categories WHERE slug = 'business'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (title, slug, excerpt, content, category_id, featured_image_url, is_breaking, status)
SELECT 
    'Lagos Tech Hub Expands to Host Over 100 Emerging Pan-African Startups',
    'lagos-tech-hub-expands-pan-african-startups',
    'Yaba innovation district expands its infrastructure with new green energy data facilities and incubation facilities for tech pioneers.',
    '"<p>Nigeria’s commercial hub solidifies its status as Africa’s Silicon Valley with the commissioning of the new Yaba Tech Innovation Campus...</p>"'::jsonb,
    id,
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    false,
    'published'
FROM public.categories WHERE slug = 'technology'
ON CONFLICT (slug) DO NOTHING;
