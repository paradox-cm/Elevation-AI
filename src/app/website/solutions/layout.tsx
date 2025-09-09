import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Solutions",
  description: "Tailored AI solutions driving growth, efficiency, and innovation across your organization. From startups to enterprises, we provide the right tools for every business lifecycle stage."
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}