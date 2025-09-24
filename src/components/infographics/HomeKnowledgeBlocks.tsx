"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle, Canvas, MiniChip, NodeLine, WithTooltip, CardBody } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TileSpec = {
  id: number;
  label: string;
  content: React.ReactNode;
};

export function HomeKnowledgeBlocks({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  const tiles: TileSpec[] = useMemo(() => [
    { id: 1, label: "Document", content: (
      <div className="text-[11px]">
        <div className="font-medium truncate leading-none">Q3 Strategy Draft…</div>
        <div className="mt-1 flex flex-col gap-1">
          <MiniChip>Entity: Company</MiniChip>
          <MiniChip>Topic: Strategy</MiniChip>
        </div>
      </div>
    ) },
    { id: 2, label: "Email", content: (
      <div className="text-[11px]">
        <div className="truncate leading-none">Renewal terms follow-up</div>
        <div className="mt-1">
          <MiniChip>Yesterday</MiniChip>
        </div>
      </div>
    ) },
    { id: 3, label: "Meeting Notes", content: (
      <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-1">
        <li className="truncate">Discuss milestones and owners…</li>
        <li className="truncate">Identify risks and mitigations…</li>
      </ul>
    ) },
    { id: 4, label: "Metric", content: (
      <div className="text-[11px]">
        <div className="flex items-center gap-2 leading-none">
          <span className="text-muted-foreground">ARR —</span>
          <span className="font-mono">12.4M</span>
        </div>
        <div className="text-[10px] text-muted-foreground mt-1">source: Finance</div>
      </div>
    ) },
    { id: 5, label: "Task", content: (
      <div className="text-[11px]">
        <div className="truncate">Prepare renewal brief</div>
        <div className="mt-1">
          <MiniChip>Open</MiniChip>
        </div>
      </div>
    ) },
    { id: 6, label: "Ticket", content: (
      <div className="text-[11px]">
        <div className="truncate">Access request pending</div>
        <div className="mt-1">
          <MiniChip>IT</MiniChip>
        </div>
      </div>
    ) },
    { id: 7, label: "Contract", content: (
      <div className="text-[11px]">
        <div className="flex items-center gap-2 leading-none">
          <span className="text-muted-foreground">Vendor</span>
          <span className="truncate">Acme Inc.</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-muted-foreground">Renewal Date</span>
          <span>Oct 15</span>
        </div>
      </div>
    ) },
    { id: 8, label: "Call Transcript", content: (
      <div className="truncate text-[11px]">Key risks discussed…</div>
    ) },
    { id: 9, label: "FAQ", content: (
      <div className="text-[11px]">
        <div className="truncate">What's the policy on…</div>
        <div className="mt-1">
          <MiniChip>Policy</MiniChip>
        </div>
      </div>
    ) },
  ], []);

  const connections = [
    { from: 2, to: 7, label: "Email ↔ Contract" },
    { from: 1, to: 3, label: "Document ↔ Meeting" },
    { from: 4, to: 5, label: "Metric ↔ Task" },
    { from: 3, to: 5, label: "Meeting ↔ Task" },
  ];

  // Grid math within 600x360 canvas with 12px outer padding:
  // 3 cols, 3 rows, gaps 12px → tile size 160x90 (as specified)
  const tileWidth = 160;
  const tileHeight = 90;
  const gap = 12;
  const outer = 12;

  function tilePosition(idx: number) {
    const r = Math.floor((idx - 1) / 3);
    const c = (idx - 1) % 3;
    const x = outer + c * (tileWidth + gap);
    const y = outer + r * (tileHeight + gap);
    return { x, y };
  }

  // endpoints: center edges for simplicity
  function endpoints(from: number, to: number) {
    const a = tilePosition(from);
    const b = tilePosition(to);
    const ax = a.x + tileWidth;
    const ay = a.y + tileHeight / 2;
    const bx = b.x;
    const by = b.y + tileHeight / 2;
    return { ax, ay, bx, by };
  }

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Graph overlay (beneath tiles) */}
      <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 600 360" aria-hidden>
        <g className="text-muted-foreground/50">
          {connections.map((c, i) => {
            const { ax, ay, bx, by } = endpoints(c.from, c.to);
            const initial = reduced ? { pathLength: 1 } : { pathLength: 0 };
            const animate = reduced ? { pathLength: 1 } : { pathLength: 1 };
            return (
              <motion.g key={i} initial={initial} animate={animate} transition={{ duration: 0.5, delay: reduced ? 0 : 0.6 + i * 0.12 }}>
                <NodeLine x1={ax} y1={ay} x2={bx} y2={by} />
                {/* endpoints */}
                <circle cx={ax} cy={ay} r={3} className="fill-current" />
                <circle cx={bx} cy={by} r={3} className="fill-current" />
              </motion.g>
            );
          })}
        </g>
      </svg>

      {/* Tiles */}
      <div className="absolute inset-0" style={{ padding: outer }}>
        {tiles.map((t, idx) => {
          const { x, y } = tilePosition(t.id);
          const delay = reduced ? 0 : idx * 0.06; // 60ms per tile
          return (
            <motion.div
              key={t.id}
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay }}
              className="absolute rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden"
              style={{ width: tileWidth, height: tileHeight, left: x, top: y }}
              role="group"
              aria-label={`${t.label} tile`}
            >
              <CardBody className="p-2 gap-1 h-full">
                <div className="text-xs text-muted-foreground truncate leading-none">{t.label}</div>
                <div className="min-h-0 mt-1">{t.content}</div>
                <div className="h-0" />
              </CardBody>
            </motion.div>
          );
        })}
      </div>
    </Canvas>
  );
}

export default HomeKnowledgeBlocks;


