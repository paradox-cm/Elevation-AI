import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers — Elevation AI",
  description: "Join our team and help build the future of business orchestration with AI. Explore career opportunities at Elevation AI.",
  openGraph: {
    title: "Careers — Elevation AI",
    description: "Join our team and help build the future of business orchestration with AI. Explore career opportunities at Elevation AI.",
    url: "https://elevationai.com/website/careers",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Careers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Elevation AI",
    description: "Join our team and help build the future of business orchestration with AI. Explore career opportunities at Elevation AI.",
    images: ["/images/og-image.png"],
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
