import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Government Solutions"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
