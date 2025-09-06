import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Post-Exit Family Office Creation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
