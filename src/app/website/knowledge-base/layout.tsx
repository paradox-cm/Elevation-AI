import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Knowledge Base — Elevation AI",
  description: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
  openGraph: {
    title: "Knowledge Base — Elevation AI",
    description: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
    url: "https://elevationai.com/website/knowledge-base",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Knowledge Base",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Base — Elevation AI",
    description: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
    images: ["/images/og-image.png"],
  },
}

export default function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
