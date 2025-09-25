"use client"

import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { PageHeader } from "@/components/ui/marketing/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { H2, H3, H4, BodyLarge, BodySmall } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import Link from "next/link"

export default function InstallationPage() {
  const quickStartSteps = [
    {
      step: "1",
      title: "Create Next.js Project",
      description: "Initialize a new Next.js project with TypeScript",
      code: `npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app`,
      language: "bash"
    },
    {
      step: "2",
      title: "Install Core Dependencies",
      description: "Install all required packages for the design system",
      code: `npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group class-variance-authority clsx tailwind-merge remixicon framer-motion next-themes sonner zod react-hook-form @hookform/resolvers`,
      language: "bash"
    },
    {
      step: "3",
      title: "Install Animation & 3D Dependencies",
      description: "Add packages for animations and 3D graphics",
      code: `npm install three @types/three @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities embla-carousel-react react-day-picker date-fns input-otp cmdk vaul react-resizable-panels recharts remixicon`,
      language: "bash"
    },
    {
      step: "4",
      title: "Install Database & Auth",
      description: "Add Supabase for database and authentication",
      code: `npm install @supabase/supabase-js @supabase/ssr @supabase/auth-helpers-nextjs @supabase/auth-helpers-react @supabase/auth-ui-react @supabase/auth-ui-shared`,
      language: "bash"
    },
    {
      step: "5",
      title: "Install Development Dependencies",
      description: "Add development tools and utilities",
      code: `npm install -D @tailwindcss/typography @tailwindcss/postcss tailwindcss-animate tw-animate-css @vercel/speed-insights dotenv`,
      language: "bash"
    }
  ]

  const systemRequirements = [
    {
      name: "Node.js",
      version: "18.0.0 or higher",
      description: "JavaScript runtime environment",
      status: "Required",
      icon: "server-line"
    },
    {
      name: "Next.js",
      version: "15.5.0",
      description: "React framework for production",
      status: "Required",
      icon: "code-s-slash-line"
    },
    {
      name: "React",
      version: "19.1.0",
      description: "UI library for building user interfaces",
      status: "Required",
      icon: "reactjs-line"
    },
    {
      name: "TypeScript",
      version: "5.0.0 or higher",
      description: "Type-safe JavaScript development",
      status: "Required",
      icon: "code-line"
    },
    {
      name: "Tailwind CSS",
      version: "4.0.0",
      description: "Utility-first CSS framework",
      status: "Required",
      icon: "palette-line"
    }
  ]

  const coreDependencies = [
    {
      category: "UI Components",
      packages: [
        { name: "@radix-ui/react-slot", version: "^1.2.3", description: "Primitive component for composition" },
        { name: "@radix-ui/react-dialog", version: "^1.1.15", description: "Modal dialog component" },
        { name: "@radix-ui/react-dropdown-menu", version: "^2.1.16", description: "Dropdown menu component" },
        { name: "@radix-ui/react-select", version: "^2.2.6", description: "Select component" },
        { name: "@radix-ui/react-tabs", version: "^1.1.13", description: "Tabs component" },
        { name: "@radix-ui/react-tooltip", version: "^1.2.8", description: "Tooltip component" }
      ]
    },
    {
      category: "Styling & Utilities",
      packages: [
        { name: "class-variance-authority", version: "^0.7.1", description: "Component variant management" },
        { name: "clsx", version: "^2.1.1", description: "Conditional className utility" },
        { name: "tailwind-merge", version: "^3.3.1", description: "Tailwind class merging utility" },
        { name: "remixicon", version: "^3.5.0", description: "Icon library" },
        { name: "next-themes", version: "^0.4.6", description: "Theme management" }
      ]
    },
    {
      category: "Animation & 3D",
      packages: [
        { name: "framer-motion", version: "12.23.21", description: "Animation library" },
        { name: "three", version: "^0.179.1", description: "3D graphics library" },
        { name: "@types/three", version: "^0.179.0", description: "TypeScript definitions for Three.js" },
        { name: "@dnd-kit/core", version: "^6.3.1", description: "Drag and drop functionality" }
      ]
    },
    {
      category: "Forms & Validation",
      packages: [
        { name: "react-hook-form", version: "^7.62.0", description: "Form management" },
        { name: "@hookform/resolvers", version: "^5.2.1", description: "Form validation resolvers" },
        { name: "zod", version: "^4.0.17", description: "Schema validation" },
        { name: "input-otp", version: "^1.4.2", description: "OTP input component" }
      ]
    },
    {
      category: "Database & Auth",
      packages: [
        { name: "@supabase/supabase-js", version: "^2.57.4", description: "Supabase JavaScript client" },
        { name: "@supabase/ssr", version: "^0.7.0", description: "Supabase SSR utilities" },
        { name: "@supabase/auth-helpers-nextjs", version: "^0.10.0", description: "Next.js auth helpers" },
        { name: "@supabase/auth-ui-react", version: "^0.4.7", description: "Auth UI components" }
      ]
    }
  ]

  const frameworkGuides = [
    {
      name: "Next.js 15",
      description: "Full-stack React framework with App Router",
      icon: "code-s-slash-line",
      difficulty: "Easy",
      features: ["App Router", "Server Components", "API Routes", "Image Optimization"],
      setup: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir"
    },
    {
      name: "Vite + React",
      description: "Fast build tool with React",
      icon: "flashlight-line",
      difficulty: "Easy",
      features: ["Fast HMR", "ESBuild", "Plugin System", "TypeScript Support"],
      setup: "npm create vite@latest my-app -- --template react-ts"
    },
    {
      name: "Create React App",
      description: "Official React build tool",
      icon: "reactjs-line",
      difficulty: "Medium",
      features: ["Webpack", "Babel", "Jest", "Service Worker"],
      setup: "npx create-react-app my-app --template typescript"
    }
  ]

  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation />}
        sidebar={<DesignSystemSidebar />}
      >
        <Container size="2xl">
          <Section paddingY="xl">
            <PageHeader
              title="Comprehensive Installation Guide"
              description="Complete setup guide for the Elevation AI Design System. Includes all frameworks, dependencies, and configuration needed to build modern applications with our design system."
              size="lg"
              centered
            />
          </Section>

          {/* Quick Start */}
          <Section paddingY="lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Quick Start Installation</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                Follow these steps to get the complete Elevation AI Design System up and running in your project.
              </BodyLarge>
              <div className="space-y-6">
                {quickStartSteps.map((step) => (
                  <Card key={step.step} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <H3 className="text-lg font-semibold mb-2">{step.title}</H3>
                          <BodyLarge className="text-muted-foreground mb-4">{step.description}</BodyLarge>
                          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{step.code}</pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* System Requirements */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">System Requirements</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Ensure your development environment meets these requirements for optimal performance.
              </BodyLarge>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemRequirements.map((req) => (
                  <Card key={req.name} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={req.icon} className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{req.name}</CardTitle>
                            <BodySmall className="text-muted-foreground">{req.version}</BodySmall>
                          </div>
                        </div>
                        <Badge variant={req.status === "Required" ? "default" : "secondary"}>
                          {req.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BodySmall className="text-muted-foreground">{req.description}</BodySmall>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* Core Dependencies */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Core Dependencies</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                The design system is built on a comprehensive set of dependencies. Here's what each category provides:
              </BodyLarge>
              
              <div className="space-y-8">
                {coreDependencies.map((category) => (
                  <div key={category.category}>
                    <H3 className="text-xl font-semibold mb-4 flex items-center">
                      <Icon name="package-line" className="h-5 w-5 mr-2 text-primary" />
                      {category.category}
                    </H3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.packages.map((pkg) => (
                        <Card key={pkg.name} className="group hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <H4 className="text-sm font-mono text-primary truncate">{pkg.name}</H4>
                                <BodySmall className="text-muted-foreground text-xs">{pkg.version}</BodySmall>
                              </div>
                            </div>
                            <BodySmall className="text-muted-foreground text-sm">{pkg.description}</BodySmall>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Configuration Files */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Configuration Files</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Essential configuration files you'll need to set up in your project.
              </BodyLarge>
              
              <div className="space-y-6">
                {/* Tailwind Config */}
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="palette-line" className="h-5 w-5 mr-2 text-primary" />
                      tailwind.config.js
                    </H3>
                    <BodySmall className="text-muted-foreground">
                      Complete Tailwind CSS configuration with custom colors, spacing, and animations.
                    </BodySmall>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{`/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Custom color palette
        elevation: {
          50: '#f5f9ff',
          100: '#e0efff',
          500: '#0e62fd',
          900: '#052864',
        },
        periwinkle: {
          50: '#f8f7fe',
          500: '#7458f4',
          900: '#2e2362',
        },
        // ... more custom colors
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}`}</pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Components.json */}
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="settings-line" className="h-5 w-5 mr-2 text-primary" />
                      components.json
                    </H3>
                    <BodySmall className="text-muted-foreground">
                      shadcn/ui configuration for component generation and path aliases.
                    </BodySmall>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "remix"
}`}</pre>
                    </div>
                  </CardContent>
                </Card>

                {/* TypeScript Config */}
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="code-line" className="h-5 w-5 mr-2 text-primary" />
                      tsconfig.json
                    </H3>
                    <BodySmall className="text-muted-foreground">
                      TypeScript configuration with path aliases and strict settings.
                    </BodySmall>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{`{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Framework-Specific Guides */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Framework-Specific Setup</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Detailed setup instructions for different React frameworks and build tools.
              </BodyLarge>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {frameworkGuides.map((framework) => (
                  <Card key={framework.name} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={framework.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {framework.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{framework.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BodySmall className="text-muted-foreground mb-4">{framework.description}</BodySmall>
                      
                      <div className="mb-4">
                        <H4 className="text-sm font-semibold mb-2">Key Features:</H4>
                        <div className="flex flex-wrap gap-1">
                          {framework.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <H4 className="text-sm font-semibold mb-2">Setup Command:</H4>
                        <div className="bg-muted rounded p-2 font-mono text-xs">
                          {framework.setup}
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={framework.name === "Next.js 15" ? "https://nextjs.org/docs" : framework.name === "Vite + React" ? "https://vitejs.dev/guide/" : "https://create-react-app.dev/docs/getting-started"} target="_blank" rel="noopener noreferrer">
                          View Detailed Guide
                          <Icon name="arrow-right-line" className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* CSS Variables Setup */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">CSS Variables & Theming</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Set up CSS variables for consistent theming across light and dark modes.
              </BodyLarge>
              
              <Card className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <H3 className="text-lg font-semibold flex items-center">
                    <Icon name="contrast-line" className="h-5 w-5 mr-2 text-primary" />
                    globals.css
                  </H3>
                  <BodySmall className="text-muted-foreground">
                    Essential CSS variables and theme configuration for the design system.
                  </BodySmall>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{`@import "tailwindcss";
@import "tw-animate-css";
@import "remixicon/fonts/remixicon.css";

:root {
  --radius: 0.625rem;
  
  /* Light mode colors */
  --background: #ffffff;
  --foreground: #09090b;
  --primary: #0e62fd; /* elevation-500 */
  --primary-foreground: #ffffff;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --accent: #f4f4f5;
  --accent-foreground: #18181b;
  --destructive: #df3523;
  --border: #d1d5db;
  --input: #ffffff;
  --ring: #0e62fd;
  
  /* Chart colors */
  --chart-1: #0e62fd;
  --chart-2: #7458f4;
  --chart-3: #12c55d;
  --chart-4: #ebbc48;
  --chart-5: #e433c3;
}

.dark {
  /* Dark mode colors */
  --background: #09090b;
  --foreground: #fafafa;
  --primary: #479cff; /* elevation-400 */
  --primary-foreground: #09090b;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #27272a;
  --accent-foreground: #fafafa;
  --destructive: #c93020;
  --border: #3f3f46;
  --input: #18181b;
  --ring: #479cff;
  
  /* Dark mode chart colors */
  --chart-1: #479cff;
  --chart-2: #9e8af7;
  --chart-3: #48db88;
  --chart-4: #f1d07f;
  --chart-5: #ec70d4;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    font-family: var(--font-helvetica-now), system-ui, sans-serif;
  }
  body {
    @apply bg-background text-foreground;
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Verification & Testing */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Verification & Testing</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Verify your installation is working correctly with these test components.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="check-line" className="h-5 w-5 mr-2 text-green-500" />
                      Basic Component Test
                    </H3>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
                      <pre className="whitespace-pre-wrap">{`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Installation Test</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Test Button</Button>
      </CardContent>
    </Card>
  )
}`}</pre>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Create this test component to verify basic UI components are working.
                    </BodySmall>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="play-circle-line" className="h-5 w-5 mr-2 text-blue-500" />
                      Animation Test
                    </H3>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
                      <pre className="whitespace-pre-wrap">{`import { motion } from "framer-motion"

export default function AnimationTest() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-primary text-primary-foreground rounded-lg"
    >
      Animation Test
    </motion.div>
  )
}`}</pre>
                    </div>
                    <BodySmall className="text-muted-foreground">
                      Test Framer Motion animations are working correctly.
                    </BodySmall>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Troubleshooting */}
          <Section paddingY="xl" className="bg-muted/50 rounded-lg">
            <div className="max-w-6xl mx-auto">
              <H2 className="text-2xl font-bold mb-6 text-center">Troubleshooting</H2>
              <BodyLarge className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Common issues and their solutions during installation and setup.
              </BodyLarge>
              
              <div className="space-y-6">
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="error-warning-line" className="h-5 w-5 mr-2 text-red-500" />
                      CSS Variables Not Working
                    </H3>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      If CSS variables aren't being applied correctly, ensure your globals.css is imported in your root layout and the CSS variables are defined in the :root selector.
                    </BodySmall>
                    <div className="bg-muted rounded-lg p-3 font-mono text-xs">
                      Make sure globals.css is imported in app/layout.tsx
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="error-warning-line" className="h-5 w-5 mr-2 text-red-500" />
                      TypeScript Path Aliases Not Resolving
                    </H3>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      If @/ imports aren't working, verify your tsconfig.json has the correct paths configuration and restart your TypeScript server.
                    </BodySmall>
                    <div className="bg-muted rounded-lg p-3 font-mono text-xs">
                      Restart TypeScript server in VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <H3 className="text-lg font-semibold flex items-center">
                      <Icon name="error-warning-line" className="h-5 w-5 mr-2 text-red-500" />
                      Tailwind Classes Not Applying
                    </H3>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Ensure your tailwind.config.js includes all the correct content paths and that Tailwind CSS is properly installed and configured.
                    </BodySmall>
                    <div className="bg-muted rounded-lg p-3 font-mono text-xs">
                      Check that content paths match your file structure
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          {/* Additional Resources */}
          <Section paddingY="xl">
            <div className="max-w-6xl mx-auto text-center">
              <H2 className="text-2xl font-bold mb-4">Additional Resources</H2>
              <BodyLarge className="text-muted-foreground mb-8">
                Explore these resources to get the most out of the design system.
              </BodyLarge>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="book-line" className="h-6 w-6 text-blue-500" />
                    </div>
                    <CardTitle>Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Comprehensive guides and API documentation for all components.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/documentation">View Documentation</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="code-line" className="h-6 w-6 text-green-500" />
                    </div>
                    <CardTitle>Components</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Browse all available components with live examples and code snippets.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/components">Browse Components</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name="lightbulb-line" className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>Design Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BodySmall className="text-muted-foreground mb-4">
                      Understand the philosophy and principles behind our design decisions.
                    </BodySmall>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/design-system/principles">View Principles</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>
        </Container>
      </AppShell>
    </PageWrapper>
  )
}
