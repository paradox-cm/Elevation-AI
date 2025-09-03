import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AnimationProvider } from "@/contexts/animation-context";
import { AnimationPreloader } from "@/components/ui/animation-preloader";

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
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/images/Favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/Favicon-Stroke.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
