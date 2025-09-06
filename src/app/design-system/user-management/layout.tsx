import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – User Management"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
