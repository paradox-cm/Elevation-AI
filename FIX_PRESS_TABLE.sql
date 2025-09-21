-- Fix Press Articles Table - Handle Existing Policies
-- Run this in your Supabase SQL Editor

-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Press articles are viewable by everyone when published" ON press_articles;
DROP POLICY IF EXISTS "Authenticated users can manage press articles" ON press_articles;

-- Drop the table if it exists (this will remove all data, but since it's new, that's fine)
DROP TABLE IF EXISTS press_articles CASCADE;

-- Create the table fresh
CREATE TABLE press_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  article_type VARCHAR(50) NOT NULL CHECK (article_type IN ('press_release', 'media_coverage')),
  category VARCHAR(100),
  source VARCHAR(255),
  external_url VARCHAR(500),
  read_time VARCHAR(50),
  featured_image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_press_articles_type ON press_articles(article_type);
CREATE INDEX idx_press_articles_published ON press_articles(is_published, published_at);
CREATE INDEX idx_press_articles_slug ON press_articles(slug);

-- Enable RLS
ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Press articles are viewable by everyone when published" ON press_articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can manage press articles" ON press_articles
  FOR ALL USING (auth.role() = 'authenticated');

-- Verify the table was created successfully
SELECT 'Press articles table created successfully!' as status;
