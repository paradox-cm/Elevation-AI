import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Request a Demo"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
