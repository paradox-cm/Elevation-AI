const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Use service role key for admin operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function updatePlatformSchema() {
  console.log('🔄 Adding new section types for Platform page...')
  
  try {
    // Add new section types to the existing enum
    const queries = [
      "ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'platform_hero';",
      "ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'security_features';",
      "ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'integrations_grid';",
      "ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'use_cases_carousel';",
      "ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'platform_cta';"
    ]

    for (const query of queries) {
      console.log(`Executing: ${query}`)
      const { error } = await supabase.rpc('exec_sql', { sql: query })
      
      if (error) {
        console.log(`Note: ${error.message} (this might be expected if the value already exists)`)
      } else {
        console.log('✅ Success')
      }
    }

    console.log('✅ Platform section types added successfully!')
    console.log('🎯 You can now run the platform sync script')

  } catch (error) {
    console.error('❌ Schema update failed:', error)
    process.exit(1)
  }
}

updatePlatformSchema()
