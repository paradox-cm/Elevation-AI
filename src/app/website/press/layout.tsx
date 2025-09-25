import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Press — Elevation AI",
  description: "Latest news, press releases, and media resources about Elevation AI. Stay updated with our company announcements and media coverage.",
  openGraph: {
    title: "Press — Elevation AI",
    description: "Latest news, press releases, and media resources about Elevation AI. Stay updated with our company announcements and media coverage.",
    url: "https://elevationai.com/website/press",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Press",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press — Elevation AI",
    description: "Latest news, press releases, and media resources about Elevation AI. Stay updated with our company announcements and media coverage.",
    images: ["/images/og-image.png"],
  },
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
