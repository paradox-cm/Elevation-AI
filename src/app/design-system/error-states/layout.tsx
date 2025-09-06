import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Error States"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
