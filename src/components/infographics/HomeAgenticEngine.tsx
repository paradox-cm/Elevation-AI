"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, MiniChip, CardBody } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CheckSquare, Square } from "lucide-react";

type Step = { id: number; title: string; metrics: { label: string; value: string }[] };

export default function HomeAgenticEngine({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const steps: Step[] = useMemo(() => [
    { id: 1, title: "Fetch Context", metrics: [{ label: "latency", value: "110ms" }, { label: "cost", value: "0.2" }] },
    { id: 2, title: "Plan", metrics: [{ label: "latency", value: "95ms" }, { label: "cost", value: "0.1" }] },
    { id: 3, title: "Call: Summarizer", metrics: [{ label: "latency", value: "120ms" }, { label: "cost", value: "0.3" }] },
    { id: 4, title: "Call: Retrieval", metrics: [{ label: "latency", value: "130ms" }, { label: "cost", value: "0.2" }] },
    { id: 5, title: "Redact", metrics: [{ label: "latency", value: "80ms" }, { label: "cost", value: "0.1" }] },
    { id: 6, title: "Return", metrics: [{ label: "latency", value: "60ms" }, { label: "cost", value: "0.05" }] },
  ], []);

  const outer = 12;
  const cardW = 90; // Larger cards to fill available space
  const cardH = 80; // Taller cards to fill available height
  const gap = 8;
  const dwell = 0.45;

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }}>
        {/* Agentic Engine Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-sm bg-primary"></div>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold leading-none">Agentic Engine</h3>
                <p className="text-[11px] text-muted-foreground leading-none mt-1">Configure your AI workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-muted-foreground">Active</span>
              </div>
              <div className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded">
                v2.1.3
              </div>
            </div>
          </div>
        </div>

        {/* Top section - Tools, Models, Policies */}
        <div className="mb-4">
          <div className="rounded-md border bg-card text-card-foreground shadow-sm p-4">
            <div className="grid grid-cols-3 gap-6">
              {/* Tools */}
              <div className="flex flex-col">
                <div className="text-[11px] text-muted-foreground mb-2 leading-none">Tools</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Summarizer</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Retriever</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Notifier</span>
                  </div>
                </div>
              </div>

              {/* Models */}
              <div className="flex flex-col">
                <div className="text-[11px] text-muted-foreground mb-2 leading-none">Models</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Model A</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Model B</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Model C</span>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="flex flex-col">
                <div className="text-[11px] text-muted-foreground mb-2 leading-none">Policies</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[12px]">
                    <CheckSquare className="h-3 w-3 text-primary" />
                    <span>PII Masking</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <Square className="h-3 w-3 text-muted-foreground" />
                    <span>Rate Limits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy pill */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] whitespace-nowrap">
            <span className="text-muted-foreground">Policy:</span>
            <span className="font-medium">PII Masking ON</span>
          </div>
        </div>

        {/* Horizontal flow - Steps */}
        <div className="flex-1 flex items-center" style={{ minHeight: 120 }}>
          <div className="relative w-full" style={{ height: '100%', minHeight: 120 }}>
            {/* SVG overlay for connectors and token */}
            <svg
              className="pointer-events-none absolute inset-0 text-muted-foreground/40"
              width="100%"
              height="100%"
              viewBox="0 0 600 120"
              aria-hidden
            >
              <defs>
                <marker id="ae-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-current" />
                </marker>
              </defs>
              
              {/* Connector arrows */}
              {steps.map((_, i) => {
                if (i === steps.length - 1) return null;
                const x1 = (i + 0.5) * (100); // 100 units per card
                const x2 = (i + 1.5) * (100);
                const y = 60; // Center vertically in the 120px viewBox
                return (
                  <line
                    key={`arrow-${i}`}
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth={1.5}
                    markerEnd="url(#ae-arrow)"
                    strokeLinecap="round"
                  />
                );
              })}
              
              {/* Animated token */}
              <motion.circle
                r={3}
                cx={50}
                cy={60}
                initial={{ opacity: reduced ? 1 : 0 }}
                animate={{ 
                  cx: steps.map((_, i) => (i + 0.5) * 100),
                  opacity: 1 
                }}
                transition={{ 
                  duration: reduced ? 0 : dwell * steps.length, 
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="fill-foreground"
              />
            </svg>

            {/* Step cards */}
            <div className="absolute inset-0 flex" style={{ gap }}>
              {steps.map((s, i) => (
                <div key={s.id} className="relative flex-1 h-full">
                  <div className={`rounded-md border bg-card text-card-foreground shadow-sm w-full h-full ${
                    s.title === "Redact" ? "ring-1 ring-primary/20 bg-primary/5" : ""
                  }`}>
                    <CardBody className="p-3 h-full flex flex-col justify-between">
                      <div className="text-[12px] leading-none font-medium">{s.title}</div>
                      <div className="flex flex-col gap-1">
                        <MiniChip className="h-4 px-2 text-[10px] whitespace-nowrap">
                          {s.metrics[0].label} {s.metrics[0].value}
                        </MiniChip>
                        <MiniChip className="h-4 px-2 text-[10px] whitespace-nowrap">
                          {s.metrics[1].label} {s.metrics[1].value}
                        </MiniChip>
                      </div>
                    </CardBody>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}


