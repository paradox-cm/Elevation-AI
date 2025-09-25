"use client";
import React, { useEffect, useState } from "react";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function MobileHomeCopilot({ className }: { className?: string }) {
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

  // Dynamic prompt content sets - exact same as desktop
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
    }
  ];

  // Dynamic suggestion sets - exact same as desktop
  const suggestionSets = [
    [
      { title: "Create Report", prefilled: "Q3 summary", action: "Create Report" },
      { title: "Schedule Meeting", prefilled: "Stakeholder review", action: "Schedule Meeting" },
      { title: "Update Dashboard", prefilled: "", action: "Update Dashboard" }
    ],
    [
      { title: "Send Alert", prefilled: "Policy update", action: "Send Alert" },
      { title: "Generate Summary", prefilled: "Weekly digest", action: "Generate Summary" },
      { title: "Create Task", prefilled: "Follow-up required", action: "Create Task" }
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

  const currentPrompt = promptSets[currentPromptIndex];
  const currentSuggestions = suggestionSets[currentSuggestionIndex];

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Personal Co-pilot</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">AI-powered assistant</p>
        </div>

        {/* Chat Section */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-background flex flex-col">
            <div className="p-3 border-b">
              <div className="text-sm font-medium">Conversation</div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-3">
                <motion.div 
                  key={currentPromptIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1">You</div>
                    <div className="text-sm text-muted-foreground">{currentPrompt.question}</div>
                  </div>
                </motion.div>

                <motion.div 
                  key={`answer-${currentPromptIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium mb-1">Co-pilot</div>
                    <div className="text-sm text-muted-foreground mb-2">{currentPrompt.answer}</div>
                    <div className="flex flex-wrap gap-1">
                      {currentPrompt.chips.map((chip, index) => (
                        <MiniChip key={index} className="h-5 px-2 text-xs">{chip}</MiniChip>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex-1 min-h-0">
          <div className="rounded-md border bg-background">
            <div className="p-3 border-b">
              <div className="text-sm font-medium">Suggested Actions</div>
            </div>
            <div className="p-3 overflow-y-auto">
              <div className="space-y-2">
                {currentSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={`${currentSuggestionIndex}-${index}`}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="rounded-md border bg-card px-3 py-2 transition-all duration-200 hover:border-primary/20 hover:bg-card/80"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">{suggestion.title}</div>
                      <button
                        className="h-6 rounded-md border px-2 text-xs transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-sm"
                        onClick={() => handleConfirm(suggestion.action)}
                        aria-label={`Confirm ${suggestion.action}`}
                      >
                        Confirm
                      </button>
                    </div>
                    {suggestion.prefilled && (
                      <div className="text-xs text-muted-foreground truncate">
                        Prefilled: {suggestion.prefilled}
                      </div>
                    )}
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