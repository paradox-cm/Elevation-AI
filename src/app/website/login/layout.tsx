import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login — Elevation AI",
  description: "Sign in to your Elevation AI account to access your business orchestration platform and AI-powered tools.",
  openGraph: {
    title: "Login — Elevation AI",
    description: "Sign in to your Elevation AI account to access your business orchestration platform and AI-powered tools.",
    url: "https://elevationai.com/website/login",
    siteName: "Elevation AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Login - Elevation AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login — Elevation AI",
    description: "Sign in to your Elevation AI account to access your business orchestration platform and AI-powered tools.",
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
