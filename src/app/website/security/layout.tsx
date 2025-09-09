import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Security",
  description: "Learn about Elevation AI's enterprise-grade security, compliance, and data protection measures."
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
