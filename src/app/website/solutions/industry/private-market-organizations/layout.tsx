import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Private Market Organizations"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
