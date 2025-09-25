import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Demo — Elevation AI",
  description: "See Elevation AI in action. Request a personalized demo to discover how our platform can transform your business operations.",
  openGraph: {
    title: "Request a Demo — Elevation AI",
    description: "See Elevation AI in action. Request a personalized demo to discover how our platform can transform your business operations.",
    url: "https://elevationai.com/website/demo",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Request a Demo - Elevation AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Demo — Elevation AI",
    description: "See Elevation AI in action. Request a personalized demo to discover how our platform can transform your business operations.",
    images: ["/images/og-image.png"],
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
