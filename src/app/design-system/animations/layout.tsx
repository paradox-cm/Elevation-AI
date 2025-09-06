import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Animations"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
