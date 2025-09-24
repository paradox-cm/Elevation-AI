"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";

export default function PlatformCommandCenter({ className }: { className?: string }) {
  const outer = 12;
  const titleStrip = 36;
  const inner = 600 - outer * 2; // 576
  const gutter = 8;
  const askW = 160;
  const seeW = 240;
  const doW = 160;

  const [runningId, setRunningId] = useState<string | null>(null);
  const [autoAdded, setAutoAdded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAutoAdded(true), 350);
    return () => clearTimeout(t);
  }, []);

  function handleRun(id: string) {
    setRunningId(id);
    setTimeout(() => setRunningId(null), 700);
  }

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      <div className="absolute" style={{ left: outer, right: outer, top: outer, bottom: outer }}>
        <div className="relative h-full" style={{ width: inner }}>
          {/* Ask */}
          <div className="absolute inset-y-0 left-0 rounded-md border bg-background text-[12px]" style={{ width: askW, padding: 8 }}>
            <div className="text-xs text-muted-foreground mb-1">Ask</div>
            <div className="space-y-1 text-xs">
              <div className="rounded border px-2 py-1 truncate bg-card">What changed in Q3?</div>
              <div className="rounded border px-2 py-1 truncate">Summarize latest emails</div>
              <div className="rounded border px-2 py-1 truncate">Show open risks</div>
              <div className="rounded border px-2 py-1 truncate">List contracts due</div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-1">
              <input placeholder="Ask..." className="w-full h-8 rounded-md border bg-background px-2 text-xs outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          {/* See */}
          <div className="absolute inset-y-0 rounded-md border bg-background text-[12px]" style={{ left: askW + gutter, width: seeW, padding: 8 }}>
            <div className="text-xs text-muted-foreground mb-1">See</div>
            <div className="rounded-md border bg-card px-2 py-2" style={{ lineHeight: 1.2, minHeight: 140 }}>
              <div className="text-xs font-medium mb-1">Answer</div>
              <div className="text-sm text-muted-foreground line-clamp-3">
                The account shows stable activity with pending renewals and minor policy flags. Key items: two contracts due and one open risk.
              </div>
              <div className="mt-2 flex items-center gap-1">
                <MiniChip className="h-5 px-1 text-[10px]">Company</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Contract</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Date</MiniChip>
              </div>
              <div className="mt-1 flex items-center gap-1">
                <MiniChip className="h-5 px-1 text-[10px]">Doc</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Email</MiniChip>
                <MiniChip className="h-5 px-1 text-[10px]">Notes</MiniChip>
              </div>
            </div>
          </div>

          {/* Do */}
          <div className="absolute inset-y-0 right-0 rounded-md border bg-background text-[12px]" style={{ width: doW, padding: 8 }}>
            <div className="text-xs text-muted-foreground mb-1">Do</div>
            <div className="space-y-2 text-xs">
              <div className="rounded border px-2 py-2 bg-card">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium truncate">Create Task</div>
                  <button className="h-6 rounded-md border px-2 text-[11px]" onClick={() => handleRun("t1")}>Run</button>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">Renewal follow-up</div>
                {runningId === "t1" && (
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className="h-1 bg-foreground mt-1 rounded" />
                )}
              </div>
              <div className="rounded border px-2 py-2 bg-card">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium truncate">Draft Email</div>
                  <button className="h-6 rounded-md border px-2 text-[11px]" onClick={() => handleRun("t2")}>Run</button>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">Follow-up on terms</div>
                {runningId === "t2" && (
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className="h-1 bg-foreground mt-1 rounded" />
                )}
              </div>
              <motion.div
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: autoAdded ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="rounded border px-2 py-2 bg-card"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium truncate">Generate Summary</div>
                  <button className="h-6 rounded-md border px-2 text-[11px]" onClick={() => handleRun("t3")}>Run</button>
                </div>
                {runningId === "t3" && (
                  <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className="h-1 bg-foreground mt-1 rounded" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Gutters */}
          <div className="absolute inset-y-0" style={{ left: askW, width: gutter }} />
          <div className="absolute inset-y-0" style={{ right: doW, width: gutter }} />
        </div>
      </div>
    </Canvas>
  );
}


