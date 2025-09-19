const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Use service role key for admin operations to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Extract exact content from the current /platform page
// This represents the master content that should be in the CMS
const platformPageMasterContent = {
  page: {
    title: 'Platform',
    slug: 'platform',
    description: 'The Operating System for the Agentic Era - comprehensive platform features and capabilities',
    meta_title: 'Elevation AI Platform - The Operating System for the Agentic Era',
    meta_description: 'The Elevation AI platform is the central, agentic backbone that unifies your universe, provides intelligent workspaces, and securely connects you to the world of AI.',
    is_published: true
  },
  sections: [
    {
      order_index: 1,
      section_type: 'platform_hero',
      title: 'Platform Hero Section',
      section_data: {
        title: 'The Operating System for',
        titleLine2: 'the Agentic Era',
        description: 'The Elevation AI platform is the central, agentic backbone that unifies your universe, provides intelligent workspaces, and securely connects you to the world of AI.',
        ctaButtons: [
          { text: 'Get Started', href: '/website/sign-up', variant: 'default' },
          { text: 'Request a Demo', href: '/website/demo', variant: 'outline' }
        ],
        animationType: 'future-ready-colored',
        animationWidth: 600,
        animationHeight: 400
      },
      is_published: true
    },
    {
      order_index: 2,
      section_type: 'platform_features',
      title: 'Platform Features Section',
      section_data: {
        title: 'Platform Features',
        description: 'Our platform consists of five core features that work together to create a comprehensive AI-powered operating system for your organization.',
        features: [
          {
            id: 'knowledge-graph',
            title: 'Your Company\'s Private Brain',
            description: 'We start by creating a secure, dynamic Knowledge Graph of your entire business—capturing the unstructured information from meetings, emails, and documents. This becomes your unique, private intelligence layer, the single source of truth that powers everything.',
            features: [
              'Real-time knowledge extraction',
              'Cross-platform data unification',
              'Intelligent relationship mapping',
              'Privacy-first architecture'
            ],
            imagePlaceholder: 'Knowledge Graph Visualization'
          },
          {
            id: 'workspace',
            title: 'A Place to Work',
            description: 'Our platform\'s Workspaces are the collaborative fabric where your teams, clients, and partners come together. Within a workspace, your unique knowledge graph informs every task and conversation, creating a single, intelligent place to execute both manual and automated work using our suite of Canvases, such as Pipelines and Flows.',
            features: [
              'Collaborative workspaces',
              'Intelligent task automation',
              'Pipeline management',
              'Real-time collaboration'
            ],
            imagePlaceholder: 'Workspace Interface',
            imagePosition: 'left'
          },
          {
            id: 'integration-hub',
            title: 'Connect to the World of AI, Securely',
            description: 'We act as the essential middleware layer for the agentic era. You plug into our platform once, and we handle the rest. Our team continuously searches for and integrates the best models, agents, and tools into our ecosystem. We then de-identify your sensitive data before it\'s used by these external resources and re-identify the results upon return, ensuring you can leverage the best of AI without the complexity or the security risk.',
            features: [
              '50+ AI model integrations',
              'Automatic data de-identification',
              'Secure API management',
              'Cost optimization'
            ],
            imagePlaceholder: 'AI Integration Hub'
          },
          {
            id: 'library',
            title: 'Your Arsenal of Reusable Intelligence',
            description: 'The Library is your central repository for all agentic resources. Here you can store, share, and reuse powerful Prompts, complex automated Flows, and specialized Agents. This allows you to codify your best practices and scale your most effective workflows across the entire organization.',
            features: [
              'Prompt library management',
              'Flow templates',
              'Agent marketplace',
              'Team sharing'
            ],
            imagePlaceholder: 'Library Interface',
            imagePosition: 'left'
          },
          {
            id: 'co-pilot',
            title: 'Your Conversational Command Center',
            description: 'Every user gets their own personal Co-pilot. Accessible via text, voice, or directly within the platform, it\'s your primary conversational interface to your entire universe. Use it to ask complex questions, create tasks, and trigger automated workflows using simple, natural language.',
            features: [
              'Natural language processing',
              'Voice interaction',
              'Task automation',
              'Context-aware responses'
            ],
            imagePlaceholder: 'Co-pilot Interface'
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 3,
      section_type: 'security_features',
      title: 'Security Features Section',
      section_data: {
        title: 'Enterprise-Grade Security & Compliance',
        description: 'Your data security is our top priority. We implement industry-leading security measures and maintain compliance with the highest standards.',
        features: [
          {
            id: 'data-protection',
            title: 'Data Protection',
            description: 'End-to-end encryption, zero-knowledge architecture',
            icon: 'shield-check-line'
          },
          {
            id: 'compliance',
            title: 'Compliance',
            description: 'SOC 2 Type II, GDPR, HIPAA ready',
            icon: 'file-shield-line'
          },
          {
            id: 'access-control',
            title: 'Access Control',
            description: 'Role-based permissions, multi-factor authentication',
            icon: 'key-line'
          },
          {
            id: 'audit-trail',
            title: 'Audit Trail',
            description: 'Complete activity logging and monitoring',
            icon: 'history-line'
          },
          {
            id: 'data-residency',
            title: 'Data Residency',
            description: 'Choose your data location and retention policies',
            icon: 'database-2-line'
          }
        ],
        carouselSettings: {
          autoPlay: true,
          autoPlayInterval: 4000,
          showProgressIndicators: true,
          showGradients: false,
          cardWidth: 320,
          cardGap: 24,
          highlightActiveCard: true,
          hugContent: true,
          minHeight: '320px',
          stopWhenAllVisible: false,
          naturalScroll: false,
          flexibleWidth: true
        }
      },
      is_published: true
    },
    {
      order_index: 4,
      section_type: 'integrations_grid',
      title: 'Integrations Section',
      section_data: {
        title: 'Connect Your Entire Universe',
        description: 'Elevation AI is built to be the central hub of your operations. We connect with the tools you already use, bringing all your data and workflows into one secure control plane.',
        categories: [
          {
            id: 'productivity',
            title: 'Productivity',
            description: 'Streamline document collaboration and project management across your favorite productivity suites, ensuring seamless workflow integration.',
            icon: 'file-text-line',
            logos: [
              { name: 'Google Workspace', file: 'Google-Workspace-Docs.svg' },
              { name: 'Microsoft 365', file: 'Microsoft-365.svg' },
              { name: 'Slack', file: 'slack.svg' },
              { name: 'Notion', file: 'notion.svg' }
            ]
          },
          {
            id: 'crm-sales',
            title: 'CRM & Sales',
            description: 'Unify customer data and sales processes across platforms, enabling intelligent lead management and automated follow-ups.',
            icon: 'user-line',
            logos: [
              { name: 'Salesforce', file: 'Salesforce.svg' },
              { name: 'HubSpot', file: 'hubspot.svg' },
              { name: 'Pipedrive', file: 'Pipedrive.svg' }
            ]
          },
          {
            id: 'development',
            title: 'Development',
            description: 'Connect your development workflow from code repositories to project management, enabling AI-powered code assistance and automated deployments.',
            icon: 'code-s-slash-line',
            logos: [
              { name: 'GitHub', file: 'github.svg' },
              { name: 'GitLab', file: 'gitlab.svg' },
              { name: 'Jira', file: 'jira.svg' },
              { name: 'Confluence', file: 'confluence.svg' }
            ]
          },
          {
            id: 'communication',
            title: 'Communication',
            description: 'Integrate video conferencing and team chat platforms to create a unified communication hub with intelligent meeting insights.',
            icon: 'message-3-line',
            logos: [
              { name: 'Zoom', file: 'zoom.svg' },
              { name: 'Teams', file: 'microsoft-teams.svg' },
              { name: 'Discord', file: 'discord.svg' }
            ]
          },
          {
            id: 'data-analytics',
            title: 'Data & Analytics',
            description: 'Transform raw data into actionable insights by connecting business intelligence tools and creating intelligent dashboards.',
            icon: 'bar-chart-line',
            logos: [
              { name: 'Tableau', file: 'tableau.svg' },
              { name: 'Power BI', file: 'Power_BI.svg' },
              { name: 'Google Analytics', file: 'google-analytics.svg' }
            ]
          },
          {
            id: 'custom-apis',
            title: 'Custom APIs',
            description: 'Build powerful integrations with your existing systems through flexible API connections and custom webhook configurations.',
            icon: 'links-line',
            logos: [
              { name: 'REST API', file: 'rest-api.svg' },
              { name: 'GraphQL', file: 'graphql.svg' },
              { name: 'Webhooks', file: 'webhooks.svg' }
            ]
          },
          {
            id: 'finance',
            title: 'Finance & Accounting',
            description: 'Automate financial processes and gain real-time insights into your business performance through integrated accounting systems.',
            icon: 'money-dollar-circle-line',
            logos: [
              { name: 'QuickBooks', file: 'Quickbooks.svg' },
              { name: 'Xero', file: 'xero.svg' },
              { name: 'Stripe', file: 'stripe.svg' }
            ]
          },
          {
            id: 'marketing',
            title: 'Marketing',
            description: 'Orchestrate multi-channel marketing campaigns with AI-driven personalization and automated content optimization.',
            icon: 'megaphone-line',
            logos: [
              { name: 'Mailchimp', file: 'mailchimp.svg' },
              { name: 'Hootsuite', file: 'hootsuite.svg' },
              { name: 'Google Ads', file: 'Google-Ads.svg' }
            ]
          },
          {
            id: 'hr',
            title: 'Human Resources',
            description: 'Streamline HR operations with intelligent talent management, automated onboarding, and data-driven workforce insights.',
            icon: 'team-line',
            logos: [
              { name: 'BambooHR', file: 'bamboo.svg' },
              { name: 'Workday', file: 'workday.svg' },
              { name: 'ADP', file: 'ADP.svg' }
            ]
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 5,
      section_type: 'use_cases_carousel',
      title: 'Use Cases Section',
      section_data: {
        title: 'Built for Every Industry, Every Team',
        description: 'From startups to enterprises, Elevation AI adapts to your unique needs and industry requirements.',
        useCases: [
          {
            id: 'sales-marketing',
            title: 'Sales & Marketing',
            description: 'Lead qualification, content generation, campaign optimization',
            icon: 'line-chart-line',
            href: '/website/solutions#sales-marketing',
            colors: {
              primary: [0.2, 0.6, 1.0],
              secondary: [0.0, 0.8, 1.0],
              tertiary: [0.0, 0.5, 0.6]
            }
          },
          {
            id: 'customer-support',
            title: 'Customer Support',
            description: 'Intelligent ticketing, knowledge base automation',
            icon: 'customer-service-line',
            href: '/website/solutions#customer-support',
            colors: {
              primary: [0.2, 0.8, 0.2],
              secondary: [0.0, 0.7, 0.5],
              tertiary: [0.0, 0.5, 0.6]
            }
          },
          {
            id: 'product-development',
            title: 'Product Development',
            description: 'Requirements analysis, testing automation',
            icon: 'code-s-slash-line',
            href: '/website/solutions#product-development',
            colors: {
              primary: [0.6, 0.2, 1.0],
              secondary: [0.5, 0.0, 1.0],
              tertiary: [0.3, 0.0, 0.6]
            }
          },
          {
            id: 'operations',
            title: 'Operations',
            description: 'Process optimization, compliance monitoring',
            icon: 'settings-3-line',
            href: '/website/solutions#operations',
            colors: {
              primary: [1.0, 0.5, 0.0],
              secondary: [1.0, 0.7, 0.0],
              tertiary: [1.0, 0.8, 0.0]
            }
          },
          {
            id: 'research-development',
            title: 'Research & Development',
            description: 'Data analysis, hypothesis testing',
            icon: 'microscope-line',
            href: '/website/solutions#research-development',
            colors: {
              primary: [0.3, 0.0, 1.0],
              secondary: [0.2, 0.6, 1.0],
              tertiary: [0.0, 0.8, 1.0]
            }
          }
        ]
      },
      is_published: true
    },
    {
      order_index: 6,
      section_type: 'platform_cta',
      title: 'Platform CTA Section',
      section_data: {
        title: 'Ready to Transform Your Organization?',
        description: 'Custom plans built for your organization\'s specific needs and growth trajectory. Join thousands of organizations already using Elevation AI to unlock the power of intelligent automation.',
        ctaButtons: [
          { text: 'Get Started', href: '/website/sign-up', variant: 'default' },
          { text: 'Get Custom Pricing', href: '/website/pricing', variant: 'outline' }
        ],
        backgroundColor: 'bg-muted/30'
      },
      is_published: true
    }
  ]
}

async function syncPlatformToCMS() {
  console.log('🔄 Syncing current /platform page content to CMS...')
  console.log('📋 This will make the current platform page content the master source for the CMS')
  
  try {
    // Get or create the platform page
    let { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'platform')
      .single()

    if (pageError && pageError.code !== 'PGRST116') {
      throw pageError
    }

    if (!page) {
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert(platformPageMasterContent.page)
        .select()
        .single()

      if (createError) throw createError
      page = newPage
      console.log('📄 Created new Platform page in CMS')
    } else {
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update(platformPageMasterContent.page)
        .eq('id', page.id)

      if (updateError) throw updateError
      console.log('📄 Updated existing Platform page in CMS')
    }

    // Clear existing sections
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', page.id)

    if (deleteError) throw deleteError
    console.log('🗑️ Cleared existing sections')

    // Create new sections with exact content from current platform page
    const sectionsToInsert = platformPageMasterContent.sections.map(section => ({
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

    console.log('✅ Platform page content successfully synced to CMS!')
    console.log(`📊 Created ${insertedSections.length} sections in CMS`)
    console.log('🎯 The current /platform page content is now the master source in the CMS')
    console.log('⚙️ You can now edit this content through: /admin/pages')
    console.log('📝 The /platform page remains exactly as it is - no changes to the frontend')

  } catch (error) {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  }
}

syncPlatformToCMS()
