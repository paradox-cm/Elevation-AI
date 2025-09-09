import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Contact",
  description: "Get in touch with our team to learn more about Elevation AI and how we can help transform your business with AI-powered orchestration."
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
