import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Enterprise Solutions"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
