import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Future Ready Animation"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
