import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Icons"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
