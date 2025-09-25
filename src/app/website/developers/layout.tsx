import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Developers — Elevation AI",
  description: "Build, integrate, and extend Elevation AI with our comprehensive developer tools and APIs. Join our developer community.",
  openGraph: {
    title: "Developers — Elevation AI",
    description: "Build, integrate, and extend Elevation AI with our comprehensive developer tools and APIs. Join our developer community.",
    url: "https://elevationai.com/website/developers",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developers — Elevation AI",
    description: "Build, integrate, and extend Elevation AI with our comprehensive developer tools and APIs. Join our developer community.",
    images: ["/images/og-image.png"],
  },
}

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
