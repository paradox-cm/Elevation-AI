"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function MobileHomeAgenticEngine({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [currentFlowIndex, setCurrentFlowIndex] = useState(0);

  // Dynamic flow sets - exact same as desktop
  const flowSets = useMemo(() => [
    // Flow 1: Document Processing
    {
      steps: [
        { id: 1, title: "Parse", metrics: [{ label: "latency", value: "95ms" }, { label: "cost", value: "0.1" }] },
        { id: 2, title: "Plan", metrics: [{ label: "latency", value: "95ms" }, { label: "cost", value: "0.1" }] },
        { id: 3, title: "Call: Summarizer", metrics: [{ label: "latency", value: "120ms" }, { label: "cost", value: "0.3" }] },
        { id: 4, title: "Call: Retrieval", metrics: [{ label: "latency", value: "130ms" }, { label: "cost", value: "0.2" }] },
        { id: 5, title: "Redact", metrics: [{ label: "latency", value: "80ms" }, { label: "cost", value: "0.1" }] },
        { id: 6, title: "Return", metrics: [{ label: "latency", value: "60ms" }, { label: "cost", value: "0.05" }] },
      ],
      tools: ["Summarizer", "Retriever", "Notifier"],
      models: ["GPT-4", "Claude-3", "Gemini-Pro"],
      policies: [
        { name: "PII Masking", enabled: true },
        { name: "Rate Limits", enabled: false }
      ]
    },
    // Flow 2: Data Analysis
    {
      steps: [
        { id: 1, title: "Data Ingestion", metrics: [{ label: "latency", value: "150ms" }, { label: "cost", value: "0.4" }] },
        { id: 2, title: "Schema Validation", metrics: [{ label: "latency", value: "75ms" }, { label: "cost", value: "0.1" }] },
        { id: 3, title: "Call: Analyzer", metrics: [{ label: "latency", value: "200ms" }, { label: "cost", value: "0.5" }] },
        { id: 4, title: "Call: Classifier", metrics: [{ label: "latency", value: "180ms" }, { label: "cost", value: "0.3" }] },
        { id: 5, title: "Aggregate", metrics: [{ label: "latency", value: "90ms" }, { label: "cost", value: "0.2" }] },
        { id: 6, title: "Export", metrics: [{ label: "latency", value: "45ms" }, { label: "cost", value: "0.1" }] },
      ],
      tools: ["Analyzer", "Classifier", "Aggregator"],
      models: ["GPT-4", "Claude-3", "Local-LLM"],
      policies: [
        { name: "Data Privacy", enabled: true },
        { name: "Audit Trail", enabled: true }
      ]
    },
    // Flow 3: Customer Support
    {
      steps: [
        { id: 1, title: "Ticket Analysis", metrics: [{ label: "latency", value: "95ms" }, { label: "cost", value: "0.15" }] },
        { id: 2, title: "Intent Detection", metrics: [{ label: "latency", value: "110ms" }, { label: "cost", value: "0.2" }] },
        { id: 3, title: "Call: Responder", metrics: [{ label: "latency", value: "140ms" }, { label: "cost", value: "0.25" }] },
        { id: 4, title: "Call: Escalator", metrics: [{ label: "latency", value: "85ms" }, { label: "cost", value: "0.1" }] },
        { id: 5, title: "Quality Check", metrics: [{ label: "latency", value: "70ms" }, { label: "cost", value: "0.08" }] },
        { id: 6, title: "Response", metrics: [{ label: "latency", value: "50ms" }, { label: "cost", value: "0.05" }] },
      ],
      tools: ["Responder", "Escalator", "Quality Checker"],
      models: ["Support-GPT", "Intent-Model", "Response-GPT"],
      policies: [
        { name: "Response Quality", enabled: true },
        { name: "Escalation Rules", enabled: true }
      ]
    },
    // Flow 4: Business Intelligence
    {
      steps: [
        { id: 1, title: "Data Collection", metrics: [{ label: "latency", value: "200ms" }, { label: "cost", value: "0.3" }] },
        { id: 2, title: "Pattern Recognition", metrics: [{ label: "latency", value: "160ms" }, { label: "cost", value: "0.4" }] },
        { id: 3, title: "Call: Predictor", metrics: [{ label: "latency", value: "250ms" }, { label: "cost", value: "0.6" }] },
        { id: 4, title: "Call: Optimizer", metrics: [{ label: "latency", value: "180ms" }, { label: "cost", value: "0.4" }] },
        { id: 5, title: "Insight Generation", metrics: [{ label: "latency", value: "120ms" }, { label: "cost", value: "0.2" }] },
        { id: 6, title: "Report", metrics: [{ label: "latency", value: "80ms" }, { label: "cost", value: "0.1" }] },
      ],
      tools: ["Predictor", "Optimizer", "Insight Generator"],
      models: ["BI-Model", "Predictive-AI", "Analytics-Engine"],
      policies: [
        { name: "Data Governance", enabled: true },
        { name: "Model Validation", enabled: true }
      ]
    }
  ], []);

  const currentFlow = flowSets[currentFlowIndex];
  const steps = currentFlow.steps;

  // Auto-cycle through different flows - exact same logic as desktop
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setCurrentFlowIndex(prev => (prev + 1) % flowSets.length);
    }, 4000); // Change flow every 4 seconds
    
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-primary"></div>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-none">Agentic Engine</h3>
                <p className="text-[11px] text-muted-foreground leading-none mt-1">Configure your AI workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                v2.1.3
              </div>
            </div>
          </div>
        </div>

        {/* Tools, Models, Policies */}
        <div className="flex-shrink-0 mb-4">
          <div className="rounded-md border bg-card text-card-foreground shadow-sm p-3">
            <div className="grid grid-cols-3 gap-4">
              {/* Tools */}
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground mb-2 leading-none">Tools</div>
                <div className="space-y-1">
                  {currentFlow.tools.map((tool, index) => (
                    <motion.div
                      key={`${currentFlowIndex}-${tool}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-2 w-2 rounded-full bg-muted" />
                      <span className="truncate">{tool}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Models */}
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground mb-2 leading-none">Models</div>
                <div className="space-y-1">
                  {currentFlow.models.map((model, index) => (
                    <motion.div
                      key={`${currentFlowIndex}-${model}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="truncate">{model}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground mb-2 leading-none">Policies</div>
                <div className="space-y-1">
                  {currentFlow.policies.map((policy, index) => (
                    <motion.div
                      key={`${currentFlowIndex}-${policy.name}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className={`h-2 w-2 rounded-full ${policy.enabled ? "bg-green-500" : "bg-muted"}`} />
                      <span className="truncate">{policy.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="text-sm text-muted-foreground mb-3 flex-shrink-0">Workflow Steps</div>
          <div className="space-y-3 flex-1 min-h-0 overflow-y-auto">
            {steps.map((step, index) => (
              <motion.div
                key={`${currentFlowIndex}-${step.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-md border bg-card text-card-foreground shadow-sm p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {step.id}
                    </div>
                    <div className="text-sm font-medium">{step.title}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-xs text-muted-foreground">
                        <span className="font-mono">{metric.value}</span>
                        <span className="ml-1">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <motion.div
                    className="bg-primary h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex-shrink-0 mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Flow {currentFlowIndex + 1} of {flowSets.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Auto-cycling</span>
              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </MobileCanvas>
  );
}