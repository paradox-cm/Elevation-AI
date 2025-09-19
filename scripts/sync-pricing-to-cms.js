const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Use service role key for admin operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Extract exact content from the current /pricing page
// This represents the master content that should be in the CMS
const pricingPageMasterContent = {
  page: {
    title: 'Pricing',
    slug: 'pricing',
    description: 'Transparent pricing for every organization - build your custom plan',
    meta_title: 'Pricing - Elevation AI',
    meta_description: 'Our platform is not one-size-fits-all, and neither is our pricing. We believe in a transparent, value-aligned model that provides the specific capabilities you need to succeed.',
    is_published: true
  },
  sections: [
    {
      order_index: 1,
      section_type: 'hero_simple',
      title: 'Pricing Hero Section',
      section_data: {
        title: 'Transparent Pricing for Every Organization',
        description: 'Our platform is not one-size-fits-all, and neither is our pricing. We believe in a transparent, value-aligned model that provides the specific capabilities you need to succeed.',
        ctaButtons: [
          { text: 'Get a Custom Quote', href: '#consultation', variant: 'default', action: 'openConsultation' },
          { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
        ],
        visualType: 'logo',
        logoPath: '/images/branding/E-AI-Circle.svg'
      },
      is_published: true
    },
    {
      order_index: 2,
      section_type: 'problem_cards',
      title: 'How It Works Section',
      section_data: {
        title: 'How It Works',
        description: 'Three simple steps to get your custom plan',
        cards: [
          {
            title: 'Tell Us About Your Universe',
            description: 'Share key details about your organization and core needs.',
            icon: 'user-line'
          },
          {
            title: 'Select Your Core Capabilities',
            description: 'Select platform features and support levels that match your goals.',
            icon: 'settings-line'
          },
          {
            title: 'Receive Your Custom Plan',
            description: 'Get your custom plan and pricing estimate ready for review.',
            icon: 'file-text-line'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 3,
      section_type: 'cta',
      title: 'Get Custom Quote Section',
      section_data: {
        title: 'Get a Custom Quote',
        description: 'Schedule a consultation to receive your personalized pricing',
        ctaButtons: [
          { text: 'Get a Custom Quote', href: '#consultation', variant: 'default', action: 'openConsultation' }
        ],
        hasAnimation: true,
        animationType: 'growth'
      },
      is_published: true
    },
    {
      order_index: 4,
      section_type: 'cta',
      title: 'Pricing CTA Section',
      section_data: {
        title: 'Ready to Transform Your Operations?',
        description: 'Discover how Elevation AI can unify your knowledge, secure your operations, and orchestrate intelligent workflows across your organization.',
        ctaButtons: [
          { text: 'Request a Demo', href: '/website/demo', variant: 'default' },
          { text: 'Get in Touch', href: '/website/contact', variant: 'outline' }
        ],
        backgroundColor: 'bg-muted/30'
      },
      is_published: true
    }
  ]
}

async function syncPricingToCMS() {
  console.log('🔄 Syncing current /pricing page content to CMS...')
  console.log('📋 This will make the current pricing page content the master source for the CMS')
  
  try {
    // First, try to add the new section types if they don't exist
    console.log('🔧 Adding new section types for pricing page...')
    const newSectionTypes = ['pricing_hero', 'how_it_works', 'calculate_plan', 'pricing_cta']
    
    for (const sectionType of newSectionTypes) {
      try {
        // Try to insert a test record to see if the enum value exists
        const { error } = await supabase
          .from('page_sections')
          .insert({
            page_id: '00000000-0000-0000-0000-000000000000', // dummy ID
            section_type: sectionType,
            section_order: 0,
            title: 'test',
            section_data: {},
            is_published: false
          })
          .select()
        
        if (error && error.message.includes('invalid input value for enum section_type')) {
          console.log(`⚠️ Section type '${sectionType}' needs to be added to the database enum`)
          console.log(`   Please run: ALTER TYPE section_type ADD VALUE '${sectionType}';`)
        } else if (error && error.message.includes('foreign key')) {
          console.log(`✅ Section type '${sectionType}' exists`)
        }
      } catch (err) {
        console.log(`⚠️ Could not test section type '${sectionType}': ${err.message}`)
      }
    }
    // Get or create the pricing page
    let { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'pricing')
      .single()

    if (pageError && pageError.code !== 'PGRST116') {
      throw pageError
    }

    if (!page) {
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert(pricingPageMasterContent.page)
        .select()
        .single()

      if (createError) throw createError
      page = newPage
      console.log('📄 Created new Pricing page in CMS')
    } else {
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update(pricingPageMasterContent.page)
        .eq('id', page.id)

      if (updateError) throw updateError
      console.log('📄 Updated existing Pricing page in CMS')
    }

    // Clear existing sections
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', page.id)

    if (deleteError) throw deleteError
    console.log('🗑️ Cleared existing sections')

    // Create new sections with exact content from current pricing page
    const sectionsToInsert = pricingPageMasterContent.sections.map(section => ({
      page_id: page.id,
      section_type: section.section_type,
      section_order: section.order_index,
      title: section.title,
      section_data: section.section_data,
      is_published: section.is_published
    }))

    const { data: insertedSections, error: insertError } = await supabase
      .from('page_sections')
      .insert(sectionsToInsert)
      .select()

    if (insertError) throw insertError

    console.log('✅ Pricing page content successfully synced to CMS!')
    console.log(`📊 Created ${insertedSections.length} sections in CMS`)
    console.log('🎯 The current /pricing page content is now the master source in the CMS')
    console.log('⚙️ You can now edit this content through: /admin/pages')
    console.log('📝 The /pricing page remains exactly as it is - no changes to the frontend')
    console.log('🚫 Note: The consultation request modal is excluded from CMS editing')

  } catch (error) {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  }
}

syncPricingToCMS()
