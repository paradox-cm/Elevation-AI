#!/usr/bin/env node

/**
 * Sync Solutions Page Content to CMS
 * 
 * This script extracts the current Solutions page content and creates
 * corresponding CMS entries for dynamic management.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function syncSolutionsPageToCMS() {
  try {
    console.log('🚀 Starting Solutions page sync to CMS...')

    // First, create or get the Solutions page
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'solutions')
      .single()

    let pageId
    if (existingPage) {
      pageId = existingPage.id
      console.log('✅ Found existing Solutions page:', existingPage.id)
    } else {
      // Create the Solutions page
      const { data: newPage, error: pageCreateError } = await supabase
        .from('pages')
        .insert({
          slug: 'solutions',
          title: 'Solutions',
          description: 'Industry and stage-specific solutions for the agentic era.',
          meta_title: 'Solutions - Elevation AI Industry & Stage Solutions',
          meta_description: 'Discover how Elevation AI provides tailored solutions for different industries and business stages, from private markets to enterprise operations.',
          is_published: true,
          created_by: null
        })
        .select()
        .single()

      if (pageCreateError) throw pageCreateError
      pageId = newPage.id
      console.log('✅ Created new Solutions page:', pageId)
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
          title: "Solutions for Every Industry, Every Stage",
          description: "Discover how Elevation AI provides tailored solutions for different industries and business stages, from private markets to enterprise operations.",
          background_animation: "shader",
          cta_primary_text: "",
          cta_primary_url: "",
          cta_secondary_text: "",
          cta_secondary_url: ""
        }
      },
      {
        section_type: 'solutions_carousel',
        section_order: 2,
        title: 'Industry Solutions Section',
        section_data: {
          title: "Industry Solutions",
          description: "Tailored solutions for different industry sectors",
          solutions: [
            {
              id: 'private-markets',
              title: 'Private Market Organizations',
              subtitle: 'The Agentic Backbone for the Private Capital Lifecycle',
              description: 'Elevation AI provides a unified platform for Family Offices, Private Equity, Venture Capital, Investment Banks, and Private Credit to manage complex transactions, stakeholder communication, and portfolio operations with greater speed and intelligence.',
              challenge: {
                title: 'From Disconnected Deals to an Orchestrated Universe',
                content: 'Private market firms operate in a high-stakes environment defined by complex relationships and disconnected workflows. Managing deal flow in one system, LP reporting in another, and portfolio company data in a third creates operational drag and makes it impossible to leverage your firm\'s most valuable asset: your collective knowledge.'
              },
              solutions: [
                'Deal Sourcing & Due Diligence: AI-powered market analysis, company research, and risk assessment',
                'Portfolio Management: Intelligent monitoring, performance analytics, and value creation tracking',
                'LP Reporting: Automated reporting, data visualization, and stakeholder communication',
                'Exit Strategy: Market timing analysis, buyer identification, and transaction support'
              ],
              useCases: [
                'Sourcing: Deploy agents to continuously scan the market for opportunities that fit your thesis, automate the initial research on target companies, and manage your entire deal flow in a collaborative Pipeline Canvas.',
                'Investing: Accelerate due diligence by using AI to analyze data rooms, summarize findings, and identify potential risks. Streamline the investment memo creation process with agents that pull data from your research and generate first-draft documents.',
                'Managing: Use AI to monitor portfolio company performance with real-time KPI tracking and automate the collection of monthly reports. Extend the Elevation AI platform directly to your portfolio companies, creating a scalable framework for sharing best practices, building shared resources, and driving operational excellence across your entire portfolio.',
                'Exiting: Prepare a company for exit by creating a secure, comprehensive data room in a dedicated Workspace. Use agents to track potential buyers and manage the entire communication workflow with stakeholders.'
              ],
              integrations: 'We integrate with the tools that are essential to your workflow, from cap table management to market intelligence. Connect with PitchBook, Preqin, Carta, and other industry-specific platforms to create a unified view of your entire investment universe.'
            },
            {
              id: 'public-markets',
              title: 'Public Market Organizations',
              subtitle: 'The Intelligence Layer for Modern Investment Management',
              description: 'Elevation AI provides a unified platform for Hedge Funds and Institutional Investors to orchestrate complex research, automate compliance, and generate alpha from a single, intelligent command center.',
              challenge: {
                title: 'From Information Overload to Actionable Insight',
                content: 'Public market firms are inundated with a sea of data—market feeds, news, and research reports. The challenge is not a lack of information, but the inability to synthesize it quickly and act on it before the opportunity is gone. Alpha decays quickly, and firms that can\'t connect their internal knowledge with external data will be left behind.'
              },
              solutions: [
                'Investment Research: AI-enhanced analysis, sentiment tracking, and market intelligence',
                'Risk Management: Real-time monitoring, scenario analysis, and compliance automation',
                'Client Reporting: Automated reporting, performance attribution, and client communication',
                'Regulatory Compliance: Automated compliance monitoring and reporting'
              ],
              useCases: [
                'Automated Research & Analysis: Deploy agents to monitor your portfolio for relevant news and sentiment, analyze earnings call transcripts for key insights, and generate first drafts of research reports based on your firm\'s unique models.',
                'Compliance & Risk Management: Use AI to automatically check trades against investment mandates and compliance rules in real-time, creating a full audit trail and reducing the risk of human error.',
                'Accelerated Idea Generation: Use our collaborative Workspaces for your investment teams to brainstorm, analyze, and debate ideas with the full context of your firm\'s collective knowledge at their fingertips.'
              ],
              integrations: 'We integrate with the market data feeds, research platforms, and communication tools that power your investment strategy. Connect with Bloomberg, FactSet, Refinitiv, and other essential platforms to create a unified intelligence layer.'
            },
            {
              id: 'banks',
              title: 'Banks',
              subtitle: 'The Secure Platform for Modern Banking Operations',
              description: 'Elevation AI provides a secure, compliant, and auditable platform for Central Banks, commercial banks, and credit unions to automate compliance, enhance risk management, and improve customer service workflows.',
              challenge: {
                title: 'Modernizing While Managing Risk and Compliance',
                content: 'The banking sector faces the dual mandate of needing to modernize its customer experience and internal operations, while navigating a complex and ever-changing regulatory landscape. Legacy systems, manual compliance checks, and siloed data create inefficiencies and increase operational risk.'
              },
              solutions: [
                'Regulatory Compliance: Automated compliance monitoring, reporting, and audit preparation',
                'Risk Management: Credit risk assessment, fraud detection, and operational risk monitoring',
                'Customer Service: Intelligent chatbots, personalized recommendations, and automated support',
                'Operations: Process automation, document processing, and workflow optimization'
              ],
              useCases: [
                'Automated Compliance & Risk: Deploy agents to continuously monitor transactions and communications for compliance with internal policies and external regulations, creating a full audit trail and reducing the burden on your team.',
                'Enhanced Customer Service Workflows: Empower your service teams with a unified view of the customer relationship. Use agents to handle common inquiries and automate the processing of applications and forms, freeing up your team for more complex, high-value interactions.',
                'Streamlined Commercial Lending: Manage complex processes like loan underwriting in a secure, collaborative Workspace, ensuring all stakeholders from different departments are working from the same information in a secure and auditable environment.'
              ],
              integrations: 'We integrate with core banking platforms, compliance tools, and customer service systems to create a unified operational layer. Connect with FIS, Jack Henry, Temenos, and other core banking systems to enhance your operations without disrupting your existing infrastructure.'
            },
            {
              id: 'enterprise',
              title: 'Enterprise',
              subtitle: 'The Control Plane for the Agentic Enterprise',
              description: 'A secure and scalable platform to safely deploy agentic AI across your most complex, cross-functional workflows, whether you\'re a technology platform or a traditional industry leader.',
              challenge: {
                title: 'Unlocking the Value Trapped in Your Existing Systems',
                content: 'Your enterprise has invested heavily in world-class systems—ERPs, data lakes, and CRMs. But your most valuable intelligence is still fragmented, and your teams are still forced into manual workflows to bridge the gaps between these powerful but disconnected tools. The challenge is not a lack of data; it\'s the lack of a secure orchestration layer to unify it and act on it.'
              },
              solutions: [
                'Operations Automation: Workflow automation, process optimization, and intelligent routing',
                'Data Management: Unified data platform, intelligent analytics, and business intelligence',
                'Security & Compliance: Enterprise security, compliance monitoring, and audit trails',
                'Collaboration: Intelligent workspaces, knowledge management, and team coordination'
              ],
              useCases: [
                'Growth: Enhance your sales and marketing efforts by deploying agents to enrich leads, personalize outreach, and analyze customer feedback from all channels to identify new product opportunities.',
                'Efficiency: Streamline your core operations by automating complex, cross-functional workflows. Use ambient agents to monitor your global supply chain, manage project timelines, and generate first-draft reports for internal review.',
                'Risk Management: Proactively identify and mitigate risks by deploying agents that monitor your systems for anomalies, ensure compliance with internal policies, and create a full, auditable trail of all automated actions.',
                'Product & Service Augmentation: Build a new generation of customer experiences by deploying agents to power intelligent, 24/7 customer support, provide personalized recommendations, and automate client onboarding.'
              ],
              integrations: 'We integrate with your existing systems of record—from ERPs and CRMs to your custom-built applications—to create a unified control plane. Connect with Salesforce, SAP, Microsoft Dynamics, and other enterprise systems to enhance your operations without disrupting your existing infrastructure.'
            },
            {
              id: 'government',
              title: 'Government',
              subtitle: 'A Secure Platform for a More Efficient Public Sector',
              description: 'A compliant and auditable platform to enhance operational efficiency and improve constituent services.',
              challenge: {
                title: 'Modernizing While Ensuring Security and Compliance',
                content: 'Public sector organizations face the dual challenge of needing to modernize their operations to better serve their constituents, while also adhering to the strictest standards of security, transparency, and compliance. Legacy systems, data silos, and manual processes create inefficiencies and make it difficult to respond to the evolving needs of the public.'
              },
              solutions: [
                'Public Service Delivery: Citizen service automation, case management, and response optimization',
                'Policy Analysis: Data-driven policy insights, impact assessment, and scenario modeling',
                'Compliance & Audit: Automated compliance monitoring, audit trails, and transparency reporting',
                'Security: Government-grade security, data sovereignty, and access controls'
              ],
              useCases: [
                'Automated Constituent Services: Deploy agents to manage and respond to common citizen inquiries, automate the processing of forms and applications, and provide your teams with the unified information they need to deliver faster, more effective services.',
                'Enhanced Inter-Agency Collaboration: Use our secure Workspaces to create a single, shared environment for different agencies or departments to collaborate on complex initiatives, ensuring all stakeholders are working from the same information and a clear, auditable record of all decisions is maintained.',
                'Proactive Program Management: Use AI to monitor the performance of public programs against their stated goals, track budgets in real-time, and generate automated reports for oversight and transparency.'
              ],
              integrations: 'We integrate with government-specific systems and adhere to public sector security standards to ensure a seamless and compliant implementation. Connect with existing government platforms, citizen service systems, and compliance tools to enhance your operations while maintaining the highest security standards.'
            }
          ]
        }
      },
      {
        section_type: 'solutions_carousel',
        section_order: 3,
        title: 'Stage Solutions Section',
        section_data: {
          title: "Stage Solutions",
          description: "Solutions for different business lifecycle stages",
          solutions: [
            {
              id: 'creating-venture',
              title: 'Creating a New Venture',
              subtitle: 'Build Your Next Venture on an Agentic Foundation',
              description: 'For established private market organizations and family offices leveraging their existing resources to launch a new endeavor, Elevation AI provides the instant, institutional-grade infrastructure needed to build with speed and intelligence from day one.',
              challenge: {
                title: 'Avoiding the \'Startup Trap\'',
                content: 'Launching a new venture, even with the backing of an established entity, often means starting from scratch with fragmented tools, manual processes, and no central system of record. This creates \'knowledge debt\' and operational friction that slows down your ability to find product-market fit and scale effectively.'
              },
              solutions: [
                'Market Research: AI-powered market analysis, competitor intelligence, and opportunity identification',
                'Business Planning: Intelligent business plan development, financial modeling, and scenario planning',
                'Operations Setup: Automated workflows, document management, and process optimization',
                'Team Building: Intelligent recruitment, onboarding automation, and knowledge management'
              ],
              useCases: [
                'Unified Command Center: Start with a central place to manage everything—your team, strategy, product roadmap, and investor updates—in a single, secure environment.',
                'Build Your Knowledge Graph from Day One: Capture every decision, meeting, and customer insight in a structured, private knowledge graph, creating a durable asset for the new venture.',
                'Find Your Foundational Partners: Leverage our platform and network to identify, vet, and onboard the key early partners, advisors, and team members who will be critical to your success.',
                'Leverage Existing Resources: Seamlessly connect the new venture\'s workspace with the resources and knowledge of your parent organization, creating an unfair advantage.'
              ],
              integrations: 'We integrate with the tools essential for launching a new venture, from project management and communication platforms to financial modeling and market research tools. Connect with Slack, Notion, Carta, and other startup essentials to create a unified launch environment.'
            },
            {
              id: 'scaling-venture',
              title: 'Scaling a Venture',
              subtitle: 'Orchestrate the Complexities of Rapid Growth',
              description: 'As your venture scales, complexity grows exponentially. Elevation AI provides the agentic backbone to move from reactive firefighting to proactive orchestration, ensuring your operations can keep pace with your ambition.',
              challenge: {
                title: 'When Manual Processes Start to Break',
                content: 'The manual workflows and siloed tools that worked for a small team begin to fail under the pressure of rapid growth. Communication breaks down, data gets lost, and operational bottlenecks emerge, putting your growth trajectory at risk.'
              },
              solutions: [
                'Growth Automation: Automated processes, intelligent routing, and workflow optimization',
                'Data Management: Unified data platform, intelligent analytics, and business intelligence',
                'Team Coordination: Intelligent collaboration, knowledge sharing, and performance management',
                'Customer Experience: Automated customer service, personalized experiences, and feedback analysis'
              ],
              useCases: [
                'Automate Cross-Functional Workflows: Replace manual handoffs with intelligent, agentic flows that connect your sales, marketing, and product teams, ensuring seamless execution as you scale.',
                'Gain Real-Time Visibility: Move beyond lagging indicators with a unified dashboard that provides a real-time, holistic view of your entire business, from sales pipeline to product usage.',
                'Codify and Scale Best Practices: Use our platform\'s Library to codify your most effective processes into reusable agents and flows, ensuring operational excellence is maintained as you hire and expand.',
                'Recruit and Onboard Key Talent: Streamline the process of finding and integrating key leadership and specialized talent needed to navigate your next phase of growth.'
              ],
              integrations: 'We integrate with the tools that power rapid growth, from CRM and marketing automation to analytics and customer success platforms. Connect with Salesforce, HubSpot, Mixpanel, and other growth tools to create a unified scaling environment.'
            },
            {
              id: 'exiting-venture',
              title: 'Exiting a Venture',
              subtitle: 'Maximize Value, Execute with Precision',
              description: 'Preparing for and executing a successful exit is one of the most critical and complex stages of a company\'s lifecycle. Elevation AI provides the tools to codify your operations and manage the exit process with institutional-grade rigor.',
              challenge: {
                title: 'The Chaos of Due Diligence and Deal Management',
                content: 'The exit process is an intense sprint of due diligence, stakeholder communication, and data management. A disorganized or inefficient process can delay the deal, create unnecessary risk, and ultimately impact the final valuation.'
              },
              solutions: [
                'Exit Preparation: Data organization, documentation automation, and compliance preparation',
                'Market Analysis: Buyer identification, valuation analysis, and market timing',
                'Transaction Support: Due diligence automation, document management, and process coordination',
                'Post-Exit Planning: Transition planning, knowledge transfer, and legacy management'
              ],
              useCases: [
                'Codify Your Operations: Transform your tribal knowledge into a structured, auditable asset. Our platform\'s ability to create a comprehensive knowledge graph makes your business more transparent, resilient, and valuable to a potential acquirer.',
                'Assemble Your Deal Team: Identify and coordinate with the critical external partners for your exit, including the right investment bankers, M&A lawyers, and tax advisors, managing the entire relationship in a secure workspace.',
                'Accelerate Growth Pre-Exit: Deploy agents to identify and execute on last-minute growth opportunities, ensuring you go to market with the strongest possible metrics.',
                'Execute with Precision: Use our secure Workspaces to create a comprehensive, professional data room. Deploy agents to manage the Q&A process, track potential buyers, and coordinate communication with your entire deal team.'
              ],
              integrations: 'We integrate with the tools essential for a successful exit, from data room platforms and deal management tools to financial modeling and communication systems. Connect with Intralinks, DealRoom, and other M&A tools to streamline your exit process.'
            },
            {
              id: 'post-ipo-growth',
              title: 'Post-IPO Growth',
              subtitle: 'Master the Rigor of the Public Markets',
              description: 'Becoming a public company introduces a new level of operational complexity, scrutiny, and reporting requirements. Elevation AI provides the control plane to manage this new reality with confidence and precision.',
              challenge: {
                title: 'The New Demands of a Public Company',
                content: 'The transition to a public company requires a step-change in operational rigor. You now face the demands of quarterly reporting, investor relations, and strict compliance and governance, all while continuing to drive growth and innovation.'
              },
              solutions: [
                'Investor Relations: Automated reporting, earnings preparation, and stakeholder communication',
                'Compliance Management: Regulatory compliance, audit preparation, and governance automation',
                'Financial Operations: Financial reporting, budget management, and performance tracking',
                'Strategic Planning: Long-term planning, scenario analysis, and market intelligence'
              ],
              useCases: [
                'Streamlined Investor Relations: Automate the preparation of quarterly reports, earnings materials, and investor communications, ensuring consistency and accuracy while reducing the burden on your team.',
                'Enhanced Compliance & Governance: Use AI to monitor compliance with SEC regulations, automate audit preparation, and maintain a comprehensive audit trail of all business decisions and actions.',
                'Optimized Financial Operations: Deploy agents to monitor financial performance, track key metrics, and generate automated reports for internal and external stakeholders.',
                'Strategic Market Intelligence: Use our platform to monitor market conditions, competitor activity, and industry trends, providing your leadership team with the insights needed to make informed strategic decisions.'
              ],
              integrations: 'We integrate with the tools essential for public company operations, from financial reporting and investor relations platforms to compliance and governance systems. Connect with Workiva, IR Insight, and other public company tools to streamline your operations.'
            },
            {
              id: 'family-office',
              title: 'Post-Exit Family Office Creation',
              subtitle: 'Build a Lasting Legacy with Institutional-Grade Operations',
              description: 'Creating a family office after a successful exit requires the same level of operational sophistication as the business that created the wealth. Elevation AI provides the foundation to build a family office that can manage complex investments, family dynamics, and generational wealth transfer with institutional-grade rigor.',
              challenge: {
                title: 'From Entrepreneur to Family Office Founder',
                content: 'The transition from running a business to managing a family office introduces new complexities: investment management, tax optimization, family governance, and generational wealth transfer. Without the right systems and processes, family offices can quickly become overwhelmed by the operational complexity.'
              },
              solutions: [
                'Investment Management: Portfolio management, due diligence, and performance tracking',
                'Family Governance: Family meeting management, decision tracking, and communication',
                'Tax Optimization: Tax planning, compliance monitoring, and optimization strategies',
                'Wealth Transfer: Estate planning, generational wealth transfer, and legacy management'
              ],
              useCases: [
                'Unified Investment Management: Create a comprehensive view of all family investments, from private equity and real estate to public markets and alternative investments, with automated performance tracking and reporting.',
                'Streamlined Family Governance: Use our platform to manage family meetings, track decisions, and maintain clear communication channels across generations and family branches.',
                'Optimized Tax Strategy: Deploy agents to monitor tax implications of investment decisions, track compliance requirements, and identify optimization opportunities across the family\'s entire portfolio.',
                'Legacy Planning & Management: Use our knowledge graph to capture family history, values, and investment philosophy, creating a lasting legacy that can guide future generations.'
              ],
              integrations: 'We integrate with the tools essential for family office operations, from investment management and tax planning platforms to family governance and communication systems. Connect with Addepar, eMoney, and other family office tools to create a unified operational environment.'
            }
          ]
        }
      },
      {
        section_type: 'platform_features',
        section_order: 4,
        title: 'Solution Features Section',
        section_data: {
          section_title: "Built for Every Industry, Every Scale",
          description: "Our platform adapts to your environment with flexible deployment options, comprehensive integrations, and enterprise-grade governance.",
          features: [
            {
              title: "Industry-Ready Compliance",
              description: "Policy packs and guardrails mapped to leading frameworks (e.g., SOC 2/ISO control families, GDPR). Data residency by region and information-barrier controls for regulated workflows.",
              icon: "shield-check-line",
              order: 1
            },
            {
              title: "Flexible Deployment",
              description: "Run as managed cloud, in your private VPC, or on-prem. Choose model routing and data residency per workspace to meet security and latency needs.",
              icon: "cloud-line",
              order: 2
            },
            {
              title: "Comprehensive Integrations",
              description: "Native connectors for Salesforce, Google/Microsoft 365, Slack, cloud storage, databases/warehouses (Snowflake, BigQuery, Redshift), plus open APIs/SDKs for anything custom.",
              icon: "links-line",
              order: 3
            },
            {
              title: "Enterprise-Grade Security",
              description: "Tenant isolation, SSO (SAML/OIDC), RBAC/ABAC, encryption in transit and at rest, fine-grained audit logs, and approval workflows for sensitive actions.",
              icon: "lock-line",
              order: 4
            },
            {
              title: "Scalable Architecture",
              description: "Multi-workspace, multi-entity design that scales horizontally as your data and teams grow—with budgets, routing, and usage controls to keep costs predictable.",
              icon: "database-2-line",
              order: 5
            },
            {
              title: "Support & Concierge",
              description: "Tiered support and an Agentic Concierge Team to accelerate onboarding and new use cases. 24×7 incident response is available on Enterprise and private deployments.",
              icon: "customer-service-line",
              order: 6
            }
          ]
        }
      },
      {
        section_type: 'cta',
        section_order: 5,
        title: 'CTA Section',
        section_data: {
          title: "Ready to Transform Your Organization?",
          description: "Discover how Elevation AI can solve your unique industry challenges and accelerate your growth.",
          cta_primary_text: "Schedule Consultation",
          cta_primary_url: "/website/demo",
          cta_secondary_text: "Contact Sales",
          cta_secondary_url: "/website/contact"
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

    console.log('🎉 Solutions page sync completed successfully!')
    console.log(`📄 Page ID: ${pageId}`)
    console.log(`📊 Sections created: ${sections.length}`)

  } catch (error) {
    console.error('❌ Error syncing Solutions page to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncSolutionsPageToCMS()
