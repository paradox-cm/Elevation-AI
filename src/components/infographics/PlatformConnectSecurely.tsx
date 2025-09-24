"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Rule = { condition: string; action: string; model: string; policy: string };
type Req = { id: string; text: string; matched: string; status: "Incoming" | "Gated" | "Completed" };

export default function PlatformConnectSecurely({ className }: { className?: string }) {
  const outer = 12;
  const titleStrip = 36;
  const reduced = usePrefersReducedMotion();
  const [req, setReq] = useState<Req>({ id: "r1", text: "Task: Summarize", matched: "Summarize → Model A", status: "Incoming" });

  const rules: Rule[] = [
    { condition: 'Task = "Summarize"', action: "Route", model: "Model A", policy: "PII Masking" },
    { condition: "Retrieval Needed = true", action: "Route", model: "Retriever", policy: "Cache" },
    { condition: "Cost > threshold", action: "Route", model: "Model B", policy: "Optimize Cost" },
    { condition: "Data Residency = EU", action: "Route", model: "Model C", policy: "EU Only" },
  ];

  useEffect(() => {
    if (reduced) {
      setReq((r) => ({ ...r, status: "Completed" }));
      return;
    }
    const t1 = setTimeout(() => setReq((r) => ({ ...r, status: "Gated" })), 700);
    const t2 = setTimeout(() => setReq((r) => ({ ...r, status: "Completed" })), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Routing Rules table (table-fixed with explicit column widths) */}
      <div className="absolute left-3 right-3" style={{ top: outer }}>
        <div className="rounded-md border bg-background/50 text-[12px] overflow-hidden">
          <table className="table-fixed w-full text-xs">
            <colgroup>
              <col className="w-[150px]" />
              <col className="w-[80px]" />
              <col className="w-[110px]" />
              <col className="w-[90px]" />
            </colgroup>
            <thead className="text-[11px] text-muted-foreground">
              <tr className="h-7">
                <th className="px-2 text-left">Condition</th>
                <th className="px-2 text-left">Action</th>
                <th className="px-2 text-left">Model/Tool</th>
                <th className="px-2 text-left">Policy</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={i} className="h-7">
                  <td className="px-2 truncate whitespace-nowrap align-middle">{r.condition}</td>
                  <td className="px-2 truncate whitespace-nowrap align-middle">{r.action}</td>
                  <td className="px-2 truncate whitespace-nowrap align-middle">{r.model}</td>
                  <td className="px-2 truncate whitespace-nowrap align-middle">{r.policy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Bottom: Live Requests + Policy Gate */}
      <div className="absolute left-3 right-3 bottom-3" style={{ top: outer + 148 }}>
        <div className="grid h-full" style={{ gridTemplateColumns: "1fr 120px", gap: 12 }}>
          {/* Requests list */}
          <div className="rounded-md border bg-background/50 p-2 min-h-[120px]" style={{ lineHeight: 1.2 }}>
            <div className="text-xs text-muted-foreground mb-1">Live Requests</div>
            <ul className="divide-y">
              {[0,1,2,3,4,5].map((i) => (
                <li key={i} className="h-6 grid grid-cols-[1fr_auto] items-center gap-2">
                  <span className="text-xs truncate min-w-0">{i === 0 ? req.text : `Request #${i+1}`}</span>
                  <div className="flex gap-1 overflow-hidden whitespace-nowrap">
                    <MiniChip className="h-5 px-1 text-[10px] truncate">Matched: {i === 0 ? "Summarize" : (i % 2 ? "Retriever" : "Model B")}</MiniChip>
                    {i === 0 && <MiniChip className="h-5 px-1 text-[10px] truncate">{req.status}</MiniChip>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Gate */}
          <div className="rounded-md border bg-background p-2 relative overflow-hidden text-[12px] w-[120px] shrink-0">
            <div className="text-xs text-muted-foreground mb-2">Policy Gate</div>
            <div className="flex flex-col gap-1 mb-2">
              <MiniChip className="h-5 px-1 text-[10px]">De-ID</MiniChip>
              <MiniChip className="h-5 px-1 text-[10px]">Rate Limit</MiniChip>
              <MiniChip className="h-5 px-1 text-[10px]">Audit</MiniChip>
            </div>

            {/* token progress visual */}
            <div className="absolute left-2 right-2 bottom-2 h-1.5 bg-muted rounded">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: req.status === "Incoming" ? "33%" : req.status === "Gated" ? "66%" : "100%" }}
                transition={{ duration: reduced ? 0 : 0.8 }}
                className="h-full bg-foreground rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}


