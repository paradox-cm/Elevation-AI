import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expert Network — Elevation AI",
  description: "Access our curated network of industry experts and specialists. Find the right expertise for your business challenges across various domains and industries.",
  openGraph: {
    title: "Expert Network — Elevation AI",
    description: "Access our curated network of industry experts and specialists. Find the right expertise for your business challenges across various domains and industries.",
    url: "https://elevationai.com/website/people-experts",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Expert Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Network — Elevation AI",
    description: "Access our curated network of industry experts and specialists. Find the right expertise for your business challenges across various domains and industries.",
    images: ["/images/og-image.png"],
  },
}

export default function PeopleExpertsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
