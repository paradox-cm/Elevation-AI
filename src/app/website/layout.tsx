import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Site Overview"
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
