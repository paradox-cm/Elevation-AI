import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Public Market Organizations"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
