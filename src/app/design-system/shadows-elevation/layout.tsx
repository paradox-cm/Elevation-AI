import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Shadows title: "Shadows & Elevation - Design System - Elevation AI" Elevation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
