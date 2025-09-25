"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { Database, Calendar, FileSearch, FileText, Ticket, FileEdit, Users, BarChart3, Shield, Zap, Globe, Settings } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion, AnimatePresence } from "framer-motion";

export default function MobilePlatformLibrary({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [cardStates, setCardStates] = useState([0, 0, 0, 0]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      { id: "f1", name: "Code Review", owner: "FF", lastUsed: "2h", ver: "1.9", icon: FileEdit },
      { id: "f2", name: "Test Runner", owner: "GG", lastUsed: "1d", ver: "2.3", icon: Zap },
      { id: "f3", name: "Build Pipeline", owner: "HH", lastUsed: "4h", ver: "1.7", icon: Settings },
      { id: "f4", name: "Deploy Script", owner: "II", lastUsed: "6h", ver: "1.5", icon: Globe },
      { id: "f5", name: "Log Aggregator", owner: "JJ", lastUsed: "1d", ver: "1.8", icon: Database },
      { id: "f6", name: "Health Check", owner: "KK", lastUsed: "3h", ver: "2.0", icon: Shield },
    ]
  ];

  const flows = flowSets[0]; // Use first set for mobile

  const getParameters = (flowId: string, cardSet: number) => {
    const paramSets = {
      "f1": [
        [{ label: "Input", value: "Data Source" }, { label: "Output", value: "Clean Data" }],
        [{ label: "Input", value: "Team Data" }, { label: "Output", value: "Sync Status" }],
        [{ label: "Input", value: "Invoice Data" }, { label: "Output", value: "Processed" }],
        [{ label: "Input", value: "Code Files" }, { label: "Output", value: "Review" }]
      ],
      "f2": [
        [{ label: "Input", value: "Weekly Data" }, { label: "Output", value: "Digest" }],
        [{ label: "Input", value: "Project Data" }, { label: "Output", value: "Report" }],
        [{ label: "Input", value: "Client Data" }, { label: "Output", value: "Onboarded" }],
        [{ label: "Input", value: "Test Files" }, { label: "Output", value: "Results" }]
      ],
      "f3": [
        [{ label: "Input", value: "Deal Data" }, { label: "Output", value: "Review" }],
        [{ label: "Input", value: "Security Data" }, { label: "Output", value: "Audit" }],
        [{ label: "Input", value: "Compliance Data" }, { label: "Output", value: "Check" }],
        [{ label: "Input", value: "Build Data" }, { label: "Output", value: "Pipeline" }]
      ]
    };
    return paramSets[flowId as keyof typeof paramSets]?.[cardSet] || [];
  };

  // Auto-cycle through different card content
  useEffect(() => {
    if (reduced) return;
    
    const changeIndividualCard = (cardIndex: number) => {
      setCardStates(prev => {
        const newStates = [...prev];
        newStates[cardIndex] = (newStates[cardIndex] + 1) % 4; // 4 different parameter sets
        return newStates;
      });
    };

    const scheduleCardChanges = () => {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Schedule each card to change at different times
      for (let i = 0; i < 4; i++) {
        const delay = 3000 + (i * 2000) + Math.random() * 2000; // 3-5 seconds + random offset
        const timeout = setTimeout(() => {
          changeIndividualCard(i);
        }, delay);
        timeouts.push(timeout);
      }
      
      return timeouts;
    };

    const scheduleContinuousChanges = () => {
      const timeouts = scheduleCardChanges();
      
      // Schedule the next round
      const nextRoundTimeout = setTimeout(() => {
        scheduleContinuousChanges();
      }, 15000); // Start next round after 15 seconds
      
      return [...timeouts, nextRoundTimeout];
    };

    const allTimeouts = scheduleContinuousChanges();
    
    return () => {
      allTimeouts.forEach(clearTimeout);
    };
  }, [reduced]);

  const handleRun = (flowId: string) => {
    setSuccessMessage(`Flow ${flowId} started successfully`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Library</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">Pre-built workflow templates</p>
        </div>

        {/* Flow Cards Grid */}
        <div className="flex-shrink-0 mb-4">
          <div className="text-sm text-muted-foreground mb-3">Available Flows</div>
          <div className="grid grid-cols-2 gap-3">
            {flows.slice(0, 4).map((flow, index) => (
              <motion.div
                key={`${flow.id}-${cardStates[index]}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-md border bg-card text-card-foreground shadow-sm p-3 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <flow.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-medium truncate">{flow.name}</div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">Owner: {flow.owner}</div>
                <div className="text-xs text-muted-foreground mb-2">Last used: {flow.lastUsed}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">v{flow.ver}</div>
                  <button
                    onClick={() => handleRun(flow.id)}
                    className="h-6 rounded-md border px-2 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
                  >
                    Run
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Flow Details */}
        <div className="flex-1 min-h-0">
          <div className="rounded-md border bg-background">
            <div className="p-3 border-b">
              <div className="text-sm font-medium">Flow Details</div>
            </div>
            <div className="p-3 overflow-y-auto">
              <div className="text-sm text-muted-foreground mb-2">Parameters</div>
              <div className="space-y-2">
                {getParameters("f1", cardStates[0]).map((param, i) => (
                  <motion.div
                    key={`param-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <span>{param.label}</span>
                    <span>{param.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
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