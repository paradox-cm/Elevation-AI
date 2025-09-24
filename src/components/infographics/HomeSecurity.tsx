"use client";
import React, { useMemo, useState } from "react";
import { Canvas, MiniChip, WithTooltip } from "@/components/infographics/primitives";

type Row = {
  time: string;
  user: string;
  action: string;
  resource: string;
  policy: string;
  outcome: string;
  masked?: boolean;
};

export default function HomeSecurity({ className }: { className?: string }) {
  const outer = 12;
  const titleStrip = 36;

  const rowsAll: Row[] = useMemo(
    () => [
      { time: "09:12", user: "u-14…", action: "Read", resource: "Doc:{redacted}", policy: "PII Masking", outcome: "Allow", masked: true },
      { time: "09:25", user: "svc-1…", action: "Summarize", resource: "Email:{redacted}", policy: "Audit", outcome: "Allow", masked: true },
      { time: "10:03", user: "u-08…", action: "Export", resource: "Report Q3", policy: "PII Masking", outcome: "Deny" },
      { time: "10:20", user: "u-22…", action: "Retrieve", resource: "Notes", policy: "Rate", outcome: "Allow" },
      { time: "10:44", user: "svc-2…", action: "Analyze", resource: "Ticket:{redacted}", policy: "PII Masking", outcome: "Allow", masked: true },
    ],
    []
  );

  const [filterPolicy, setFilterPolicy] = useState<"All" | "PII Masking">("All");
  const rows = rowsAll.filter((r) => (filterPolicy === "All" ? true : r.policy === "PII Masking"));

  const colW = { time: 50, user: 60, action: 90, resource: 140, policy: 100, outcome: 60 };

  function HeaderCell({ label, width }: { label: string; width: number }) {
    return (
      <div className="text-[11px] text-muted-foreground whitespace-nowrap" style={{ width }}>{label}</div>
    );
  }
  function Cell({ children, width }: { children: React.ReactNode; width: number }) {
    return (
      <div className="truncate whitespace-nowrap text-xs min-w-0" style={{ width }}>{children}</div>
    );
  }

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Filters + Export (spacing clarified) */}
      <div className="absolute left-3 right-3" style={{ top: outer }}>
        <div className="flex items-center justify-between h-7">
          <div className="flex items-center gap-2">
            {(["User", "Policy", "Resource", "Outcome"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  if (f === "Policy") setFilterPolicy((p) => (p === "All" ? "PII Masking" : "All"));
                }}
                className={`h-7 rounded-full border px-3 text-xs ${f === "Policy" && filterPolicy !== "All" ? "bg-primary text-primary-foreground" : ""}`}
                aria-pressed={f === "Policy" && filterPolicy !== "All"}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="h-7 rounded-full border px-3 text-xs">Export</button>
        </div>
      </div>

      {/* Timeline table + Right panel */}
      <div className="absolute left-3 right-3 bottom-3" style={{ top: outer + 36 }}>
        <div className="grid h-full" style={{ gridTemplateColumns: "420px 1fr", gap: 12 }}>
          {/* Table */}
          <div className="rounded-md border bg-background/50 text-[12px]">
            {/* Header */}
            <div className="flex items-center border-b px-2" style={{ height: 28 }}>
              <HeaderCell label="Time" width={colW.time} />
              <HeaderCell label="User" width={colW.user} />
              <HeaderCell label="Action" width={colW.action} />
              <HeaderCell label="Resource" width={colW.resource} />
              <HeaderCell label="Policy" width={colW.policy} />
              <HeaderCell label="Outcome" width={colW.outcome} />
            </div>
            {/* Rows */}
            <div className="divide-y">
              {rows.map((r, i) => (
                <div key={i} className="flex items-center px-2" style={{ height: 28 }}>
                  <Cell width={colW.time}>{r.time}</Cell>
                  <Cell width={colW.user}>{r.user}</Cell>
                  <Cell width={colW.action}>{r.action}</Cell>
                  <Cell width={colW.resource}>
                    {r.masked ? (
                      <WithTooltip label="Requires permission">
                        <span className="inline-flex items-center gap-1">
                          <span>{r.resource}</span>
                          <span className="i-lucide-lock h-3 w-3" aria-hidden />
                        </span>
                      </WithTooltip>
                    ) : (
                      r.resource
                    )}
                  </Cell>
                  <Cell width={colW.policy}>{r.policy}</Cell>
                  <Cell width={colW.outcome}>{r.outcome}</Cell>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="rounded-md border bg-background p-3 flex flex-col">
            <div className="text-sm font-medium mb-2">Evidence Pack</div>
            <div className="text-xs text-muted-foreground">
              Every action is logged. Sensitive values visible only with permission.
            </div>
            <div className="mt-auto pt-2">
              <button className="h-7 rounded-full border px-3 text-xs">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}


