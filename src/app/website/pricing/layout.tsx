import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing — Elevation AI",
  description: "Choose the plan that fits your organization's needs. Flexible pricing options for businesses of all sizes.",
  openGraph: {
    title: "Pricing — Elevation AI",
    description: "Choose the plan that fits your organization's needs. Flexible pricing options for businesses of all sizes.",
    url: "https://elevationai.com/website/pricing",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Pricing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Elevation AI",
    description: "Choose the plan that fits your organization's needs. Flexible pricing options for businesses of all sizes.",
    images: ["/images/og-image.png"],
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
