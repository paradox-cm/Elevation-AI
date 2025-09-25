const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function createPressTableDirect() {
  try {
    console.log('🔄 Creating press_articles table directly...')

    // Try to create the table using raw SQL execution
    const createTableSQL = `
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
    `

    // Try different methods to execute SQL
    console.log('📋 Attempting to create table...')
    
    // Method 1: Try using rpc with exec_sql
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL })
      if (error) throw error
      console.log('✅ Table created successfully using exec_sql')
    } catch (execError) {
      console.log('⚠️ exec_sql failed, trying alternative method...')
      
      // Method 2: Try using rpc with exec
      try {
        const { data, error } = await supabase.rpc('exec', { sql: createTableSQL })
        if (error) throw error
        console.log('✅ Table created successfully using exec')
      } catch (exec2Error) {
        console.log('⚠️ exec failed, trying direct SQL execution...')
        
        // Method 3: Try direct SQL execution
        try {
          const { data, error } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .eq('table_name', 'press_articles')
          
          if (error) throw error
          
          if (data && data.length > 0) {
            console.log('✅ Table already exists')
          } else {
            console.log('❌ Cannot create table automatically. Please run this SQL in your Supabase dashboard:')
            console.log('\n' + '='.repeat(80))
            console.log(createTableSQL)
            console.log('='.repeat(80))
            console.log('\nThen run these additional commands:')
            console.log(`
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
          }
        } catch (directError) {
          console.log('❌ Direct execution failed:', directError.message)
          console.log('\nPlease run this SQL in your Supabase dashboard:')
          console.log('\n' + '='.repeat(80))
          console.log(createTableSQL)
          console.log('='.repeat(80))
          return
        }
      }
    }

    // Create indexes
    console.log('📋 Creating indexes...')
    const indexSQL = `
      CREATE INDEX IF NOT EXISTS idx_press_articles_type ON press_articles(article_type);
      CREATE INDEX IF NOT EXISTS idx_press_articles_published ON press_articles(is_published, published_at);
      CREATE INDEX IF NOT EXISTS idx_press_articles_slug ON press_articles(slug);
    `
    
    try {
      await supabase.rpc('exec_sql', { sql: indexSQL })
      console.log('✅ Indexes created successfully')
    } catch (indexError) {
      console.log('⚠️ Could not create indexes automatically, but table was created')
    }

    // Enable RLS
    console.log('📋 Enabling Row Level Security...')
    const rlsSQL = `ALTER TABLE press_articles ENABLE ROW LEVEL SECURITY;`
    
    try {
      await supabase.rpc('exec_sql', { sql: rlsSQL })
      console.log('✅ RLS enabled successfully')
    } catch (rlsError) {
      console.log('⚠️ Could not enable RLS automatically')
    }

    // Create policies
    console.log('📋 Creating RLS policies...')
    const policySQL = `
      CREATE POLICY "Press articles are viewable by everyone when published" ON press_articles
        FOR SELECT USING (is_published = true);
      
      CREATE POLICY "Authenticated users can manage press articles" ON press_articles
        FOR ALL USING (auth.role() = 'authenticated');
    `
    
    try {
      await supabase.rpc('exec_sql', { sql: policySQL })
      console.log('✅ RLS policies created successfully')
    } catch (policyError) {
      console.log('⚠️ Could not create policies automatically')
    }

    console.log('🎉 Press articles table setup completed!')
    console.log('📋 You can now create press releases and media coverage articles.')

  } catch (error) {
    console.error('❌ Error setting up press table:', error)
    console.log('\nPlease run this SQL manually in your Supabase dashboard:')
    console.log('\n' + '='.repeat(80))
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
    console.log('='.repeat(80))
  }
}

createPressTableDirect()
  .then(() => {
    console.log('✅ Setup completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  })
