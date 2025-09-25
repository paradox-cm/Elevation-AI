"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle, Canvas, MiniChip, WithTooltip, CardBody } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TileSpec = {
  id: number;
  label: string;
  content: React.ReactNode;
};

export function HomeKnowledgeBlocks({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [cardStates, setCardStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Multiple content sets for each tile
  const tileContentSets = useMemo(() => [
    // Tile 1: Document
    [
      { label: "Document", content: (
        <div className="text-[11px]">
          <div className="font-medium truncate leading-none">Q3 Strategy Draft…</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip>Entity: Company</MiniChip>
            <MiniChip>Topic: Strategy</MiniChip>
          </div>
        </div>
      ) },
      { label: "Document", content: (
        <div className="text-[11px]">
          <div className="font-medium truncate leading-none">Product Roadmap v2…</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip>Entity: Product</MiniChip>
            <MiniChip>Topic: Planning</MiniChip>
          </div>
        </div>
      ) },
      { label: "Document", content: (
        <div className="text-[11px]">
          <div className="font-medium truncate leading-none">Budget Analysis 2024…</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip>Entity: Finance</MiniChip>
            <MiniChip>Topic: Budget</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 2: Email
    [
      { label: "Email", content: (
        <div className="text-[11px]">
          <div className="truncate leading-none">Renewal terms follow-up</div>
          <div className="mt-1">
            <MiniChip>Yesterday</MiniChip>
          </div>
        </div>
      ) },
      { label: "Email", content: (
        <div className="text-[11px]">
          <div className="truncate leading-none">Meeting agenda for Q4</div>
          <div className="mt-1">
            <MiniChip>Today</MiniChip>
          </div>
        </div>
      ) },
      { label: "Email", content: (
        <div className="text-[11px]">
          <div className="truncate leading-none">Project status update</div>
          <div className="mt-1">
            <MiniChip>2 hours ago</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 3: Meeting Notes
    [
      { label: "Meeting Notes", content: (
        <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-1">
          <li className="truncate">Discuss milestones and owners…</li>
          <li className="truncate">Identify risks and mitigations…</li>
        </ul>
      ) },
      { label: "Meeting Notes", content: (
        <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-1">
          <li className="truncate">Review Q3 performance metrics…</li>
          <li className="truncate">Plan Q4 initiatives…</li>
        </ul>
      ) },
      { label: "Meeting Notes", content: (
        <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-1">
          <li className="truncate">Budget allocation decisions…</li>
          <li className="truncate">Resource planning updates…</li>
        </ul>
      ) }
    ],
    // Tile 4: Metric
    [
      { label: "Metric", content: (
        <div className="text-[11px]">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">ARR —</span>
            <span className="font-mono">12.4M</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">source: Finance</div>
        </div>
      ) },
      { label: "Metric", content: (
        <div className="text-[11px]">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">MRR —</span>
            <span className="font-mono">1.2M</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">source: Sales</div>
        </div>
      ) },
      { label: "Metric", content: (
        <div className="text-[11px]">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">Churn —</span>
            <span className="font-mono">2.1%</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">source: Analytics</div>
        </div>
      ) }
    ],
    // Tile 5: Task
    [
      { label: "Task", content: (
        <div className="text-[11px]">
          <div className="truncate">Prepare renewal brief</div>
          <div className="mt-1">
            <MiniChip>Open</MiniChip>
          </div>
        </div>
      ) },
      { label: "Task", content: (
        <div className="text-[11px]">
          <div className="truncate">Review contract terms</div>
          <div className="mt-1">
            <MiniChip>In Progress</MiniChip>
          </div>
        </div>
      ) },
      { label: "Task", content: (
        <div className="text-[11px]">
          <div className="truncate">Update project timeline</div>
          <div className="mt-1">
            <MiniChip>Pending</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 6: Ticket
    [
      { label: "Ticket", content: (
        <div className="text-[11px]">
          <div className="truncate">Access request pending</div>
          <div className="mt-1">
            <MiniChip>IT</MiniChip>
          </div>
        </div>
      ) },
      { label: "Ticket", content: (
        <div className="text-[11px]">
          <div className="truncate">Feature request: API limits</div>
          <div className="mt-1">
            <MiniChip>Engineering</MiniChip>
          </div>
        </div>
      ) },
      { label: "Ticket", content: (
        <div className="text-[11px]">
          <div className="truncate">Bug report: Login issue</div>
          <div className="mt-1">
            <MiniChip>Support</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 7: Contract
    [
      { label: "Contract", content: (
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
      { label: "Contract", content: (
        <div className="text-[11px]">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">Vendor</span>
            <span className="truncate">TechCorp Ltd.</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">Renewal Date</span>
            <span>Dec 20</span>
          </div>
        </div>
      ) },
      { label: "Contract", content: (
        <div className="text-[11px]">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">Vendor</span>
            <span className="truncate">DataFlow Systems</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">Renewal Date</span>
            <span>Jan 8</span>
          </div>
        </div>
      ) }
    ],
    // Tile 8: Call Transcript
    [
      { label: "Call Transcript", content: (
        <div className="truncate text-[11px]">Key risks discussed…</div>
      ) },
      { label: "Call Transcript", content: (
        <div className="truncate text-[11px]">Budget approval process…</div>
      ) },
      { label: "Call Transcript", content: (
        <div className="truncate text-[11px]">Timeline adjustments made…</div>
      ) }
    ],
    // Tile 9: FAQ
    [
      { label: "FAQ", content: (
        <div className="text-[11px]">
          <div className="truncate">What's the policy on…</div>
          <div className="mt-1">
            <MiniChip>Policy</MiniChip>
          </div>
        </div>
      ) },
      { label: "FAQ", content: (
        <div className="text-[11px]">
          <div className="truncate">How to request access…</div>
          <div className="mt-1">
            <MiniChip>Access</MiniChip>
          </div>
        </div>
      ) },
      { label: "FAQ", content: (
        <div className="text-[11px]">
          <div className="truncate">Billing cycle information…</div>
          <div className="mt-1">
            <MiniChip>Billing</MiniChip>
          </div>
        </div>
      ) }
    ]
  ], []);

  // Get current tiles based on card states
  const tiles: TileSpec[] = useMemo(() => 
    tileContentSets.map((contentSet, index) => ({
      id: index + 1,
      ...contentSet[cardStates[index]]
    })), [tileContentSets, cardStates]
  );

  // Auto-cycle through different card content
  useEffect(() => {
    if (reduced) return;
    
    const changeIndividualCard = (cardIndex: number) => {
      setCardStates(prev => {
        const newStates = [...prev];
        newStates[cardIndex] = (newStates[cardIndex] + 1) % tileContentSets[cardIndex].length;
        return newStates;
      });
    };

    const scheduleCardChanges = () => {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Schedule each card to change at different times
      for (let i = 0; i < 9; i++) {
        const delay = 2000 + (i * 1000) + Math.random() * 1000; // 2-3 seconds + random offset
        const timeout = setTimeout(() => {
          changeIndividualCard(i);
        }, delay);
        timeouts.push(timeout);
      }
      
      return timeouts;
    };

    const scheduleContinuousChanges = () => {
      const timeouts = scheduleCardChanges();
      
      // Schedule the next round
      const nextRoundTimeout = setTimeout(() => {
        scheduleContinuousChanges();
      }, 15000); // 15 seconds for full cycle
      
      return [...timeouts, nextRoundTimeout];
    };

    const allTimeouts = scheduleContinuousChanges();
    
    return () => {
      allTimeouts.forEach(clearTimeout);
    };
  }, [reduced, tileContentSets]);


  // Grid math within 600x360 canvas with 12px outer padding:
  // 3 cols, 3 rows, gaps 12px → flexible tile width to fill container
  const outer = 12;
  const gap = 12;
  const availableWidth = 600 - (outer * 2) - (gap * 2); // 600 - 24 - 24 = 552
  const tileWidth = availableWidth / 3; // 184px per tile
  const tileHeight = 90;

  function tilePosition(idx: number) {
    const r = Math.floor((idx - 1) / 3);
    const c = (idx - 1) % 3;
    const x = outer + c * (tileWidth + gap);
    const y = outer + 40 + r * (tileHeight + gap);
    return { x, y };
  }


  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }} />


      {/* Tiles */}
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 40 }}>
        {tiles.map((t, idx) => {
          const { x, y } = tilePosition(t.id);
          const delay = reduced ? 0 : idx * 0.06; // 60ms per tile
          return (
            <motion.div
              key={t.id} // Use only tile ID as key, not the content state
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay }}
              className="absolute rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80"
              style={{ width: tileWidth, height: tileHeight, left: x, top: y }}
              role="group"
              aria-label={`${t.label} tile`}
            >
              <CardBody className="p-2 gap-1 h-full">
                <div className="text-xs text-muted-foreground truncate leading-none">{t.label}</div>
                <motion.div 
                  key={`${t.id}-content-${cardStates[idx]}`} // Use content-specific key for content animation
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="min-h-0 mt-1"
                >
                  {t.content}
                </motion.div>
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


