import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevation AI – Pricing",
  description: "Choose the plan that fits your organization's needs. Flexible pricing options for businesses of all sizes."
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
