#!/usr/bin/env node

/**
 * Sync Investors Page Content to CMS
 * 
 * This script extracts the current Investors page content and creates
 * corresponding CMS entries for dynamic management.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function syncInvestorsPageToCMS() {
  try {
    console.log('🚀 Starting Investors page sync to CMS...')

    // First, create or get the Investors page
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'investors')
      .single()

    let pageId
    if (existingPage) {
      pageId = existingPage.id
      console.log('✅ Found existing Investors page:', existingPage.id)
    } else {
      // Create the Investors page
      const { data: newPage, error: pageCreateError } = await supabase
        .from('pages')
        .insert({
          slug: 'investors',
          title: 'Investors',
          description: 'Investing in the Agentic Era - Information for investors and stakeholders.',
          meta_title: 'Investors - Elevation AI Investment Opportunities',
          meta_description: 'Led by a top-tier team of enterprise leaders, we are building the essential platform for the agentic era.',
          is_published: true,
          created_by: 'system'
        })
        .select()
        .single()

      if (pageCreateError) throw pageCreateError
      pageId = newPage.id
      console.log('✅ Created new Investors page:', pageId)
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
          title: "Investing in the Agentic Era",
          description: "Led by a top-tier team of enterprise leaders, we are building the essential platform for the agentic era.",
          background_animation: "starfield",
          favicon_url: "/images/Favicon-Stroke.png",
          cta_primary_text: "",
          cta_primary_url: "",
          cta_secondary_text: "",
          cta_secondary_url: ""
        }
      },
      {
        section_type: 'logo_carousel',
        section_order: 2,
        title: 'Logo Grid Section',
        section_data: {
          title: "Led by industry veterans from:",
          logos: [
            { name: "Accenture", filename: "Accenture.svg", showText: true },
            { name: "Apple", filename: "Apple.svg", showText: false },
            { name: "Bank of America", filename: "Bank-of-America.svg", showText: true },
            { name: "BCG Consulting", filename: "BCG-Consulting.svg", showText: false },
            { name: "Morgan Stanley", filename: "Morgan-Stanley.svg", showText: true },
            { name: "Barclays", filename: "Barclays.svg", showText: true },
            { name: "eBay", filename: "ebay.svg", showText: false },
            { name: "Google", filename: "Google.svg", showText: true },
            { name: "Indeed", filename: "Indeed.svg", showText: true },
            { name: "JPM", filename: "JPM.svg", showText: true },
            { name: "McKinsey", filename: "McKinsey.svg", showText: true },
            { name: "Meta", filename: "Meta.svg", showText: true },
            { name: "Tesla", filename: "Tesla.svg", showText: true },
            { name: "Visa", filename: "Visa.svg", showText: true },
            { name: "Microsoft", filename: "Windows.svg", showText: true }
          ]
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 3,
        title: 'The Opportunity Section',
        section_data: {
          title: "The Opportunity",
          content: "The world is undergoing a platform shift to agentic AI, creating a massive new market category. Elevation AI is positioned to lead this shift by providing the essential middleware for the agentic era. Our platform orchestrates an organization's resources—its people, data, and agents—creating a deep, defensible competitive advantage through proprietary knowledge graphs and powerful network effects."
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 4,
        title: 'Business Model Section',
        section_data: {
          title: "A Scalable Business Model",
          content: "Our unique model combines a scalable SaaS platform with a high-touch concierge support team that drives adoption and creates deep, trusted relationships with our clients. This allows us to deliver the strategic impact of a dedicated expert partnership while maintaining the scalable model of a platform company."
        }
      },
      {
        section_type: 'cta',
        section_order: 5,
        title: 'Ideal Partners Section',
        section_data: {
          title: "Our Ideal Partners",
          description: "We are currently engaging with a select group of strategic investors. We seek partners who believe in the profound shift to the agentic era. Our ideal partners are investing aggressively into this change. They can create a \"1+1=3\" effect through their network and expertise. We are also interested in investors who are already starting to use this technology in their own operations.",
          cta_primary_text: "Contact Us",
          cta_primary_url: "/website/contact"
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

    console.log('🎉 Investors page sync completed successfully!')
    console.log(`📄 Page ID: ${pageId}`)
    console.log(`📊 Sections created: ${sections.length}`)

  } catch (error) {
    console.error('❌ Error syncing Investors page to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncInvestorsPageToCMS()
