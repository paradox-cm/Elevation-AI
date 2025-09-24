"use client";
import React, { useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { Database, Calendar, FileSearch, FileText, Ticket, FileEdit, ChevronRight } from "lucide-react";

type Flow = { id: string; name: string; owner: string; lastUsed: string; ver: string };

export default function PlatformLibrary({ className }: { className?: string }) {
  const outer = 12;
  const titleStrip = 36;
  const gap = 12;
  const cardW = 180;
  const cardH = 90;
  const drawerW = 180;

  const flows: Flow[] = [
    { id: "f1", name: "Data Cleanup", owner: "AB", lastUsed: "3d", ver: "1.3" },
    { id: "f2", name: "Weekly Digest", owner: "CD", lastUsed: "1d", ver: "1.1" },
    { id: "f3", name: "Deal Review", owner: "EF", lastUsed: "5d", ver: "1.0" },
    { id: "f4", name: "Doc Extract", owner: "GH", lastUsed: "2d", ver: "1.2" },
    { id: "f5", name: "Ticket Triage", owner: "IJ", lastUsed: "7d", ver: "1.1" },
    { id: "f6", name: "Summarize", owner: "KL", lastUsed: "4h", ver: "1.4" },
  ];

  const getParameters = (flowId: string) => {
    const params: Record<string, { label: string; value: string }[]> = {
      f1: [
        { label: "Batch Size", value: "100" },
        { label: "Timeout", value: "30s" },
        { label: "Retries", value: "3" }
      ],
      f2: [
        { label: "Schedule", value: "Weekly" },
        { label: "Format", value: "PDF" },
        { label: "Recipients", value: "5" }
      ],
      f3: [
        { label: "Confidence", value: "0.85" },
        { label: "Max Items", value: "50" },
        { label: "Language", value: "EN" }
      ],
      f4: [
        { label: "OCR Mode", value: "High" },
        { label: "Output", value: "JSON" },
        { label: "Quality", value: "95%" }
      ],
      f5: [
        { label: "Priority", value: "Medium" },
        { label: "Auto-assign", value: "Yes" },
        { label: "SLA", value: "24h" }
      ],
      f6: [
        { label: "Length", value: "Short" },
        { label: "Style", value: "Bullet" },
        { label: "Language", value: "EN" }
      ]
    };
    return params[flowId] || params.f1;
  };

  const [openId, setOpenId] = useState<string | null>("f1");
  const [overlay, setOverlay] = useState(false);

  function onUseTemplate() {
    setOverlay(true);
    setTimeout(() => setOverlay(false), 350);
  }

  const selected = flows.find((f) => f.id === openId) || null;

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Grid + Drawer */}
      <div className="absolute" style={{ left: outer, right: outer, top: outer, bottom: outer }}>
        <div className="relative h-full">
          {/* Grid */}
          <div className="grid text-[12px]" style={{ gridTemplateColumns: `repeat(2, ${cardW}px)`, gap, lineHeight: 1.2 }}>
            {flows.map((f) => (
              <button
                key={f.id}
                className="rounded-md border bg-card text-card-foreground shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-ring transition-shadow hover:shadow-md"
                style={{ width: cardW, height: cardH, padding: 8 }}
                onClick={() => setOpenId(f.id)}
                aria-expanded={openId === f.id}
              >
                <div className="text-xs font-medium truncate mb-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-4 w-4 shrink-0" aria-hidden>
                      {f.id === "f1" && <Database className="h-4 w-4" />}
                      {f.id === "f2" && <Calendar className="h-4 w-4" />}
                      {f.id === "f3" && <FileSearch className="h-4 w-4" />}
                      {f.id === "f4" && <FileText className="h-4 w-4" />}
                      {f.id === "f5" && <Ticket className="h-4 w-4" />}
                      {f.id === "f6" && <FileEdit className="h-4 w-4" />}
                    </span>
                    <span className="truncate">{f.name}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
                </div>
                {/* mini node-graph thumbnail */}
                <svg viewBox="0 0 60 22" className="w-full h-5 pointer-events-none" aria-hidden>
                  <g stroke="currentColor" strokeOpacity={0.35} strokeWidth="1" fill="none">
                    <line x1="8" y1="12" x2="24" y2="8" />
                    <line x1="24" y1="8" x2="40" y2="14" />
                    <line x1="24" y1="8" x2="52" y2="10" />
                  </g>
                  <g className="fill-current opacity-70">
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="24" cy="8" r="2" />
                    <circle cx="40" cy="14" r="2" />
                    <circle cx="52" cy="10" r="2" />
                  </g>
                </svg>
                <div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground min-w-0">
                  <span className="inline-flex items-center gap-1 min-w-0">
                    <span className="inline-grid place-items-center h-5 w-5 rounded-full border text-[10px] shrink-0">{f.owner}</span>
                    <span className="truncate">Last used {f.lastUsed}</span>
                  </span>
                  <span className="shrink-0">Ver {f.ver}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Drawer */}
          <motion.div
            initial={{ x: drawerW }}
            animate={{ x: openId ? 0 : drawerW }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 right-0 h-full rounded-md border bg-background"
            style={{ width: drawerW }}
            aria-hidden={!openId}
          >
            <div className="p-2">
              <div className="text-xs font-medium mb-1 truncate">{selected?.name || ""}</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="text-muted-foreground mb-1">Parameters</div>
                  <div className="rounded-md border p-2">
                    {getParameters(selected?.id || "f1").map((param, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{param.label}</span>
                        <span>{param.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Dependencies</div>
                  <div className="flex flex-col gap-1">
                    <MiniChip className="h-5 px-1 text-[10px]">Retriever</MiniChip>
                    <MiniChip className="h-5 px-1 text-[10px]">Summarizer</MiniChip>
                    <MiniChip className="h-5 px-1 text-[10px]">Policy</MiniChip>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-7 rounded-md border px-2">Clone</button>
                  <button className="h-7 rounded-md border px-2">Presets</button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overlay canvas snap */}
          {overlay && (
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="rounded-md border bg-card text-card-foreground shadow-lg" style={{ width: 220, height: 120 }} />
            </motion.div>
          )}
        </div>
      </div>
    </Canvas>
  );
}


