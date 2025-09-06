import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – The Work Orchestration Platform"
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
