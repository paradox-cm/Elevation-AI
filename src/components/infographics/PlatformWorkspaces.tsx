"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { FileText, GitBranch, Workflow } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

type WorkspaceKey = "Atlas" | "Orion" | "Nova" | "Zephyr";

export default function PlatformWorkspaces({ className }: { className?: string }) {
  const outer = 12; // Original desktop value
  const titleStrip = 36; // Original desktop value
  const sidebarW = 120; // Original desktop value
  const gap = 12; // Original desktop value
  const reduced = usePrefersReducedMotion();

  const [selected, setSelected] = useState<WorkspaceKey>("Atlas");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const data = useMemo(() => ({
    Atlas: { 
      tasks: 7, 
      gallery: ["Doc", "Pipeline", "Flow"], 
      entities: 12,
      taskChips: ["Task A", "Task B"],
      entityChips: ["Company", "Contract", "Date"],
      smartCards: [
        { title: "Renewal Brief", chips: ["Vendor", "Doc"], excerpt: "Last note: Draft terms reviewed" },
        { title: "Deal Review", chips: ["Entity", "Flow"], excerpt: "Last note: Outline completed" },
        { title: "Summary", chips: ["Automation", "Link"], excerpt: "Last note: Pipeline configured" },
      ]
    },
    Orion: { 
      tasks: 3, 
      gallery: ["Doc", "Flow", "Flow"], 
      entities: 8,
      taskChips: ["Process", "Review"],
      entityChips: ["Client", "Project"],
      smartCards: [
        { title: "Client Report", chips: ["Analysis", "Doc"], excerpt: "Last note: Data validation pending" },
        { title: "Project Status", chips: ["Update", "Flow"], excerpt: "Last note: Milestone 3 completed" },
        { title: "Meeting Notes", chips: ["Summary", "Link"], excerpt: "Last note: Action items assigned" },
      ]
    },
    Nova: { 
      tasks: 11, 
      gallery: ["Pipeline", "Doc", "Flow"], 
      entities: 16,
      taskChips: ["Build", "Test", "Deploy"],
      entityChips: ["Code", "Database", "API", "Config"],
      smartCards: [
        { title: "Feature Request", chips: ["Development", "Doc"], excerpt: "Last note: Development team assigned" },
        { title: "Bug Report", chips: ["Fix", "Flow"], excerpt: "Last note: Critical bug fixed" },
        { title: "Release Notes", chips: ["Version", "Link"], excerpt: "Last note: Version 2.1.0 released" },
      ]
    },
    Zephyr: { 
      tasks: 5, 
      gallery: ["Flow", "Doc", "Pipeline"], 
      entities: 9,
      taskChips: ["Research", "Analysis"],
      entityChips: ["Data", "Insight", "Report"],
      smartCards: [
        { title: "Market Analysis", chips: ["Research", "Doc"], excerpt: "Last note: Research finalized" },
        { title: "Trend Report", chips: ["Data", "Flow"], excerpt: "Last note: Trends analyzed" },
        { title: "Insights", chips: ["Analytics", "Link"], excerpt: "Last note: Key insights extracted" },
      ]
    },
  }), []);

  // Auto-play through tabs
  useEffect(() => {
    if (reduced) return;
    
    const workspaceKeys: WorkspaceKey[] = ["Atlas", "Orion", "Nova", "Zephyr"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % workspaceKeys.length;
      setSelected(workspaceKeys[currentIndex]);
    }, 3000); // Change tab every 3 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  function handleStartFlow() {
    setSuccessMessage("Flow started successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />

      {/* Sidebar */}
      <div className="absolute" style={{ left: outer, top: outer + 40, bottom: outer, width: sidebarW }}>
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
      <div className="absolute flex flex-col" style={{ left: outer + sidebarW + gap, right: outer, top: outer + 40, bottom: outer }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-1.5 h-7 flex-shrink-0">
          <div className="text-xs font-medium leading-none">{selected} Workspace</div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 pointer-events-none" aria-hidden>
              {selected === "Orion" ? (
                <>
                  <div className="h-6 w-6 rounded-full bg-orange-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    GH
                  </div>
                  <div className="h-6 w-6 rounded-full bg-teal-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    IJ
                  </div>
                  <div className="h-6 w-6 rounded-full bg-pink-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    KL
                  </div>
                </>
              ) : selected === "Nova" ? (
                <>
                  <div className="h-6 w-6 rounded-full bg-indigo-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    MN
                  </div>
                  <div className="h-6 w-6 rounded-full bg-amber-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    OP
                  </div>
                  <div className="h-6 w-6 rounded-full bg-rose-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    QR
                  </div>
                </>
              ) : (
                <>
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    AB
                  </div>
                  <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    CD
                  </div>
                  <div className="h-6 w-6 rounded-full bg-purple-500 border-2 border-background flex items-center justify-center text-white text-[10px] font-medium">
                    EF
                  </div>
                </>
              )}
            </div>
            <button className="h-7 rounded-md border px-2 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm">Open Pipeline</button>
            <button 
              className="h-7 rounded-md border px-2 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
              onClick={handleStartFlow}
            >
              Start Flow
            </button>
          </div>
        </div>

        {/* Row 1: widgets */}
        <div className="grid text-[12px] flex-1" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap }}>
          {/* Live Task Queue */}
          <div className="rounded-md border bg-card text-card-foreground shadow-sm min-w-0 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80 flex flex-col" style={{ padding: 8 }}>
            <div className="text-xs mb-1">Live Task Queue</div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-semibold">{data[selected].tasks}</div>
              <div className="flex flex-wrap gap-1">
                {data[selected].taskChips.map((chip, i) => (
                  <MiniChip key={i} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                ))}
              </div>
            </div>
          </div>
          {/* Canvas Gallery */}
          <div className="rounded-md border bg-card text-card-foreground shadow-sm min-w-0 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80 flex flex-col" style={{ padding: 8 }}>
            <div className="text-xs mb-1">Canvas Gallery</div>
            <div className="flex items-center gap-2 text-xs whitespace-nowrap overflow-hidden">
              {data[selected].gallery.map((g, i) => (
                <div key={i} className="h-8 w-8 rounded border grid place-items-center bg-card hover:bg-muted/50 transition-colors">
                  {g === "Doc" && <FileText className="h-4 w-4 text-muted-foreground" />}
                  {g === "Pipeline" && <GitBranch className="h-4 w-4 text-muted-foreground" />}
                  {g === "Flow" && <Workflow className="h-4 w-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
          {/* Linked Knowledge Entities */}
          <div className="rounded-md border bg-card text-card-foreground shadow-sm min-w-0 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80 flex flex-col" style={{ padding: 8 }}>
            <div className="text-xs mb-1">Linked Knowledge Entities</div>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium">{data[selected].entities}</div>
              <div className="flex flex-wrap gap-1">
                {data[selected].entityChips.map((chip, i) => (
                  <MiniChip key={i} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: smart-card board summary */}
        <div className="grid mt-3 text-[12px] flex-1" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap }}>
          {data[selected].smartCards.map((c, i) => (
            <div key={i} className="rounded-md border bg-card text-card-foreground shadow-sm w-full transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80 flex flex-col" style={{ padding: 8 }}>
              <div className="text-xs font-medium leading-tight mb-1 break-words">{c.title}</div>
              <div className="mt-1 flex items-center gap-1 whitespace-nowrap overflow-hidden">
                {c.chips.map((chip, ci) => (
                  <MiniChip key={ci} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                ))}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground break-words leading-relaxed">{c.excerpt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md shadow-lg text-[9px] sm:text-xs font-medium z-50"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
            {successMessage}
          </div>
        </motion.div>
      )}
    </Canvas>
  );
}


