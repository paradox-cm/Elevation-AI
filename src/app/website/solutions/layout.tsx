import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions — Elevation AI",
  description: "Tailored AI solutions driving growth, efficiency, and innovation across your organization. From startups to enterprises, we provide the right tools for every business lifecycle stage.",
  openGraph: {
    title: "Solutions — Elevation AI",
    description: "Tailored AI solutions driving growth, efficiency, and innovation across your organization. From startups to enterprises, we provide the right tools for every business lifecycle stage.",
    url: "https://elevationai.com/website/solutions",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — Elevation AI",
    description: "Tailored AI solutions driving growth, efficiency, and innovation across your organization. From startups to enterprises, we provide the right tools for every business lifecycle stage.",
    images: ["/images/og-image.png"],
  },
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}