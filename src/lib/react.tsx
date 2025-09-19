import { ReactNode, isValidElement } from "react";

export function renderNode(v: unknown, className?: string): ReactNode {
  if (v == null) return null;
  if (isValidElement(v)) return v;
  if (typeof v === "string") return className ? <p className={className}>{v}</p> : v;
  if (typeof v === "number") return className ? <p className={className}>{String(v)}</p> : String(v);
  try { 
    const text = JSON.stringify(v); 
    return className ? <p className={className}>{text}</p> : text; 
  }
  catch { 
    return className ? <p className={className}>{String(v)}</p> : String(v); 
  }
}

export function toText(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return null;
}
