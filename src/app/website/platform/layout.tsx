import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Platform — Elevation AI",
  description: "The agentic knowledge and work orchestration platform—built for the future of business—powered by a concierge team. Unifying knowledge, orchestrating workflows, securing your use of AI.",
  openGraph: {
    title: "Platform — Elevation AI",
    description: "The agentic knowledge and work orchestration platform—built for the future of business—powered by a concierge team. Unifying knowledge, orchestrating workflows, securing your use of AI.",
    url: "https://elevationai.com/website/platform",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform — Elevation AI",
    description: "The agentic knowledge and work orchestration platform—built for the future of business—powered by a concierge team. Unifying knowledge, orchestrating workflows, securing your use of AI.",
    images: ["/images/og-image.png"],
  },
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
