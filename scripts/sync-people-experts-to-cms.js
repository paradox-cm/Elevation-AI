const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Use service role key for admin operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Extract exact content from the current /people-experts page
// This represents the master content that should be in the CMS
const peopleExpertsPageMasterContent = {
  page: {
    title: 'People - Expert Network',
    slug: 'people-experts',
    description: 'On-Demand Expertise, Natively Integrated - augment your team with world-class experts',
    meta_title: 'Elevation AI Expert Network - On-Demand Expertise, Natively Integrated',
    meta_description: 'Augment your team with world-class, on-demand subject matter experts. Our network of vetted specialists can be embedded directly into your Workspaces to solve specific challenges with precision and speed.',
    is_published: true
  },
  sections: [
    {
      order_index: 1,
      section_type: 'hero_simple',
      title: 'People Experts Hero Section',
      section_data: {
        title: 'On-Demand Expertise, Natively Integrated',
        description: 'Augment your team with world-class, on-demand subject matter experts. Our network of vetted specialists can be embedded directly into your Workspaces to solve specific challenges with precision and speed.',
        ctaButtons: [
          { text: 'Explore the Expert Network', href: '#expert-network', variant: 'default', isScrollButton: true },
          { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
        ],
        logoImage: '/images/branding/E-AI-Squircle.svg'
      },
      is_published: true
    },
    {
      order_index: 2,
      section_type: 'problem_cards',
      title: 'Challenge and Solution Section',
      section_data: {
        challenge: {
          title: 'The Friction of Finding and Integrating Expertise',
          icon: 'brain-line',
          badgeText: 'The Challenge',
          badgeColor: 'orange',
          statement: "Sometimes you don't need a full-time hire or a large consulting firm; you just need a few hours with a world-class expert. However, the process of finding, vetting, onboarding, and securely integrating external specialists for short-term engagements is filled with friction and security risks.",
          autoPlayInterval: 5000
        },
        solution: {
          title: 'Our Solution: A Frictionless Flow of Knowledge',
          subtitle: 'The Right Expert, in the Right Context, at the Right Time',
          icon: 'team-line',
          badgeText: 'Our Solution: A Frictionless Flow of Knowledge',
          badgeColor: 'primary',
          description: 'The Elevation AI Expert Network removes the friction from sourcing specialized talent. Our experts are native to our platform, allowing them to be seamlessly and securely "parachuted" into your projects as needed.',
          processSteps: [
            {
              title: 'Discover & Select',
              description: 'Browse our curated network of vetted experts across dozens of domains—from go-to-market strategy and legal review to financial modeling and cybersecurity.',
              icon: 'search-line'
            },
            {
              title: 'Securely Embed',
              description: 'With one click, grant an expert temporary, secure access to a specific Workspace. They get the full context of the project\'s Knowledge Base without ever gaining access to your broader company universe.',
              icon: 'shield-check-line'
            },
            {
              title: 'Execute & Deliver',
              description: 'The expert collaborates with your team directly within your existing workflows, providing their insights where they\'re most valuable. When the engagement is complete, their access is cleanly revoked, and all the knowledge they created remains securely in your Knowledge Base.',
              icon: 'zap-line'
            }
          ]
        }
      },
      is_published: true
    },
    {
      order_index: 3,
      section_type: 'approach_cards',
      title: 'Who This Is For Section',
      section_data: {
        title: 'Targeted Expertise for High-Stakes Moments',
        description: 'Our Embedded Experts are ideal for teams who need:',
        icon: 'target-line',
        badgeText: 'Who This Is For',
        badgeColor: 'primary',
        logoImage: '/images/branding/E-AI-Sqaure.svg',
        characteristics: [
          {
            number: '1',
            title: 'Senior-Level Sounding Board',
            description: 'A senior-level sounding board for a key strategic decision.'
          },
          {
            number: '2',
            title: 'Specialized Expertise',
            description: 'Specialized expertise to unblock a critical phase of a project.'
          },
          {
            number: '3',
            title: 'Fractional Executive',
            description: 'A fractional executive to fill a short-term leadership gap.'
          },
          {
            number: '4',
            title: 'Objective Review',
            description: 'An objective third-party review of a plan or document.'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 4,
      section_type: 'solutions_carousel',
      title: 'Expert Network Section',
      section_data: {
        title: 'Access World-Class Expertise',
        description: 'Tap into our curated network of specialists across AI, enterprise architecture, and industry domains. These are independent experts who have been vetted and integrated into our ecosystem.',
        icon: 'team-line',
        badgeText: 'Expert Network',
        badgeColor: 'primary',
        backgroundColor: 'bg-blue-500/10',
        expertCategories: [
          {
            id: 'ai-ml',
            title: 'AI & Machine Learning',
            description: 'Specialists in artificial intelligence, machine learning, and advanced automation technologies.',
            expertCount: '150+',
            specialties: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Robotic Process Automation'],
            icon: 'brain-line'
          },
          {
            id: 'enterprise-architecture',
            title: 'Enterprise Architecture',
            description: 'Senior architects with deep experience in large-scale system design and integration.',
            expertCount: '200+',
            specialties: ['Cloud Architecture', 'Microservices', 'API Design', 'Security Architecture'],
            icon: 'shield-check-line'
          },
          {
            id: 'industry-experts',
            title: 'Industry Specialists',
            description: 'Domain experts across finance, healthcare, manufacturing, and other key industries.',
            expertCount: '300+',
            specialties: ['Financial Services', 'Healthcare', 'Manufacturing', 'Government'],
            icon: 'global-line'
          },
          {
            id: 'data-analytics',
            title: 'Data & Analytics',
            description: 'Data scientists and analysts specializing in business intelligence and advanced analytics.',
            expertCount: '180+',
            specialties: ['Business Intelligence', 'Data Engineering', 'Statistical Analysis', 'Visualization'],
            icon: 'award-line'
          }
        ],
        carouselSettings: {
          autoPlay: true,
          autoPlayInterval: 5000,
          showProgressIndicators: true,
          cardWidth: 320,
          cardGap: 24,
          highlightActiveCard: true,
          naturalScroll: false,
          flexibleWidth: true
        }
      },
      is_published: true
    },
    {
      order_index: 5,
      section_type: 'logo_carousel',
      title: 'Logo Carousel Section',
      section_data: {
        title: 'Led by industry veterans from:',
        backgroundColor: 'bg-muted/20',
        logos: [
          { name: 'Accenture', logo: '/images/logos/Accenture.svg' },
          { name: 'Apple', logo: '/images/logos/Apple.svg' },
          { name: 'Bank of America', logo: '/images/logos/Bank-of-America.svg' },
          { name: 'Barclays', logo: '/images/logos/Barclays.svg' },
          { name: 'BCG Consulting', logo: '/images/logos/BCG-Consulting.svg' },
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
      order_index: 6,
      section_type: 'cta',
      title: 'People Experts CTA Section',
      section_data: {
        title: 'Augment Your Team with On-Demand Talent',
        description: 'Explore our network of subject matter experts and see how they can help you solve your next big challenge.',
        backgroundColor: 'bg-muted/30',
        ctaButtons: [
          { text: 'Explore the Expert Network', href: '/website/demo', variant: 'default' },
          { text: 'About Us', href: '/website/about', variant: 'outline' }
        ]
      },
      is_published: true
    }
  ]
}

async function syncPeopleExpertsToCMS() {
  console.log('🔄 Syncing current /people-experts page content to CMS...')
  console.log('📋 This will make the current people experts page content the master source for the CMS')
  
  try {
    // Get or create the people-experts page
    let { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'people-experts')
      .single()

    if (pageError && pageError.code !== 'PGRST116') {
      throw pageError
    }

    if (!page) {
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert(peopleExpertsPageMasterContent.page)
        .select()
        .single()

      if (createError) throw createError
      page = newPage
      console.log('📄 Created new People Experts page in CMS')
    } else {
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update(peopleExpertsPageMasterContent.page)
        .eq('id', page.id)

      if (updateError) throw updateError
      console.log('📄 Updated existing People Experts page in CMS')
    }

    // Clear existing sections
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', page.id)

    if (deleteError) throw deleteError
    console.log('🗑️ Cleared existing sections')

    // Create new sections with exact content from current people-experts page
    const sectionsToInsert = peopleExpertsPageMasterContent.sections.map(section => ({
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

    console.log('✅ People Experts page content successfully synced to CMS!')
    console.log(`📊 Created ${insertedSections.length} sections in CMS`)
    console.log('🎯 The current /people-experts page content is now the master source in the CMS')
    console.log('⚙️ You can now edit this content through: /admin/pages')
    console.log('📝 The /people-experts page remains exactly as it is - no changes to the frontend')

  } catch (error) {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  }
}

syncPeopleExpertsToCMS()
