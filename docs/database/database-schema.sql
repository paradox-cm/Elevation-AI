-- Safe Elevation AI CMS Database Schema
-- Handles existing database structure gracefully

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing enum if it exists and recreate with new values
DROP TYPE IF EXISTS section_type CASCADE;

-- Create section type enum with all needed types
CREATE TYPE section_type AS ENUM (
  -- Hero Section Types (existing content)
  'hero_typewriter',
  'hero_simple',
  
  -- Content Section Types (existing content)
  'introduction_accordion',
  'problem_cards',
  'logo_carousel',
  'cta',
  
  -- Legacy Types (for backward compatibility)
  'hero',
  'introduction',
  'platform_features',
  'faq',
  'team_members',
  'partnership_info',
  'investment_info',
  'blog_listing',
  'custom'
);

-- Pages table (create if not exists)
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Page sections table (create if not exists)
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  section_type section_type NOT NULL,
  section_order INTEGER NOT NULL DEFAULT 0,
  title VARCHAR(255),
  content TEXT,
  metadata JSONB,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add new columns to page_sections if they don't exist
DO $$ 
BEGIN
    -- Add section_data column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'page_sections' AND column_name = 'section_data') THEN
        ALTER TABLE page_sections ADD COLUMN section_data JSONB DEFAULT '{}';
    END IF;
    
    -- Add section_config column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'page_sections' AND column_name = 'section_config') THEN
        ALTER TABLE page_sections ADD COLUMN section_config JSONB DEFAULT '{}';
    END IF;
    
    -- Add section_styles column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'page_sections' AND column_name = 'section_styles') THEN
        ALTER TABLE page_sections ADD COLUMN section_styles JSONB DEFAULT '{}';
    END IF;
    
    -- Add is_featured column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'page_sections' AND column_name = 'is_featured') THEN
        ALTER TABLE page_sections ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
    
    -- Add section_class column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'page_sections' AND column_name = 'section_class') THEN
        ALTER TABLE page_sections ADD COLUMN section_class VARCHAR(255);
    END IF;
    
    -- Add section_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'page_sections' AND column_name = 'section_id') THEN
        ALTER TABLE page_sections ADD COLUMN section_id VARCHAR(255);
    END IF;
END $$;

-- FAQ categories table (create if not exists)
CREATE TABLE IF NOT EXISTS faq_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table (create if not exists)
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES faq_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog categories table (create if not exists)
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table (create if not exists)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media table (create if not exists)
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table (create if not exists)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Section templates table (create if not exists)
CREATE TABLE IF NOT EXISTS section_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  section_type section_type NOT NULL,
  template_data JSONB NOT NULL DEFAULT '{}',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_sections_type ON page_sections(section_type);
CREATE INDEX IF NOT EXISTS idx_page_sections_order ON page_sections(page_id, section_order);
CREATE INDEX IF NOT EXISTS idx_faqs_category_id ON faqs(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);

-- Enable Row Level Security (only if not already enabled)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'pages' AND relrowsecurity = true) THEN
        ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'page_sections' AND relrowsecurity = true) THEN
        ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'faq_categories' AND relrowsecurity = true) THEN
        ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'faqs' AND relrowsecurity = true) THEN
        ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'blog_categories' AND relrowsecurity = true) THEN
        ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'blog_posts' AND relrowsecurity = true) THEN
        ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'media' AND relrowsecurity = true) THEN
        ALTER TABLE media ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'site_settings' AND relrowsecurity = true) THEN
        ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'section_templates' AND relrowsecurity = true) THEN
        ALTER TABLE section_templates ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create RLS policies (drop existing ones first to avoid conflicts)
DROP POLICY IF EXISTS "Pages are viewable by everyone" ON pages;
DROP POLICY IF EXISTS "Pages are manageable by authenticated users" ON pages;
DROP POLICY IF EXISTS "Page sections are viewable by everyone" ON page_sections;
DROP POLICY IF EXISTS "Page sections are manageable by authenticated users" ON page_sections;
DROP POLICY IF EXISTS "FAQ categories are viewable by everyone" ON faq_categories;
DROP POLICY IF EXISTS "FAQ categories are manageable by authenticated users" ON faq_categories;
DROP POLICY IF EXISTS "FAQs are viewable by everyone" ON faqs;
DROP POLICY IF EXISTS "FAQs are manageable by authenticated users" ON faqs;
DROP POLICY IF EXISTS "Blog categories are viewable by everyone" ON blog_categories;
DROP POLICY IF EXISTS "Blog categories are manageable by authenticated users" ON blog_categories;
DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are manageable by authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Media files are viewable by everyone" ON media;
DROP POLICY IF EXISTS "Media files are manageable by authenticated users" ON media;
DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON site_settings;
DROP POLICY IF EXISTS "Site settings are manageable by authenticated users" ON site_settings;
DROP POLICY IF EXISTS "Section templates are viewable by everyone" ON section_templates;
DROP POLICY IF EXISTS "Section templates are manageable by authenticated users" ON section_templates;

