"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Grid } from "@/components/ui/layout/grid"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainHeader } from "@/components/ui/main-header"
import { MobileOnlyLayout } from "@/components/ui/layout/mobile-only-layout"
import { MobileMenuDrawer } from "@/components/ui/mobile-menu-drawer"
import { WebsiteFooter } from "@/components/ui/website-footer"
import { H1, H2, H3, P, BodyLarge } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ChevronRight, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React, { useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import * as THREE from "three"
import Icon from "@/components/ui/icon"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SolutionsSubNav } from "@/components/ui/solutions-sub-nav"

// Solutions Hero Section Component
function SolutionsHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // Setup Three.js
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 0)
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    
    // Store refs for cleanup
    sceneRef.current = scene
    rendererRef.current = renderer

    // Set renderer size
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    updateSize()

    // Create shader material with brand colors
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uStartColor: { value: new THREE.Color('#0e62fd') }, // Elevation Blue 500
        uEndColor: { value: new THREE.Color('#93c5fd') }, // Elevation Blue 300
        uMouseX: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectionPosition;
          
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uStartColor;
        uniform vec3 uEndColor;
        uniform float uMouseX;
        
        varying vec2 vUv;
      
        // Classic Perlin 3D Noise by Stefan Gustavson
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float cnoise(vec3 P){
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
          return 2.2 * n_xyz;
        }

        void main() {
          float strength = cnoise(vec3(vUv * 3.0, uTime * 0.4));
          
          float gradient = vUv.x;
          strength += gradient;
          
          strength = clamp(strength, 0.0, 1.0);
          
          strength += uMouseX;
          
          vec3 color = mix(uStartColor, uEndColor, strength);
          
          gl_FragColor = vec4(color, 0.6);
        }
      `
    })
    
    materialRef.current = material

    // Create plane
    const planeGeometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(planeGeometry, material)
    scene.add(plane)

    // Mouse tracking
    let mouseX = 0
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = (event.clientX - rect.left) / rect.width - 0.5
    }
    document.addEventListener('mousemove', handleMouseMove)

    // Animation
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouseX.value += (mouseX - material.uniforms.uMouseX.value) * 0.1
      
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      updateSize()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (renderer) {
        renderer.dispose()
      }
      if (material) {
        material.dispose()
      }
      if (planeGeometry) {
        planeGeometry.dispose()
      }
    }
  }, [])

  return (
    <Section 
      paddingY="lg" 
      className="flex items-center py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <H1>
                Solutions for Every
                <span className="block">Industry & Stage</span>
              </H1>
              <P className="text-muted-foreground max-w-2xl">
                Tailored AI solutions driving growth, efficiency, and innovation across your organization. From startups to enterprises, we provide the right tools for every business lifecycle stage.
              </P>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                onClick={() => {
                  const element = document.getElementById('industry-solutions')
                  if (element) {
                    const headerHeight = 64 // Height of the fixed header (4rem = 64px)
                    const elementPosition = element.offsetTop
                    const offsetPosition = elementPosition - headerHeight - 32 // Add 32px buffer
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
              >
                View Solutions
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/website/demo">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div 
              ref={containerRef}
              className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background/50 to-background/30 border border-border/50 overflow-hidden backdrop-blur-sm"
            >
              {/* Three.js Canvas */}
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />

              {/* Animated Grid Background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 dark:hidden opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
                <div 
                  className="absolute inset-0 hidden dark:block opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                  }}
                />
              </div>

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <img 
                    src="/images/branding/E-AI-Arrow.svg" 
                    alt="Elevation AI Arrow Logo" 
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-80 hover:opacity-100 transition-opacity duration-300 dark:brightness-0 dark:invert"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Industry Solutions Data
const industrySolutions = [
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

// Stage Solutions Data
const stageSolutions = [
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
      'Regulatory Compliance: Automated SEC reporting, compliance monitoring, and audit preparation',
      'Investor Relations: Automated reporting, stakeholder communication, and transparency management',
      'Operations Management: Process optimization, performance monitoring, and efficiency improvement',
      'Risk Management: Enterprise risk assessment, scenario analysis, and mitigation strategies'
    ],
    useCases: [
      'Streamline Investor Relations: Use our platform to manage all investor communications, track analyst coverage, and deploy agents to analyze earnings call transcripts for key sentiment and questions.',
      'Automate Compliance & Governance: Deploy ambient agents to monitor internal communications and workflows for compliance with public company regulations, creating a full, auditable trail.',
      'Enhance Cross-Functional Alignment: Use our collaborative Workspaces to ensure your finance, legal, and leadership teams are perfectly aligned on all public-facing communications and reporting.',
      'Engage the Right Public Market Partners: Identify and manage relationships with investor relations firms, specialized legal counsel, and other key partners essential for public company success.'
    ],
    integrations: 'We integrate with the tools essential for public company operations, from investor relations platforms and compliance systems to financial reporting and communication tools. Connect with Q4, Ipreo, and other public company platforms to streamline your operations.'
      },
      {
        id: 'family-office',
        title: 'Post-Exit Family Office Creation',
    subtitle: 'From Building a Business to Building a Legacy',
    description: 'After a successful exit, the challenge shifts from operating a single company to managing a complex universe of liquid assets, private investments, and personal affairs. Elevation AI provides the sophisticated platform to build and manage your new family office.',
    challenge: {
      title: 'The Transition from Operator to Orchestrator',
      content: 'The skills and tools required to run a family office are fundamentally different from those used to run a business. You need a secure, centralized system to manage a diverse portfolio, coordinate with a new team of advisors, and plan for the long term.'
    },
    solutions: [
      'Asset Management: Portfolio management, investment analysis, and performance tracking',
      'Wealth Planning: Tax optimization, estate planning, and legacy management',
      'Family Governance: Family meeting management, decision tracking, and communication',
      'Philanthropy: Charitable giving management, impact tracking, and foundation operations'
    ],
    useCases: [
      'Unified Asset Management: Centralize the tracking of your entire financial universe—from public market holdings and private equity investments to real estate and personal assets—in one secure place.',
      'Assemble Your Team of Trusted Advisors: Leverage our platform and network to identify, vet, and coordinate with the team of experts—wealth managers, accountants, lawyers, and trustees—who will form the foundation of your new family office.',
      'Coordinate Your Team of Advisors: Use our secure Workspaces to collaborate with your entire team—your wealth managers, accountants, lawyers, and trustees—ensuring everyone is working from the same information.',
      'Automate Your Personal & Financial Life: Deploy agents to manage everything from capital call administration and tax document collection to coordinating family travel and managing philanthropic giving.'
    ],
    integrations: 'We integrate with the tools essential for family office operations, from portfolio management and tax planning systems to family governance and philanthropic platforms. Connect with Addepar, eMoney, and other family office tools to streamline your operations.'
  }
]

// Helper function to get icon for industry solutions
const getIndustryIcon = (solutionId: string): string => {
  switch (solutionId) {
    case 'private-markets': return 'building-2-line'
    case 'public-markets': return 'store-line'
    case 'banks': return 'bank-line'
    case 'enterprise': return 'briefcase-line'
    case 'government': return 'government-line'
    default: return 'building-2-line'
  }
}

// Helper function to get icon for stage solutions
const getStageIcon = (solutionId: string): string => {
  switch (solutionId) {
    case 'creating-venture': return 'rocket-line'
    case 'scaling-venture': return 'team-line'
    case 'exiting-venture': return 'logout-box-line'
    case 'post-ipo-growth': return 'bar-chart-line'
    case 'family-office': return 'home-line'
    default: return 'trending-up-line'
  }
}

// Solution type definition
interface Solution {
  id: string
  title: string
  subtitle: string
  description: string
  challenge: {
    title: string
    content: string
  }
  solutions: string[]
  useCases: string[]
  integrations: string
}

// Industry Solutions Section Component
function IndustrySolutionsSection() {
  const [openCardId, setOpenCardId] = React.useState<string | null>(null)
  const searchParams = useSearchParams()
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleToggle = (cardId: string) => {
    const newOpenCardId = openCardId === cardId ? null : cardId
    setOpenCardId(newOpenCardId)
    
    // Scroll to the card when opening
    if (newOpenCardId) {
      setTimeout(() => {
        const cardElement = cardRefs.current[newOpenCardId]
        if (cardElement) {
          const headerHeight = 64 // Height of the fixed header (4rem = 64px)
          const elementPosition = cardElement.offsetTop
          const offsetPosition = elementPosition - headerHeight - 32 // Add 32px buffer for better positioning
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleNavigateUp = () => {
    const currentIndex = industrySolutions.findIndex(sol => sol.id === openCardId)
    if (currentIndex > 0) {
      const prevCardId = industrySolutions[currentIndex - 1].id
      setOpenCardId(prevCardId)
      setTimeout(() => {
        const cardElement = cardRefs.current[prevCardId]
        if (cardElement) {
          const headerHeight = 64
          const elementPosition = cardElement.offsetTop
          const offsetPosition = elementPosition - headerHeight - 32
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleNavigateDown = () => {
    const currentIndex = industrySolutions.findIndex(sol => sol.id === openCardId)
    if (currentIndex < industrySolutions.length - 1) {
      const nextCardId = industrySolutions[currentIndex + 1].id
      setOpenCardId(nextCardId)
      setTimeout(() => {
        const cardElement = cardRefs.current[nextCardId]
        if (cardElement) {
          const headerHeight = 64
          const elementPosition = cardElement.offsetTop
          const offsetPosition = elementPosition - headerHeight - 32
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  // Handle URL parameters on mount
  useEffect(() => {
    const openParam = searchParams.get('open')
    if (openParam && industrySolutions.some(s => s.id === openParam)) {
      setOpenCardId(openParam)
      
      // Function to attempt scrolling with retries
      const attemptScroll = (retries = 0) => {
        const cardElement = cardRefs.current[openParam]
        
        if (cardElement) {
          // Get the header element and its height
          const header = document.querySelector('header')
          const headerHeight = header ? header.offsetHeight : 80 // Increased fallback to 80px
          
          // Get the target element's position relative to the document
          const targetRect = cardElement.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const targetTop = targetRect.top + scrollTop
          
          // Calculate the final scroll position with proper offset
          const finalScrollPosition = targetTop - headerHeight - 32 // 32px buffer for better positioning
          
          
          // Only scroll if we have a valid position and the element is visible
          if (targetRect.height > 0 && finalScrollPosition > 0) {
            window.scrollTo({
              top: Math.max(0, finalScrollPosition),
              behavior: 'smooth'
            })
          } else if (retries < 20) {
            // Retry if element isn't ready yet - increased retries and delay
            setTimeout(() => attemptScroll(retries + 1), 100)
          }
        } else if (retries < 20) {
          // Retry if element doesn't exist yet - increased retries and delay
          setTimeout(() => attemptScroll(retries + 1), 100)
        }
      }
      
      // Wait for the page to be fully loaded and then start the scroll attempt
      const startScroll = () => {
        if (document.readyState === 'complete') {
          // Use a longer delay to ensure all components are rendered
          setTimeout(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                attemptScroll()
              })
            })
          }, 300)
        } else {
          // Wait for the page to finish loading
          window.addEventListener('load', () => {
            setTimeout(() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  attemptScroll()
                })
              })
            }, 300)
          }, { once: true })
        }
      }
      
      startScroll()
    }
  }, [searchParams])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (openCardId && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault()
        if (event.key === 'ArrowUp') {
          handleNavigateUp()
        } else if (event.key === 'ArrowDown') {
          handleNavigateDown()
        }
      }
    }

    if (openCardId) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openCardId])

  return (
    <Section id="industry-solutions" paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-24">
              <H1>Industry Solutions</H1>
              <P className="text-muted-foreground">
                Every industry faces unique challenges in the agentic era. From complex regulatory requirements to specialized workflows, Elevation AI provides industry-specific solutions that understand your domain, integrate with your existing systems, and deliver measurable results.
              </P>
            </div>
          </div>
          
          {/* Right Column - Cards */}
          <div className="space-y-4 lg:col-span-2">
            {industrySolutions.map((solution, index) => (
              <div 
                key={solution.id}
                ref={(el) => { cardRefs.current[solution.id] = el }}
              >
                <ExpandableSolutionCard 
                  solution={solution} 
                  type="industry"
                  isOpen={openCardId === solution.id}
                  onToggle={() => handleToggle(solution.id)}
                  currentIndex={index}
                  totalCards={industrySolutions.length}
                  onNavigateUp={handleNavigateUp}
                  onNavigateDown={handleNavigateDown}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Stage Solutions Section Component
function StageSolutionsSection() {
  const [openCardId, setOpenCardId] = React.useState<string | null>(null)
  const searchParams = useSearchParams()
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleToggle = (cardId: string) => {
    const newOpenCardId = openCardId === cardId ? null : cardId
    setOpenCardId(newOpenCardId)
    
    // Scroll to the card when opening
    if (newOpenCardId) {
      setTimeout(() => {
        const cardElement = cardRefs.current[newOpenCardId]
        if (cardElement) {
          const headerHeight = 64 // Height of the fixed header (4rem = 64px)
          const elementPosition = cardElement.offsetTop
          const offsetPosition = elementPosition - headerHeight - 32 // Add 32px buffer for better positioning
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleNavigateUp = () => {
    const currentIndex = stageSolutions.findIndex(sol => sol.id === openCardId)
    if (currentIndex > 0) {
      const prevCardId = stageSolutions[currentIndex - 1].id
      setOpenCardId(prevCardId)
      setTimeout(() => {
        const cardElement = cardRefs.current[prevCardId]
        if (cardElement) {
          const headerHeight = 64
          const elementPosition = cardElement.offsetTop
          const offsetPosition = elementPosition - headerHeight - 32
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleNavigateDown = () => {
    const currentIndex = stageSolutions.findIndex(sol => sol.id === openCardId)
    if (currentIndex < stageSolutions.length - 1) {
      const nextCardId = stageSolutions[currentIndex + 1].id
      setOpenCardId(nextCardId)
      setTimeout(() => {
        const cardElement = cardRefs.current[nextCardId]
        if (cardElement) {
          const headerHeight = 64
          const elementPosition = cardElement.offsetTop
          const offsetPosition = elementPosition - headerHeight - 32
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  // Handle URL parameters on mount
  useEffect(() => {
    const openParam = searchParams.get('open')
    if (openParam && stageSolutions.some(s => s.id === openParam)) {
      setOpenCardId(openParam)
      
      // Function to attempt scrolling with retries
      const attemptScroll = (retries = 0) => {
        const cardElement = cardRefs.current[openParam]
        
        if (cardElement) {
          // Get the header element and its height
          const header = document.querySelector('header')
          const headerHeight = header ? header.offsetHeight : 80 // Increased fallback to 80px
          
          // Get the target element's position relative to the document
          const targetRect = cardElement.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const targetTop = targetRect.top + scrollTop
          
          // Calculate the final scroll position with proper offset
          const finalScrollPosition = targetTop - headerHeight - 32 // 32px buffer for better positioning
          
          
          // Only scroll if we have a valid position and the element is visible
          if (targetRect.height > 0 && finalScrollPosition > 0) {
            window.scrollTo({
              top: Math.max(0, finalScrollPosition),
              behavior: 'smooth'
            })
          } else if (retries < 20) {
            // Retry if element isn't ready yet - increased retries and delay
            setTimeout(() => attemptScroll(retries + 1), 100)
          }
        } else if (retries < 20) {
          // Retry if element doesn't exist yet - increased retries and delay
          setTimeout(() => attemptScroll(retries + 1), 100)
        }
      }
      
      // Wait for the page to be fully loaded and then start the scroll attempt
      const startScroll = () => {
        if (document.readyState === 'complete') {
          // Use a longer delay to ensure all components are rendered
          setTimeout(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                attemptScroll()
              })
            })
          }, 300)
        } else {
          // Wait for the page to finish loading
          window.addEventListener('load', () => {
            setTimeout(() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  attemptScroll()
                })
              })
            }, 300)
          }, { once: true })
        }
      }
      
      startScroll()
    }
  }, [searchParams])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (openCardId && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault()
        if (event.key === 'ArrowUp') {
          handleNavigateUp()
        } else if (event.key === 'ArrowDown') {
          handleNavigateDown()
        }
      }
    }

    if (openCardId) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openCardId])

  return (
    <Section id="stage-solutions" paddingY="lg">
      <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-24">
              <H1>By Stage Solutions</H1>
              <P className="text-muted-foreground">
                Every organization goes through distinct stages of growth and evolution. Each stage presents unique challenges, opportunities, and requirements. Elevation AI provides stage-specific solutions that understand your current needs while preparing you for what's next.
              </P>
            </div>
          </div>
          
          {/* Right Column - Cards */}
          <div className="space-y-4 lg:col-span-2">
            {stageSolutions.map((solution, index) => (
              <div 
                key={solution.id}
                ref={(el) => { cardRefs.current[solution.id] = el }}
              >
                <ExpandableSolutionCard 
                  solution={solution} 
                  type="stage"
                  isOpen={openCardId === solution.id}
                  onToggle={() => handleToggle(solution.id)}
                  currentIndex={index}
                  totalCards={stageSolutions.length}
                  onNavigateUp={handleNavigateUp}
                  onNavigateDown={handleNavigateDown}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Expandable Solution Card Component
function ExpandableSolutionCard({ 
  solution, 
  type, 
  isOpen, 
  onToggle, 
  currentIndex, 
  totalCards, 
  onNavigateUp, 
  onNavigateDown 
}: { 
  solution: Solution, 
  type: 'industry' | 'stage',
  isOpen: boolean,
  onToggle: () => void,
  currentIndex: number,
  totalCards: number,
  onNavigateUp: () => void,
  onNavigateDown: () => void
}) {
  const iconName = type === 'industry' ? getIndustryIcon(solution.id) : getStageIcon(solution.id)

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className="w-full bg-transparent hover:bg-muted/20 transition-colors">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer py-2 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
                  <Icon 
                    name={iconName} 
                    size="2xl" 
                    className="text-primary" 
                  />
          </div>
               <div className="space-y-1 flex-1">
                   <CardTitle className="text-left text-base lg:text-xl">{solution.title}</CardTitle>
                   <CardDescription className="text-left">
                     <P className="text-sm sm:text-base">{solution.subtitle}</P>
                   </CardDescription>
                 </div>
              </div>
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground rotate-180" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <P className="text-muted-foreground">{solution.description}</P>
            
            <div className="space-y-4">
              <H3 className="text-lg font-semibold">{solution.challenge.title}</H3>
              <BodyLarge className="text-primary">{solution.challenge.content}</BodyLarge>
            </div>

            <div className="space-y-4">
              <H3 className="text-lg font-semibold">Our Solution</H3>
              <ul className="space-y-2">
                {solution.solutions.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <P className="text-sm">{item}</P>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <H3 className="text-lg font-semibold">Use Cases in Action</H3>
              <div className="space-y-3">
                {solution.useCases.map((useCase: string, index: number) => (
                  <div key={index} className="group relative p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg hover:from-primary/10 hover:to-primary/15 transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-primary">{index + 1}</span>
                      </div>
                      <P className="text-sm leading-relaxed">{useCase}</P>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <H3 className="text-lg font-semibold">Key Integrations</H3>
              <div className="p-4 border border-border/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                    <Icon name="links-line" size="sm" className="text-primary" />
                  </div>
                  <P className="text-sm leading-relaxed text-muted-foreground">{solution.integrations}</P>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button size="sm" asChild className="w-full sm:w-auto">
                    <Link href="/website/demo">
                      Schedule Consultation
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                    <Link href="/website/contact">
                      Contact Sales
                    </Link>
                  </Button>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onNavigateUp}
                    disabled={currentIndex === 0}
                    className="flex-1 sm:flex-none sm:p-2"
                    title="Previous card (↑)"
                  >
                    <Icon name="arrow-up-s-line" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onNavigateDown}
                    disabled={currentIndex === totalCards - 1}
                    className="flex-1 sm:flex-none sm:p-2"
                    title="Next card (↓)"
                  >
                    <Icon name="arrow-down-s-line" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
        </div>
      </CardContent>
        </CollapsibleContent>
    </Card>
    </Collapsible>
  )
}


export default function WireframesSolutionsPage() {
  // Disable browser's scroll restoration to prevent conflicts with our custom scroll handling
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    return () => {
      // Restore scroll restoration on cleanup
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  return (
    <PageWrapper>
      <MobileOnlyLayout
        header={<MainHeader currentPage="solutions" />}
        footer={<WebsiteFooter />}
        mobileMenu={<MobileMenuDrawer currentPage="solutions" />}
      >
        {/* Solutions Sub Navigation */}
        <SolutionsSubNav />
        
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Suspense fallback={<div>Loading...</div>}>
            <main>
              {/* Solutions Hero Section */}
              <SolutionsHeroSection />

              {/* Industry Solutions Section */}
              <IndustrySolutionsSection />

              {/* Stage Solutions Section */}
              <StageSolutionsSection />

            {/* Solution Features Section */}
            <Section paddingY="lg" className="bg-primary/5">
              <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
                <div className="space-y-8">
                  <div className="text-center space-y-4 max-w-4xl mx-auto">
                    <H1>Built for Every Industry, Every Scale</H1>
                    <P className="text-muted-foreground">
                      Our platform adapts to your environment with flexible deployment options, comprehensive integrations, and enterprise-grade governance.
                    </P>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-6 bg-primary/10 border-primary/20">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="shield-check-line" size="lg" className="text-primary" />
                        </div>
                        <div>
                          <H3 className="text-lg font-semibold mb-2">Industry-Ready Compliance</H3>
                          <P className="text-sm text-muted-foreground">Policy packs and guardrails mapped to leading frameworks (e.g., SOC 2/ISO control families, GDPR). Data residency by region and information-barrier controls for regulated workflows.</P>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-primary/10 border-primary/20">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="cloud-line" size="lg" className="text-primary" />
                        </div>
                        <div>
                          <H3 className="text-lg font-semibold mb-2">Flexible Deployment</H3>
                          <P className="text-sm text-muted-foreground">Run as managed cloud, in your private VPC, or on-prem. Choose model routing and data residency per workspace to meet security and latency needs.</P>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-primary/10 border-primary/20">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="links-line" size="lg" className="text-primary" />
                        </div>
                        <div>
                          <H3 className="text-lg font-semibold mb-2">Comprehensive Integrations</H3>
                          <P className="text-sm text-muted-foreground">Native connectors for Salesforce, Google/Microsoft 365, Slack, cloud storage, databases/warehouses (Snowflake, BigQuery, Redshift), plus open APIs/SDKs for anything custom.</P>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-primary/10 border-primary/20">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="lock-line" size="lg" className="text-primary" />
                        </div>
                        <div>
                          <H3 className="text-lg font-semibold mb-2">Enterprise-Grade Security</H3>
                          <P className="text-sm text-muted-foreground">Tenant isolation, SSO (SAML/OIDC), RBAC/ABAC, encryption in transit and at rest, fine-grained audit logs, and approval workflows for sensitive actions.</P>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-primary/10 border-primary/20">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="database-2-line" size="lg" className="text-primary" />
                        </div>
                        <div>
                          <H3 className="text-lg font-semibold mb-2">Scalable Architecture</H3>
                          <P className="text-sm text-muted-foreground">Multi-workspace, multi-entity design that scales horizontally as your data and teams grow—with budgets, routing, and usage controls to keep costs predictable.</P>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-6 bg-primary/10 border-primary/20">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="customer-service-line" size="lg" className="text-primary" />
                        </div>
                        <div>
                          <H3 className="text-lg font-semibold mb-2">Support & Concierge</H3>
                          <P className="text-sm text-muted-foreground">Tiered support and an Agentic Concierge Team to accelerate onboarding and new use cases. 24×7 incident response is available on Enterprise and private deployments.</P>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Container>
            </Section>

            {/* CTA Section */}
            <Section paddingY="lg" className="bg-muted/30">
              <Container size="2xl" className="lg:max-w-[1400px] xl:max-w-[1920px] 2xl:max-w-[2560px]">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <div className="space-y-4">
                    <H1>Ready to Transform Your Organization?</H1>
                    <P className="text-muted-foreground leading-relaxed">
                      Discover how Elevation AI can solve your unique industry challenges and accelerate your growth.
                    </P>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <Link href="/website/demo">
                        Schedule Consultation
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/website/contact">
                        Contact Sales
                      </Link>
                    </Button>
                  </div>
                </div>
                </Container>
              </Section>
            </main>
          </Suspense>
        </div>
      </MobileOnlyLayout>
    </PageWrapper>
  )
}
