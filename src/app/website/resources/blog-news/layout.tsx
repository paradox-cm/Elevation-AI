import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Blog title: "Blog & News - Resources - Elevation AI" News"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
