import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Brand Identity"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
