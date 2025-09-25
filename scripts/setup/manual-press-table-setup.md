# Manual Press Table Setup

Since the automated table creation isn't working, please run this SQL in your Supabase dashboard:

## 1. Create the press_articles table

```sql
CREATE TABLE IF NOT EXISTS press_articles (
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
```

## 2. Create indexes for better performance

```sql
CREATE INDEX IF NOT EXISTS idx_press_articles_type ON press_articles(article_type);
CREATE INDEX IF NOT EXISTS idx_press_articles_published ON press_articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_press_articles_slug ON press_articles(slug);
```

## 3. Enable RLS (Row Level Security)

```sql
ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;
```

## 4. Create RLS policies

```sql
-- Allow everyone to view published articles
CREATE POLICY "Press articles are viewable by everyone when published" ON press_articles
  FOR SELECT USING (is_published = true);

-- Allow authenticated users to manage articles
CREATE POLICY "Authenticated users can manage press articles" ON press_articles
  FOR ALL USING (auth.role() = 'authenticated');
```

## 5. Test the setup

After running the above SQL, you can test by:

1. Going to `/admin/press` - should show the press admin interface
2. Creating a new press release or media coverage article
3. Visiting `/website/press` - should display the articles

## 6. Sample data (optional)

If you want to add some sample data:

```sql
INSERT INTO press_articles (title, slug, excerpt, content, article_type, category, read_time, is_published, published_at) VALUES
('Elevation AI Raises $25M Series A', 'elevation-ai-raises-25m-series-a', 'Company announces major funding round led by leading venture capital firms', 'Full press release content here...', 'press_release', 'Funding', '3 min read', true, NOW()),
('The Future of Enterprise AI', 'future-of-enterprise-ai', 'Deep dive into how Elevation AI is transforming enterprise operations', 'Article content here...', 'media_coverage', 'Feature', '8 min read', true, NOW());
```
