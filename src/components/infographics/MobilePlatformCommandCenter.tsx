"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

export default function MobilePlatformCommandCenter({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Different command center states - exact same as desktop
  const commandStates = [
    // State 1: Business Operations
    {
      ask: [
        "What changed in Q3?",
        "Summarize latest emails",
        "Show open risks",
        "List contracts due"
      ],
      see: {
        title: "Answer",
        content: "The account shows stable activity with pending renewals and minor policy flags. Key items: two contracts due and one open risk.",
        chips1: ["Company", "Contract", "Date"],
        chips2: ["Doc", "Email", "Notes"]
      },
      do: [
        { title: "Create Task", desc: "Renewal follow-up", id: "t1" },
        { title: "Draft Email", desc: "Follow-up on terms", id: "t2" },
        { title: "Generate Summary", desc: "Q3 performance", id: "t3" }
      ]
    },
    // State 2: Customer Support
    {
      ask: [
        "Show customer issues",
        "What's the ticket status?",
        "List pending requests",
        "Check SLA compliance"
      ],
      see: {
        title: "Support Dashboard",
        content: "12 open tickets, 3 high priority. Average response time: 2.3 hours. SLA compliance: 98%. Top issues: login problems and feature requests.",
        chips1: ["Tickets", "Priority", "SLA"],
        chips2: ["Response", "Issues"]
      },
      do: [
        { title: "Assign Ticket", desc: "Route to specialist", id: "t4" },
        { title: "Update Status", desc: "Mark as resolved", id: "t5" },
        { title: "Escalate Issue", desc: "Send to engineering", id: "t6" }
      ]
    },
    // State 3: Development
    {
      ask: [
        "Show build status",
        "List recent commits",
        "Check test coverage",
        "Review deployment"
      ],
      see: {
        title: "Dev Status",
        content: "Build: passing. Last deploy: 2 hours ago. Test coverage: 87%. 3 PRs ready for review. No critical issues detected.",
        chips1: ["Build", "Deploy", "Tests"],
        chips2: ["PRs", "Coverage"]
      },
      do: [
        { title: "Run Tests", desc: "Execute test suite", id: "t7" },
        { title: "Deploy Build", desc: "Push to staging", id: "t8" },
        { title: "Review PR", desc: "Code review", id: "t9" }
      ]
    }
  ];

  const currentState = commandStates[currentStateIndex];

  // Auto-cycle through different states
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setCurrentStateIndex(prev => (prev + 1) % commandStates.length);
    }, 5000); // Change state every 5 seconds
    
    return () => clearInterval(interval);
  }, [reduced, commandStates.length]);

  const handleRun = (taskId: string) => {
    setRunningId(taskId);
    setShowSuccess(true);
    setSuccessMessage("Task completed successfully");
    setTimeout(() => {
      setRunningId(null);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4 overflow-y-auto">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Command Center</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">AI-powered task automation</p>
        </div>

        {/* Ask Section */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-background p-3">
            <div className="text-sm font-medium mb-3">Ask</div>
            <div className="space-y-2">
              {currentState.ask.map((question, index) => (
                <motion.div
                  key={`${currentStateIndex}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded border"
                >
                  {question}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* See Section */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-background p-3">
            <div className="text-sm font-medium mb-2">See</div>
            <motion.div
              key={`${currentStateIndex}-see`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-md border bg-card px-3 py-3"
            >
              <div className="text-sm font-medium mb-2">{currentState.see.title}</div>
              <div className="text-sm text-muted-foreground mb-3">{currentState.see.content}</div>
              <div className="flex flex-wrap gap-1">
                {currentState.see.chips1.map((chip, index) => (
                  <motion.div
                    key={`${currentStateIndex}-chip1-${chip}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 + index * 0.1 }}
                  >
                    <MiniChip className="h-5 px-2 text-xs">{chip}</MiniChip>
                  </motion.div>
                ))}
                {currentState.see.chips2.map((chip, index) => (
                  <motion.div
                    key={`${currentStateIndex}-chip2-${chip}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
                  >
                    <MiniChip className="h-5 px-2 text-xs">{chip}</MiniChip>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Do Section */}
        <div className="flex-shrink-0">
          <div className="rounded-md border bg-background text-sm">
            <div className="text-sm text-muted-foreground mb-2 px-3 pt-3">Do</div>
            <div className="p-3 space-y-3">
                {currentState.do.map((task, index) => (
                  <motion.div
                    key={`${currentStateIndex}-${task.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="rounded border px-3 py-3 bg-card transition-all duration-200 hover:border-primary/20 hover:bg-card/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium truncate text-sm">{task.title}</div>
                      <button 
                        className="h-7 rounded-md border px-3 text-sm transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm" 
                        onClick={() => handleRun(task.id)}
                        disabled={runningId === task.id}
                      >
                        {runningId === task.id ? "Running..." : "Run"}
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{task.desc}</div>
                    {runningId === task.id && (
                      <motion.div
                        className="w-full bg-muted rounded-full h-1 mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      >
                        <div className="bg-primary h-1 rounded-full"></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
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