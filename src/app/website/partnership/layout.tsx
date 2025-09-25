import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partnership Application — Elevation AI",
  description: "Apply to become an Elevation AI partner or ambassador. Join our ecosystem of trusted experts and help organizations transform with AI-powered orchestration.",
  openGraph: {
    title: "Partnership Application — Elevation AI",
    description: "Apply to become an Elevation AI partner or ambassador. Join our ecosystem of trusted experts and help organizations transform with AI-powered orchestration.",
    url: "https://elevationai.com/website/partnership",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Partnership Application",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partnership Application — Elevation AI",
    description: "Apply to become an Elevation AI partner or ambassador. Join our ecosystem of trusted experts and help organizations transform with AI-powered orchestration.",
    images: ["/images/og-image.png"],
  },
}

export default function PartnershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
