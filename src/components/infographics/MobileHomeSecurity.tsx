"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MobileCanvas, MiniChip, WithTooltip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

type Row = {
  time: string;
  user: string;
  action: string;
  resource: string;
  policy: string;
  outcome: string;
  masked?: boolean;
};

export default function MobileHomeSecurity({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"User" | "Policy" | "Resource" | "Outcome">("User");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [evidencePackIndex, setEvidencePackIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  
  // Evidence pack variations - exact same as desktop
  const evidencePacks = [
    {
      title: "Evidence Pack",
      description: "Every action is logged. Sensitive values visible only with permission."
    },
    {
      title: "Audit Trail",
      description: "Complete user activity log with timestamps and policy enforcement details."
    },
    {
      title: "Compliance Report",
      description: "Automated compliance checks against regulatory requirements and policies."
    },
    {
      title: "Security Analysis",
      description: "Threat detection and risk assessment based on user behavior patterns."
    },
    {
      title: "Data Lineage",
      description: "Track data flow and transformations across all AI model interactions."
    }
  ];

  // Mock data for each tab - exact same as desktop
  const tabData = {
    User: [
      { time: "09:12", user: "u-14…", action: "Read", resource: "Doc:{redacted}", policy: "PII Masking", outcome: "Allow", masked: true },
      { time: "09:25", user: "svc-1…", action: "Summarize", resource: "Email:{redacted}", policy: "Audit", outcome: "Allow", masked: true },
      { time: "10:03", user: "u-08…", action: "Export", resource: "Report Q3", policy: "PII Masking", outcome: "Deny" },
      { time: "10:20", user: "u-22…", action: "Retrieve", resource: "Notes", policy: "Rate", outcome: "Allow" },
      { time: "10:44", user: "svc-2…", action: "Analyze", resource: "Ticket:{redacted}", policy: "PII Masking", outcome: "Allow", masked: true },
    ],
    Policy: [
      { time: "08:45", user: "u-05…", action: "Access", resource: "Database", policy: "PII Masking", outcome: "Allow", masked: true },
      { time: "09:30", user: "admin", action: "Configure", resource: "Settings", policy: "Admin", outcome: "Allow" },
      { time: "10:15", user: "u-12…", action: "Read", resource: "Logs", policy: "Audit", outcome: "Allow" },
      { time: "11:00", user: "u-18…", action: "Export", resource: "Data", policy: "PII Masking", outcome: "Deny" },
      { time: "11:30", user: "svc-3…", action: "Process", resource: "Queue", policy: "Rate", outcome: "Allow" },
    ],
    Resource: [
      { time: "09:00", user: "u-10…", action: "Read", resource: "Document A", policy: "Standard", outcome: "Allow" },
      { time: "09:15", user: "u-15…", action: "Edit", resource: "Spreadsheet B", policy: "Edit", outcome: "Allow" },
      { time: "09:45", user: "u-20…", action: "Delete", resource: "Temp File", policy: "Cleanup", outcome: "Allow" },
      { time: "10:30", user: "u-25…", action: "Share", resource: "Presentation", policy: "Share", outcome: "Deny" },
      { time: "11:15", user: "u-30…", action: "Backup", resource: "Database", policy: "Backup", outcome: "Allow" },
    ],
    Outcome: [
      { time: "08:30", user: "u-01…", action: "Login", resource: "System", policy: "Auth", outcome: "Allow" },
      { time: "09:45", user: "u-07…", action: "Download", resource: "Report", policy: "Export", outcome: "Deny" },
      { time: "10:20", user: "u-13…", action: "Upload", resource: "File", policy: "Upload", outcome: "Allow" },
      { time: "11:05", user: "u-19…", action: "Execute", resource: "Script", policy: "Execute", outcome: "Deny" },
      { time: "11:45", user: "u-24…", action: "Modify", resource: "Config", policy: "Config", outcome: "Allow" },
    ]
  };
  
  const rows = tabData[activeTab];

  // Auto-play through tabs every 3 seconds
  useEffect(() => {
    if (reduced) return;
    
    const tabs: ("User" | "Policy" | "Resource" | "Outcome")[] = ["User", "Policy", "Resource", "Outcome"];
    
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  // Auto-cycle through evidence packs
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setEvidencePackIndex(prev => (prev + 1) % evidencePacks.length);
    }, 4000); // Change evidence pack every 4 seconds
    
    return () => clearInterval(interval);
  }, [reduced, evidencePacks.length]);

  function handleGenerate() {
    const currentPack = evidencePacks[evidencePackIndex];
    
    // Context-specific success messages based on the current evidence pack
    const successMessages = {
      "Evidence Pack": "Evidence pack generated successfully",
      "Audit Trail": "Audit trail exported and ready for review",
      "Compliance Report": "Compliance report generated and validated",
      "Security Analysis": "Security analysis completed and threats identified",
      "Data Lineage": "Data lineage mapped and documented"
    };
    
    setSuccessMessage(successMessages[currentPack.title as keyof typeof successMessages] || "Report generated successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Enterprise Security</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">Comprehensive security monitoring</p>
        </div>

        {/* Tab Filters */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {(["User", "Policy", "Resource", "Outcome"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveTab(f)}
                className={`h-7 rounded-full border px-3 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm whitespace-nowrap ${activeTab === f ? "bg-primary text-primary-foreground" : ""}`}
                aria-pressed={activeTab === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Security Events Table */}
        <div className="flex-1 min-h-0 mb-4">
          <div className="rounded-md border bg-background/50 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center border-b px-3 py-2 text-xs text-muted-foreground font-medium">
              <div className="w-12">Time</div>
              <div className="w-12">User</div>
              <div className="w-16">Action</div>
              <div className="w-20">Resource</div>
              <div className="w-16">Policy</div>
              <div className="w-16">Outcome</div>
            </div>
            {/* Rows */}
            <div className="flex-1 overflow-y-auto">
              {rows.map((r, i) => (
                <div key={i} className="flex items-center px-3 py-2 text-xs border-b last:border-b-0">
                  <div className="w-12 truncate">{r.time}</div>
                  <div className="w-12 truncate">{r.user}</div>
                  <div className="w-16 truncate">{r.action}</div>
                  <div className="w-20 truncate">
                    {(r as any).masked ? (
                      <WithTooltip label="Requires permission">
                        <span className="inline-flex items-center gap-1">
                          <span>{r.resource}</span>
                          <span className="i-lucide-lock h-3 w-3" aria-hidden />
                        </span>
                      </WithTooltip>
                    ) : (
                      r.resource
                    )}
                  </div>
                  <div className="w-16 truncate">{r.policy}</div>
                  <div className="w-16 truncate">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] ${
                      r.outcome === "Allow" 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700" 
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700"
                    }`}>
                      {r.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Button - Edge to Edge */}
        <div className="flex-shrink-0 mb-4">
          <button className="w-full h-8 rounded-md border px-3 text-sm transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm">
            Export
          </button>
        </div>

        {/* Evidence Pack Panel */}
        <div className="flex-shrink-0">
          <div className="rounded-md border bg-background p-3">
            <motion.div 
              key={evidencePackIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium mb-2"
            >
              {evidencePacks[evidencePackIndex].title}
            </motion.div>
            <motion.div 
              key={`desc-${evidencePackIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-xs text-muted-foreground mb-3"
            >
              {evidencePacks[evidencePackIndex].description}
            </motion.div>
            <button 
              className="h-7 rounded-full border px-3 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
              onClick={handleGenerate}
            >
              Generate
            </button>
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