"use client";
import React, { useEffect, useState } from "react";
import { Canvas, MiniChip } from "@/components/infographics/primitives";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function HomeCopilot({ className }: { className?: string }) {
  const outer = 12; // canvas padding
  const titleStrip = 36; // removed, but keep constant for minimal edits
  const innerWidth = 600 - outer * 2; // 576
  const gutter = 12;
  const chatW = 336;
  const actionsW = 228;

  const [prefilled, setPrefilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPrefilled(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Split layout */}
      <div className="absolute" style={{ left: outer, right: outer, top: outer, bottom: outer }}>
        <div className="relative h-full" style={{ width: innerWidth }}>
          {/* Chat pane */}
          <div className="absolute inset-y-0 left-0 rounded-md border bg-background" style={{ width: chatW, padding: 8 }}>
            {/* Conversation */}
            <div className="h-[calc(100%-36px)] overflow-hidden text-[12px]">
              <div className="space-y-2 pr-2">
                <div className="max-w-[80%] rounded-md border bg-card px-2 py-2 text-[12px]">
                  How are renewal terms trending?
                </div>
                {/* Answer Card */}
                <div className="max-w-[92%] rounded-md border bg-card px-2 py-2">
                  <div className="text-[11px] font-medium mb-1">Answer</div>
                  <div className="text-[12px] text-muted-foreground line-clamp-2">
                    Renewal terms appear stable with minor variance across regions. Key drivers include seasonality and contract complexity.
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <MiniChip className="h-5 px-1 text-[10px]">Doc</MiniChip>
                    <MiniChip className="h-5 px-1 text-[10px]">Email</MiniChip>
                    <MiniChip className="h-5 px-1 text-[10px]">Note</MiniChip>
                  </div>
                </div>
              </div>
            </div>
            {/* Input */}
            <div className="absolute left-0 right-0 bottom-0 p-1">
              <input
                aria-label="Ask across your universe"
                placeholder="Ask across your universe…"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Actions tray */}
          <div className="absolute inset-y-0 right-0 rounded-md border bg-background" style={{ width: actionsW, padding: 8, lineHeight: 1.2 }}>
            <div className="text-xs text-muted-foreground mb-2">Suggested Actions</div>
            <div className="space-y-2">
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="rounded-md border bg-card px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">Create Task</div>
                  <button
                    className="h-6 rounded-md border px-2 text-[11px]"
                    onClick={() => toast.success("Action queued")}
                    aria-label="Confirm Create Task"
                  >
                    Confirm
                  </button>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 truncate">
                  Prefilled: Renewal brief
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: prefilled ? 0 : 8, opacity: prefilled ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-md border bg-card px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">Draft Email</div>
                  <button
                    className="h-6 rounded-md border px-2 text-[11px]"
                    onClick={() => toast.success("Action queued")}
                    aria-label="Confirm Draft Email"
                  >
                    Confirm
                  </button>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 truncate">
                  Prefilled: Follow-up on terms
                </div>
              </motion.div>

              <div className="rounded-md border bg-card px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">Generate Summary</div>
                  <button
                    className="h-6 rounded-md border px-2 text-[11px]"
                    onClick={() => toast.success("Action queued")}
                    aria-label="Confirm Generate Summary"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gutter */}
          <div className="absolute inset-y-0" style={{ left: chatW, width: gutter }} />
        </div>
      </div>
    </Canvas>
  );
}


