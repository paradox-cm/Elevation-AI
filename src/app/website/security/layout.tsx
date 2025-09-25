import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security — Elevation AI",
  description: "Learn about Elevation AI's enterprise-grade security, compliance, and data protection measures.",
  openGraph: {
    title: "Security — Elevation AI",
    description: "Learn about Elevation AI's enterprise-grade security, compliance, and data protection measures.",
    url: "https://elevationai.com/website/security",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Security",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security — Elevation AI",
    description: "Learn about Elevation AI's enterprise-grade security, compliance, and data protection measures.",
    images: ["/images/og-image.png"],
  },
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
