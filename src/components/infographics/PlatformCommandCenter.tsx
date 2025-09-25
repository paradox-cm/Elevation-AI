"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PlatformCommandCenter({ className }: { className?: string }) {
  const outer = 12; // Original desktop value
  const titleStrip = 36; // Original desktop value
  const inner = 600 - outer * 2; // 576
  const gutter = 8; // Original desktop value
  const askW = 160; // Original desktop value
  const seeW = 240; // Original desktop value
  const doW = 160; // Original desktop value

  const [runningId, setRunningId] = useState<string | null>(null);
  const [autoAdded, setAutoAdded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Different command center states
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
        "Recent support tickets?",
        "Customer satisfaction trends",
        "Escalation patterns",
        "Response time metrics"
      ],
      see: {
        title: "Support Insights",
        content: "Support volume increased 15% this week. Average response time is 2.3 hours. Top issues: billing and feature requests.",
        chips1: ["Tickets", "Satisfaction", "Response"],
        chips2: ["Billing", "Features", "Technical"]
      },
      do: [
        { title: "Auto-Respond", desc: "Common billing issues", id: "t1" },
        { title: "Escalate Ticket", desc: "Priority customer", id: "t2" },
        { title: "Generate Report", desc: "Weekly metrics", id: "t3" }
      ]
    },
    // State 3: Data Analytics
    {
      ask: [
        "User engagement trends?",
        "Feature adoption rates",
        "Performance metrics",
        "Conversion analysis"
      ],
      see: {
        title: "Analytics Summary",
        content: "User engagement up 23% month-over-month. New feature adoption at 67%. Conversion rate improved to 12.4%.",
        chips1: ["Engagement", "Adoption", "Conversion"],
        chips2: ["Features", "Users", "Revenue"]
      },
      do: [
        { title: "Run Analysis", desc: "User behavior patterns", id: "t1" },
        { title: "Create Dashboard", desc: "Real-time metrics", id: "t2" },
        { title: "Export Data", desc: "Monthly report", id: "t3" }
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
  }, [reduced]);

  useEffect(() => {
    const t = setTimeout(() => setAutoAdded(true), 350);
    return () => clearTimeout(t);
  }, []);

  function handleRun(id: string) {
    setRunningId(id);
    setTimeout(() => {
      setRunningId(null);
      // Show success message after loading completes
      const currentState = commandStates[currentStateIndex];
      const task = currentState.do.find(t => t.id === id);
      
      if (task) {
        // Context-specific success messages based on task title and current state
        const successMessages = {
          "Create Task": "Task created and added to workflow",
          "Draft Email": "Email drafted and queued for review",
          "Generate Summary": "Summary generated and ready for review",
          "Auto-Respond": "Auto-response sent to customer",
          "Escalate Ticket": "Ticket escalated to priority queue",
          "Generate Report": "Report generated and saved",
          "Run Analysis": "Analysis completed successfully",
          "Create Dashboard": "Dashboard created and deployed",
          "Export Data": "Data exported to specified location"
        };
        
        setSuccessMessage(successMessages[task.title as keyof typeof successMessages] || "Action completed successfully");
      } else {
        setSuccessMessage("Action completed successfully");
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 700);
  }

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />

      <div className="absolute" style={{ left: outer, right: outer, top: outer + 40, bottom: outer }}>
        <div className="relative h-full" style={{ width: inner }}>
          {/* Ask */}
          <div className="absolute inset-y-0 left-0 rounded-md border bg-background text-[12px]" style={{ width: askW, padding: 8 }}>
            <div className="text-xs text-muted-foreground mb-1">Ask</div>
            <div className="space-y-1 text-xs">
              {currentState.ask.map((question, index) => (
                <motion.div
                  key={`${currentStateIndex}-${question}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`rounded border px-2 py-1 truncate ${index === 0 ? 'bg-card' : ''}`}
                >
                  {question}
                </motion.div>
              ))}
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-1">
              <div className="relative">
                <input 
                  placeholder="Ask..." 
                  className="w-full h-8 rounded-md border bg-background px-2 pr-8 text-xs outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-primary/30" 
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                {isInputFocused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Send className="h-3 w-3 text-primary cursor-pointer hover:text-primary/80 transition-colors" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* See */}
          <div className="absolute inset-y-0 rounded-md border bg-background text-[12px]" style={{ left: askW + gutter, width: seeW, padding: 8 }}>
            <div className="text-xs text-muted-foreground mb-1">See</div>
            <motion.div
              key={`${currentStateIndex}-see`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-md border bg-card px-2 py-2"
              style={{ lineHeight: 1.2, minHeight: 140 }}
            >
              <div className="text-xs font-medium mb-1">{currentState.see.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-3">
                {currentState.see.content}
              </div>
              <div className="mt-2 flex items-center gap-1">
                {currentState.see.chips1.map((chip, index) => (
                  <motion.div
                    key={`${currentStateIndex}-chip1-${chip}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 + index * 0.1 }}
                  >
                    <MiniChip className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                  </motion.div>
                ))}
              </div>
              <div className="mt-1 flex items-center gap-1">
                {currentState.see.chips2.map((chip, index) => (
                  <motion.div
                    key={`${currentStateIndex}-chip2-${chip}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
                  >
                    <MiniChip className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Do */}
          <div className="absolute inset-y-0 right-0 rounded-md border bg-background text-[12px]" style={{ width: doW, padding: 8 }}>
            <div className="text-xs text-muted-foreground mb-1">Do</div>
            <div className="space-y-2 text-xs">
              {currentState.do.map((task, index) => (
                <motion.div
                  key={`${currentStateIndex}-${task.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="rounded border px-2 py-2 bg-card transition-all duration-200 hover:border-primary/20 hover:bg-card/80"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium truncate">{task.title}</div>
                    <button className="h-6 rounded-md border px-2 text-[11px] transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm" onClick={() => handleRun(task.id)}>Run</button>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">{task.desc}</div>
                  {runningId === task.id && (
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className="h-1 bg-foreground mt-1 rounded" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gutters */}
          <div className="absolute inset-y-0" style={{ left: askW, width: gutter }} />
          <div className="absolute inset-y-0" style={{ right: doW, width: gutter }} />
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


