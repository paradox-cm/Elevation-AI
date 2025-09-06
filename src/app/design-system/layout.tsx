import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Design System"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
