import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investors — Elevation AI",
  description: "Learn about Elevation AI's vision, growth, and investment opportunities. Discover how we're transforming business orchestration with AI.",
  openGraph: {
    title: "Investors — Elevation AI",
    description: "Learn about Elevation AI's vision, growth, and investment opportunities. Discover how we're transforming business orchestration with AI.",
    url: "https://elevationai.com/website/investors",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Investors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors — Elevation AI",
    description: "Learn about Elevation AI's vision, growth, and investment opportunities. Discover how we're transforming business orchestration with AI.",
    images: ["/images/og-image.png"],
  },
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
