import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Sign Up"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
