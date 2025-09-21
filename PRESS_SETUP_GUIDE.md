# Press System Setup Guide

## Overview
The press system has been completely restructured to work as a dedicated admin section (like FAQs and Blog) instead of being part of the pages CMS.

## Database Setup Required

### Step 1: Create the press_articles table
Run this SQL in your Supabase SQL Editor:

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

### Step 2: Create indexes for performance
```sql
CREATE INDEX IF NOT EXISTS idx_press_articles_type ON press_articles(article_type);
CREATE INDEX IF NOT EXISTS idx_press_articles_published ON press_articles(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_press_articles_slug ON press_articles(slug);
```

### Step 3: Enable Row Level Security
```sql
ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;
```

### Step 4: Create RLS policies
```sql
-- Allow everyone to view published articles
CREATE POLICY "Press articles are viewable by everyone when published" ON press_articles
  FOR SELECT USING (is_published = true);

-- Allow authenticated users to manage articles
CREATE POLICY "Authenticated users can manage press articles" ON press_articles
  FOR ALL USING (auth.role() = 'authenticated');
```

## How to Use

### Admin Interface
1. **Visit `/admin/press`** - Main press management interface
2. **Create Press Releases** - Click "New Press Release" button
3. **Create Media Coverage** - Click "New Media Coverage" button
4. **Manage Articles** - Edit, delete, publish/unpublish articles
5. **Search & Filter** - Find articles by title, category, or type

### Website Display
1. **Visit `/website/press`** - Public press page
2. **Press Releases Section** - Shows all published press releases
3. **Media Coverage Section** - Shows all published media coverage
4. **Media Resources** - Hardcoded resources (not in CMS)
5. **Media Contact** - Hardcoded contact info (not in CMS)

## Features

### Press Releases
- Title, excerpt, content
- Category (Funding, Product, Partnership, etc.)
- Read time
- Featured image
- Publish/unpublish status
- Publication date

### Media Coverage
- Title, excerpt, content
- Source (TechCrunch, Forbes, etc.)
- External URL (links to original article)
- Category (Feature, Analysis, News, etc.)
- Read time
- Featured image
- Publish/unpublish status
- Publication date

## Migration from Old System

The old press page (`e89a6e33-3d22-4fc1-8f98-bc2cd71603e0`) has been completely removed from the pages CMS. All press content is now managed through the dedicated press admin system.

## Troubleshooting

### "Table does not exist" error
- Make sure you've run the SQL commands above in Supabase
- Check that the table was created successfully
- Verify RLS policies are in place

### No articles showing
- Check that articles are marked as `is_published = true`
- Verify the `published_at` date is set
- Check browser console for any errors

### Permission errors
- Ensure RLS policies are correctly set up
- Check that you're authenticated as an admin user
- Verify the `created_by` field references a valid user ID

## File Structure

```
src/app/admin/press/
├── page.tsx                    # Main press admin interface
├── press-releases/
│   └── new/page.tsx           # Create new press release
└── media-coverage/
    └── new/page.tsx           # Create new media coverage

src/app/website/press/
└── page.tsx                   # Public press page

scripts/
├── create-press-table.js      # Table creation helper
└── setup-press-admin.js       # Full setup script
```

## Next Steps

1. **Create the database table** using the SQL above
2. **Test the admin interface** at `/admin/press`
3. **Create some sample articles** to test the system
4. **Verify the public page** at `/website/press` displays correctly
5. **Customize the styling** if needed to match your brand
