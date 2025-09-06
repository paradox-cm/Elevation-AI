import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Workspaces & Canvases Animation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
