"use client";
import React, { useState, useMemo, useEffect } from "react";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { FileText, GitBranch, Workflow, ChevronDown, ChevronUp } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion, AnimatePresence } from "framer-motion";

type WorkspaceKey = "Atlas" | "Orion" | "Nova" | "Zephyr";

export default function MobilePlatformWorkspaces({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  const [selected, setSelected] = useState<WorkspaceKey>("Atlas");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

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
      entityChips: ["Feature", "Bug", "Enhancement"],
      smartCards: [
        { title: "Feature Spec", chips: ["Design", "Doc"], excerpt: "Last note: Design approved" },
        { title: "Test Results", chips: ["QA", "Flow"], excerpt: "Last note: All tests passing" },
        { title: "Deployment", chips: ["Release", "Link"], excerpt: "Last note: Deployment successful" },
      ]
    },
    Zephyr: { 
      tasks: 4, 
      gallery: ["Flow", "Doc", "Pipeline"], 
      entities: 9,
      taskChips: ["Research", "Analysis"],
      entityChips: ["Data", "Insight", "Trend"],
      smartCards: [
        { title: "Research Notes", chips: ["Study", "Doc"], excerpt: "Last note: Key findings documented" },
        { title: "Data Analysis", chips: ["Stats", "Flow"], excerpt: "Last note: Analysis completed" },
        { title: "Insights", chips: ["Report", "Link"], excerpt: "Last note: Summary generated" },
      ]
    }
  }), []);

  // Auto-play through workspaces
  useEffect(() => {
    if (reduced) return;
    
    const workspaceKeys: WorkspaceKey[] = ["Atlas", "Orion", "Nova", "Zephyr"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % workspaceKeys.length;
      setSelected(workspaceKeys[currentIndex]);
    }, 3000); // Change workspace every 3 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  const handleStartFlow = () => {
    setSuccessMessage("Flow started successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const currentWorkspace = data[selected];

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-base font-semibold leading-none">Workspaces</h3>
          <p className="text-xs text-muted-foreground leading-none mt-2">Collaborative workspace management</p>
        </div>

        {/* Workspace Selector - Horizontal */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex gap-2">
            {(["Atlas","Orion","Nova","Zephyr"] as WorkspaceKey[]).map((w) => (
              <button
                key={w}
                onClick={() => setSelected(w)}
                className={`h-8 rounded-md border px-3 text-sm transition-all duration-200 ${selected === w ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 hover:border-primary/30"}`}
                aria-pressed={selected === w}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Header with Start Flow */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold leading-none">{selected} Workspace</h4>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex -space-x-1">
                  {selected === "Orion" ? (
                    <>
                      <div className="h-7 w-7 rounded-full bg-orange-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        GH
                      </div>
                      <div className="h-7 w-7 rounded-full bg-teal-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        IJ
                      </div>
                      <div className="h-7 w-7 rounded-full bg-pink-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        KL
                      </div>
                    </>
                  ) : selected === "Nova" ? (
                    <>
                      <div className="h-7 w-7 rounded-full bg-indigo-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        MN
                      </div>
                      <div className="h-7 w-7 rounded-full bg-amber-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        OP
                      </div>
                      <div className="h-7 w-7 rounded-full bg-rose-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        QR
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-7 w-7 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        AB
                      </div>
                      <div className="h-7 w-7 rounded-full bg-green-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        CD
                      </div>
                      <div className="h-7 w-7 rounded-full bg-purple-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium">
                        EF
                      </div>
                    </>
                  )}
                </div>
                <span className="text-sm text-muted-foreground ml-2">3 members</span>
              </div>
            </div>
            <button 
              className="h-8 rounded-md border px-3 text-sm transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
              onClick={handleStartFlow}
            >
              Start Flow
            </button>
          </div>
        </div>

        {/* Main Stats - Collapsible Section */}
        <div className="flex-shrink-0 mb-4">
          <button
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            className="w-full flex items-center justify-between p-2 rounded-md border bg-background hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Summary</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{currentWorkspace.tasks} tasks</span>
                <span>•</span>
                <span>{currentWorkspace.entities} entities</span>
              </div>
            </div>
            {isSummaryExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          <AnimatePresence>
            {isSummaryExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {/* Live Task Queue */}
                  <div className="rounded-md border bg-card text-card-foreground shadow-sm p-1.5">
                    <div className="text-xs font-medium mb-0.5">Tasks</div>
                    <div className="text-lg font-bold mb-0.5">{currentWorkspace.tasks}</div>
                    <div className="space-y-0.5">
                      {currentWorkspace.taskChips.map((chip, i) => (
                        <MiniChip key={i} className="h-3 px-1.5 text-[10px]">{chip}</MiniChip>
                      ))}
                    </div>
                  </div>

                  {/* Canvas Gallery */}
                  <div className="rounded-md border bg-card text-card-foreground shadow-sm p-1.5">
                    <div className="text-xs font-medium mb-0.5">Gallery</div>
                    <div className="flex items-center gap-1">
                      {currentWorkspace.gallery.map((g, i) => (
                        <div key={i} className="h-6 w-6 rounded border grid place-items-center bg-background">
                          {g === "Doc" && <FileText className="h-4 w-4 text-muted-foreground" />}
                          {g === "Pipeline" && <GitBranch className="h-4 w-4 text-muted-foreground" />}
                          {g === "Flow" && <Workflow className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked Knowledge Entities */}
                  <div className="rounded-md border bg-card text-card-foreground shadow-sm p-1.5">
                    <div className="text-xs font-medium mb-0.5">Entities</div>
                    <div className="text-lg font-bold mb-0.5">{currentWorkspace.entities}</div>
                    <div className="space-y-0.5">
                      {currentWorkspace.entityChips.map((chip, i) => (
                        <MiniChip key={i} className="h-3 px-1.5 text-[10px]">{chip}</MiniChip>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Smart Cards - Single Column */}
        <div className="flex-1 min-h-0">
          <div className="text-sm text-muted-foreground mb-3">Smart Cards</div>
          <div className="space-y-3 h-full overflow-y-auto">
            {currentWorkspace.smartCards.map((c, i) => (
              <motion.div
                key={`${selected}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="rounded-md border bg-card text-card-foreground shadow-sm p-3"
              >
                <div className="text-sm font-medium leading-tight mb-2">{c.title}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {c.chips.map((chip, ci) => (
                    <MiniChip key={ci} className="h-3 px-1.5 text-[10px]">{chip}</MiniChip>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">{c.excerpt}</div>
              </motion.div>
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
            className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-2 rounded-md shadow-lg text-xs font-medium z-50"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              {successMessage}
            </div>
          </motion.div>
        )}
      </div>
    </MobileCanvas>
  );
}