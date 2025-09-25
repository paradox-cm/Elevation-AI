"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Rule = { condition: string; action: string; model: string; policy: string };
type Req = { id: string; text: string; matched: string; status: "Incoming" | "Gated" | "Completed" };

export default function PlatformConnectSecurely({ className }: { className?: string }) {
  const outer = 12; // Original desktop value
  const titleStrip = 36; // Original desktop value
  const reduced = usePrefersReducedMotion();
  const [activeRequestIndex, setActiveRequestIndex] = useState(0);
  const [requestStatuses, setRequestStatuses] = useState<("Incoming" | "Gated" | "Completed")[]>([
    "Incoming", "Completed", "Completed"
  ]);
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
      
      // Move to next request after a pause
      const t3 = setTimeout(() => {
        const nextIndex = (index + 1) % 3;
        animateRequest(nextIndex);
      }, 3000);
      
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    };
    
    const cleanup = animateRequest(0);
    return cleanup;
  }, [reduced]);

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />

      {/* Integrations Scale Strip */}
      <div className="absolute left-2 right-2 sm:left-3 sm:right-3" style={{ top: outer + 40 }}>
        <div className="flex items-center justify-between bg-muted/30 rounded-md px-2 py-1 sm:px-3 sm:py-2">
          <span className="text-[9px] sm:text-xs font-medium">Integrations</span>
          <div className="flex-1 ml-2 sm:ml-4 overflow-hidden relative">
            <motion.div
              className="flex gap-1.5"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            >
              {[
                "GPT-4", "Claude-3", "Gemini Pro", "Local-LLM", "VectorDB", "Pinecone", 
                "RPA Bot", "API Gateway", "Webhook", "Slack", "Teams", "Discord",
                "OpenAI", "Anthropic", "Google AI", "Azure AI", "AWS Bedrock", "Hugging Face"
              ].map((tool, i) => (
                <div
                  key={`${tool}-${i}`}
                  className="text-[8px] sm:text-[10px] bg-background px-1 sm:px-2 py-0.5 rounded border whitespace-nowrap flex-shrink-0"
                >
                  {tool}
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                "GPT-4", "Claude-3", "Gemini Pro", "Local-LLM", "VectorDB", "Pinecone", 
                "RPA Bot", "API Gateway", "Webhook", "Slack", "Teams", "Discord",
                "OpenAI", "Anthropic", "Google AI", "Azure AI", "AWS Bedrock", "Hugging Face"
              ].map((tool, i) => (
                <div
                  key={`${tool}-dup-${i}`}
                  className="text-[8px] sm:text-[10px] bg-background px-1 sm:px-2 py-0.5 rounded border whitespace-nowrap flex-shrink-0"
                >
                  {tool}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Connection Badge */}
      <div className="absolute left-2 sm:left-3" style={{ top: outer + 32 + 8 + 8 + 40 }}>
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-[8px] sm:text-[10px] px-1 sm:px-2 py-0.5 sm:py-1 rounded border border-blue-200 dark:border-blue-700">
          Your Apps (5 connections)
        </div>
      </div>

      {/* API Keys Pill */}
      <div className="absolute right-2 sm:right-3" style={{ top: outer + 32 + 8 + 8 + 40 }}>
        <div className="relative group">
          <div className="bg-muted text-muted-foreground text-[8px] sm:text-[10px] px-1 sm:px-2 py-0.5 sm:py-1 rounded border flex items-center gap-0.5 sm:gap-1 cursor-pointer">
            <span className="text-[8px] sm:text-[10px]">🔑</span>
            <span>API Keys (3)</span>
          </div>
            {/* Dropdown (non-functional) */}
            <div className="absolute top-4 sm:top-6 right-0 bg-background border rounded shadow-lg opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 pointer-events-auto" style={{ zIndex: 50 }}>
              <div className="text-[8px] sm:text-[10px] py-1">
                <div className="px-1 sm:px-2 py-1 hover:bg-muted cursor-pointer">Rotate</div>
                <div className="px-1 sm:px-2 py-1 hover:bg-muted cursor-pointer">Scope</div>
                <div className="px-1 sm:px-2 py-1 hover:bg-muted cursor-pointer">Revoke</div>
              </div>
            </div>
        </div>
      </div>

      {/* Routing Rules table (collapsible) */}
      <motion.div 
        className="absolute left-2 right-2 sm:left-3 sm:right-3" 
        style={{ top: outer + 32 + 8 + 24 + 8 + 8 + 40 }}
        animate={{ height: isTableExpanded ? 110 : 32 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="rounded-md border bg-background/50 text-[10px] sm:text-[12px] overflow-hidden h-full">
          {/* Collapsible Header */}
          <div 
            className="flex items-center justify-between px-2 py-1 sm:px-3 sm:py-2 bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => setIsTableExpanded(!isTableExpanded)}
          >
            <span className="text-[9px] sm:text-xs font-semibold">Routing Rules</span>
            <motion.div
              animate={{ rotate: isTableExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground"
            >
              ▶
            </motion.div>
          </div>
          
          {/* Table Content */}
          <motion.div
            animate={{ height: isTableExpanded ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <table className="table-fixed w-full text-[8px] sm:text-xs">
              <colgroup>
                <col className="w-[100px] sm:w-[150px]" />
                <col className="w-[60px] sm:w-[80px]" />
                <col className="w-[80px] sm:w-[110px]" />
                <col className="w-[70px] sm:w-[90px]" />
              </colgroup>
              <thead className="text-[8px] sm:text-[11px] text-muted-foreground">
                <tr className="h-4 sm:h-6">
                  <th className="px-1 sm:px-3 py-0.5 sm:py-1 text-left font-semibold leading-tight">Condition</th>
                  <th className="px-1 sm:px-3 py-0.5 sm:py-1 text-left font-semibold leading-tight">Action</th>
                  <th className="px-1 sm:px-3 py-0.5 sm:py-1 text-left font-semibold leading-tight">Model/Tool</th>
                  <th className="px-1 sm:px-3 py-0.5 sm:py-1 text-left font-semibold leading-tight">Policy</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r, i) => (
                  <tr key={i} className="h-4 sm:h-6">
                    <td className="px-1 sm:px-3 py-0.5 sm:py-1 truncate whitespace-nowrap align-middle">
                      <span className="inline-flex items-center gap-0.5 sm:gap-1">
                        <span className="text-[7px] sm:text-[10px] bg-muted px-0.5 sm:px-1 rounded text-muted-foreground">R-{String(i+1).padStart(2, '0')}</span>
                        <span className="text-[7px] sm:text-[10px]">{r.condition}</span>
                      </span>
                    </td>
                    <td className="px-1 sm:px-3 py-0.5 sm:py-1 truncate whitespace-nowrap align-middle text-right text-[7px] sm:text-[10px]">{r.action}</td>
                    <td className="px-1 sm:px-3 py-0.5 sm:py-1 truncate whitespace-nowrap align-middle text-[7px] sm:text-[10px]">{r.model}</td>
                    <td className="px-1 sm:px-3 py-0.5 sm:py-1 truncate whitespace-nowrap align-middle text-[7px] sm:text-[10px]">{r.policy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.div>

      {/* Cost Optimization Panel */}
      <motion.div 
        className="absolute left-2 sm:left-3" 
        style={{ top: outer + 32 + 8 + 24 + 8 + 8 + (isTableExpanded ? 110 : 32) + 8 + 40 }}
        animate={{ 
          top: outer + 32 + 8 + 24 + 8 + 8 + (isTableExpanded ? 110 : 32) + 8 + 40 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="bg-muted/30 rounded-md px-2 py-1 sm:px-3 sm:py-2">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[10px] font-medium">Optimization</span>
            <div className="flex gap-2 sm:gap-3 text-[7px] sm:text-[9px]">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span>Quality</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => (
                    <div 
                      key={i} 
                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${i <= 3 ? 'bg-green-500' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span>Latency</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => (
                    <div 
                      key={i} 
                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${i <= 2 ? 'bg-yellow-500' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span>Cost</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => (
                    <motion.div 
                      key={i} 
                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${i <= 1 ? 'bg-red-500' : 'bg-muted'}`}
                      animate={activeRequestIndex === 2 ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section divider with spacing */}
      <motion.div 
        className="absolute left-3 right-3" 
        style={{ top: outer + 32 + 8 + 24 + 8 + 8 + (isTableExpanded ? 110 : 32) + 8 + 32 + 8 + 40 }}
        animate={{ 
          top: outer + 32 + 8 + 24 + 8 + 8 + (isTableExpanded ? 110 : 32) + 8 + 32 + 8 + 40 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="h-px bg-border"></div>
      </motion.div>

      {/* Bottom: Live Requests + Policy Gate */}
      <motion.div 
        className="absolute left-2 right-2 sm:left-3 sm:right-3 bottom-2 sm:bottom-3" 
        style={{ 
          top: outer + 32 + 8 + 24 + 8 + 8 + (isTableExpanded ? 110 : 32) + 8 + 32 + 8 + 1 + 8 + 40, 
          height: 120 
        }}
        animate={{ 
          top: outer + 32 + 8 + 24 + 8 + 8 + (isTableExpanded ? 110 : 32) + 8 + 32 + 8 + 1 + 8 + 40 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="grid h-full" style={{ gridTemplateColumns: "1fr 120px", gap: 12 }}>
          {/* Requests list */}
          <div className="rounded-md border bg-background/50 p-1 sm:p-2 h-full flex flex-col">
            <div className="text-[8px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Live Requests</div>
            <ul className="divide-y flex-1">
              {[
                { label: "Task: Summarize", matched: "R-01" },
                { label: "Task: Retrieval", matched: "R-02" },
                { label: "Cost Threshold Check", matched: "R-03" }
              ].map((item, i) => {
                const status = requestStatuses[i];
                const isActive = i === activeRequestIndex;
                return (
                  <motion.li 
                    key={i} 
                    className="h-4 sm:h-6 grid grid-cols-[1fr_auto] items-center gap-1 sm:gap-2 py-0.5 sm:py-1.5"
                    animate={isActive ? {
                      x: status === "Gated" ? 4 : status === "Completed" ? 0 : 0
                    } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <span className="text-[8px] sm:text-xs truncate min-w-0">{item.label}</span>
                    <div className="flex gap-0.5 sm:gap-1 items-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: isActive ? 0.3 : 0 }}
                      >
                        <MiniChip className="h-4 sm:h-5 px-1 text-[7px] sm:text-[10px] truncate">Matched: {item.matched}</MiniChip>
                      </motion.div>
                      {isActive && status !== "Completed" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <MiniChip className="h-4 sm:h-5 px-1 text-[7px] sm:text-[10px] truncate">{status}</MiniChip>
                        </motion.div>
                      )}
                      {isActive && status === "Completed" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <MiniChip className="h-4 sm:h-5 px-1 text-[7px] sm:text-[10px] truncate bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">Completed</MiniChip>
                        </motion.div>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Policy Gate */}
          <div className="rounded-md border bg-background p-1 sm:p-2 relative overflow-hidden text-[10px] sm:text-[12px] w-[120px] shrink-0 flex flex-col">
            <div className="text-[8px] sm:text-xs text-muted-foreground mb-1 sm:mb-2">Policy Gate</div>
            <div className="flex flex-col gap-0.5 sm:gap-1 mb-1 sm:mb-2 flex-1">
              <MiniChip className="h-4 sm:h-5 px-1 text-[7px] sm:text-[10px]">Rate Limit</MiniChip>
              <MiniChip className="h-4 sm:h-5 px-1 text-[7px] sm:text-[10px]">Audit</MiniChip>
              
            </div>

            {/* token progress visual */}
            <div className="absolute left-1 right-1 sm:left-2 sm:right-2 bottom-1 sm:bottom-2 h-1 sm:h-1.5 bg-muted rounded">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: requestStatuses[activeRequestIndex] === "Incoming" ? "33%" : 
                         requestStatuses[activeRequestIndex] === "Gated" ? "66%" : "100%" 
                }}
                transition={{ duration: reduced ? 0 : 0.8 }}
                className="h-full bg-foreground rounded"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Canvas>
  );
}


