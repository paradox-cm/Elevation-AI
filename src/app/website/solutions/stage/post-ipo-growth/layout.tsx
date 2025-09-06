import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Post-IPO Growth"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
