import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Press",
  description: "Latest news, press releases, and media resources about Elevation AI. Stay updated with our company announcements and media coverage."
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
