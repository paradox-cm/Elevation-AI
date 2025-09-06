import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Creating & Growing New Venture"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
