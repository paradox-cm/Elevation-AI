import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Developers title: "Developers & Platforms - Resources - Elevation AI" Platforms"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
