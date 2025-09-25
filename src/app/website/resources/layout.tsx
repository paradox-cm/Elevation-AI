import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources — Elevation AI",
  description: "Access helpful resources, guides, and information about Elevation AI's platform and services.",
  openGraph: {
    title: "Resources — Elevation AI",
    description: "Access helpful resources, guides, and information about Elevation AI's platform and services.",
    url: "https://elevationai.com/website/resources",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — Elevation AI",
    description: "Access helpful resources, guides, and information about Elevation AI's platform and services.",
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
