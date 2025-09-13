import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Knowledge Base | Elevation AI",
  description: "Find comprehensive information about Elevation AI, our platform, and our partnership model. Search across all categories or browse by topic.",
}

export default function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
