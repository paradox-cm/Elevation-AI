import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Blog + News",
  description: "Stay updated with the latest insights on AI, business orchestration, and industry trends from Elevation AI."
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
