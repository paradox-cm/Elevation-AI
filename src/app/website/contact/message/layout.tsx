import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Send us a Message",
  description: "Get in touch with Elevation AI. Send us a message and we'll respond as soon as possible."
}

export default function ContactMessageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
