import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Responsive Design"
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
