"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { H1, H2, H3, P, BodyLarge as Body } from "@/components/ui/typography"
import { KnowledgeBaseSearch } from "@/components/ui/knowledge-base-search"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React, { useState, useMemo } from "react"

interface KnowledgeItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

interface KnowledgeCategory {
  id: string
  title: string
  description: string
  icon: string
  items: KnowledgeItem[]
}

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<KnowledgeItem[]>([])

  const knowledgeCategories: KnowledgeCategory[] = [
    {
      id: "platform",
      title: "Platform & Architecture",
      description: "How Elevation AI fits into your tech stack and core platform concepts",
      icon: "computer-line",
      items: [
        {
          id: "platform-1",
          question: "How does Elevation AI fit into my stack (data lake, CRM, BI, workflow tools)?",
          answer: "Elevation AI sits between your systems of record and your teams. We ingest from sources like data warehouses/lakes, CRMs, email, docs, and calendars; unify that into a governed Knowledge Graph; and expose it through secure agents, canvases, and APIs. Output actions push back into tools (e.g., Salesforce, Slack, Sheets, ticketing) so the work lands where your teams already operate.",
          category: "Platform & Architecture",
          tags: ["integration", "architecture", "data-lake", "crm", "bi"]
        },
        {
          id: "platform-2",
          question: "What's the difference between a Knowledge Graph and a data warehouse/lake?",
          answer: "A warehouse/lake stores raw tables/files. The Knowledge Graph is a semantic layer that resolves entities (people, companies, deals, assets), relationships, lineage, and policy. It references your data rather than duplicating it, making cross-tool reasoning, permissions, and traceable answers possible.",
          category: "Platform & Architecture",
          tags: ["knowledge-graph", "data-warehouse", "semantic-layer", "entities"]
        },
        {
          id: "platform-3",
          question: "What are Workspaces, Canvases, Agents, and the Library—and how do they relate?",
          answer: "Workspaces: secure domains for a team or entity (e.g., a deal team, portfolio, or family branch). Canvases: collaborative surfaces for tasks/workflows with live context, citations, and approvals. Agents: governed automations that read from the graph and act in your tools. Library: shared, versioned assets—prompts, playbooks, datasets, and integrations—reused across workspaces.",
          category: "Platform & Architecture",
          tags: ["workspaces", "canvases", "agents", "library", "collaboration"]
        },
        {
          id: "platform-4",
          question: "Which LLMs and agent frameworks do you support? Can we bring our own models/keys?",
          answer: "We support leading commercial and open-source models via adapters (e.g., OpenAI, Anthropic, Azure OpenAI, Google, Mistral, Llama family). BYO keys are supported; you can route tasks per policy (by cost, latency, or compliance). Agents use our native orchestrator with tool-use/function-calling; SDKs let you extend it.",
          category: "Platform & Architecture",
          tags: ["llm", "openai", "anthropic", "azure", "models", "byok"]
        },
        {
          id: "platform-5",
          question: "Can Elevation AI run in our VPC or an air-gapped environment?",
          answer: "Yes. Default is managed SaaS. For higher controls we offer private VPC deployments; fully isolated or \"air-gapped\" options are available for regulated environments on an enterprise plan.",
          category: "Platform & Architecture",
          tags: ["vpc", "air-gapped", "saas", "enterprise", "security"]
        },
        {
          id: "platform-6",
          question: "How do you handle data residency (US/EU/other regions)?",
          answer: "Choose a primary region at the org or workspace level. Indexed content, embeddings, logs, and backups remain in-region. Cross-region processing is disabled unless explicitly allowed by policy.",
          category: "Platform & Architecture",
          tags: ["data-residency", "regions", "compliance", "privacy"]
        }
      ]
    },
    {
      id: "security",
      title: "Security, Privacy & Compliance",
      description: "Data protection, privacy controls, and compliance standards",
      icon: "shield-check-line",
      items: [
        {
          id: "security-1",
          question: "How do de-identification/re-identification and redaction actually work?",
          answer: "We detect sensitive fields using pattern+ML entity recognition, replace them with reversible tokens, and store originals in a hardened vault. Re-identification requires explicit policy and role-based approval. Persistent redaction can be enforced on export and UI.",
          category: "Security, Privacy & Compliance",
          tags: ["de-identification", "redaction", "privacy", "compliance", "pii"]
        },
        {
          id: "security-2",
          question: "Do you train models on our data? How do you prevent leakage to third parties?",
          answer: "No customer data is used to train foundation models. BYO keys keep prompts/responses within your vendor account. Optional in-org fine-tuning or adapters are isolated to your tenant. We sign DPAs and restrict subprocessors to those listed in our policy.",
          category: "Security, Privacy & Compliance",
          tags: ["data-training", "model-training", "dpa", "subprocessors", "isolation"]
        },
        {
          id: "security-3",
          question: "What controls exist for RBAC/ABAC, SSO (Okta/Azure AD), and SCIM provisioning?",
          answer: "SAML/OIDC SSO, SCIM user lifecycle, role-based access (workspace, dataset, action), and attribute-based controls (labels like \"MNPI,\" \"PII,\" \"deal-team-A\") are supported. Policies flow through agents, canvases, and APIs.",
          category: "Security, Privacy & Compliance",
          tags: ["rbac", "abac", "sso", "okta", "azure-ad", "scim"]
        },
        {
          id: "security-4",
          question: "What audit logs and retention controls are available?",
          answer: "Immutable logs cover data access, prompts, model calls, tool actions, exports, and admin changes. Retention is configurable; exports stream to your SIEM. IP allowlists and session policies are available.",
          category: "Security, Privacy & Compliance",
          tags: ["audit-logs", "retention", "siem", "compliance", "monitoring"]
        },
        {
          id: "security-5",
          question: "Which certifications and frameworks do you support (SOC 2, ISO 27001, GDPR, HIPAA)?",
          answer: "We align to SOC 2/ISO 27001 control families and undergo annual third-party penetration tests. GDPR-ready DPAs and SCCs are available. HIPAA/BAA and formal certifications are offered based on plan and deployment; roadmap timelines are provided under NDA.",
          category: "Security, Privacy & Compliance",
          tags: ["soc2", "iso27001", "gdpr", "hipaa", "certifications", "compliance"]
        }
      ]
    },
    {
      id: "governance",
      title: "Governance & Quality",
      description: "Data quality, accuracy controls, and governance features",
      icon: "settings-3-line",
      items: [
        {
          id: "governance-1",
          question: "How do you ground agent outputs to our source of truth (RAG, citations, provenance)?",
          answer: "All answers resolve back to the graph and indexed sources with inline citations. We use retrieval-augmented generation, entity resolution, and lineage tracking so users can verify \"why this answer.\"",
          category: "Governance & Quality",
          tags: ["rag", "citations", "provenance", "source-of-truth", "lineage"]
        },
        {
          id: "governance-2",
          question: "What safeguards reduce hallucinations? Can we require human-in-the-loop approvals?",
          answer: "Safeguards include curated retrieval, tool-limited actions, model committees for high-risk tasks, and policy checks. For sensitive flows, require reviewer sign-off, dual-control, or multi-stage approvals before actions execute.",
          category: "Governance & Quality",
          tags: ["hallucinations", "human-in-the-loop", "approvals", "safeguards", "quality"]
        },
        {
          id: "governance-3",
          question: "How do you version and approve prompts, agents, and flows?",
          answer: "Everything is versioned with draft → review → approved states, change logs, and rollback. Promotion to production requires assigned reviewers; diffs are visible.",
          category: "Governance & Quality",
          tags: ["versioning", "approvals", "prompts", "agents", "workflows"]
        }
      ]
    },
    {
      id: "integrations",
      title: "Integrations & Extensibility",
      description: "Native integrations, APIs, and custom development options",
      icon: "links-line",
      items: [
        {
          id: "integrations-1",
          question: "Which native integrations are available?",
          answer: "Common connectors include Salesforce, HubSpot, Microsoft/Google 365, Slack, Drive/SharePoint, Dropbox, Notion, Gmail/Outlook, databases (Postgres, MySQL), warehouses (Snowflake, BigQuery, Redshift), storage (S3/GCS/Azure), and finance/data providers (e.g., Plaid/Carta where applicable). Don't see one? Build it with our SDK.",
          category: "Integrations & Extensibility",
          tags: ["integrations", "salesforce", "hubspot", "slack", "notion", "sdk"]
        },
        {
          id: "integrations-2",
          question: "Do you have APIs/SDKs and webhooks for custom integrations?",
          answer: "Yes—REST APIs and JS/Python SDKs for ingestion, retrieval, and agent execution. Event/webhook subscriptions let you trigger external workflows on graph or agent events.",
          category: "Integrations & Extensibility",
          tags: ["api", "sdk", "webhooks", "custom-integrations", "rest"]
        },
        {
          id: "integrations-3",
          question: "How does Elevation work with no-code tools we already use (e.g., Zapier/Make)?",
          answer: "Prebuilt Zapier/Make connectors expose triggers (new insight, approval needed, risk flag) and actions (run agent, write to canvas, update record). You can also hit our webhooks directly.",
          category: "Integrations & Extensibility",
          tags: ["zapier", "make", "no-code", "connectors", "triggers"]
        }
      ]
    },
    {
      id: "implementation",
      title: "Implementation & Success",
      description: "Onboarding process, concierge services, and success metrics",
      icon: "rocket-line",
      items: [
        {
          id: "implementation-1",
          question: "What does a typical onboarding look like?",
          answer: "A focused 2–6 week path: Discovery (goals, systems, policies) → Connect & model (sources → graph, access controls) → Pilot use cases (2–3 canvases/agents) → Enablement (training, success metrics) → Scale (governance, rollout plan).",
          category: "Implementation & Success",
          tags: ["onboarding", "discovery", "pilot", "training", "rollout"]
        },
        {
          id: "implementation-2",
          question: "What exactly does the Concierge Team deliver vs. the product itself?",
          answer: "The product is the platform your team uses daily. The Agentic Concierge Team accelerates value: integration setup, graph curation, playbook design, risk controls, and training. They are enablers—not a custom-dev crutch.",
          category: "Implementation & Success",
          tags: ["concierge", "support", "integration", "training", "value"]
        },
        {
          id: "implementation-3",
          question: "What change-management and training resources are included?",
          answer: "Role-based training, in-app guides, office hours, templates, security/approval playbooks, and a champion program to seed expertise internally.",
          category: "Implementation & Success",
          tags: ["change-management", "training", "guides", "templates", "champions"]
        },
        {
          id: "implementation-4",
          question: "How do you measure ROI and success?",
          answer: "We baseline current effort, then track time-to-insight, cycle-time reduction, error rates, compliance exceptions caught, and business outcomes (e.g., faster diligence, better pipeline hygiene). A shared dashboard monitors adoption and savings.",
          category: "Implementation & Success",
          tags: ["roi", "metrics", "dashboard", "adoption", "savings"]
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Licensing",
      description: "Cost structure, credits, and licensing options",
      icon: "price-tag-3-line",
      items: [
        {
          id: "pricing-1",
          question: "How is pricing structured (platform fee, credits/usage, concierge hours)?",
          answer: "Annual platform subscription by org/workspace tier plus metered usage for model/compute tasks. Concierge services are packaged by outcome (e.g., onboarding, new use-case rollout) or retainer.",
          category: "Pricing & Licensing",
          tags: ["pricing", "subscription", "credits", "usage", "concierge"]
        },
        {
          id: "pricing-2",
          question: "How do credits work and how can we forecast/limit spend?",
          answer: "Credits meter LLM tokens, retrieval, vector storage, and job runtime. Real-time dashboards, budgets, alerts, and hard caps prevent overages; policies can route tasks to lower-cost models automatically.",
          category: "Pricing & Licensing",
          tags: ["credits", "budgets", "alerts", "cost-control", "forecasting"]
        },
        {
          id: "pricing-3",
          question: "Do you offer platform-only vs. concierge packages? Seat vs. workspace pricing?",
          answer: "Yes. Choose platform-only or platform+concierge. Pricing can be seat-based, workspace-based, or hybrid depending on your structure, with volume discounts for enterprise.",
          category: "Pricing & Licensing",
          tags: ["packages", "seats", "workspaces", "enterprise", "discounts"]
        }
      ]
    }
  ]

  // Flatten all knowledge items for search
  const allKnowledgeItems = useMemo(() => {
    return knowledgeCategories.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.title
      }))
    )
  }, [knowledgeCategories])

  const handleSearch = (query: string, results: any[]) => {
    setSearchQuery(query)
    setSearchResults(results)
  }

  // Filter categories based on search results
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return knowledgeCategories
    }

    return knowledgeCategories.map(category => ({
      ...category,
      items: category.items.filter(item => 
        searchResults.some(result => result.id === item.id)
      )
    })).filter(category => category.items.length > 0)
  }, [searchQuery, searchResults, knowledgeCategories])

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="resources" />}
      >
        <div className="min-h-screen bg-background transition-colors duration-300">
          <main>
            <Container size="2xl">
              {/* Page Header */}
              <div className="w-full flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
                <div className="text-center space-y-1">
                  <H1>
                    Knowledge Base
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.
                  </P>
                </div>
              </div>

              {/* Search Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <KnowledgeBaseSearch
                    items={allKnowledgeItems}
                    onSearch={handleSearch}
                    placeholder="Search knowledge base..."
                    className="mb-8"
                  />
                </div>
              </Section>

              {/* Knowledge Base Content */}
              <Section paddingY="lg">
                <div className="max-w-6xl mx-auto">
                  {searchQuery ? (
                    // Search Results View
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <H2>Search Results</H2>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchQuery("")
                            setSearchResults([])
                          }}
                        >
                          <Icon name="arrow-left-line" className="h-4 w-4 mr-2" />
                          Back to All Topics
                        </Button>
                      </div>
                      
                      {searchResults.length > 0 ? (
                        <div className="space-y-4">
                          {searchResults.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow">
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <CardTitle className="text-lg">{item.question}</CardTitle>
                                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                    {item.category}
                                  </span>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <P className="text-muted-foreground leading-relaxed">
                                  {item.answer}
                                </P>
                                {item.tags && item.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {item.tags.map((tag) => (
                                      <span 
                                        key={tag}
                                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Icon name="search-line" className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <H3 className="mb-2">No results found</H3>
                          <P className="text-muted-foreground">
                            Try adjusting your search terms or browse our categories below.
                          </P>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Category View
                    <div className="space-y-8">
                      <H2>Browse by Category</H2>
                      
                      <Accordion type="multiple" className="space-y-4">
                        {knowledgeCategories.map((category) => (
                          <AccordionItem 
                            key={category.id} 
                            value={category.id}
                            className="border border-border rounded-lg"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                              <div className="flex items-center gap-3 text-left">
                                <Icon name={category.icon} className="h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <H3 className="text-lg font-semibold">{category.title}</H3>
                                  <P className="text-sm text-muted-foreground mt-1">
                                    {category.description} • {category.items.length} question{category.items.length !== 1 ? 's' : ''}
                                  </P>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <Accordion type="multiple" className="space-y-3">
                                {category.items.map((item) => (
                                  <AccordionItem 
                                    key={item.id} 
                                    value={item.id}
                                    className="border border-muted rounded-md"
                                  >
                                     <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                       <Body className="font-medium text-left pr-4">
                                         {item.question}
                                       </Body>
                                     </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                      <P className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {item.answer}
                                      </P>
                                      {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {item.tags.map((tag) => (
                                            <span 
                                              key={tag}
                                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </div>
              </Section>

              {/* Contact Section */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto text-center">
                  <Card className="bg-muted/30">
                    <CardContent className="p-8">
                      <H3 className="mb-4">Still have questions?</H3>
                      <P className="text-muted-foreground mb-6">
                        Can't find what you're looking for? Our team is here to help.
                      </P>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild>
                          <Link href="/website/contact">
                            <Icon name="mail-line" className="h-4 w-4 mr-2" />
                            Contact Support
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/website/demo">
                            <Icon name="calendar-line" className="h-4 w-4 mr-2" />
                            Schedule Demo
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
