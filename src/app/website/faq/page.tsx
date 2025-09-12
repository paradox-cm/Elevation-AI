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
import { H1, H2, H3, P } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  description: string
  icon: string
  faqs: FAQItem[]
}

export default function FAQPage() {
  const faqCategories: FAQCategory[] = [
    {
      id: "platform",
      title: "Platform & Architecture",
      description: "How Elevation AI fits into your tech stack and core platform concepts",
      icon: "computer-line",
      faqs: [
        {
          question: "How does Elevation AI fit into my stack (data lake, CRM, BI, workflow tools)?",
          answer: "Elevation AI sits between your systems of record and your teams. We ingest from sources like data warehouses/lakes, CRMs, email, docs, and calendars; unify that into a governed Knowledge Graph; and expose it through secure agents, canvases, and APIs. Output actions push back into tools (e.g., Salesforce, Slack, Sheets, ticketing) so the work lands where your teams already operate."
        },
        {
          question: "What's the difference between a Knowledge Graph and a data warehouse/lake?",
          answer: "A warehouse/lake stores raw tables/files. The Knowledge Graph is a semantic layer that resolves entities (people, companies, deals, assets), relationships, lineage, and policy. It references your data rather than duplicating it, making cross-tool reasoning, permissions, and traceable answers possible."
        },
        {
          question: "What are Workspaces, Canvases, Agents, and the Library—and how do they relate?",
          answer: "Workspaces: secure domains for a team or entity (e.g., a deal team, portfolio, or family branch). Canvases: collaborative surfaces for tasks/workflows with live context, citations, and approvals. Agents: governed automations that read from the graph and act in your tools. Library: shared, versioned assets—prompts, playbooks, datasets, and integrations—reused across workspaces."
        },
        {
          question: "Which LLMs and agent frameworks do you support? Can we bring our own models/keys?",
          answer: "We support leading commercial and open-source models via adapters (e.g., OpenAI, Anthropic, Azure OpenAI, Google, Mistral, Llama family). BYO keys are supported; you can route tasks per policy (by cost, latency, or compliance). Agents use our native orchestrator with tool-use/function-calling; SDKs let you extend it."
        },
        {
          question: "Can Elevation AI run in our VPC or an air-gapped environment?",
          answer: "Yes. Default is managed SaaS. For higher controls we offer private VPC deployments; fully isolated or \"air-gapped\" options are available for regulated environments on an enterprise plan."
        },
        {
          question: "How do you handle data residency (US/EU/other regions)?",
          answer: "Choose a primary region at the org or workspace level. Indexed content, embeddings, logs, and backups remain in-region. Cross-region processing is disabled unless explicitly allowed by policy."
        }
      ]
    },
    {
      id: "security",
      title: "Security, Privacy & Compliance",
      description: "Data protection, privacy controls, and compliance standards",
      icon: "shield-check-line",
      faqs: [
        {
          question: "How do de-identification/re-identification and redaction actually work?",
          answer: "We detect sensitive fields using pattern+ML entity recognition, replace them with reversible tokens, and store originals in a hardened vault. Re-identification requires explicit policy and role-based approval. Persistent redaction can be enforced on export and UI."
        },
        {
          question: "Do you train models on our data? How do you prevent leakage to third parties?",
          answer: "No customer data is used to train foundation models. BYO keys keep prompts/responses within your vendor account. Optional in-org fine-tuning or adapters are isolated to your tenant. We sign DPAs and restrict subprocessors to those listed in our policy."
        },
        {
          question: "What controls exist for RBAC/ABAC, SSO (Okta/Azure AD), and SCIM provisioning?",
          answer: "SAML/OIDC SSO, SCIM user lifecycle, role-based access (workspace, dataset, action), and attribute-based controls (labels like \"MNPI,\" \"PII,\" \"deal-team-A\") are supported. Policies flow through agents, canvases, and APIs."
        },
        {
          question: "What audit logs and retention controls are available?",
          answer: "Immutable logs cover data access, prompts, model calls, tool actions, exports, and admin changes. Retention is configurable; exports stream to your SIEM. IP allowlists and session policies are available."
        },
        {
          question: "Which certifications and frameworks do you support (SOC 2, ISO 27001, GDPR, HIPAA)? What's on the roadmap?",
          answer: "We align to SOC 2/ISO 27001 control families and undergo annual third-party penetration tests. GDPR-ready DPAs and SCCs are available. HIPAA/BAA and formal certifications are offered based on plan and deployment; roadmap timelines are provided under NDA."
        },
        {
          question: "How are client/portfolio-company boundaries enforced in multi-org setups?",
          answer: "Tenant isolation, workspace scoping, per-entity encryption keys, and policy labels prevent cross-entity access. \"Deal-team walls\"/information barriers enforce need-to-know by default; exceptions require auditable approvals."
        }
      ]
    },
    {
      id: "governance",
      title: "Governance & Quality",
      description: "Data quality, accuracy controls, and governance features",
      icon: "settings-line",
      faqs: [
        {
          question: "How do you ground agent outputs to our source of truth (RAG, citations, provenance)?",
          answer: "All answers resolve back to the graph and indexed sources with inline citations. We use retrieval-augmented generation, entity resolution, and lineage tracking so users can verify \"why this answer.\""
        },
        {
          question: "What safeguards reduce hallucinations? Can we require human-in-the-loop approvals?",
          answer: "Safeguards include curated retrieval, tool-limited actions, model committees for high-risk tasks, and policy checks. For sensitive flows, require reviewer sign-off, dual-control, or multi-stage approvals before actions execute."
        },
        {
          question: "How do you version and approve prompts, agents, and flows?",
          answer: "Everything is versioned with draft → review → approved states, change logs, and rollback. Promotion to production requires assigned reviewers; diffs are visible."
        }
      ]
    },
    {
      id: "integrations",
      title: "Integrations & Extensibility",
      description: "Native integrations, APIs, and custom development options",
      icon: "links-line",
      faqs: [
        {
          question: "Which native integrations are available?",
          answer: "Common connectors include Salesforce, HubSpot, Microsoft/Google 365, Slack, Drive/SharePoint, Dropbox, Notion, Gmail/Outlook, databases (Postgres, MySQL), warehouses (Snowflake, BigQuery, Redshift), storage (S3/GCS/Azure), and finance/data providers (e.g., Plaid/Carta where applicable). Don't see one? Build it with our SDK."
        },
        {
          question: "Do you have APIs/SDKs and webhooks for custom integrations?",
          answer: "Yes—REST APIs and JS/Python SDKs for ingestion, retrieval, and agent execution. Event/webhook subscriptions let you trigger external workflows on graph or agent events."
        },
        {
          question: "How does Elevation work with no-code tools we already use (e.g., Zapier/Make)?",
          answer: "Prebuilt Zapier/Make connectors expose triggers (new insight, approval needed, risk flag) and actions (run agent, write to canvas, update record). You can also hit our webhooks directly."
        }
      ]
    },
    {
      id: "implementation",
      title: "Implementation & Success",
      description: "Onboarding process, concierge services, and success metrics",
      icon: "tools-line",
      faqs: [
        {
          question: "What does a typical onboarding look like?",
          answer: "A focused 2–6 week path: Discovery (goals, systems, policies) → Connect & model (sources → graph, access controls) → Pilot use cases (2–3 canvases/agents) → Enablement (training, success metrics) → Scale (governance, rollout plan)."
        },
        {
          question: "What exactly does the Concierge Team deliver vs. the product itself?",
          answer: "The product is the platform your team uses daily. The Agentic Concierge Team accelerates value: integration setup, graph curation, playbook design, risk controls, and training. They are enablers—not a custom-dev crutch."
        },
        {
          question: "What change-management and training resources are included?",
          answer: "Role-based training, in-app guides, office hours, templates, security/approval playbooks, and a champion program to seed expertise internally."
        },
        {
          question: "How do you measure ROI and success?",
          answer: "We baseline current effort, then track time-to-insight, cycle-time reduction, error rates, compliance exceptions caught, and business outcomes (e.g., faster diligence, better pipeline hygiene). A shared dashboard monitors adoption and savings."
        }
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Licensing",
      description: "Cost structure, credits, and licensing options",
      icon: "money-dollar-circle-line",
      faqs: [
        {
          question: "How is pricing structured (platform fee, credits/usage, concierge hours)?",
          answer: "Annual platform subscription by org/workspace tier plus metered usage for model/compute tasks. Concierge services are packaged by outcome (e.g., onboarding, new use-case rollout) or retainer."
        },
        {
          question: "How do credits work and how can we forecast/limit spend?",
          answer: "Credits meter LLM tokens, retrieval, vector storage, and job runtime. Real-time dashboards, budgets, alerts, and hard caps prevent overages; policies can route tasks to lower-cost models automatically."
        },
        {
          question: "Do you offer platform-only vs. concierge packages? Seat vs. workspace pricing?",
          answer: "Yes. Choose platform-only or platform+concierge. Pricing can be seat-based, workspace-based, or hybrid depending on your structure, with volume discounts for enterprise."
        }
      ]
    },
    {
      id: "data-lifecycle",
      title: "Data Lifecycle & Portability",
      description: "Data import, export, and deletion processes",
      icon: "database-line",
      faqs: [
        {
          question: "How do we import existing documents, emails, and meeting transcripts?",
          answer: "Use native connectors, secure bulk import (S3/GCS), or APIs. We normalize and deduplicate, then map entities/relationships into the graph with lineage preserved."
        },
        {
          question: "Can we export our knowledge graph and all associated data if we leave?",
          answer: "Yes. Full export via API/Admin in open formats (JSON-LD/CSV/Parquet), including entities, relationships, citations, and optional embeddings. We provide export runbooks."
        },
        {
          question: "What is your data deletion process and timeline?",
          answer: "Deletion requests tombstone records immediately, purge hot storage within 24 hours, and remove from backups within 30 days (or your policy). Cryptographic erasure applies to customer-managed keys."
        }
      ]
    },
    {
      id: "support",
      title: "SLAs, Support & Reliability",
      description: "Uptime guarantees, support tiers, and business continuity",
      icon: "customer-service-line",
      faqs: [
        {
          question: "What uptime, response times, and incident processes do you offer?",
          answer: "Standard SLA targets 99.9% uptime (higher available on private deployments). P1 incidents receive rapid acknowledgment and continuous updates until resolved. Post-incident RCAs are shared."
        },
        {
          question: "What support tiers are available (hours, channels, dedicated manager)?",
          answer: "Standard (business hours, email/portal), Priority (24×5 + chat), and Enterprise (24×7 + Slack Connect + named CSM/TAM). We tailor runbooks and escalation paths to your org."
        },
        {
          question: "Do you provide disaster recovery and business continuity details?",
          answer: "Yes—multi-AZ architecture, automated backups, periodic restore tests, and documented RTO/RPO targets. DR/BCP documentation and test summaries are available under NDA."
        }
      ]
    },
    {
      id: "segments",
      title: "Segment-Specific",
      description: "Specialized features for different industry segments",
      icon: "building-line",
      faqs: [
        {
          question: "Family offices: How do you handle multi-entity structures, beneficiaries, and sensitive records?",
          answer: "Workspaces mirror legal/entity structure; policy labels (e.g., trust, beneficiary, medical/PII) gate access and re-identification. Sensitive vaults and approval flows keep human oversight where it matters."
        },
        {
          question: "VC/PE/IB: Can you enforce deal-team walls and information barriers?",
          answer: "Yes. Deal-team walls, MNPI tagging, pre-trade checks, and auditable approvals. Agents can be constrained to specific datasets/tools; all outputs carry provenance and retention policies."
        },
        {
          question: "Banks/government: What compliance/audit features exist for regulated environments?",
          answer: "Private VPC deployments, customer-managed keys, detailed audit/event exports, data-loss policies, and restricted model routing. We map controls to frameworks (e.g., NIST families) and support external audits."
        }
      ]
    },
    {
      id: "legal",
      title: "Legal & Procurement",
      description: "Contracts, IP ownership, and procurement requirements",
      icon: "file-text-line",
      faqs: [
        {
          question: "Do you offer DPAs, MSAs, and third-party pen-test summaries for vendor reviews?",
          answer: "Yes. Standard MSA/DPA (with SCCs where needed), security questionnaires (SIG Lite/CAIQ), and recent penetration-test summaries are available under NDA."
        },
        {
          question: "What is your stance on IP ownership for custom agents/flows created on the platform?",
          answer: "You own the IP for agents, prompts, and playbooks created for your org. We retain IP to the platform and grant you a license to use our components; you grant us a limited license to operate your assets within the service."
        }
      ]
    },
    {
      id: "accessibility",
      title: "Internationalization & Accessibility",
      description: "Language support and accessibility standards",
      icon: "global-line",
      faqs: [
        {
          question: "Which languages and locales are supported?",
          answer: "The product supports multilingual content understanding and generation via model routing. UI is English-first with additional locales rolling out; date/time/number formats respect workspace locale."
        },
        {
          question: "Do you meet accessibility standards (WCAG) across the app?",
          answer: "We design to WCAG 2.1 AA (keyboard nav, screen-reader labels, contrast modes) and actively close gaps as standards evolve."
        }
      ]
    }
  ]

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
                    Frequently Asked Questions
                  </H1>
                  <P className="max-w-[42rem] mx-auto">
                    Your questions, answered. Find comprehensive information about Elevation AI, our platform, and our partnership model organized by category.
                  </P>
                </div>
              </div>

              {/* FAQ Section - Categories as Accordion Items */}
              <Section paddingY="lg">
                <div className="max-w-6xl mx-auto">
                  <Accordion type="multiple" className="w-full space-y-4">
                    {faqCategories.map((category, categoryIndex) => (
                      <AccordionItem 
                        key={category.id} 
                        value={`category-${category.id}`}
                        className="border border-border rounded-lg bg-card"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon name={category.icon} className="h-4 w-4 text-primary" />
                            </div>
                            <div className="text-left">
                              <H3 className="text-lg font-semibold">
                                {category.title}
                              </H3>
                              <P className="text-sm text-muted-foreground mt-1">
                                {category.description} • {category.faqs.length} questions
                              </P>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4">
                            {category.faqs.map((faq, faqIndex) => (
                              <Accordion key={`${category.id}-${faqIndex}`} type="single" collapsible className="w-full">
                                <AccordionItem 
                                  value={`faq-${category.id}-${faqIndex}`}
                                  className="border border-border/50 rounded-lg bg-muted/30"
                                >
                                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4 px-4 text-base sm:text-base md:text-lg">
                                    {faq.question}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-muted-foreground pb-4 px-4 text-sm sm:text-base leading-relaxed">
                                    {faq.answer}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Section>

              {/* Still Have Questions Card */}
              <Section paddingY="lg">
                <div className="max-w-6xl mx-auto">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8 text-center">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="question-line" className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <H3>
                        Still have questions?
                      </H3>
                      <P className="max-w-md mx-auto">
                        Can't find what you're looking for? Our team is here to help. Reach out and we'll get back to you as soon as possible.
                      </P>
                      <div className="pt-2">
                        <Link href="/website/contact">
                          <Button size="lg" className="gap-2">
                            <Icon name="mail-line" className="h-4 w-4" />
                            Contact Us
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </Container>
          </main>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
