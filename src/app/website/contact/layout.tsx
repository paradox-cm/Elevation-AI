import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — Elevation AI",
  description: "Get in touch with our team to learn more about Elevation AI and how we can help transform your business with AI-powered orchestration.",
  openGraph: {
    title: "Contact — Elevation AI",
    description: "Get in touch with our team to learn more about Elevation AI and how we can help transform your business with AI-powered orchestration.",
    url: "https://elevationai.com/website/contact",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Elevation AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Elevation AI",
    description: "Get in touch with our team to learn more about Elevation AI and how we can help transform your business with AI-powered orchestration.",
    images: ["/images/og-image.png"],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
