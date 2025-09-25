import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog + News — Elevation AI",
  description: "Stay updated with the latest insights on AI, business orchestration, and industry trends from Elevation AI.",
  openGraph: {
    title: "Blog + News — Elevation AI",
    description: "Stay updated with the latest insights on AI, business orchestration, and industry trends from Elevation AI.",
    url: "https://elevationai.com/website/blog",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Blog + News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog + News — Elevation AI",
    description: "Stay updated with the latest insights on AI, business orchestration, and industry trends from Elevation AI.",
    images: ["/images/og-image.png"],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
