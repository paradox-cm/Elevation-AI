"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TileSpec = {
  id: number;
  label: string;
  content: React.ReactNode;
};

export default function MobileHomeKnowledgeBlocks({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [cardStates, setCardStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Multiple content sets for each tile - exact same as desktop
  const tileContentSets = useMemo(() => [
    // Tile 1: Document
    [
      { label: "Document", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Q3 Strategy Draft…</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Entity: Company</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Topic: Strategy</MiniChip>
          </div>
        </div>
      ) },
      { label: "Document", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Product Roadmap v2…</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Entity: Product</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Topic: Planning</MiniChip>
          </div>
        </div>
      ) },
      { label: "Document", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Budget Analysis 2024…</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Entity: Finance</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Topic: Budget</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 2: Email
    [
      { label: "Email", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Renewal terms follow-up</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">From: Vendor</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Priority: High</MiniChip>
          </div>
        </div>
      ) },
      { label: "Email", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Meeting notes from client</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">From: Client</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Priority: Medium</MiniChip>
          </div>
        </div>
      ) },
      { label: "Email", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Weekly team update</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">From: Team</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Priority: Low</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 3: Meeting
    [
      { label: "Meeting", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Q3 Planning Session</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Duration: 2h</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Attendees: 8</MiniChip>
          </div>
        </div>
      ) },
      { label: "Meeting", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Client Review Call</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Duration: 1h</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Attendees: 4</MiniChip>
          </div>
        </div>
      ) },
      { label: "Meeting", content: (
        <div className="text-xs">
          <div className="font-medium truncate leading-none">Team Standup</div>
          <div className="mt-1 flex flex-col gap-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Duration: 30m</MiniChip>
            <MiniChip className="h-4 px-1.5 text-[10px]">Attendees: 12</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 4: Metric
    [
      { label: "Metric", content: (
        <div className="text-xs">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">ARR —</span>
            <span className="font-mono">12.4M</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">source: Finance</div>
        </div>
      ) },
      { label: "Metric", content: (
        <div className="text-xs">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">MRR —</span>
            <span className="font-mono">1.2M</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">source: Sales</div>
        </div>
      ) },
      { label: "Metric", content: (
        <div className="text-xs">
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
        <div className="text-xs">
          <div className="truncate">Prepare renewal brief</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Open</MiniChip>
          </div>
        </div>
      ) },
      { label: "Task", content: (
        <div className="text-xs">
          <div className="truncate">Review contract terms</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">In Progress</MiniChip>
          </div>
        </div>
      ) },
      { label: "Task", content: (
        <div className="text-xs">
          <div className="truncate">Update project timeline</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Pending</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 6: Ticket
    [
      { label: "Ticket", content: (
        <div className="text-xs">
          <div className="truncate">Access request pending</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Open</MiniChip>
          </div>
        </div>
      ) },
      { label: "Ticket", content: (
        <div className="text-xs">
          <div className="truncate">Bug report: Login issue</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">In Progress</MiniChip>
          </div>
        </div>
      ) },
      { label: "Ticket", content: (
        <div className="text-xs">
          <div className="truncate">Feature request: Export</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Under Review</MiniChip>
          </div>
        </div>
      ) }
    ],
    // Tile 7: Contract
    [
      { label: "Contract", content: (
        <div className="text-xs">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-muted-foreground">Vendor</span>
            <span className="truncate">TechCorp Inc</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">Renewal Date</span>
            <span>Dec 20</span>
          </div>
        </div>
      ) },
      { label: "Contract", content: (
        <div className="text-xs">
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
        <div className="truncate text-xs">Key risks discussed…</div>
      ) },
      { label: "Call Transcript", content: (
        <div className="truncate text-xs">Budget approval process…</div>
      ) },
      { label: "Call Transcript", content: (
        <div className="truncate text-xs">Timeline adjustments made…</div>
      ) }
    ],
    // Tile 9: FAQ
    [
      { label: "FAQ", content: (
        <div className="text-xs">
          <div className="truncate">What's the policy on…</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Policy</MiniChip>
          </div>
        </div>
      ) },
      { label: "FAQ", content: (
        <div className="text-xs">
          <div className="truncate">How to request access…</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Access</MiniChip>
          </div>
        </div>
      ) },
      { label: "FAQ", content: (
        <div className="text-xs">
          <div className="truncate">Billing cycle information…</div>
          <div className="mt-1">
            <MiniChip className="h-4 px-1.5 text-[10px]">Billing</MiniChip>
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

  // Auto-cycle through different card content - exact same logic as desktop
  useEffect(() => {
    if (reduced) return;
    
    let currentCardIndex = 0;
    let timeoutId: NodeJS.Timeout;
    
    const changeNextCard = () => {
      setCardStates(prev => {
        const newStates = [...prev];
        newStates[currentCardIndex] = (newStates[currentCardIndex] + 1) % tileContentSets[currentCardIndex].length;
        return newStates;
      });
      
      // Move to next card
      currentCardIndex = (currentCardIndex + 1) % 9;
      
      // Schedule next change
      timeoutId = setTimeout(changeNextCard, 1500); // 1.5 seconds between each card change
    };
    
    // Start the cycle
    timeoutId = setTimeout(changeNextCard, 1500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [reduced, tileContentSets]);

  return (
    <MobileCanvas className={className}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-sm font-semibold leading-none">Knowledge Blocks</h3>
          <p className="text-[11px] text-muted-foreground leading-none mt-2">Unified knowledge sources</p>
        </div>

        {/* Knowledge Sources Grid - 2 columns for mobile */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((tile, index) => (
              <motion.div
                key={tile.id} // Use only tile ID as key, not the content state
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-md border bg-card text-card-foreground shadow-sm p-3 transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-muted-foreground">{tile.label}</div>
                  <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                </div>
                <motion.div
                  key={`${tile.id}-content-${cardStates[index]}`} // Use content-specific key for content animation
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {tile.content}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex-shrink-0 mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>9 sources connected</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Auto-refresh</span>
              <div className="w-1 h-1 rounded-full bg-muted-foreground animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </MobileCanvas>
  );
}