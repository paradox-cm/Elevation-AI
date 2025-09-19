export function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export function asArray<T = unknown>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

export function safeMap<T = unknown, R = unknown>(v: unknown, fn: (item: T, index: number) => R): R[] {
  return asArray<T>(v).map(fn);
}
