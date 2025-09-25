const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function createPressTable() {
  try {
    console.log('🔄 Creating press_articles table...')

    // First, let's check if the table exists
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'press_articles')

    if (tablesError) {
      console.log('⚠️ Could not check existing tables, proceeding with creation...')
    } else if (tables && tables.length > 0) {
      console.log('✅ press_articles table already exists')
      return
    }

    // Try to create the table using a different approach
    console.log('📋 Attempting to create table...')
    
    // Insert a test record to see if table exists
    const { error: testError } = await supabase
      .from('press_articles')
      .select('id')
      .limit(1)

    if (testError && testError.code === 'PGRST205') {
      console.log('❌ Table does not exist. Please create it manually in Supabase dashboard.')
      console.log('📋 Run this SQL in your Supabase SQL Editor:')
      console.log(`
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
      `)
      return
    } else if (testError) {
      console.log('❌ Error testing table:', testError)
      return
    } else {
      console.log('✅ press_articles table exists and is accessible')
    }

  } catch (error) {
    console.error('❌ Error creating press table:', error)
  }
}

createPressTable()
  .then(() => {
    console.log('✅ Table check completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Table check failed:', error)
    process.exit(1)
  })
