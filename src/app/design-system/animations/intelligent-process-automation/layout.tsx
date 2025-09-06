import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Intelligent Process Automation Animation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
