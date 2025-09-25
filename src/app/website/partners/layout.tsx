import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partners — Elevation AI",
  description: "Join our partner ecosystem and help organizations transform with AI. Become a trusted partner in the future of business orchestration.",
  openGraph: {
    title: "Partners — Elevation AI",
    description: "Join our partner ecosystem and help organizations transform with AI. Become a trusted partner in the future of business orchestration.",
    url: "https://elevationai.com/website/partners",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Partners",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners — Elevation AI",
    description: "Join our partner ecosystem and help organizations transform with AI. Become a trusted partner in the future of business orchestration.",
    images: ["/images/og-image.png"],
  },
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
