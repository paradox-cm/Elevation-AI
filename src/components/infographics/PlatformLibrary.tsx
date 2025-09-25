"use client";
import React, { useState, useEffect } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { Database, Calendar, FileSearch, FileText, Ticket, FileEdit, ChevronRight, Users, BarChart3, Shield, Zap, Globe, Settings } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Flow = { id: string; name: string; owner: string; lastUsed: string; ver: string };

export default function PlatformLibrary({ className }: { className?: string }) {
  const outer = 12; // Original desktop value
  const titleStrip = 36; // Original desktop value
  const gap = 8; // Original desktop value
  const cardW = 180; // Original desktop value
  const cardH = 90; // Original desktop value
  const drawerW = 180; // Original desktop value
  const reduced = usePrefersReducedMotion();

  // Dynamic flow content sets
  const flowSets = [
    // Set 1: Data & Analytics
    [
      { id: "f1", name: "Data Cleanup", owner: "AB", lastUsed: "3d", ver: "1.3", icon: Database },
      { id: "f2", name: "Weekly Digest", owner: "CD", lastUsed: "1d", ver: "1.1", icon: Calendar },
      { id: "f3", name: "Deal Review", owner: "EF", lastUsed: "5d", ver: "1.0", icon: FileSearch },
      { id: "f4", name: "Doc Extract", owner: "GH", lastUsed: "2d", ver: "1.2", icon: FileText },
      { id: "f5", name: "Ticket Triage", owner: "IJ", lastUsed: "7d", ver: "1.1", icon: Ticket },
      { id: "f6", name: "Summarize", owner: "KL", lastUsed: "4h", ver: "1.4", icon: FileEdit },
    ],
    // Set 2: Team & Collaboration
    [
      { id: "f1", name: "Team Sync", owner: "MN", lastUsed: "2h", ver: "2.1", icon: Users },
      { id: "f2", name: "Project Report", owner: "OP", lastUsed: "1d", ver: "1.8", icon: BarChart3 },
      { id: "f3", name: "Security Audit", owner: "QR", lastUsed: "3d", ver: "1.5", icon: Shield },
      { id: "f4", name: "Auto Deploy", owner: "ST", lastUsed: "6h", ver: "2.0", icon: Zap },
      { id: "f5", name: "API Gateway", owner: "UV", lastUsed: "1d", ver: "1.7", icon: Globe },
      { id: "f6", name: "Config Sync", owner: "WX", lastUsed: "4h", ver: "1.9", icon: Settings },
    ],
    // Set 3: Business & Operations
    [
      { id: "f1", name: "Invoice Process", owner: "YZ", lastUsed: "1d", ver: "1.6", icon: FileText },
      { id: "f2", name: "Client Onboard", owner: "AA", lastUsed: "2d", ver: "2.2", icon: Users },
      { id: "f3", name: "Compliance Check", owner: "BB", lastUsed: "5d", ver: "1.4", icon: Shield },
      { id: "f4", name: "Performance Monitor", owner: "CC", lastUsed: "3h", ver: "1.8", icon: BarChart3 },
      { id: "f5", name: "Backup System", owner: "DD", lastUsed: "1d", ver: "1.3", icon: Database },
      { id: "f6", name: "Alert Manager", owner: "EE", lastUsed: "6h", ver: "2.1", icon: Zap },
    ],
    // Set 4: Development & DevOps
    [
      { id: "f1", name: "Code Review", owner: "FF", lastUsed: "2h", ver: "1.7", icon: FileEdit },
      { id: "f2", name: "Test Runner", owner: "GG", lastUsed: "4h", ver: "2.0", icon: Zap },
      { id: "f3", name: "Dependency Check", owner: "HH", lastUsed: "1d", ver: "1.5", icon: Shield },
      { id: "f4", name: "Build Pipeline", owner: "II", lastUsed: "3h", ver: "1.9", icon: Settings },
      { id: "f5", name: "Log Analysis", owner: "JJ", lastUsed: "2d", ver: "1.6", icon: BarChart3 },
      { id: "f6", name: "Deploy Monitor", owner: "KK", lastUsed: "1h", ver: "2.2", icon: Globe },
    ],
  ];

  const [currentFlowSet, setCurrentFlowSet] = useState(0);
  const [flows, setFlows] = useState(flowSets[0]);
  const [cardStates, setCardStates] = useState<number[]>(new Array(6).fill(0)); // Track which set each card is showing

  // Auto-play through different flow sets with structured timing
  useEffect(() => {
    if (reduced) return;
    
    const changeIndividualCard = (cardIndex: number) => {
      setCardStates(prev => {
        const newStates = [...prev];
        const nextSet = (newStates[cardIndex] + 1) % flowSets.length;
        newStates[cardIndex] = nextSet;
        
        // Update the flows array with the new card
        setFlows(currentFlows => {
          const newFlows = [...currentFlows];
          newFlows[cardIndex] = flowSets[nextSet][cardIndex];
          return newFlows;
        });
        
        return newStates;
      });
    };
    
    const scheduleCardChanges = () => {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Schedule each card to change every 2 seconds starting 2 seconds after load
      for (let i = 0; i < 6; i++) {
        const timeout = setTimeout(() => {
          changeIndividualCard(i);
        }, 2000 + (i * 2000)); // 2s, 4s, 6s, 8s, 10s, 12s
        timeouts.push(timeout);
      }
      
      return () => timeouts.forEach(clearTimeout);
    };
    
    // Start the structured sequence
    const cleanup = scheduleCardChanges();
    
    // Reschedule the sequence every 14 seconds (after all 6 cards have changed)
    const rescheduleInterval = setInterval(() => {
      scheduleCardChanges();
    }, 14000); // Reschedule every 14 seconds
    
    return () => {
      cleanup();
      clearInterval(rescheduleInterval);
    };
  }, [reduced]);

  const getParameters = (flowId: string, flowSet: number) => {
    const paramSets = [
      // Set 1: Data & Analytics
      {
        f1: [{ label: "Batch Size", value: "100" }, { label: "Timeout", value: "30s" }, { label: "Retries", value: "3" }],
        f2: [{ label: "Schedule", value: "Weekly" }, { label: "Format", value: "PDF" }, { label: "Recipients", value: "5" }],
        f3: [{ label: "Confidence", value: "0.85" }, { label: "Max Items", value: "50" }, { label: "Language", value: "EN" }],
        f4: [{ label: "OCR Mode", value: "High" }, { label: "Output", value: "JSON" }, { label: "Quality", value: "95%" }],
        f5: [{ label: "Priority", value: "Medium" }, { label: "Auto-assign", value: "Yes" }, { label: "SLA", value: "24h" }],
        f6: [{ label: "Length", value: "Short" }, { label: "Style", value: "Bullet" }, { label: "Language", value: "EN" }],
      },
      // Set 2: Team & Collaboration
      {
        f1: [{ label: "Team Size", value: "8" }, { label: "Frequency", value: "Daily" }, { label: "Duration", value: "30m" }],
        f2: [{ label: "Metrics", value: "KPI" }, { label: "Period", value: "Monthly" }, { label: "Format", value: "Dashboard" }],
        f3: [{ label: "Severity", value: "High" }, { label: "Scope", value: "Full" }, { label: "Schedule", value: "Auto" }],
        f4: [{ label: "Environment", value: "Prod" }, { label: "Strategy", value: "Blue-Green" }, { label: "Rollback", value: "Auto" }],
        f5: [{ label: "Rate Limit", value: "1000/h" }, { label: "Auth", value: "JWT" }, { label: "Caching", value: "Redis" }],
        f6: [{ label: "Sync Mode", value: "Real-time" }, { label: "Conflict", value: "Merge" }, { label: "Backup", value: "Enabled" }],
      },
      // Set 3: Business & Operations
      {
        f1: [{ label: "Template", value: "Standard" }, { label: "Approval", value: "Auto" }, { label: "Archive", value: "90d" }],
        f2: [{ label: "Workflow", value: "Automated" }, { label: "Documents", value: "Required" }, { label: "Timeline", value: "48h" }],
        f3: [{ label: "Standards", value: "ISO27001" }, { label: "Frequency", value: "Quarterly" }, { label: "Reporting", value: "Auto" }],
        f4: [{ label: "Thresholds", value: "Custom" }, { label: "Alerts", value: "Email" }, { label: "Retention", value: "1y" }],
        f5: [{ label: "Frequency", value: "Daily" }, { label: "Retention", value: "30d" }, { label: "Compression", value: "Enabled" }],
        f6: [{ label: "Channels", value: "Multi" }, { label: "Escalation", value: "Auto" }, { label: "Response", value: "5m" }],
      },
      // Set 4: Development & DevOps
      {
        f1: [{ label: "Reviewers", value: "2+" }, { label: "Checks", value: "Automated" }, { label: "Merge", value: "Squash" }],
        f2: [{ label: "Framework", value: "Jest" }, { label: "Coverage", value: "80%" }, { label: "Parallel", value: "Yes" }],
        f3: [{ label: "Scan Type", value: "Deep" }, { label: "Severity", value: "Critical" }, { label: "Auto-fix", value: "Enabled" }],
        f4: [{ label: "Build Tool", value: "Docker" }, { label: "Cache", value: "Enabled" }, { label: "Artifacts", value: "S3" }],
        f5: [{ label: "Retention", value: "7d" }, { label: "Parsing", value: "Structured" }, { label: "Alerts", value: "Smart" }],
        f6: [{ label: "Health Check", value: "Enabled" }, { label: "Rollback", value: "Auto" }, { label: "Monitoring", value: "Real-time" }],
      },
    ];
    return paramSets[flowSet]?.[flowId as keyof typeof paramSets[0]] || paramSets[0].f1;
  };


  const [openId, setOpenId] = useState<string | null>("f1");
  const [overlay, setOverlay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function onUseTemplate() {
    setOverlay(true);
    setTimeout(() => setOverlay(false), 350);
  }

  function handleClone() {
    setSuccessMessage("Flow cloned successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  const selected = flows.find((f) => f.id === openId) || null;

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />

      {/* Grid + Drawer */}
      <div className="absolute" style={{ left: outer, right: outer, top: outer + 40, bottom: outer }}>
        <div className="relative h-full flex">
          {/* Grid */}
          <div className="grid text-[12px] h-full flex-1" style={{ gridTemplateColumns: '1fr 1fr', gap, lineHeight: 1.2, marginRight: gap }}>
            {flows.map((f, index) => {
              const IconComponent = f.icon;
              const cardSetIndex = cardStates[index];
              return (
                <motion.button
                  key={`${cardSetIndex}-${f.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="rounded-md border bg-card text-card-foreground shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80 flex flex-col"
                style={{ padding: 8 }}
                onClick={() => setOpenId(f.id)}
                aria-expanded={openId === f.id}
              >
                <div className="text-xs font-medium truncate mb-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-4 w-4 shrink-0" aria-hidden>
                        <IconComponent className="h-4 w-4" />
                    </span>
                    <span className="truncate">{f.name}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground min-w-0">
                  <span className="inline-flex items-center gap-1 min-w-0">
                    <span className="inline-grid place-items-center h-5 w-5 rounded-full border text-[10px] shrink-0">{f.owner}</span>
                    <span className="truncate">Last used {f.lastUsed}</span>
                  </span>
                  <span className="shrink-0">Ver {f.ver}</span>
                </div>
                </motion.button>
              );
            })}
          </div>

          {/* Drawer */}
          <motion.div
            initial={{ x: drawerW }}
            animate={{ x: openId ? 0 : drawerW }}
            transition={{ duration: 0.2 }}
            className="h-full rounded-md border bg-background flex-shrink-0"
            style={{ width: drawerW }}
            aria-hidden={!openId}
          >
            <div className="p-2">
              <div className="text-xs font-medium mb-1 truncate">{selected?.name || ""}</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="text-muted-foreground mb-1">Parameters</div>
                  <div className="rounded-md border p-2">
                    {(() => {
                      const selectedIndex = flows.findIndex(f => f.id === selected?.id);
                      const selectedCardSet = selectedIndex >= 0 ? cardStates[selectedIndex] : 0;
                      return getParameters(selected?.id || "f1", selectedCardSet).map((param, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{param.label}</span>
                        <span>{param.value}</span>
                      </div>
                      ));
                    })()}
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
                  <button 
                    className="h-7 rounded-md border px-2 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
                    onClick={handleClone}
                  >
                    Clone
                  </button>
                  <button className="h-7 rounded-md border px-2 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm">Presets</button>
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


