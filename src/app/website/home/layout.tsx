import { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Business Orchestration Platform — Elevation AI",
  description: "Transform operations with agentic AI and expert resources. AI agents and human expertise for business growth.",
  openGraph: {
    title: "The Business Orchestration Platform — Elevation AI",
    description: "Transform operations with agentic AI and expert resources. AI agents and human expertise for business growth.",
    url: "https://elevationai.com/website/home",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI - The Business Orchestration Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Business Orchestration Platform — Elevation AI",
    description: "Transform operations with agentic AI and expert resources. AI agents and human expertise for business growth.",
    images: ["/images/og-image.png"],
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
