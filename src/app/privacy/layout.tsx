import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — Elevation AI",
  description: "Learn about how Elevation AI collects, uses, and protects your personal information. Our commitment to privacy and data protection.",
  openGraph: {
    title: "Privacy Policy — Elevation AI",
    description: "Learn about how Elevation AI collects, uses, and protects your personal information. Our commitment to privacy and data protection.",
    url: "https://elevationai.com/privacy",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Elevation AI",
    description: "Learn about how Elevation AI collects, uses, and protects your personal information. Our commitment to privacy and data protection.",
    images: ["/images/og-image.png"],
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
