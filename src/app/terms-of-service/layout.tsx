import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — Elevation AI",
  description: "Read Elevation AI's terms of service and user agreement. Understand your rights and responsibilities when using our platform.",
  openGraph: {
    title: "Terms of Service — Elevation AI",
    description: "Read Elevation AI's terms of service and user agreement. Understand your rights and responsibilities when using our platform.",
    url: "https://elevationai.com/terms-of-service",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elevation AI Terms of Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Elevation AI",
    description: "Read Elevation AI's terms of service and user agreement. Understand your rights and responsibilities when using our platform.",
    images: ["/images/og-image.png"],
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
