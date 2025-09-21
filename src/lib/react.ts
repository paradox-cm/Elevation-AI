import React from "react"

export function toText(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return String(v);
  return null;
}

export function renderNode(v: unknown, className?: string): React.ReactNode {
  if (v === null || v === undefined) return null;
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
    return className ? React.createElement('span', { className }, v) : v;
  }
  return null;
}
