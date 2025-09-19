#!/usr/bin/env node

/**
 * Sync Knowledge Base Page Content to CMS
 * 
 * This script extracts the static knowledge-base page content and creates
 * corresponding CMS entries for dynamic management through the FAQ admin interface.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Knowledge base page data
const knowledgeBasePageData = {
  title: "Knowledge Base",
  slug: "knowledge-base",
  description: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
  meta_title: "Knowledge Base - Elevation AI",
  meta_description: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
  is_published: true
}

// FAQ Categories and their items
const faqCategories = [
  {
    title: "Platform & Architecture",
    description: "How Elevation AI fits into your tech stack and core platform concepts",
    icon: "computer-line",
    order_index: 1,
    is_published: true,
    faqs: [
      {
        question: "How does Elevation AI fit into my stack (data lake, CRM, BI, workflow tools)?",
        answer: "Elevation AI sits between your systems of record and your teams. We ingest from sources like data warehouses/lakes, CRMs, email, docs, and calendars; unify that into a governed Knowledge Graph; and expose it through secure agents, canvases, and APIs. Output actions push back into tools (e.g., Salesforce, Slack, Sheets, ticketing) so the work lands where your teams already operate.",
        order_index: 1,
        is_published: true
      },
      {
        question: "What's the difference between a Knowledge Graph and a data warehouse/lake?",
        answer: "A warehouse/lake stores raw tables/files. The Knowledge Graph is a semantic layer that resolves entities (people, companies, deals, assets), relationships, lineage, and policy. It references your data rather than duplicating it, making cross-tool reasoning, permissions, and traceable answers possible.",
        order_index: 2,
        is_published: true
      },
      {
        question: "What are Workspaces, Canvases, Agents, and the Library—and how do they relate?",
        answer: "Workspaces: secure domains for a team or entity (e.g., a deal team, portfolio, or family branch). Canvases: collaborative surfaces for tasks/workflows with live context, citations, and approvals. Agents: governed automations that read from the graph and act in your tools. Library: shared, versioned assets—prompts, playbooks, datasets, and integrations—reused across workspaces.",
        order_index: 3,
        is_published: true
      },
      {
        question: "Which LLMs and agent frameworks do you support? Can we bring our own models/keys?",
        answer: "We support leading commercial and open-source models via adapters (e.g., OpenAI, Anthropic, Azure OpenAI, Google, Mistral, Llama family). BYO keys are supported; you can route tasks per policy (by cost, latency, or compliance). Agents use our native orchestrator with tool-use/function-calling; SDKs let you extend it.",
        order_index: 4,
        is_published: true
      },
      {
        question: "Can Elevation AI run in our VPC or an air-gapped environment?",
        answer: "Yes. Default is managed SaaS. For higher controls we offer private VPC deployments; fully isolated or \"air-gapped\" options are available for regulated environments on an enterprise plan.",
        order_index: 5,
        is_published: true
      },
      {
        question: "How do you handle data residency (US/EU/other regions)?",
        answer: "Choose a primary region at the org or workspace level. Indexed content, embeddings, logs, and backups remain in-region. Cross-region processing is disabled unless explicitly allowed by policy.",
        order_index: 6,
        is_published: true
      }
    ]
  },
  {
    title: "Security, Privacy & Compliance",
    description: "Data protection, privacy controls, and compliance standards",
    icon: "shield-check-line",
    order_index: 2,
    is_published: true,
    faqs: [
      {
        question: "How do de-identification/re-identification and redaction actually work?",
        answer: "We detect sensitive fields using pattern+ML entity recognition, replace them with reversible tokens, and store originals in a hardened vault. Re-identification requires explicit policy and role-based approval. Persistent redaction can be enforced on export and UI.",
        order_index: 1,
        is_published: true
      },
      {
        question: "Do you train models on our data? How do you prevent leakage to third parties?",
        answer: "No customer data is used to train foundation models. BYO keys keep prompts/responses within your vendor account. Optional in-org fine-tuning or adapters are isolated to your tenant. We sign DPAs and restrict subprocessors to those listed in our policy.",
        order_index: 2,
        is_published: true
      },
      {
        question: "What controls exist for RBAC/ABAC, SSO (Okta/Azure AD), and SCIM provisioning?",
        answer: "SAML/OIDC SSO, SCIM user lifecycle, role-based access (workspace, dataset, action), and attribute-based controls (labels like \"MNPI,\" \"PII,\" \"deal-team-A\") are supported. Policies flow through agents, canvases, and APIs.",
        order_index: 3,
        is_published: true
      },
      {
        question: "What audit logs and retention controls are available?",
        answer: "Immutable logs cover data access, prompts, model calls, tool actions, exports, and admin changes. Retention is configurable; exports stream to your SIEM. IP allowlists and session policies are available.",
        order_index: 4,
        is_published: true
      },
      {
        question: "Which certifications and frameworks do you support (SOC 2, ISO 27001, GDPR, HIPAA)?",
        answer: "We align to SOC 2/ISO 27001 control families and undergo annual third-party penetration tests. GDPR-ready DPAs and SCCs are available. HIPAA/BAA and formal certifications are offered based on plan and deployment; roadmap timelines are provided under NDA.",
        order_index: 5,
        is_published: true
      }
    ]
  },
  {
    title: "Governance & Quality",
    description: "Data quality, accuracy controls, and governance features",
    icon: "settings-3-line",
    order_index: 3,
    is_published: true,
    faqs: [
      {
        question: "How do you ground agent outputs to our source of truth (RAG, citations, provenance)?",
        answer: "All answers resolve back to the graph and indexed sources with inline citations. We use retrieval-augmented generation, entity resolution, and lineage tracking so users can verify \"why this answer.\"",
        order_index: 1,
        is_published: true
      },
      {
        question: "What safeguards reduce hallucinations? Can we require human-in-the-loop approvals?",
        answer: "Safeguards include curated retrieval, tool-limited actions, model committees for high-risk tasks, and policy checks. For sensitive flows, require reviewer sign-off, dual-control, or multi-stage approvals before actions execute.",
        order_index: 2,
        is_published: true
      },
      {
        question: "How do you version and approve prompts, agents, and flows?",
        answer: "Everything is versioned with draft → review → approved states, change logs, and rollback. Promotion to production requires assigned reviewers; diffs are visible.",
        order_index: 3,
        is_published: true
      }
    ]
  },
  {
    title: "Integrations & Extensibility",
    description: "Native integrations, APIs, and custom development options",
    icon: "links-line",
    order_index: 4,
    is_published: true,
    faqs: [
      {
        question: "Which native integrations are available?",
        answer: "Common connectors include Salesforce, HubSpot, Microsoft/Google 365, Slack, Drive/SharePoint, Dropbox, Notion, Gmail/Outlook, databases (Postgres, MySQL), warehouses (Snowflake, BigQuery, Redshift), storage (S3/GCS/Azure), and finance/data providers (e.g., Plaid/Carta where applicable). Don't see one? Build it with our SDK.",
        order_index: 1,
        is_published: true
      },
      {
        question: "Do you have APIs/SDKs and webhooks for custom integrations?",
        answer: "Yes—REST APIs and JS/Python SDKs for ingestion, retrieval, and agent execution. Event/webhook subscriptions let you trigger external workflows on graph or agent events.",
        order_index: 2,
        is_published: true
      },
      {
        question: "How does Elevation work with no-code tools we already use (e.g., Zapier/Make)?",
        answer: "Prebuilt Zapier/Make connectors expose triggers (new insight, approval needed, risk flag) and actions (run agent, write to canvas, update record). You can also hit our webhooks directly.",
        order_index: 3,
        is_published: true
      }
    ]
  },
  {
    title: "Implementation & Success",
    description: "Onboarding process, concierge services, and success metrics",
    icon: "rocket-line",
    order_index: 5,
    is_published: true,
    faqs: [
      {
        question: "What does a typical onboarding look like?",
        answer: "A focused 2–6 week path: Discovery (goals, systems, policies) → Connect & model (sources → graph, access controls) → Pilot use cases (2–3 canvases/agents) → Enablement (training, success metrics) → Scale (governance, rollout plan).",
        order_index: 1,
        is_published: true
      },
      {
        question: "What exactly does the Concierge Team deliver vs. the product itself?",
        answer: "The product is the platform your team uses daily. The Agentic Concierge Team accelerates value: integration setup, graph curation, playbook design, risk controls, and training. They are enablers—not a custom-dev crutch.",
        order_index: 2,
        is_published: true
      },
      {
        question: "What change-management and training resources are included?",
        answer: "Role-based training, in-app guides, office hours, templates, security/approval playbooks, and a champion program to seed expertise internally.",
        order_index: 3,
        is_published: true
      },
      {
        question: "How do you measure ROI and success?",
        answer: "We baseline current effort, then track time-to-insight, cycle-time reduction, error rates, compliance exceptions caught, and business outcomes (e.g., faster diligence, better pipeline hygiene). A shared dashboard monitors adoption and savings.",
        order_index: 4,
        is_published: true
      }
    ]
  },
  {
    title: "Pricing & Licensing",
    description: "Cost structure, credits, and licensing options",
    icon: "price-tag-3-line",
    order_index: 6,
    is_published: true,
    faqs: [
      {
        question: "How is pricing structured (platform fee, credits/usage, concierge hours)?",
        answer: "Annual platform subscription by org/workspace tier plus metered usage for model/compute tasks. Concierge services are packaged by outcome (e.g., onboarding, new use-case rollout) or retainer.",
        order_index: 1,
        is_published: true
      },
      {
        question: "How do credits work and how can we forecast/limit spend?",
        answer: "Credits meter LLM tokens, retrieval, vector storage, and job runtime. Real-time dashboards, budgets, alerts, and hard caps prevent overages; policies can route tasks to lower-cost models automatically.",
        order_index: 2,
        is_published: true
      },
      {
        question: "Do you offer platform-only vs. concierge packages? Seat vs. workspace pricing?",
        answer: "Yes. Choose platform-only or platform+concierge. Pricing can be seat-based, workspace-based, or hybrid depending on your structure, with volume discounts for enterprise.",
        order_index: 3,
        is_published: true
      }
    ]
  }
]

// Knowledge base page sections
const knowledgeBaseSections = [
  {
    section_type: "hero_simple",
    section_order: 1,
    title: "Knowledge Base Header",
    section_data: {
      title: "Knowledge Base",
      subtitle: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
      cta_primary_text: "",
      cta_primary_url: "",
      cta_secondary_text: "",
      cta_secondary_url: ""
    }
  },
  {
    section_type: "faq",
    section_order: 2,
    title: "FAQ Categories",
    section_data: {
      title: "Browse by Category",
      description: "Find answers organized by topic",
      show_search: true,
      search_placeholder: "Search knowledge base..."
    }
  },
  {
    section_type: "cta",
    section_order: 3,
    title: "Contact Support",
    section_data: {
      title: "Still have questions?",
      description: "Can't find what you're looking for? Our team is here to help.",
      cta_primary_text: "Contact Support",
      cta_primary_url: "/website/contact",
      cta_secondary_text: "Schedule Demo",
      cta_secondary_url: "/website/demo",
      background_style: "muted"
    }
  }
]

async function syncKnowledgeBaseToCMS() {
  try {
    console.log('🚀 Starting knowledge base sync to CMS...')

    // Check if knowledge-base page already exists
    const { data: existingPage, error: pageCheckError } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', 'knowledge-base')
      .single()

    let pageId

    if (existingPage) {
      console.log('📄 Knowledge base page already exists, updating...')
      pageId = existingPage.id
      
      // Update existing page
      const { error: updateError } = await supabase
        .from('pages')
        .update({
          ...knowledgeBasePageData,
          updated_at: new Date().toISOString()
        })
        .eq('id', pageId)

      if (updateError) throw updateError
    } else {
      console.log('📄 Creating new knowledge base page...')
      
      // Create new page
      const { data: newPage, error: createError } = await supabase
        .from('pages')
        .insert(knowledgeBasePageData)
        .select()
        .single()

      if (createError) throw createError
      pageId = newPage.id
    }

    console.log(`✅ Knowledge base page created/updated with ID: ${pageId}`)

    // Delete existing sections for this page
    console.log('🗑️ Removing existing knowledge base page sections...')
    const { error: deleteError } = await supabase
      .from('page_sections')
      .delete()
      .eq('page_id', pageId)

    if (deleteError) throw deleteError

    // Create new sections
    console.log('📝 Creating knowledge base page sections...')
    
    for (const section of knowledgeBaseSections) {
      const { data: newSection, error: sectionError } = await supabase
        .from('page_sections')
        .insert({
          page_id: pageId,
          section_type: section.section_type,
          section_order: section.section_order,
          title: section.title,
          section_data: section.section_data,
          is_published: true
        })
        .select()
        .single()

      if (sectionError) {
        console.error(`❌ Error creating section ${section.section_type}:`, sectionError)
        throw sectionError
      }

      console.log(`✅ Created section: ${section.section_type}`)
    }

    // Sync FAQ Categories and FAQs
    console.log('📚 Syncing FAQ categories and items...')
    
    for (const categoryData of faqCategories) {
      // Check if category already exists
      const { data: existingCategory, error: categoryCheckError } = await supabase
        .from('faq_categories')
        .select('id')
        .eq('title', categoryData.title)
        .single()

      let categoryId

      if (existingCategory) {
        console.log(`📁 Updating existing category: ${categoryData.title}`)
        categoryId = existingCategory.id
        
        // Update existing category
        const { error: updateCategoryError } = await supabase
          .from('faq_categories')
          .update({
            title: categoryData.title,
            description: categoryData.description,
            icon: categoryData.icon,
            order_index: categoryData.order_index,
            is_published: categoryData.is_published,
            updated_at: new Date().toISOString()
          })
          .eq('id', categoryId)

        if (updateCategoryError) throw updateCategoryError

        // Delete existing FAQs for this category
        const { error: deleteFAQsError } = await supabase
          .from('faqs')
          .delete()
          .eq('category_id', categoryId)

        if (deleteFAQsError) throw deleteFAQsError
      } else {
        console.log(`📁 Creating new category: ${categoryData.title}`)
        
        // Create new category
        const { data: newCategory, error: createCategoryError } = await supabase
          .from('faq_categories')
          .insert({
            title: categoryData.title,
            description: categoryData.description,
            icon: categoryData.icon,
            order_index: categoryData.order_index,
            is_published: categoryData.is_published
          })
          .select()
          .single()

        if (createCategoryError) throw createCategoryError
        categoryId = newCategory.id
      }

      // Create FAQs for this category
      console.log(`📝 Creating ${categoryData.faqs.length} FAQs for category: ${categoryData.title}`)
      
      for (const faqData of categoryData.faqs) {
        const { data: newFAQ, error: faqError } = await supabase
          .from('faqs')
          .insert({
            category_id: categoryId,
            question: faqData.question,
            answer: faqData.answer,
            order_index: faqData.order_index,
            is_published: faqData.is_published
          })
          .select()
          .single()

        if (faqError) {
          console.error(`❌ Error creating FAQ: ${faqData.question}`, faqError)
          throw faqError
        }
      }

      console.log(`✅ Created ${categoryData.faqs.length} FAQs for category: ${categoryData.title}`)
    }

    console.log('🎉 Knowledge base sync completed successfully!')
    console.log(`📊 Created ${knowledgeBaseSections.length} sections for knowledge base page`)
    console.log(`📚 Created ${faqCategories.length} FAQ categories with ${faqCategories.reduce((total, cat) => total + cat.faqs.length, 0)} total FAQs`)

  } catch (error) {
    console.error('❌ Error syncing knowledge base to CMS:', error)
    process.exit(1)
  }
}

// Run the sync
syncKnowledgeBaseToCMS()
