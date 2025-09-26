import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vibathon 2025 — Elevation AI | Invite-Only Builder Sprint",
  description: "Join Elevation AI's Vibathon 2025 - an invite-only, single-day remote competition to find the most intuitive product-minded builders. Win a Vibe Prototyper role and work with cutting-edge agentic AI tools.",
  keywords: [
    "Vibathon",
    "Elevation AI",
    "Vibe Prototyper",
    "AI-first development",
    "rapid prototyping",
    "product builder",
    "agentic AI",
    "remote competition",
    "hiring event",
    "AI tools",
    "Replit",
    "Cursor",
    "Supabase",
    "n8n"
  ],
  openGraph: {
    title: "Vibathon 2025 — Elevation AI | Invite-Only Builder Sprint",
    description: "Join Elevation AI's Vibathon 2025 - an invite-only, single-day remote competition to find the most intuitive product-minded builders. Win a Vibe Prototyper role and work with cutting-edge agentic AI tools.",
    url: "https://elevationai.com/website/vibathon",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-vibathon.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Vibathon 2025 - Invite-Only Builder Sprint",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibathon 2025 — Elevation AI | Invite-Only Builder Sprint",
    description: "Join Elevation AI's Vibathon 2025 - an invite-only, single-day remote competition to find the most intuitive product-minded builders. Win a Vibe Prototyper role and work with cutting-edge agentic AI tools.",
    images: ["/images/og-vibathon.png"],
  },
  alternates: {
    canonical: "https://elevationai.com/website/vibathon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function VibathonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
