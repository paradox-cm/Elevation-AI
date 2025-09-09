import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Investors",
  description: "Learn about Elevation AI's vision, growth, and investment opportunities. Discover how we're transforming business orchestration with AI."
}

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
