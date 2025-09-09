import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Platform",
  description: "The agentic knowledge and work orchestration platform—built for the future of business—powered by a concierge team. Unifying knowledge, orchestrating workflows, securing your use of AI."
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
