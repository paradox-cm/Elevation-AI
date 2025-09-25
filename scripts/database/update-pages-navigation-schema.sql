-- Update pages table to include navigation fields
-- Run this in your Supabase SQL Editor

-- Add navigation columns to pages table if they don't exist
DO $$ 
BEGIN
    -- Add page_category column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'page_category') THEN
        ALTER TABLE pages ADD COLUMN page_category VARCHAR(50) DEFAULT 'standalone';
    END IF;

    -- Add navigation_position column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'navigation_position') THEN
        ALTER TABLE pages ADD COLUMN navigation_position VARCHAR(50);
    END IF;

    -- Add navigation_order column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages' AND column_name = 'navigation_order') THEN
        ALTER TABLE pages ADD COLUMN navigation_order INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create index for navigation queries
CREATE INDEX IF NOT EXISTS idx_pages_category ON pages(page_category);
CREATE INDEX IF NOT EXISTS idx_pages_navigation_position ON pages(navigation_position);
CREATE INDEX IF NOT EXISTS idx_pages_navigation_order ON pages(page_category, navigation_order);

-- Update existing pages with default navigation settings
UPDATE pages 
SET 
    page_category = 'standalone',
    navigation_order = 0
WHERE page_category IS NULL;

-- Set specific navigation categories for existing pages
UPDATE pages 
SET 
    page_category = 'main_nav',
    navigation_position = 'platform',
    navigation_order = 1
WHERE slug = 'platform';

UPDATE pages 
SET 
    page_category = 'main_nav',
    navigation_position = 'people',
    navigation_order = 2
WHERE slug IN ('people-concierge', 'people-experts');

UPDATE pages 
SET 
    page_category = 'main_nav',
    navigation_position = 'solutions',
    navigation_order = 3
WHERE slug = 'solutions';

UPDATE pages 
SET 
    page_category = 'main_nav',
    navigation_position = 'resources',
    navigation_order = 4
WHERE slug = 'pricing';

UPDATE pages 
SET 
    page_category = 'resources',
    navigation_position = 'about',
    navigation_order = 1
WHERE slug = 'about';

UPDATE pages 
SET 
    page_category = 'resources',
    navigation_position = 'partners',
    navigation_order = 2
WHERE slug = 'partners';

UPDATE pages 
SET 
    page_category = 'resources',
    navigation_position = 'investors',
    navigation_order = 3
WHERE slug = 'investors';

UPDATE pages 
SET 
    page_category = 'resources',
    navigation_position = 'developers',
    navigation_order = 4
WHERE slug = 'developers';

UPDATE pages 
SET 
    page_category = 'resources',
    navigation_position = 'resources',
    navigation_order = 5
WHERE slug IN ('blog', 'faq', 'knowledge-base');

-- Add constraints
ALTER TABLE pages ADD CONSTRAINT check_page_category 
CHECK (page_category IN ('main_nav', 'footer', 'resources', 'standalone'));

-- Add comments for documentation
COMMENT ON COLUMN pages.page_category IS 'Navigation category: main_nav, footer, resources, or standalone';
COMMENT ON COLUMN pages.navigation_position IS 'Position within navigation category (e.g., platform, people, solutions)';
COMMENT ON COLUMN pages.navigation_order IS 'Order within navigation position (0-based)';
