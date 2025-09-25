const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Use service role key for admin operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Extract exact content from the current /people page
// This represents the master content that should be in the CMS
const peoplePageMasterContent = {
  page: {
    title: 'People',
    slug: 'people',
    description: 'Your Dedicated Team for the Agentic Era - concierge support and expert network',
    meta_title: 'Elevation AI People - Your Dedicated Team for the Agentic Era',
    meta_description: 'Your concierge support team, acting as an extension of your own team, providing the strategic guidance and technical expertise to design, build, and implement transformative agentic solutions.',
    is_published: true
  },
  sections: [
    {
      order_index: 1,
      section_type: 'hero_simple',
      title: 'People Hero Section',
      section_data: {
        title: 'Your Dedicated Team for the Agentic Era',
        description: 'Your concierge support team, acting as an extension of your own team, providing the strategic guidance and technical expertise to design, build, and implement transformative agentic solutions.',
        ctaButtons: [
          { text: 'Learn More', href: '#concierge-team', variant: 'default', isScrollButton: true },
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
          title: 'The Challenge',
          icon: 'brain-line',
          badgeText: 'The Challenge',
          badgeColor: 'orange',
          statements: [
            "Adopting agentic AI is not just about adding another app to your tech stack—it's a fundamental shift in how your business operates.",
            "The transition requires a unique blend of strategic foresight to identify opportunities, technical expertise to build the solutions, and a hands-on partnership to ensure successful implementation.",
            "Most organizations don't have this specialized, multi-disciplinary team in-house. This is where Elevation AI comes in."
          ],
          autoPlayInterval: 5000
        },
        solution: {
          title: 'Our Solution',
          subtitle: 'We Become Your Agentic Operations Team',
          icon: 'team-line',
          badgeText: 'Our Solution',
          badgeColor: 'primary',
          description: 'Our Concierge service is a deep, hands-on partnership. We embed our team of expert engineers and strategists directly into your operations to accelerate your journey into the agentic era.',
          processSteps: [
            {
              title: 'Design & Strategize',
              description: 'Our engagement begins with a deep-dive discovery process. We work alongside your leadership to map your unique challenges, identify the highest-value automation opportunities, and co-design a clear, phased roadmap for your agentic transformation.',
              icon: 'target-line'
            },
            {
              title: 'Build & Implement',
              description: 'Our agentic engineers get to work building the custom solutions you need. This includes creating specialized agents, designing complex automated workflows, and configuring your Workspaces and Canvases for your specific operational needs.',
              icon: 'flash-line'
            },
            {
              title: 'Integrate & Orchestrate',
              description: 'We handle the complexity of connecting our platform to your existing systems of record. We ensure a seamless flow of data, allowing your new agentic workflows to orchestrate your entire tech stack.',
              icon: 'shield-check-line'
            },
            {
              title: 'Support & Iterate',
              description: 'Our partnership doesn\'t end at launch. We provide ongoing support, monitor agent performance, and continuously work with you to identify new opportunities for optimization and automation as your business evolves.',
              icon: 'sparkles-line'
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
        title: 'A Partnership for Ambitious Leaders',
        description: 'Our Concierge service is designed for growth-oriented leaders who understand that the future belongs to those who act decisively today. These are the visionaries who recognize that transformative change requires more than just technology—it demands strategic partnership, specialized expertise, and unwavering commitment to excellence.',
        icon: 'target-line',
        badgeText: 'Who This Is For',
        badgeColor: 'primary',
        logoImage: '/images/branding/E-AI-Sqaure.svg',
        characteristics: [
          {
            number: '1',
            title: 'First-Mover Advantage',
            description: 'Want to move quickly and capture a first-mover advantage in their industry.'
          },
          {
            number: '2',
            title: 'Complex Workflows',
            description: 'Have complex, mission-critical workflows that require a bespoke, tailored solution.'
          },
          {
            number: '3',
            title: 'Strategic Partnership',
            description: 'Prefer a strategic partner to act as their dedicated agentic implementation team.'
          },
          {
            number: '4',
            title: 'Specialized Talent',
            description: 'Need to augment their existing team\'s capacity with specialized, hard-to-find talent.'
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
      title: 'People CTA Section',
      section_data: {
        title: 'Ready to Connect with Experts?',
        description: 'Our expert network is ready to help you tackle your most complex challenges. Connect with the right specialists for your specific needs.',
        backgroundColor: 'bg-muted/30',
        ctaButtons: [
          { text: 'Request a Demo', href: '/website/demo', variant: 'default' },
          { text: 'About Us', href: '/website/about', variant: 'outline' }
        ]
      },
      is_published: true
    }
  ]
}

async function syncPeopleToCMS() {
  console.log('🔄 Syncing current /people page content to CMS...')
  console.log('📋 This will make the current people page content the master source for the CMS')
  
  try {
    // Get or create the people page
    let { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'people')
      .single()

    if (pageError && pageError.code !== 'PGRST116') {
      throw pageError
    }

    if (!page) {
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert(peoplePageMasterContent.page)
        .select()
        .single()

      if (createError) throw createError
      page = newPage
      console.log('📄 Created new People page in CMS')
    } else {
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update(peoplePageMasterContent.page)
        .eq('id', page.id)

      if (updateError) throw updateError
      console.log('📄 Updated existing People page in CMS')
    }

    // Clear existing sections
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', page.id)

    if (deleteError) throw deleteError
    console.log('🗑️ Cleared existing sections')

    // Create new sections with exact content from current people page
    const sectionsToInsert = peoplePageMasterContent.sections.map(section => ({
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

    console.log('✅ People page content successfully synced to CMS!')
    console.log(`📊 Created ${insertedSections.length} sections in CMS`)
    console.log('🎯 The current /people page content is now the master source in the CMS')
    console.log('⚙️ You can now edit this content through: /admin/pages')
    console.log('📝 The /people page remains exactly as it is - no changes to the frontend')

  } catch (error) {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  }
}

syncPeopleToCMS()
