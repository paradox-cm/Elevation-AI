import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SEO Implementation — Elevation AI",
  description: "Comprehensive documentation of our sitemap.xml, robots.txt, and page title optimization implementation following industry best practices.",
  openGraph: {
    title: "SEO Implementation — Elevation AI",
    description: "Comprehensive documentation of our sitemap.xml, robots.txt, and page title optimization implementation following industry best practices.",
    url: "https://elevationai.com/design-system/seo-implementation",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI SEO Implementation Documentation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Implementation — Elevation AI",
    description: "Comprehensive documentation of our sitemap.xml, robots.txt, and page title optimization implementation following industry best practices.",
    images: ["/images/og-image.png"],
  },
}

export default function SEOImplementationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
