"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PlatformPrivateBrain({ className }: { className?: string }) {
  const outer = 12; // Original desktop value
  const titleStrip = 36; // Original desktop value
  const gap = 12; // Original desktop value
  const reduced = usePrefersReducedMotion();

  const [stage, setStage] = useState<"idle" | "email" | "entities" | "edge">("idle");
  const [sourceIndex, setSourceIndex] = useState(0);
  const [extractionIndex, setExtractionIndex] = useState(0);

  // Auto-play through different source content
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setSourceIndex(prev => (prev + 1) % 4);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  // Auto-play through different extraction states
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setExtractionIndex(prev => (prev + 1) % 3);
    }, 3500); // Change every 3.5 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

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
    <div className="px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-muted-foreground">{label}</div>
  );

  // Dynamic source content sets
  const sourceSets = [
    [
      { k: "Doc", text: "Q3 Strategy Draft…" },
      { k: "Email", text: "Renewal terms follow-up" },
      { k: "Meeting", text: "Risks and owners captured…" },
      { k: "Ticket", text: "Access request pending" },
    ],
    [
      { k: "PDF", text: "Contract Analysis Report…" },
      { k: "Slack", text: "Team discussion on pricing" },
      { k: "Calendar", text: "Client meeting notes…" },
      { k: "CRM", text: "Lead qualification data" },
    ],
    [
      { k: "Excel", text: "Financial projections…" },
      { k: "Teams", text: "Project status update" },
      { k: "Notion", text: "Product roadmap notes…" },
      { k: "Jira", text: "Bug report #1234" },
    ],
    [
      { k: "Word", text: "Proposal template…" },
      { k: "Zoom", text: "Client call recording" },
      { k: "Confluence", text: "Technical specs…" },
      { k: "GitHub", text: "Code review comments" },
    ],
  ];

  // Dynamic extraction states
  const extractionStates = [
    {
      entity: { label: "Company", progress: 82 },
      relation: { label: "Company ↔ Contract", progress: 76 },
      attribute: { label: "Renewal Date", progress: 68 },
    },
    {
      entity: { label: "Person", progress: 95 },
      relation: { label: "Person ↔ Role", progress: 88 },
      attribute: { label: "Department", progress: 72 },
    },
    {
      entity: { label: "Product", progress: 78 },
      relation: { label: "Product ↔ Feature", progress: 84 },
      attribute: { label: "Version", progress: 91 },
    },
  ];

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />

      <div className="absolute left-2 right-2 bottom-2 sm:left-3 sm:right-3 sm:bottom-3" style={{ top: outer + 40 }}>
        <div className="grid h-full" style={{ gridTemplateColumns: "1fr 1fr", gap }}>
          {/* Sources */}
          <div className="rounded-md border bg-background/50 text-[10px] sm:text-[12px]">
            {colHeader("Sources")}
            <div className="p-1 sm:p-2 space-y-1 sm:space-y-2">
              {sourceSets[sourceIndex].map((s, i) => (
                <motion.div
                  key={`${sourceIndex}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`rounded-md border px-1 sm:px-2 py-1 sm:py-2 text-[9px] sm:text-xs flex items-center justify-between ${stage !== "idle" && s.k === "Email" ? (stage === "email" ? "ring-2 ring-primary/60" : "") : ""}`}
                >
                  <div className="truncate"><span className="text-muted-foreground">{s.k}:</span> {s.text}</div>
                  <MiniChip className="h-4 sm:h-5 px-1 text-[8px] sm:text-[10px]">{s.k}</MiniChip>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Extraction */}
          <div className="rounded-md border bg-background/50 text-[10px] sm:text-[12px]">
            {colHeader("Extraction")}
            <div className="p-1 sm:p-2 space-y-1 sm:space-y-2 text-[9px] sm:text-xs">
              {["Entity", "Relation", "Attribute"].map((row, rowIndex) => {
                const glow = stage === "entities" && (row === "Entity" || row === "Relation");
                const currentState = extractionStates[extractionIndex];
                const data = row === "Entity" ? currentState.entity : 
                           row === "Relation" ? currentState.relation : 
                           currentState.attribute;
                
                return (
                  <motion.div 
                    key={`${extractionIndex}-${row}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                    className={`rounded-md border p-1 sm:p-2 ${glow ? "ring-2 ring-primary/50" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <div className="font-medium text-[9px] sm:text-xs">{row}</div>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <MiniChip className="h-4 sm:h-5 px-1 text-[8px] sm:text-[10px] transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm cursor-pointer">Approve</MiniChip>
                        <MiniChip className="h-4 sm:h-5 px-1 text-[8px] sm:text-[10px] transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm cursor-pointer">Correct</MiniChip>
                      </div>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] sm:text-[10px]">{data.label}</span>
                        <div className="h-1 sm:h-1.5 w-12 sm:w-16 rounded bg-muted relative">
                          <motion.div 
                            className="absolute left-0 top-0 h-1 sm:h-1.5 rounded bg-foreground"
                            initial={{ width: 0 }}
                            animate={{ width: `${data.progress}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Flow arrows between columns - responsive positioning */}
      <svg className="absolute left-2 right-2 sm:left-3 sm:right-3" style={{ top: outer, height: 0 }} viewBox="0 0 600 0" aria-hidden />
      <div className="absolute inset-x-2 sm:inset-x-3" style={{ top: outer + 88 }}>
        {/* from each source card (approx positions) to extraction center */}
        <div className="relative">
          {[0,1,2,3].map((i) => (
            <div key={i} className="absolute"
              style={{ left: 160, top: 16 + i*34, width: 80, height: 0, borderTop: "1px solid hsl(var(--foreground)/0.35)" }}
            />
          ))}
        </div>
      </div>
    </Canvas>
  );
}


