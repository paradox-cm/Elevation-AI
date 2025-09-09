import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – For Developers & Platforms",
  description: "Build, integrate, and extend Elevation AI with our comprehensive developer tools and APIs. Join our developer community."
}

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
