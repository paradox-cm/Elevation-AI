import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AnimationProvider } from "@/contexts/animation-context";
import { AnimationPreloader } from "@/components/ui/animation-preloader";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/json-ld"

// Helvetica Now Variable Fonts
const helveticaNowVar = localFont({
  src: [
    {
      path: "../../public/fonts/Helvetica-Now/Variable/Helvetica Now Var.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Helvetica-Now/Variable/Helvetica Now Var Italic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-now",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  title: "Elevation AI - Business Orchestration Platform",
  description: "Transform operations with agentic AI and expert resources. AI agents and human expertise for business growth.",
  keywords: ["AI platform", "business orchestration", "agentic AI", "enterprise AI", "operations automation"],
  authors: [{ name: "Elevation AI" }],
  creator: "Elevation AI",
  publisher: "Elevation AI",
  robots: "index, follow",
  metadataBase: new URL('https://elevationai.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elevationai.com",
    siteName: "Elevation AI",
    title: "Elevation AI - Business Orchestration Platform",
    description: "Transform operations with agentic AI and expert resources. AI agents and human expertise for business growth.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI - Business Orchestration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@elevationai",
    creator: "@elevationai",
    title: "Elevation AI - Business Orchestration Platform",
    description: "Transform operations with agentic AI and expert resources. AI agents and human expertise for business growth.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/images/Favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/Favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/images/Favicon-Stroke.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/images/Favicon.png",
    apple: "/images/Favicon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/images/branding/E-AI-Squircle.svg",
        color: "#3b82fd",
      },
    ],
  },
  manifest: "/site.webmanifest",

};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Elevation AI",
  url: "https://elevationai.com",
  logo: "https://elevationai.com/images/branding/E-AI-Arrow.svg",
  sameAs: [
    "https://www.linkedin.com/company/elevation-ai",
    "https://twitter.com/elevationai"
  ],
  description: "Elevation AI helps organizations orchestrate operations with agentic AI, expert resources, and secure knowledge infrastructure."
} as const

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Elevation AI",
  url: "https://elevationai.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://elevationai.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
} as const

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body
        className={`${helveticaNowVar.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <AnimationProvider>
            <AnimationPreloader />
            <ScrollToTop />
            {children}
            <Toaster />
            <SpeedInsights />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
