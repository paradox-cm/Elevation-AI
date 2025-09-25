"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileCanvas, MiniChip } from "@/components/infographics/primitives";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Card = {
  id: string;
  title: string;
  chips: string[];
  excerpt: string;
};

type Columns = {
  inbox: Card[];
  progress: Card[];
  done: Card[];
};

export default function MobileHomeWorkspaces({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [columns, setColumns] = useState<Columns>({
    inbox: [],
    progress: [],
    done: []
  });
  const [cardStates, setCardStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Dynamic content sets - exact same as desktop
  const contentSets = useMemo(() => [
    // Set 1: Business Operations
    {
      inbox: [
        { id: "c1", title: "Renewal Brief", chips: ["Entity: Vendor", "Doc link"], excerpt: "Last note: pending review…" },
        { id: "c2", title: "Pricing Update", chips: ["Entity: Company", "Note"], excerpt: "Last note: awaiting input…" },
        { id: "c3", title: "Q3 Deck", chips: ["Slide", "Doc"], excerpt: "Last note: draft ready…" },
      ],
      progress: [
        { id: "c4", title: "Contract Review", chips: ["Entity: Contract", "Date"], excerpt: "Last note: legal pass…" },
        { id: "c5", title: "Vendor Dossier", chips: ["Company", "Link"], excerpt: "Last note: compile sources…" },
        { id: "c6", title: "Summary Digest", chips: ["Automation", "Flow"], excerpt: "Last note: draft ready…" },
      ],
      done: [
        { id: "c7", title: "Kickoff Notes", chips: ["Meeting", "Doc"], excerpt: "Last note: shared out…" },
        { id: "c8", title: "Task Plan", chips: ["Tasks", "Board"], excerpt: "Last note: scheduled…" },
        { id: "c9", title: "Risk Log", chips: ["Issue", "Tag"], excerpt: "Last note: updated…" },
      ]
    },
    // Set 2: Development
    {
      inbox: [
        { id: "c1", title: "Feature Spec", chips: ["Design", "Doc"], excerpt: "Last note: review…" },
        { id: "c2", title: "Bug Report", chips: ["Issue", "Priority"], excerpt: "Last note: triaged…" },
        { id: "c3", title: "Code Review", chips: ["PR", "Quality"], excerpt: "Last note: approved…" },
      ],
      progress: [
        { id: "c4", title: "Test Results", chips: ["QA", "Flow"], excerpt: "Last note: 45m…" },
        { id: "c5", title: "Deployment", chips: ["Release", "Link"], excerpt: "Last note: 2h…" },
        { id: "c6", title: "Performance", chips: ["Metrics", "Optimize"], excerpt: "Last note: analyzed…" },
      ],
      done: [
        { id: "c7", title: "Sprint Planning", chips: ["Planning", "Tasks"], excerpt: "Last note: completed…" },
        { id: "c8", title: "Retrospective", chips: ["Review", "Improve"], excerpt: "Last note: documented…" },
        { id: "c9", title: "Documentation", chips: ["Docs", "Update"], excerpt: "Last note: published…" },
      ]
    },
    // Set 3: Marketing
    {
      inbox: [
        { id: "c1", title: "Campaign Brief", chips: ["Marketing", "Strategy"], excerpt: "Last note: concept…" },
        { id: "c2", title: "Content Plan", chips: ["Content", "Calendar"], excerpt: "Last note: scheduled…" },
        { id: "c3", title: "Social Media", chips: ["Social", "Engagement"], excerpt: "Last note: posted…" },
      ],
      progress: [
        { id: "c4", title: "Analytics", chips: ["Data", "Insights"], excerpt: "Last note: analyzed…" },
        { id: "c5", title: "A/B Test", chips: ["Test", "Results"], excerpt: "Last note: running…" },
        { id: "c6", title: "SEO Audit", chips: ["SEO", "Optimize"], excerpt: "Last note: reviewed…" },
      ],
      done: [
        { id: "c7", title: "Press Release", chips: ["PR", "Announcement"], excerpt: "Last note: published…" },
        { id: "c8", title: "Event Planning", chips: ["Event", "Logistics"], excerpt: "Last note: confirmed…" },
        { id: "c9", title: "Brand Guidelines", chips: ["Brand", "Standards"], excerpt: "Last note: updated…" },
      ]
    }
  ], []);

  // Initialize columns with first content set
  useEffect(() => {
    setColumns(contentSets[0]);
  }, [contentSets]);

  // Auto-cycle through different content sets
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setColumns(prev => {
        const currentIndex = contentSets.findIndex(set => 
          set.inbox[0].id === prev.inbox[0]?.id
        );
        const nextIndex = (currentIndex + 1) % contentSets.length;
        return contentSets[nextIndex];
      });
    }, 5000); // Change content set every 5 seconds
    
    return () => clearInterval(interval);
  }, [reduced, contentSets]);

  const colOrder: (keyof Columns)[] = ["inbox", "progress", "done"];
  const colTitles: Record<string, string> = { 
    inbox: "Inbox", 
    progress: "In Progress", 
    done: "Done" 
  };

  return (
    <MobileCanvas className={className}>
      <div className="w-full h-full rounded-xl overflow-hidden flex flex-col">
        {/* Outer padding: 16px on all sides */}
        <div className="flex flex-col h-full p-4">
          {/* 1) Header block (compressed) - 48px height, 8px bottom margin */}
          <header className="h-12 mb-2 flex flex-col justify-center">
            <h3 className="text-[15px] font-semibold leading-5 truncate">Workspaces & Canvases</h3>
            <p className="text-[12px] leading-4 opacity-70 truncate">Collaborative workspace management</p>
          </header>

          {/* 2) Section cards - scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto pb-4">
            {colOrder.map((colKey, colIndex) => (
              <motion.div
                key={colKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: colIndex * 0.03 }}
                className="rounded-xl border overflow-hidden mb-3"
              >
                {/* Section header row - 36px height */}
                <div className="h-9 px-3 flex items-center justify-between border-b">
                  <div className="text-[13px] font-medium">{colTitles[colKey]}</div>
                  <div className="h-6 px-2 text-[11px] rounded-full bg-muted text-muted-foreground flex items-center">
                    {columns[colKey].length}
                  </div>
                </div>

                {/* Body padding: pt-2 px-3 pb-3 */}
                <div className="pt-2 px-3 pb-3">
                  {/* Grid: 2 columns, 8px gap */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <AnimatePresence mode="popLayout">
                      {columns[colKey].map((card, cardIndex) => (
                        <motion.div
                          key={card.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.03, delay: cardIndex * 0.03 }}
                          className="w-full min-h-[92px] rounded-xl shadow-sm border bg-background p-2 flex flex-col justify-between gap-1 flex-shrink-0"
                        >
                          {/* Title: single line, truncate */}
                          <div className="text-[13px] font-medium leading-4 truncate">{card.title}</div>
                          
                          {/* Chips row: max 2 visible + overflow */}
                          <div className="flex gap-1">
                            {card.chips.slice(0, 2).map((chip, chipIndex) => (
                              <div key={chipIndex} className="text-[10px] h-[18px] px-1 rounded-full bg-muted text-muted-foreground flex items-center">
                                {chip}
                              </div>
                            ))}
                            {card.chips.length > 2 && (
                              <div className="text-[10px] h-[18px] px-1 rounded-full bg-muted/50 text-muted-foreground flex items-center">
                                +{card.chips.length - 2}
                              </div>
                            )}
                          </div>
                          
                          {/* Excerpt: one line, line-clamp-1 */}
                          <div className="text-[11px] leading-4 opacity-70 line-clamp-1">{card.excerpt}</div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3) Bottom status bar (compact) - 36px height */}
          <div className="h-9 px-3 flex items-center justify-between text-[12px] leading-4 opacity-70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>3 workspaces</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span>Auto-cycling</span>
            </div>
          </div>
        </div>
      </div>
    </MobileCanvas>
  );
}