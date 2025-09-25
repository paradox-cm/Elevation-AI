import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partner Network — Elevation AI",
  description: "Scale your execution with our trusted ecosystem of specialized firms. Access our partner network of consulting firms and agencies with deep domain expertise.",
  openGraph: {
    title: "Partner Network — Elevation AI",
    description: "Scale your execution with our trusted ecosystem of specialized firms. Access our partner network of consulting firms and agencies with deep domain expertise.",
    url: "https://elevationai.com/website/people-partners",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Partner Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Network — Elevation AI",
    description: "Scale your execution with our trusted ecosystem of specialized firms. Access our partner network of consulting firms and agencies with deep domain expertise.",
    images: ["/images/og-image.png"],
  },
}

export default function PeoplePartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
