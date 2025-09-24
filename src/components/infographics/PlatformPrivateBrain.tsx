"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PlatformPrivateBrain({ className }: { className?: string }) {
  const outer = 12;
  const titleStrip = 36;
  const gap = 12;
  const reduced = usePrefersReducedMotion();

  const [stage, setStage] = useState<"idle" | "email" | "entities" | "edge">("idle");
  useEffect(() => {
    if (reduced) {
      setStage("edge");
      return;
    }
    const t1 = setTimeout(() => setStage("email"), 150);
    const t2 = setTimeout(() => setStage("entities"), 750);
    const t3 = setTimeout(() => setStage("edge"), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [reduced]);

  const colHeader = (label: string) => (
    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">{label}</div>
  );

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      <div className="absolute left-3 right-3 bottom-3" style={{ top: outer }}>
        <div className="grid h-full" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap }}>
          {/* Sources */}
          <div className="rounded-md border bg-background/50 text-[12px]">
            {colHeader("Sources")}
            <div className="p-2 space-y-2">
              {[
                { k: "Doc", text: "Q3 Strategy Draft…" },
                { k: "Email", text: "Renewal terms follow-up" },
                { k: "Meeting", text: "Risks and owners captured…" },
                { k: "Ticket", text: "Access request pending" },
              ].map((s) => (
                <div
                  key={s.k}
                  className={`rounded-md border px-2 py-2 text-xs flex items-center justify-between ${stage !== "idle" && s.k === "Email" ? (stage === "email" ? "ring-2 ring-primary/60" : "") : ""}`}
                >
                  <div className="truncate"><span className="text-muted-foreground">{s.k}:</span> {s.text}</div>
                  <MiniChip className="h-5 px-1 text-[10px]">{s.k}</MiniChip>
                </div>
              ))}
            </div>
          </div>

          {/* Extraction */}
          <div className="rounded-md border bg-background/50 text-[12px]">
            {colHeader("Extraction")}
            <div className="p-2 space-y-2 text-xs">
              {["Entity", "Relation", "Attribute"].map((row) => {
                const glow = stage === "entities" && (row === "Entity" || row === "Relation");
                return (
                  <div key={row} className={`rounded-md border p-2 ${glow ? "ring-2 ring-primary/50" : ""}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{row}</div>
                      <div className="flex items-center gap-1">
                        <MiniChip className="h-5 px-1 text-[10px]">Approve</MiniChip>
                        <MiniChip className="h-5 px-1 text-[10px]">Correct</MiniChip>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {row === "Entity" && (
                        <div className="flex items-center justify-between">
                          <span>Company</span>
                          <div className="h-1.5 w-16 rounded bg-muted relative"><div className="absolute left-0 top-0 h-1.5 rounded bg-foreground" style={{ width: "82%" }} /></div>
                        </div>
                      )}
                      {row === "Relation" && (
                        <div className="flex items-center justify-between">
                          <span>Company ↔ Contract</span>
                          <div className="h-1.5 w-16 rounded bg-muted relative"><div className="absolute left-0 top-0 h-1.5 rounded bg-foreground" style={{ width: "76%" }} /></div>
                        </div>
                      )}
                      {row === "Attribute" && (
                        <div className="flex items-center justify-between">
                          <span>Renewal Date</span>
                          <div className="h-1.5 w-16 rounded bg-muted relative"><div className="absolute left-0 top-0 h-1.5 rounded bg-foreground" style={{ width: "68%" }} /></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Knowledge Graph */}
          <div className="rounded-md border bg-background/50 relative min-h-[160px]">
            {colHeader("Knowledge Graph")}
            <svg viewBox="0 0 180 140" className="absolute left-2 right-2 bottom-2 top-7" style={{ lineHeight: 1 }}>
              {/* edges */}
              <g stroke="currentColor" strokeOpacity={0.35} strokeLinecap="round" strokeWidth="1.5" fill="none">
                <line x1="30" y1="70" x2="90" y2="40" />
                <line x1="90" y1="40" x2="140" y2="80" />
                {/* animated edge Company-Contract */}
                <motion.line
                  x1="50" y1="100" x2="120" y2="60"
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 1.3 }}
                />
              </g>
              {/* nodes */}
              <g>
                <circle cx="30" cy="70" r="6" className="fill-current opacity-60" />
                <circle cx="90" cy="40" r="6" className="fill-current opacity-60" />
                <circle cx="140" cy="80" r="6" className="fill-current opacity-60" />
                <circle cx="50" cy="100" r="6" className="fill-current" />
                <circle cx="120" cy="60" r="6" className="fill-current" />
              </g>
              {/* labels */}
              <g fontSize="10" fill="currentColor" opacity={0.9}>
                <text x="42" y="112">Company</text>
                <text x="122" y="62">Contract</text>
                <text x="85" y="28">Renewal</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Flow arrows between columns */}
      <svg className="absolute left-3 right-3" style={{ top: outer, height: 0 }} viewBox="0 0 600 0" aria-hidden />
      <div className="absolute inset-x-3" style={{ top: outer + 88 }}>
        {/* from each source card (approx positions) to extraction center */}
        <div className="relative">
          {[0,1,2,3].map((i) => (
            <div key={i} className="absolute"
              style={{ left: 160, top: 16 + i*34, width: 80, height: 0, borderTop: "1px solid hsl(var(--foreground)/0.35)" }}
            />
          ))}
          {/* consolidated arrow from extraction to graph */}
          <div className="absolute" style={{ left: 300, top: 40, width: 80, height: 0, borderTop: "1.5px solid hsl(var(--foreground)/0.5)" }} />
        </div>
      </div>
    </Canvas>
  );
}


