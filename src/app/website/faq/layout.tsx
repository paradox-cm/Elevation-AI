import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – FAQ",
  description: "Find answers to frequently asked questions about Elevation AI, our platform, and services."
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
