const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function setupPressAdmin() {
  try {
    console.log('🔄 Setting up Press Admin system...')

    // Read and execute the database schema
    const schemaSQL = fs.readFileSync('scripts/database/create-press-schema.sql', 'utf8')
    console.log('📋 Database schema loaded')

    // Create the press_articles table
    console.log('🗄️ Creating press_articles table...')
    const { error: tableError } = await supabase.rpc('exec_sql', { sql: schemaSQL })
    
    if (tableError) {
      console.log('⚠️ Table might already exist, continuing...')
    } else {
      console.log('✅ Press articles table created successfully')
    }

    // Migrate existing press data from page sections
    console.log('🔄 Migrating existing press data...')
    
    // Get the press page
    const { data: pressPage, error: pageError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'press')
      .single()

    if (pageError || !pressPage) {
      console.log('⚠️ Press page not found, skipping migration')
    } else {
      // Get press sections
      const { data: pressSections, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pressPage.id)
        .eq('section_type', 'custom')

      if (sectionsError) {
        console.log('⚠️ Error fetching press sections:', sectionsError)
      } else if (pressSections && pressSections.length > 0) {
        console.log(`📄 Found ${pressSections.length} press sections to migrate`)

        for (const section of pressSections) {
          const sectionData = section.section_data
          const pressSectionType = sectionData?.press_section_type

          if (pressSectionType === 'press_releases' && sectionData?.releases) {
            console.log('📰 Migrating press releases...')
            for (const release of sectionData.releases) {
              const slug = release.title
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-')

              const { error: insertError } = await supabase
                .from('press_articles')
                .insert({
                  title: release.title || '',
                  slug: slug,
                  excerpt: release.excerpt || '',
                  content: release.excerpt || '',
                  article_type: 'press_release',
                  category: release.category || '',
                  read_time: release.readTime || '',
                  is_published: true,
                  published_at: release.date ? new Date(release.date).toISOString() : new Date().toISOString()
                })

              if (insertError) {
                console.log('⚠️ Error inserting press release:', insertError)
              }
            }
          }

          if (pressSectionType === 'media_coverage' && sectionData?.articles) {
            console.log('📺 Migrating media coverage...')
            for (const article of sectionData.articles) {
              const slug = article.title
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-')

              const { error: insertError } = await supabase
                .from('press_articles')
                .insert({
                  title: article.title || '',
                  slug: slug,
                  excerpt: article.excerpt || '',
                  content: article.excerpt || '',
                  article_type: 'media_coverage',
                  category: article.category || '',
                  source: article.source || '',
                  external_url: '#', // Placeholder since we don't have URLs in the old data
                  read_time: article.readTime || '',
                  is_published: true,
                  published_at: article.date ? new Date(article.date).toISOString() : new Date().toISOString()
                })

              if (insertError) {
                console.log('⚠️ Error inserting media coverage:', insertError)
              }
            }
          }
        }
      }
    }

    console.log('🎉 Press Admin setup completed successfully!')
    console.log('📋 Next steps:')
    console.log('   1. Visit /admin/press to manage press articles')
    console.log('   2. Create new press releases and media coverage')
    console.log('   3. Update the press page to use the new article system')

  } catch (error) {
    console.error('❌ Error setting up Press Admin:', error)
    throw error
  }
}

// Run the setup
setupPressAdmin()
  .then(() => {
    console.log('✅ Setup completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  })
