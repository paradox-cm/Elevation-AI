import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ — Elevation AI",
  description: "Find answers to frequently asked questions about Elevation AI, our platform, and services.",
  openGraph: {
    title: "FAQ — Elevation AI",
    description: "Find answers to frequently asked questions about Elevation AI, our platform, and services.",
    url: "https://elevationai.com/website/faq",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI FAQ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Elevation AI",
    description: "Find answers to frequently asked questions about Elevation AI, our platform, and services.",
    images: ["/images/og-image.png"],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
