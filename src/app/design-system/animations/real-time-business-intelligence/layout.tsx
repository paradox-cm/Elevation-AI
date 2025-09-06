import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Real-Time Business Intelligence Animation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
