import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Careers",
  description: "Join our team and help build the future of business orchestration with AI. Explore career opportunities at Elevation AI."
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
