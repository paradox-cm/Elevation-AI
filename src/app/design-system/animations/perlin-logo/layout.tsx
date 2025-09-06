import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Perlin Logo Animation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
