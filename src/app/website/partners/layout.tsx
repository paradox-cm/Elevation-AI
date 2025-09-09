import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Partners",
  description: "Join our partner ecosystem and help organizations transform with AI. Become a trusted partner in the future of business orchestration."
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
