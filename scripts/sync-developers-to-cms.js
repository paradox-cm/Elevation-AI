#!/usr/bin/env node

/**
 * Sync Developers Page Content to CMS
 * 
 * This script extracts the current Developers page content and creates
 * corresponding CMS entries for dynamic management.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function syncDevelopersPageToCMS() {
  try {
    console.log('🚀 Starting Developers page sync to CMS...')

    // First, create or get the Developers page
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'developers')
      .single()

    let pageId
    if (existingPage) {
      pageId = existingPage.id
      console.log('✅ Found existing Developers page:', existingPage.id)
    } else {
      // Create the Developers page
      const { data: newPage, error: pageCreateError } = await supabase
        .from('pages')
        .insert({
          slug: 'developers',
          title: 'Developers',
          description: 'Build on the Operating System for the Agentic Era - Integrate your agents and platforms with Elevation AI.',
          meta_title: 'For Developers & Platforms - Elevation AI Integration',
          meta_description: 'Integrate your agents and platforms with Elevation AI to gain access to a high-value customer base and participate in a thriving, collaborative ecosystem.',
          is_published: true,
          created_by: 'system'
        })
        .select()
        .single()

      if (pageCreateError) throw pageCreateError
      pageId = newPage.id
      console.log('✅ Created new Developers page:', pageId)
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
          title: "Build on the Operating System for the Agentic Era",
          description: "Integrate your agents and platforms with Elevation AI to gain access to a high-value customer base and participate in a thriving, collaborative ecosystem.",
          cta_primary_text: "",
          cta_primary_url: "",
          cta_secondary_text: "",
          cta_secondary_url: ""
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 2,
        title: 'Integration Section',
        section_data: {
          title: "We Handle the Integration, You Focus on Innovation",
          content: "Elevation AI is the essential middleware layer for the agentic era. By integrating with our platform, you gain instant, secure access to our entire network of enterprise and private market clients. We handle the complexities of security, data integration, and the client relationship, allowing you to focus on what you do best: building world-class agents and agentic tools."
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 3,
        title: 'Animation Section',
        section_data: {
          title: "Visual Integration",
          content: "Experience the power of our platform through our interactive business data visualization.",
          animation_type: "business_data",
          overlay_image: "/images/E-Arrow.svg",
          overlay_alt: "Elevation AI Arrow",
          min_height: "400px",
          overlay_width: 120,
          overlay_height: 120,
          overlay_opacity: 0.8
        }
      },
      {
        section_type: 'platform_features',
        section_order: 4,
        title: 'Revenue Path Section',
        section_data: {
          section_title: "A Clear Path to Revenue",
          description: "",
          features: [
            {
              title: "1. Clients Receive Credits",
              description: "Our clients subscribe to packages that include a monthly allotment of credits, which they can use for any resource in our ecosystem.",
              order: 1
            },
            {
              title: "2. Your Agent is Discoverable",
              description: "Your agent or tool is listed in our central Library. Any agent available through standard protocols (like A2A or MCP) can be discovered and integrated.",
              order: 2
            },
            {
              title: "3. Clients Deploy Your Agent",
              description: "When a client uses their credits to deploy your agent in one of their workflows, you get paid. These credits translate directly into revenue for you.",
              order: 3
            }
          ]
        }
      },
      {
        section_type: 'cta',
        section_order: 5,
        title: 'Commitment Section',
        section_data: {
          title: "Let's Build the Future, Together",
          description: "We believe that the future of agentic AI is not a walled garden, but a vibrant, open ecosystem. We are committed to fostering a community where the best ideas can be discovered, deployed, and monetized. By building on Elevation AI, you are not just integrating with a platform; you are joining a movement to build the agentic future.",
          cta_primary_text: "Apply to Our Developer Program",
          cta_primary_url: "#apply",
          background_gradient: "from-primary/10 to-primary/5",
          border_color: "primary/20"
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

    console.log('🎉 Developers page sync completed successfully!')
    console.log(`📄 Page ID: ${pageId}`)
    console.log(`📊 Sections created: ${sections.length}`)

  } catch (error) {
    console.error('❌ Error syncing Developers page to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncDevelopersPageToCMS()
