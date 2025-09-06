import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Agentic Engine Animation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
