"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function HomeCopilot({ className }: { className?: string }) {
  const outer = 12; // canvas padding
  const titleStrip = 36; // removed, but keep constant for minimal edits
  const innerWidth = 600 - outer * 2; // 576
  const gutter = 12;
  const chatW = 336;
  const actionsW = 228;

  const [prefilled, setPrefilled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  
  useEffect(() => {
    const t = setTimeout(() => setPrefilled(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Dynamic prompt content sets
  const promptSets = [
    {
      question: "How are renewal terms trending?",
      answer: "Renewal terms appear stable with minor variance across regions. Key drivers include seasonality and contract complexity.",
      chips: ["Doc", "Email", "Note"]
    },
    {
      question: "What's the status of Q3 deals?",
      answer: "Q3 pipeline shows 15 active deals with 3 in final negotiation. Average deal size increased 12% vs Q2.",
      chips: ["CRM", "Pipeline", "Report"]
    },
    {
      question: "Any compliance issues this week?",
      answer: "No critical issues detected. 2 minor policy updates flagged for review. All systems operating within parameters.",
      chips: ["Audit", "Policy", "Alert"]
    },
    {
      question: "Summarize client feedback trends",
      answer: "Overall satisfaction at 4.2/5. Common themes: faster response times, better integration capabilities.",
      chips: ["Survey", "Feedback", "Analytics"]
    },
    {
      question: "What are the top automation opportunities?",
      answer: "Invoice processing and contract review show highest ROI potential. Estimated 40% time savings achievable.",
      chips: ["Workflow", "Automation", "ROI"]
    }
  ];

  // Dynamic suggestion sets (9 total)
  const suggestionSets = [
    [
      { title: "Create Task", prefilled: "Renewal brief", action: "Create Task" },
      { title: "Draft Email", prefilled: "Follow-up on terms", action: "Draft Email" },
      { title: "Generate Summary", prefilled: "", action: "Generate Summary" }
    ],
    [
      { title: "Update Pipeline", prefilled: "Q3 deal status", action: "Update Pipeline" },
      { title: "Schedule Meeting", prefilled: "Deal review call", action: "Schedule Meeting" },
      { title: "Create Report", prefilled: "", action: "Create Report" }
    ],
    [
      { title: "Run Audit", prefilled: "Compliance check", action: "Run Audit" },
      { title: "Update Policy", prefilled: "Security guidelines", action: "Update Policy" },
      { title: "Send Alert", prefilled: "", action: "Send Alert" }
    ],
    [
      { title: "Analyze Feedback", prefilled: "Client satisfaction", action: "Analyze Feedback" },
      { title: "Create Survey", prefilled: "Follow-up questions", action: "Create Survey" },
      { title: "Generate Insights", prefilled: "", action: "Generate Insights" }
    ],
    [
      { title: "Design Workflow", prefilled: "Invoice automation", action: "Design Workflow" },
      { title: "Calculate ROI", prefilled: "Time savings analysis", action: "Calculate ROI" },
      { title: "Deploy Bot", prefilled: "", action: "Deploy Bot" }
    ],
    [
      { title: "Sync Data", prefilled: "CRM integration", action: "Sync Data" },
      { title: "Backup Files", prefilled: "Document archive", action: "Backup Files" },
      { title: "Monitor System", prefilled: "", action: "Monitor System" }
    ],
    [
      { title: "Review Contracts", prefilled: "Legal compliance", action: "Review Contracts" },
      { title: "Process Invoices", prefilled: "Payment tracking", action: "Process Invoices" },
      { title: "Update Records", prefilled: "", action: "Update Records" }
    ],
    [
      { title: "Optimize Performance", prefilled: "System tuning", action: "Optimize Performance" },
      { title: "Scale Resources", prefilled: "Capacity planning", action: "Scale Resources" },
      { title: "Health Check", prefilled: "", action: "Health Check" }
    ],
    [
      { title: "Train Model", prefilled: "AI improvement", action: "Train Model" },
      { title: "Test Integration", prefilled: "API validation", action: "Test Integration" },
      { title: "Deploy Update", prefilled: "", action: "Deploy Update" }
    ]
  ];

  // Auto-play through different prompts
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setCurrentPromptIndex(prev => (prev + 1) % promptSets.length);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  // Auto-play through different suggestions
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setCurrentSuggestionIndex(prev => (prev + 1) % suggestionSets.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  const handleConfirm = (action: string) => {
    setSuccessMessage(`${action} queued`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />

      {/* Split layout */}
      <div className="absolute" style={{ left: outer, right: outer, top: outer + 40, bottom: outer }}>
        <div className="relative h-full" style={{ width: innerWidth }}>
          {/* Chat pane */}
          <div className="absolute inset-y-0 left-0 rounded-md border bg-background" style={{ width: chatW, padding: 8 }}>
            {/* Conversation */}
            <div className="h-[calc(100%-36px)] overflow-hidden text-[12px]">
              <div className="space-y-2 pr-2">
                <motion.div 
                  key={currentPromptIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-[80%] rounded-md border bg-card px-2 py-2 text-[12px]"
                >
                  {promptSets[currentPromptIndex].question}
                </motion.div>
                {/* Answer Card */}
                <motion.div 
                  key={`answer-${currentPromptIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="max-w-[92%] rounded-md border bg-card px-2 py-2"
                >
                  <div className="text-[11px] font-medium mb-1">Answer</div>
                  <div className="text-[12px] text-muted-foreground line-clamp-2">
                    {promptSets[currentPromptIndex].answer}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    {promptSets[currentPromptIndex].chips.map((chip, i) => (
                      <MiniChip key={i} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            {/* Input */}
            <div className="absolute left-0 right-0 bottom-0 p-1">
              <div className="relative">
                <input
                  aria-label="Ask across your universe"
                  placeholder="Ask across your universe…"
                  className="w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-primary/30"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                {isInputFocused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Send className="h-4 w-4 text-primary cursor-pointer hover:text-primary/80 transition-colors" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Actions tray */}
          <div className="absolute inset-y-0 right-0 rounded-md border bg-background" style={{ width: actionsW, padding: 8, lineHeight: 1.2 }}>
            <div className="text-xs text-muted-foreground mb-2">Suggested Actions</div>
            <div className="space-y-2">
              {suggestionSets[currentSuggestionIndex].map((suggestion, index) => (
                <motion.div
                  key={`${currentSuggestionIndex}-${index}`}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="rounded-md border bg-card px-3 py-2 transition-all duration-200 hover:border-primary/20 hover:bg-card/80"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium">{suggestion.title}</div>
                    <button
                      className="h-6 rounded-md border px-2 text-[11px] transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
                      onClick={() => handleConfirm(suggestion.action)}
                      aria-label={`Confirm ${suggestion.action}`}
                    >
                      Confirm
                    </button>
                  </div>
                  {suggestion.prefilled && (
                    <div className="text-[11px] text-muted-foreground mt-1 truncate">
                      Prefilled: {suggestion.prefilled}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gutter */}
          <div className="absolute inset-y-0" style={{ left: chatW, width: gutter }} />
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
    </Canvas>
  );
}


