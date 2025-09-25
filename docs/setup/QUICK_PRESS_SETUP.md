# Quick Press Setup - Fix the Error

## The Problem
You're getting an error when trying to create press releases because the `press_articles` table doesn't exist in your Supabase database yet.

## The Solution
Run this SQL in your Supabase dashboard:

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Go to the "SQL Editor" tab
3. Create a new query

### Step 2: Run This SQL
Copy and paste this entire SQL block:

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

CREATE INDEX IF NOT EXISTS idx_press_articles_type ON press_articles(article_type);
CREATE INDEX IF NOT EXISTS idx_press_articles_published ON press_articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_press_articles_slug ON press_articles(slug);

ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Press articles are viewable by everyone when published" ON press_articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can manage press articles" ON press_articles
  FOR ALL USING (auth.role() = 'authenticated');
```

### Step 3: Run the Query
Click "Run" to execute the SQL.

### Step 4: Test
1. Go to `/admin/press` in your app
2. Try creating a new press release
3. It should work now!

## What This Does
- Creates the `press_articles` table with all necessary fields
- Sets up proper indexes for performance
- Enables Row Level Security (RLS)
- Creates policies so published articles are visible to everyone
- Allows authenticated users to manage articles

## After Setup
Once the table is created, you can:
- Create press releases at `/admin/press/press-releases/new`
- Create media coverage at `/admin/press/media-coverage/new`
- View all articles at `/admin/press`
- See published articles at `/website/press`

That's it! The error should be resolved. 🎉
