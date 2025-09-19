const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Use service role key for admin operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Extract exact content from the current /home page
// This represents the master content that should be in the CMS
const homePageMasterContent = {
  page: {
    title: 'Home',
    slug: 'home',
    description: 'Main landing page and entry point for Elevation AI',
    meta_title: 'Elevation AI - The Agentic Platform for Intelligent Operations',
    meta_description: 'Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI.',
    is_published: true
  },
  sections: [
    {
      order_index: 1,
      section_type: 'hero_typewriter',
      title: 'Hero Section',
      section_data: {
        title: 'The Agentic Platform for',
        cyclingWords: [
          'Intelligent Operations.',
          'Seamless Workflows.',
          'Data-Driven Decisions.',
          'Automated Processes.',
          'Strategic Growth.',
          'Operational Excellence.',
          'Business Transformation.',
          'Digital Innovation.'
        ],
        description: 'Elevation AI is the agentic knowledge and work orchestration platform, powered by a concierge team, unifying knowledge, streamlining workflows and securing your use of AI. Your universe, intelligently orchestrated.',
        ctaButtons: [
          { text: 'Get Started', href: '/website/sign-up', variant: 'default' },
          { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
        ],
        speed: 100,
        delay: 500,
        cyclingSpeed: 300,
        cyclingDelay: 0
      },
      is_published: true
    },
    {
      order_index: 2,
      section_type: 'introduction_accordion',
      title: 'Introduction Section',
      section_data: {
        title: 'The Agentic Era is Here',
        accordionItems: [
          {
            title: 'Securely Orchestrate Your Business',
            content: 'Your business\'s greatest asset—its collective data and knowledge—unlocked and ready to power every decision.',
            value: 'greatest-asset'
          },
          {
            title: 'Seamless Collaboration, Shared Context',
            content: 'Instead of being siloed across apps, conversations, and documents, your knowledge lives in one intelligent network—accessible, contextual, and aligned for action.',
            value: 'scattered-to-connected'
          },
          {
            title: 'Clarity That Drives Action',
            content: 'Elevation AI transforms complexity into focus—delivering clarity, precision, and control so your organization can move faster and stay ahead.',
            value: 'clarity-drives-action'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 3,
      section_type: 'logo_carousel',
      title: 'Logo Carousel Section',
      section_data: {
        title: 'Led by industry veterans from:',
        logos: [
          { name: 'Accenture', logo: '/images/logos/Accenture.svg' },
          { name: 'Apple', logo: '/images/logos/Apple.svg' },
          { name: 'Bank of America', logo: '/images/logos/Bank-of-America.svg' },
          { name: 'Barclays', logo: '/images/logos/Barclays.svg' },
          { name: 'BCG Consulting', logo: '/images/logos/BCG-Consulting.svg' },
          { name: 'Capital One', logo: '/images/logos/Capital-One.svg' },
          { name: 'Deutsche Bank', logo: '/images/logos/Deutsche-Bank.svg' },
          { name: 'eBay', logo: '/images/logos/ebay.svg' },
          { name: 'Google', logo: '/images/logos/Google.svg' },
          { name: 'Indeed', logo: '/images/logos/Indeed.svg' },
          { name: 'JPM', logo: '/images/logos/JPM.svg' },
          { name: 'McKinsey', logo: '/images/logos/McKinsey.svg' },
          { name: 'Meta', logo: '/images/logos/Meta.svg' },
          { name: 'Morgan Stanley', logo: '/images/logos/Morgan-Stanley.svg' },
          { name: 'Tesla', logo: '/images/logos/Tesla.svg' },
          { name: 'Visa', logo: '/images/logos/Visa.svg' },
          { name: 'Windows', logo: '/images/logos/Windows.svg' }
        ]
      },
      is_published: true
    },
    {
      order_index: 4,
      section_type: 'problem_cards',
      title: 'Problem Cards Section',
      section_data: {
        title: 'Orchestrate Your Universe',
        description: 'Turn scattered knowledge into precision, collaboration, and clarity—securely at enterprise scale.',
        cards: [
          {
            title: 'The Business Orchestration Platform',
            description: 'Work from a single source of truth. Break down the walls between departments and tools, work from a unified platform where all your knowledge is connected, accessible, and actionable in one place.',
            icon: 'database-2-line'
          },
          {
            title: 'Intelligent Process Automation',
            description: 'Eliminate bottlenecks with context-aware automation, identify and automate the repetitive processes that hold you back—freeing people from busywork so they can focus on the high-value work.',
            icon: 'brain-line'
          },
          {
            title: 'Real-Time Business Intelligence',
            description: 'Convert blind spots into detailed, actionable insights with a unified command center—delivering real-time visibility across operations and the confidence to act.',
            icon: 'eye-line'
          },
          {
            title: 'Future-Ready Strategic Advantage',
            description: 'Mitigate strategic risk, lead the agentic era. Elevation AI is the platform and partnership which ensures you are not just keeping up, but leading the way in the new AI-powered business landscape.',
            icon: 'shield-check-line'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 5,
      section_type: 'platform_features',
      title: 'Platform Section',
      section_data: {
        title: 'The Agentic Platform',
        description: 'So your business moves faster, thinks smarter, and stays ahead.',
        features: [
          {
            title: 'Knowledge Blocks',
            description: 'The private intelligence layer of your business—capturing and connecting all your data into a live Knowledge Graph that powers every decision and workflow.',
            icon: 'node-tree'
          },
          {
            title: 'Workspaces & Canvases',
            description: 'The collaborative fabric where teams and AI agents work together. Every task, document, and conversation enriches the shared context automatically.',
            icon: 'layout-grid-line'
          },
          {
            title: 'Agentic Engine',
            description: 'Your secure middleware layer—connecting knowledge to external AI tools and agents with enterprise-grade security and orchestration.',
            icon: 'cpu-line'
          },
          {
            title: 'Personal Co-pilot',
            description: 'A conversational interface to your entire universe—delivering context-aware answers, insights, and actions from your Knowledge Graph.',
            icon: 'message-3-line'
          },
          {
            title: 'Enterprise Security',
            description: 'Enterprise-grade encryption, every action in the platform is auditable, compliant, and secure, ensuring you unlock the full power of AI without ever compromising control.',
            icon: 'shield-keyhole-line'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 6,
      section_type: 'solutions_carousel',
      title: 'Who We Serve Section',
      section_data: {
        title: 'Intelligent Solutions for Every Domain',
        description: 'Powered by Elevation AI and guided by experts.',
        solutions: [
          {
            title: 'Private Market Organizations',
            description: 'The agentic backbone for the entire private capital lifecycle.',
            icon: 'building-2-line',
            href: '/website/solutions?open=private-markets'
          },
          {
            title: 'Public Market Organizations',
            description: 'A unified intelligence platform for modern investment management.',
            icon: 'store-line',
            href: '/website/solutions?open=public-markets'
          },
          {
            title: 'Banks',
            description: 'Automate compliance, enhance risk management, and improve customer service.',
            icon: 'bank-line',
            href: '/website/solutions?open=banks'
          },
          {
            title: 'Enterprise',
            description: 'The secure control plane for growing and established organizations.',
            icon: 'briefcase-line',
            href: '/website/solutions?open=enterprise'
          },
          {
            title: 'Government',
            description: 'A secure, compliant, and auditable platform for the public sector.',
            icon: 'government-line',
            href: '/website/solutions?open=government'
          }
        ],
        smallCards: [
          'Creating a Venture',
          'Scaling a Venture',
          'Exiting a Venture',
          'Post-IPO Growth',
          'Post-Exit/Family Office'
        ]
      },
      is_published: true
    },
    {
      order_index: 7,
      section_type: 'approach_cards',
      title: 'How We Do It Section',
      section_data: {
        title: 'More Than a Platform.',
        description: 'Your partner at every step.',
        approaches: [
          {
            title: 'Your Strategic AI Advisory',
            description: 'Guidance that goes beyond setup—our team helps you define where AI creates the most impact for your business, aligning technology with long-term strategy.',
            icon: 'elevation-ai-logo',
            href: '/website/people'
          },
          {
            title: 'Your Agentic Concierge Team',
            description: 'A hands-on team of engineers and strategists who partner with you to design, build, and customize solutions for your biggest challenges.',
            icon: 'team-line',
            href: '/website/people'
          },
          {
            title: 'Your Expert & Partner Network',
            description: 'Specialized consultants and domain experts who extend your team\'s capacity, embedding seamlessly into your workspaces to solve complex problems.',
            icon: 'global-line',
            href: '/website/people'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 8,
      section_type: 'cta',
      title: 'Closing CTA Section',
      section_data: {
        title: 'Orchestrate Your Universe',
        description: 'From strategy to execution, Elevation AI unifies your knowledge, secures your operation, and empowers your teams to move with clarity.',
        ctaButtons: [
          { text: 'Get Started', href: '/website/sign-up', variant: 'default' },
          { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
        ],
        backgroundColor: 'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10'
      },
      is_published: true
    }
  ]
}

async function syncHomeToCMS() {
  console.log('🔄 Syncing current /home page content to CMS...')
  console.log('📋 This will make the current home page content the master source for the CMS')
  
  try {
    // Get or create the home page
    let { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'home')
      .single()

    if (pageError && pageError.code !== 'PGRST116') {
      throw pageError
    }

    if (!page) {
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert(homePageMasterContent.page)
        .select()
        .single()

      if (createError) throw createError
      page = newPage
      console.log('📄 Created new Home page in CMS')
    } else {
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update(homePageMasterContent.page)
        .eq('id', page.id)

      if (updateError) throw updateError
      console.log('📄 Updated existing Home page in CMS')
    }

    // Clear existing sections
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', page.id)

    if (deleteError) throw deleteError
    console.log('🗑️ Cleared existing sections')

    // Create new sections with exact content from current home page
    const sectionsToInsert = homePageMasterContent.sections.map(section => ({
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

    console.log('✅ Home page content successfully synced to CMS!')
    console.log(`📊 Created ${insertedSections.length} sections in CMS`)
    console.log('🎯 The current /home page content is now the master source in the CMS')
    console.log('⚙️ You can now edit this content through: /admin/pages')
    console.log('📝 The /home page remains exactly as it is - no changes to the frontend')

  } catch (error) {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  }
}

syncHomeToCMS()
