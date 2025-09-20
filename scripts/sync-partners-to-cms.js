#!/usr/bin/env node

/**
 * Sync Partners Page Content to CMS
 * 
 * This script extracts the current Partners page content and creates
 * corresponding CMS entries for dynamic management.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function syncPartnersPageToCMS() {
  try {
    console.log('🚀 Starting Partners page sync to CMS...')

    // First, create or get the Partners page
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'partners')
      .single()

    let pageId
    if (existingPage) {
      pageId = existingPage.id
      console.log('✅ Found existing Partners page:', existingPage.id)
    } else {
      // Create the Partners page
      const { data: newPage, error: pageCreateError } = await supabase
        .from('pages')
        .insert({
          slug: 'partners',
          title: 'Partners',
          description: 'Partner with Elevation AI - Join our ecosystem of trusted ambassadors, consulting firms, and experts.',
          meta_title: 'Partners - Elevation AI Partnership Opportunities',
          meta_description: 'Join our ecosystem of trusted ambassadors, consulting firms, and experts to help bring the power of agentic AI to businesses everywhere.',
          is_published: true,
          created_by: 'system'
        })
        .select()
        .single()

      if (pageCreateError) throw pageCreateError
      pageId = newPage.id
      console.log('✅ Created new Partners page:', pageId)
    }

    // Clear existing sections
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', pageId)

    if (deleteError) throw deleteError
    console.log('🧹 Cleared existing sections')

    // Define sections data
    const sections = [
      {
        section_type: 'hero_simple',
        section_order: 1,
        title: 'Hero Section',
        section_data: {
          title: "Partner with Elevation AI",
          description: "Join our ecosystem of trusted ambassadors, consulting firms, and experts to help bring the power of agentic AI to businesses everywhere.",
          cta_primary_text: "",
          cta_primary_url: "",
          cta_secondary_text: "",
          cta_secondary_url: ""
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 2,
        title: 'Ambassador Program Section',
        section_data: {
          title: "Become an Ambassador",
          content: "Our Ambassador program is for well-connected leaders who can provide warm introductions to their network. We believe that the best partnerships start with trust, and we value your ability to open the right doors. In return, we offer a generous referral program and the opportunity to be at the center of the agentic AI ecosystem.",
          cta_text: "Inquire About Our Ambassador Program",
          cta_url: "/website/partnership?type=ambassador"
        }
      },
      {
        section_type: 'platform_features',
        section_order: 3,
        title: 'Partner Network Section',
        section_data: {
          badge_text: "Partner Network",
          badge_icon: "team-line",
          section_title: "Join Our Partner Network",
          description: "We are building a network of specialized consulting firms and individual experts who natively use our platform to serve their clients and extend their own capabilities. By partnering with us, you can:",
          features: [
            {
              title: "Deliver AI-Powered Solutions",
              description: "Use our platform as the agentic backbone to build and deliver scalable, high-margin solutions for your clients.",
              icon: "rocket-line",
              order: 1
            },
            {
              title: "Seamlessly Embed with Clients",
              description: "Collaborate directly within your clients' workspaces, giving you an unprecedented level of integration and partnership.",
              icon: "link-line",
              order: 2
            },
            {
              title: "Extend Your Capacity",
              description: "Leverage our library of agents and tools to augment your own expertise and take on more complex challenges.",
              icon: "growth-line",
              order: 3
            }
          ],
          cta_text: "Apply to Our Partner Network",
          cta_url: "/website/partnership?type=partner"
        }
      }
    ]

    // Insert sections
    for (const section of sections) {
      const { data: newSection, error: sectionError } = await supabase
        .from('page_sections')
        .insert({
          page_id: pageId,
          ...section,
          is_published: true
        })
        .select()
        .single()

      if (sectionError) throw sectionError
      console.log(`✅ Created section: ${section.title} (${section.section_type})`)
    }

    console.log('🎉 Partners page sync completed successfully!')
    console.log(`📄 Page ID: ${pageId}`)
    console.log(`📊 Sections created: ${sections.length}`)

  } catch (error) {
    console.error('❌ Error syncing Partners page to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncPartnersPageToCMS()
