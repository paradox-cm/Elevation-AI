"use client";
import React, { useState, useEffect } from "react";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

type Rule = {
  condition: string;
  action: string;
  model: string;
  policy: string;
};

export default function MobilePlatformConnectSecurely({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [requestStatuses, setRequestStatuses] = useState<("Incoming" | "Gated" | "Completed")[]>([
    "Incoming", "Completed", "Completed"
  ]);
  const [activeRequestIndex, setActiveRequestIndex] = useState(0);
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  const rules: Rule[] = [
    { condition: 'Task = "Summarize"', action: "Route", model: "Model A", policy: "PII Masking" },
    { condition: "Retrieval Needed = true", action: "Route", model: "Retriever", policy: "Cache" },
    { condition: "Cost > threshold", action: "Route", model: "Model B", policy: "Optimize Cost" },
  ];

  useEffect(() => {
    if (reduced) {
      setRequestStatuses(["Completed", "Completed", "Completed", "Completed", "Completed", "Completed"]);
      return;
    }
    
    const animateRequest = (index: number) => {
      // Reset all to completed except the active one
      const newStatuses: ("Incoming" | "Gated" | "Completed")[] = ["Completed", "Completed", "Completed"];
      newStatuses[index] = "Incoming";
      setRequestStatuses(newStatuses);
      setActiveRequestIndex(index);
      
      // Animate through the states
      const t1 = setTimeout(() => {
        const gatedStatuses = [...newStatuses];
        gatedStatuses[index] = "Gated";
        setRequestStatuses(gatedStatuses);
      }, 1000);
      
      const t2 = setTimeout(() => {
        const completedStatuses = [...newStatuses];
        completedStatuses[index] = "Completed";
        setRequestStatuses(completedStatuses);
      }, 2000);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    const scheduleAnimations = () => {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Animate each request in sequence
      for (let i = 0; i < 3; i++) {
        const timeout = setTimeout(() => {
          animateRequest(i);
        }, i * 3000); // Start each request 3 seconds apart
        timeouts.push(timeout);
      }
      
      return timeouts;
    };

    const allTimeouts = scheduleAnimations();
    
    return () => {
      allTimeouts.forEach(clearTimeout);
    };
  }, [reduced]);

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Connect Securely</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">Secure AI model routing</p>
        </div>

        {/* Connection Status */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-background p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">Your Apps (5 connections)</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {["OpenAI", "Anthropic", "Google AI", "Azure AI", "AWS Bedrock"].map((tool, i) => (
                <motion.div
                  key={`${tool}-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="text-xs bg-background px-2 py-1 rounded border"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Routing Rules */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-background">
            <div className="p-3 border-b">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Routing Rules</div>
                <button
                  onClick={() => setIsTableExpanded(!isTableExpanded)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isTableExpanded ? "Collapse" : "Expand"}
                </button>
              </div>
            </div>
            {isTableExpanded && (
              <div className="p-3 space-y-2">
                {rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="rounded-md border bg-card p-2 text-xs"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-muted-foreground">Condition</div>
                        <div className="font-medium">{rule.condition}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Action</div>
                        <div className="font-medium">{rule.action}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Model</div>
                        <div className="font-medium">{rule.model}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Policy</div>
                        <div className="font-medium">{rule.policy}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Requests */}
        <div className="flex-1 min-h-0">
          <div className="text-sm text-muted-foreground mb-3">Live Requests</div>
          <div className="space-y-3 h-full overflow-y-auto">
            {[
              { label: "Task: Summarize", matched: "R-01" },
              { label: "Task: Retrieval", matched: "R-02" },
              { label: "Cost Threshold Check", matched: "R-03" }
            ].map((item, i) => {
              const status = requestStatuses[i];
              const isActive = i === activeRequestIndex;
              return (
                <motion.div 
                  key={i} 
                  className="rounded-md border bg-background/50 p-3"
                  animate={isActive ? {
                    x: status === "Gated" ? 4 : status === "Completed" ? 0 : 0
                  } : {}}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      status === "Incoming" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700" :
                      status === "Gated" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700" :
                      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700"
                    }`}>
                      {status}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">Matched: {item.matched}</div>
                  {isActive && status !== "Completed" && (
                    <motion.div
                      className="w-full bg-muted rounded-full h-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <div className="bg-primary h-1 rounded-full"></div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex-shrink-0 mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>5 models connected</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Auto-routing</span>
              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </MobileCanvas>
  );
}