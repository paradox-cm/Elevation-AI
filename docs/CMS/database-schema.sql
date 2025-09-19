-- Elevation AI CMS Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE section_type AS ENUM (
  'hero',
  'introduction',
  'problem_cards',
  'platform_features',
  'cta',
  'faq',
  'logo_carousel',
  'team_members',
  'partnership_info',
  'investment_info',
  'blog_listing',
  'custom'
);

-- Pages table
CREATE TABLE pages (
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

-- Page sections table
CREATE TABLE page_sections (
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

-- FAQ categories table
CREATE TABLE faq_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100) NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table
CREATE TABLE faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES faq_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog categories table
CREATE TABLE blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- Hex color code
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500), -- URL to image
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media table for file uploads
CREATE TABLE media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size BIGINT NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(is_published);
CREATE INDEX idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX idx_page_sections_order ON page_sections(page_id, section_order);
CREATE INDEX idx_faqs_category_id ON faqs(category_id);
CREATE INDEX idx_faqs_published ON faqs(is_published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
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

-- Enable Row Level Security (RLS)
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for pages" ON pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for page sections" ON page_sections
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for faq categories" ON faq_categories
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for faqs" ON faqs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for blog categories" ON blog_categories
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for media" ON media
  FOR SELECT USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin full access for pages" ON pages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for page sections" ON page_sections
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for faq categories" ON faq_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for faqs" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for blog categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for media" ON media
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial data
INSERT INTO pages (slug, title, description, is_published, created_by) VALUES
('home', 'Home', 'Elevation AI Homepage', true, (SELECT id FROM auth.users LIMIT 1)),
('platform', 'Platform', 'Elevation AI Platform Page', true, (SELECT id FROM auth.users LIMIT 1)),
('people', 'People', 'Elevation AI People Page', true, (SELECT id FROM auth.users LIMIT 1)),
('about', 'About', 'About Elevation AI', true, (SELECT id FROM auth.users LIMIT 1)),
('partners', 'Partners', 'Partnership Opportunities', true, (SELECT id FROM auth.users LIMIT 1)),
('investors', 'Investors', 'Investment Information', true, (SELECT id FROM auth.users LIMIT 1)),
('developers', 'Developers', 'Developer Resources', true, (SELECT id FROM auth.users LIMIT 1)),
('pricing', 'Pricing', 'Pricing Plans', true, (SELECT id FROM auth.users LIMIT 1)),
('blog', 'Blog', 'Elevation AI Blog', true, (SELECT id FROM auth.users LIMIT 1)),
('faq', 'FAQ', 'Frequently Asked Questions', true, (SELECT id FROM auth.users LIMIT 1));

-- Insert initial FAQ categories
INSERT INTO faq_categories (title, description, icon, order_index) VALUES
('Platform & Architecture', 'How Elevation AI fits into your tech stack and core platform concepts', 'computer-line', 1),
('Security, Privacy & Compliance', 'Data protection, privacy controls, and compliance standards', 'shield-check-line', 2),
('Governance & Quality', 'Data quality, accuracy controls, and governance features', 'settings-line', 3),
('Integrations & Extensibility', 'Native integrations, APIs, and custom development options', 'links-line', 4),
('Implementation & Success', 'Onboarding process, concierge services, and success metrics', 'tools-line', 5),
('Pricing & Licensing', 'Cost structure, credits, and licensing options', 'money-dollar-circle-line', 6),
('Data Lifecycle & Portability', 'Data import, export, and deletion processes', 'database-line', 7),
('SLAs, Support & Reliability', 'Uptime guarantees, support tiers, and business continuity', 'customer-service-line', 8),
('Segment-Specific', 'Specialized features for different industry segments', 'building-line', 9),
('Legal & Procurement', 'Contracts, IP ownership, and procurement requirements', 'file-text-line', 10),
('Internationalization & Accessibility', 'Language support and accessibility standards', 'global-line', 11);

-- Insert initial blog categories
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Product Updates', 'product-updates', 'Latest product features and improvements', '#3B82F6'),
('Industry Insights', 'industry-insights', 'Thoughts on AI and business transformation', '#10B981'),
('Case Studies', 'case-studies', 'Real-world implementations and success stories', '#F59E0B'),
('Technical Deep Dives', 'technical-deep-dives', 'Technical articles and implementation guides', '#8B5CF6');

-- Insert initial site settings
INSERT INTO site_settings (key, value, description, updated_by) VALUES
('site_title', 'Elevation AI', 'Main site title', (SELECT id FROM auth.users LIMIT 1)),
('site_description', 'The agentic platform for intelligent operations', 'Main site description', (SELECT id FROM auth.users LIMIT 1)),
('contact_email', 'hello@elevationai.com', 'Main contact email', (SELECT id FROM auth.users LIMIT 1)),
('hero_title', 'The Agentic Platform for', 'Hero section title', (SELECT id FROM auth.users LIMIT 1)),
('hero_subtitle', 'Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your universe, intelligently orchestrated.', 'Hero section subtitle', (SELECT id FROM auth.users LIMIT 1));

