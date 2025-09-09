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
import Icon from "@/components/ui/icon"
import Link from "next/link"
import React from "react"


export default function FAQPage() {
  const faqs = [
    {
      question: "What is Agentic AI?",
      answer: "Agentic AI is the shift from AI that assists with tasks to intelligent systems that help execute entire workflows. Think of it as creating a team of digital employees who can understand goals, make plans, and take action on your behalf, freeing up your human team to focus on high-value strategy."
    },
    {
      question: "What is a Knowledge Graph?",
      answer: "The Knowledge Graph is your company's private brain. We create it by unifying all of your scattered information—from emails and meeting transcripts to data in your CRM and other applications. This becomes a secure, private intelligence layer that provides the essential context for our AI agents to perform tasks with a high degree of precision and relevance to your business."
    },
    {
      question: "How is Elevation AI different from other AI tools?",
      answer: "Most AI tools are designed to solve a single, specific problem. Elevation AI is a business orchestration platform that acts as the central nervous system for your entire operation. We are a middleware layer that unifies your universe of data and then securely connects you to the world's best AI tools and agents, ensuring you can leverage the best of the entire ecosystem without being locked into a single provider."
    },
    {
      question: "Is my data secure on your platform?",
      answer: "Yes. Security is at the core of our platform. All data is encrypted both at rest and in transit. Furthermore, when you use our platform to interact with external AI models, we de-identify your sensitive data before it is sent and re-identify the results upon return. This means you get the power of the world's best AI without ever exposing your proprietary information."
    },
    {
      question: "What is the Agentic Concierge Team?",
      answer: "Technology alone isn't enough to drive transformation. For clients who need a deep, hands-on partnership, our Agentic Concierge Team of expert engineers and strategists acts as your team to design, build, and implement the specific agentic solutions that solve your biggest challenges."
    },
    {
      question: "Do I have to replace my existing software to use Elevation AI?",
      answer: "No. Our platform is designed to be the orchestration layer that sits on top of and connects to your existing systems. We integrate with the tools you already use—from your CRM and ERP to your communication platforms—to unlock the value that is currently trapped within them."
    },
    {
      question: "Who is Elevation AI for?",
      answer: "We partner with growth-oriented leaders of complex businesses who recognize the strategic need to build a more scalable and efficient operational foundation. Our core focus is on Private Market Organizations and their portfolio companies, as well as Enterprise clients. We also have deep expertise in serving Public Market Firms, Banks, and Government entities."
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
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[42rem] mx-auto">
                    Your questions, answered. Here are some of the most common inquiries we receive about Elevation AI, our platform, and our partnership model.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <Section paddingY="sm">
                <div className="max-w-4xl mx-auto">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border border-border rounded-lg px-6 bg-card"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Section>

              {/* Still Have Questions Card */}
              <Section paddingY="lg">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8 text-center">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="question-line" className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Still have questions?
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Can't find what you're looking for? Our team is here to help. Reach out and we'll get back to you as soon as possible.
                      </p>
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
