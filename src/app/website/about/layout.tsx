import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – About",
  description: "Learn about Elevation AI's mission to transform business orchestration with AI and our vision for the future of intelligent operations."
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
