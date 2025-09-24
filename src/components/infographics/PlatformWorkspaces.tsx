"use client";
import React, { useMemo, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";

type WorkspaceKey = "Atlas" | "Orion" | "Nova" | "Zephyr";

export default function PlatformWorkspaces({ className }: { className?: string }) {
  const outer = 12;
  const titleStrip = 36;
  const sidebarW = 120;
  const gap = 12;

  const [selected, setSelected] = useState<WorkspaceKey>("Atlas");
  const data = useMemo(() => ({
    Atlas: { tasks: 7, gallery: ["Doc", "Pipeline", "Flow"], entities: 12 },
    Orion: { tasks: 3, gallery: ["Doc", "Flow", "Flow"], entities: 8 },
    Nova: { tasks: 11, gallery: ["Pipeline", "Doc", "Flow"], entities: 16 },
    Zephyr: { tasks: 5, gallery: ["Flow", "Doc", "Pipeline"], entities: 9 },
  }), []);

  const smartCards = [
    { title: "Renewal Brief", chips: ["Vendor", "Doc"], excerpt: "Last note: draft…" },
    { title: "Deal Review", chips: ["Entity", "Flow"], excerpt: "Last note: outline…" },
    { title: "Summary", chips: ["Automation", "Link"], excerpt: "Last note: 2d…" },
  ];

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Sidebar */}
      <div className="absolute" style={{ left: outer, top: outer, bottom: outer, width: sidebarW }}>
        <div className="text-xs text-muted-foreground mb-2">Workspaces</div>
        <div className="flex flex-col gap-2">
          {(["Atlas","Orion","Nova","Zephyr"] as WorkspaceKey[]).map((w) => (
            <button
              key={w}
              onClick={() => setSelected(w)}
              className={`h-7 rounded-md border px-2 text-xs text-left ${selected === w ? "bg-primary text-primary-foreground" : ""}`}
              aria-pressed={selected === w}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Main panel */}
      <div className="absolute" style={{ left: outer + sidebarW + gap, right: outer, top: outer, bottom: outer }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-1.5 h-7">
          <div className="text-xs font-medium leading-none">{selected} Workspace</div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 pointer-events-none" aria-hidden>
              <div className="h-6 w-6 rounded-full bg-muted border animate-pulse" />
              <div className="h-6 w-6 rounded-full bg-muted border animate-pulse" />
              <div className="h-6 w-6 rounded-full bg-muted border animate-pulse" />
            </div>
            <button className="h-7 rounded-md border px-2 text-xs">Open Pipeline</button>
            <button className="h-7 rounded-md border px-2 text-xs">Start Flow</button>
          </div>
        </div>

        {/* Row 1: widgets */}
        <div className="grid text-[12px]" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap }}>
          {/* Live Task Queue */}
          <div className="rounded-md border bg-card text-card-foreground shadow-sm min-w-0" style={{ height: 80, padding: 8 }}>
            <div className="text-xs mb-1">Live Task Queue</div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-2xl font-semibold">{data[selected].tasks}</div>
              <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                <MiniChip className="h-5 px-1 text-[10px]">Task A</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Task B</MiniChip>
              </div>
            </div>
          </div>
          {/* Canvas Gallery */}
          <div className="rounded-md border bg-card text-card-foreground shadow-sm min-w-0" style={{ height: 80, padding: 8 }}>
            <div className="text-xs mb-1">Canvas Gallery</div>
            <div className="flex items-center gap-2 text-xs whitespace-nowrap overflow-hidden">
              {data[selected].gallery.map((g, i) => (
                <div key={i} className="h-8 w-8 rounded border grid place-items-center">
                  {g === "Doc" && <div className="w-4 h-4 bg-muted rounded-sm" />}
                  {g === "Pipeline" && <div className="w-4 h-4 bg-muted rounded-sm" />}
                  {g === "Flow" && <div className="w-4 h-4 bg-muted rounded-sm" />}
                </div>
              ))}
            </div>
          </div>
          {/* Linked Knowledge Entities */}
          <div className="rounded-md border bg-card text-card-foreground shadow-sm min-w-0" style={{ height: 80, padding: 8 }}>
            <div className="text-xs mb-1">Linked Knowledge Entities</div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-lg font-medium">{data[selected].entities}</div>
              <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                <MiniChip className="h-5 px-1 text-[10px]">Company</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Contract</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Date</MiniChip>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: smart-card board summary */}
        <div className="grid mt-3 text-[12px]" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap }}>
          {smartCards.map((c, i) => (
            <div key={i} className="rounded-md border bg-card text-card-foreground shadow-sm w-full" style={{ height: 70, padding: 8 }}>
              <div className="text-xs font-medium truncate">{c.title}</div>
              <div className="mt-1 flex items-center gap-1 whitespace-nowrap overflow-hidden">
                {c.chips.map((chip, ci) => (
                  <MiniChip key={ci} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                ))}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground truncate">{c.excerpt}</div>
            </div>
          ))}
        </div>
      </div>
    </Canvas>
  );
}


