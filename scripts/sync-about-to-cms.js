#!/usr/bin/env node

/**
 * Sync About Page Content to CMS
 * 
 * This script extracts the current About page content and creates
 * corresponding CMS entries for dynamic management.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function syncAboutPageToCMS() {
  try {
    console.log('🚀 Starting About page sync to CMS...')

    // First, create or get the About page
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'about')
      .single()

    let pageId
    if (existingPage) {
      pageId = existingPage.id
      console.log('✅ Found existing About page:', existingPage.id)
    } else {
      // Create the About page
      const { data: newPage, error: pageCreateError } = await supabase
        .from('pages')
        .insert({
          slug: 'about',
          title: 'About Elevation AI',
          description: 'Learn about our mission, principles, and vision for transforming business orchestration.',
          meta_title: 'About Elevation AI - Mission, Principles & Vision',
          meta_description: 'Discover how Elevation AI is transforming business orchestration through unified knowledge and secure, agentic AI.',
          is_published: true,
          created_by: 'system'
        })
        .select()
        .single()

      if (pageCreateError) throw pageCreateError
      pageId = newPage.id
      console.log('✅ Created new About page:', pageId)
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
        section_type: 'hero_typewriter',
        section_order: 1,
        title: 'Hero Section',
        section_data: {
          initial_text: "Transforming business orchestration.",
          cycling_words: [
            "Transforming business orchestration.",
            "Unifying knowledge across organizations.",
            "Orchestrating secure, agentic AI.",
            "Building the future of intelligent operations.",
            "Welcome to Elevation AI"
          ],
          typewriter_speed: 100,
          cycling_delay: 3000,
          cycling_speed: 80
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 2,
        title: 'Mission Section',
        section_data: {
          title: "Our Mission",
          content: "We're here to help complex organizations operate with clarity, precision and trust—unifying knowledge and orchestrating secure, agentic AI across their business.",
          background_animation: true
        }
      },
      {
        section_type: 'problem_cards',
        section_order: 3,
        title: 'Problem & Solution Section',
        section_data: {
          badge_text: "Our Vision",
          badge_icon: "lightbulb-line",
          section_title: "The Problem We Solve",
          cards: [
            {
              title: "The Challenge",
              description: "Leaders manage a universe of systems that don't talk to each other. Information is trapped in silos; context gets lost in personal AI chats; collaboration devolves into copy‑paste. The result: generic output, bottlenecks, and risk.",
              icon: "alert-line",
              order: 1
            },
            {
              title: "Our Solution",
              description: "Elevation AI is the orchestration platform that unifies your company's data, people, and workflows into a single command center—powered by a private Knowledge Graph and securely connected to the world of agentic AI.",
              icon: "check-line",
              order: 2
            }
          ]
        }
      },
      {
        section_type: 'platform_features',
        section_order: 4,
        title: 'Principles Section',
        section_data: {
          badge_text: "Our Foundation",
          badge_icon: "star-line",
          section_title: "Principles That Guide Us",
          features: [
            {
              title: "Precision over noise",
              description: "Clarity, repeatability, and measurable outcomes drive everything we build.",
              icon: "focus-3-line",
              order: 1
            },
            {
              title: "Security and trust",
              description: "Privacy by default; least‑privilege access; auditability built into every feature.",
              icon: "shield-check-line",
              order: 2
            },
            {
              title: "Collaboration as a feature",
              description: "Shared context is the default, not an afterthought in our platform design.",
              icon: "team-line",
              order: 3
            },
            {
              title: "Versatility without chaos",
              description: "Many use cases, one coherent platform that adapts to your needs.",
              icon: "layout-grid-line",
              order: 4
            },
            {
              title: "Build for longevity",
              description: "Scalable design systems and maintainable implementations for the future.",
              icon: "building-line",
              order: 5
            }
          ]
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 5,
        title: 'Ecosystem Section',
        section_data: {
          badge_text: "Integration Hub",
          badge_icon: "share-line",
          section_title: "The Ecosystem We Orchestrate",
          description: "Elevation connects your core systems (from finance and cap tables to communications and docs) with specialized AI tools and open agent standards—so you can compose the right stack for your business and evolve it over time.",
          accordion_items: [
            {
              title: "Core Systems Integration",
              content: "Seamlessly connect finance, cap tables, communications, and documentation systems into a unified platform.",
              icon: "database-2-line"
            },
            {
              title: "AI Tools & Agent Standards",
              content: "Connect with specialized AI tools and open agent standards to build the perfect stack for your business needs.",
              icon: "cpu-line"
            }
          ]
        }
      },
      {
        section_type: 'introduction_accordion',
        section_order: 6,
        title: 'Path Ahead Section',
        section_data: {
          badge_text: "Future Vision",
          badge_icon: "road-map-line",
          section_title: "The Path Ahead",
          content: "We're building the agentic backbone for how complex organizations operate—one shared knowledge graph, one secure control plane, and a growing ecosystem of agents and integrations that make work feel orchestrated, not overloaded."
        }
      },
      {
        section_type: 'cta',
        section_order: 7,
        title: 'Careers Section',
        section_data: {
          title: "Careers",
          description: "We're looking for systems thinkers, security‑minded engineers, and product designers who love turning complexity into clarity. If that's you, reach out.",
          cta_primary_text: "View Open Positions",
          cta_primary_url: "/website/careers",
          icon: "team-line"
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

    console.log('🎉 About page sync completed successfully!')
    console.log(`📄 Page ID: ${pageId}`)
    console.log(`📊 Sections created: ${sections.length}`)

  } catch (error) {
    console.error('❌ Error syncing About page to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncAboutPageToCMS()
