import { Metadata } from "next"

export const metadata: Metadata = {
  title: "People Concierge — Elevation AI",
  description: "Connect with our network of specialized experts and consultants. Get personalized recommendations for your business challenges with our concierge service.",
  openGraph: {
    title: "People Concierge — Elevation AI",
    description: "Connect with our network of specialized experts and consultants. Get personalized recommendations for your business challenges with our concierge service.",
    url: "https://elevationai.com/website/people-concierge",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI People Concierge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "People Concierge — Elevation AI",
    description: "Connect with our network of specialized experts and consultants. Get personalized recommendations for your business challenges with our concierge service.",
    images: ["/images/og-image.png"],
  },
}

export default function PeopleConciergeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
