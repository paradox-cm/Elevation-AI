import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Security"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