-- Create RLS policies
CREATE POLICY "Pages are viewable by everyone" ON pages
  FOR SELECT USING (true);

CREATE POLICY "Pages are manageable by authenticated users" ON pages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Page sections are viewable by everyone" ON page_sections
  FOR SELECT USING (true);

CREATE POLICY "Page sections are manageable by authenticated users" ON page_sections
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "FAQ categories are viewable by everyone" ON faq_categories
  FOR SELECT USING (true);

CREATE POLICY "FAQ categories are manageable by authenticated users" ON faq_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "FAQs are viewable by everyone" ON faqs
  FOR SELECT USING (true);

CREATE POLICY "FAQs are manageable by authenticated users" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Blog categories are viewable by everyone" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Blog categories are manageable by authenticated users" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Blog posts are manageable by authenticated users" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Media files are viewable by everyone" ON media
  FOR SELECT USING (true);

CREATE POLICY "Media files are manageable by authenticated users" ON media
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Site settings are viewable by everyone" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Site settings are manageable by authenticated users" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Section templates are viewable by everyone" ON section_templates
  FOR SELECT USING (true);

CREATE POLICY "Section templates are manageable by authenticated users" ON section_templates
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at (drop existing ones first)
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
DROP TRIGGER IF EXISTS update_page_sections_updated_at ON page_sections;
DROP TRIGGER IF EXISTS update_faq_categories_updated_at ON faq_categories;
DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
DROP TRIGGER IF EXISTS update_section_templates_updated_at ON section_templates;

-- Create triggers
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON page_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_categories_updated_at BEFORE UPDATE ON faq_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_templates_updated_at BEFORE UPDATE ON section_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default section templates (only if they don't exist)
INSERT INTO section_templates (name, section_type, template_data, description) 
SELECT * FROM (VALUES
('Home Hero with Typewriter', 'hero_typewriter', '{
  "title": "The Agentic Platform for",
  "cyclingWords": ["Intelligent Operations.", "Seamless Workflows.", "Data-Driven Decisions."],
  "description": "Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your universe, intelligently orchestrated.",
  "ctaButtons": [
    {"text": "Get Started", "href": "/demo", "variant": "default"},
    {"text": "Learn More", "href": "/platform", "variant": "outline"}
  ]
}', 'Hero section with typewriter animation for Home page'),

('Problem Cards Section', 'problem_cards', '{
  "title": "Problems We Solve",
  "cards": [
    {
      "title": "The Business Orchestration Platform",
      "description": "Work from a single source of truth. Break down the walls between departments and tools, work from a unified platform where all your knowledge is connected, accessible, and actionable in one place.",
      "icon": "database-2-line"
    }
  ]
}', 'Section with problem/solution cards for Home page'),

('Introduction Accordion', 'introduction_accordion', '{
  "title": "The Agentic Era is Here",
  "accordionItems": [
    {
      "title": "Your greatest asset is your knowledge",
      "content": "Knowledge is the foundation of every successful business. It''s what drives innovation, informs decisions, and creates competitive advantage.",
      "value": "greatest-asset"
    }
  ]
}', 'Introduction section with accordion for Home page'),

('Logo Carousel', 'logo_carousel', '{
  "title": "Trusted By",
  "logos": [
    {"name": "Company Name", "logo": "/images/logos/company.svg"}
  ]
}', 'Carousel of partner/client logos'),

('Call to Action', 'cta', '{
  "title": "Ready to Get Started?",
  "description": "Take the next step with Elevation AI and transform your business operations.",
  "ctaButtons": [
    {"text": "Start Now", "href": "/demo", "variant": "default"}
  ]
}', 'Call-to-action section with buttons')
) AS v(name, section_type, template_data, description)
WHERE NOT EXISTS (SELECT 1 FROM section_templates WHERE name = v.name);

-- Create view for easy section management
CREATE OR REPLACE VIEW page_sections_with_templates AS
SELECT 
  ps.*,
  p.title as page_title,
  p.slug as page_slug,
  st.name as template_name,
  st.template_data as template_data
FROM page_sections ps
LEFT JOIN pages p ON ps.page_id = p.id
LEFT JOIN section_templates st ON ps.section_type = st.section_type;

-- Grant permissions
GRANT SELECT ON page_sections_with_templates TO authenticated;
GRANT SELECT ON page_sections_with_templates TO anon;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Safe CMS database schema updated successfully!';
    RAISE NOTICE 'All tables and columns created/updated safely';
    RAISE NOTICE 'Section types: hero_typewriter, introduction_accordion, problem_cards, logo_carousel, cta';
    RAISE NOTICE 'Ready for content migration!';
END $$;
