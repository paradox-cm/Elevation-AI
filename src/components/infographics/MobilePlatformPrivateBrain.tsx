"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

export default function MobilePlatformPrivateBrain({ className }: { className?: string }) {
  const [stage, setStage] = useState<"idle" | "email" | "entities" | "edge">("idle");
  const [sourceIndex, setSourceIndex] = useState(0);
  const [extractionIndex, setExtractionIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Dynamic source content sets - exact same as desktop
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
      { k: "Email", text: "Vendor negotiations…" },
      { k: "Doc", text: "Risk assessment matrix…" },
      { k: "Slack", text: "Team standup notes…" },
    ],
    [
      { k: "PDF", text: "Compliance checklist…" },
      { k: "Email", text: "Stakeholder feedback…" },
      { k: "Meeting", text: "Board presentation prep…" },
      { k: "Ticket", text: "Security audit request" },
    ]
  ];

  // Dynamic extraction states - exact same as desktop
  const extractionStates = [
    {
      entity: { label: "Contract", progress: 78 },
      relation: { label: "Contract ↔ Vendor", progress: 65 },
      attribute: { label: "Value", progress: 89 },
    },
    {
      entity: { label: "Client", progress: 92 },
      relation: { label: "Client ↔ Product", progress: 73 },
      attribute: { label: "Satisfaction", progress: 85 },
    },
    {
      entity: { label: "Risk", progress: 67 },
      relation: { label: "Risk ↔ Mitigation", progress: 84 },
      attribute: { label: "Severity", progress: 91 },
    },
  ];

  // Auto-play through different source sets
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
    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">{label}</div>
  );

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Private Brain</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">Knowledge extraction & processing</p>
        </div>

        {/* Sources Section */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-background/50 text-sm flex flex-col">
            {colHeader("Sources")}
            <div className="p-3 space-y-2">
              {sourceSets[sourceIndex].map((s, i) => (
                <motion.div
                  key={`${sourceIndex}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`rounded-md border px-3 py-2 text-xs flex items-center justify-between ${stage !== "idle" && s.k === "Email" ? (stage === "email" ? "ring-2 ring-primary/60" : "") : ""}`}
                >
                  <div className="truncate"><span className="text-muted-foreground">{s.k}:</span> {s.text}</div>
                  <MiniChip className="h-5 px-1.5 text-[10px]">{s.k}</MiniChip>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Extraction Section */}
        <div className="flex-1 min-h-0">
          <div className="rounded-md border bg-background/50 text-sm h-full flex flex-col">
            {colHeader("Extraction")}
            <div className="p-3 space-y-3 text-sm flex-1 overflow-y-auto">
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
                    className={`rounded-md border p-3 ${glow ? "ring-2 ring-primary/50" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{row}</div>
                      <div className="flex items-center gap-1">
                        <MiniChip className="h-5 px-1.5 text-[10px] transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm cursor-pointer">Approve</MiniChip>
                        <MiniChip className="h-5 px-1.5 text-[10px] transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm cursor-pointer">Correct</MiniChip>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{data.label}</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${data.progress}%` }}
                        transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{data.progress}% confidence</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex-shrink-0 mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Processing {sourceSets[sourceIndex].length} sources</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Stage: {stage}</span>
              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </MobileCanvas>
  );
}