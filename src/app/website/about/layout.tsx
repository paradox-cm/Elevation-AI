import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — Elevation AI",
  description: "Learn about Elevation AI's mission to transform business orchestration with AI and our vision for the future of intelligent operations.",
  openGraph: {
    title: "About — Elevation AI",
    description: "Learn about Elevation AI's mission to transform business orchestration with AI and our vision for the future of intelligent operations.",
    url: "https://elevationai.com/website/about",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Elevation AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Elevation AI",
    description: "Learn about Elevation AI's mission to transform business orchestration with AI and our vision for the future of intelligent operations.",
    images: ["/images/og-image.png"],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
