import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up — Elevation AI",
  description: "Create your Elevation AI account and start transforming your business operations with AI-powered orchestration.",
  openGraph: {
    title: "Sign Up — Elevation AI",
    description: "Create your Elevation AI account and start transforming your business operations with AI-powered orchestration.",
    url: "https://elevationai.com/website/sign-up",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sign Up - Elevation AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up — Elevation AI",
    description: "Create your Elevation AI account and start transforming your business operations with AI-powered orchestration.",
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
