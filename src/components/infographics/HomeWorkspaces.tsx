"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Canvas, SectionTitle, MiniChip, GhostIcon, CardBody } from "@/components/infographics/primitives";
import { toast } from "sonner";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motion } from "framer-motion";

type CardItem = { id: string; title: string; chips: string[]; excerpt: string };

export default function HomeWorkspaces({ className }: { className?: string }) {
  const outer = 12;
  const gutter = 12;

  const initialCols = useMemo(() => ({
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
    ],
  }), []);

  const [columns, setColumns] = useState(initialCols);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<keyof typeof initialCols | null>(null);
  const [cardStates, setCardStates] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]); // Track which content set each card is showing
  const reduced = usePrefersReducedMotion();

  const colOrder: (keyof typeof initialCols)[] = ["inbox", "progress", "done"];
  const colTitles: Record<string, string> = { inbox: "Inbox", progress: "In Progress", done: "Done" };

  // Dynamic content sets (9 different sets)
  const contentSets = [
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
      ],
    },
    // Set 2: Client Management
    {
      inbox: [
        { id: "c1", title: "Client Onboard", chips: ["Entity: Client", "Process"], excerpt: "Last note: setup pending…" },
        { id: "c2", title: "Feedback Review", chips: ["Survey", "Analysis"], excerpt: "Last note: compiling data…" },
        { id: "c3", title: "Meeting Prep", chips: ["Agenda", "Notes"], excerpt: "Last note: draft ready…" },
      ],
      progress: [
        { id: "c4", title: "Proposal Draft", chips: ["Entity: Proposal", "Template"], excerpt: "Last note: review needed…" },
        { id: "c5", title: "Demo Script", chips: ["Presentation", "Flow"], excerpt: "Last note: practice run…" },
        { id: "c6", title: "Follow-up Plan", chips: ["Schedule", "Tasks"], excerpt: "Last note: timeline set…" },
      ],
      done: [
        { id: "c7", title: "Welcome Email", chips: ["Template", "Sent"], excerpt: "Last note: delivered…" },
        { id: "c8", title: "Account Setup", chips: ["Access", "Config"], excerpt: "Last note: completed…" },
        { id: "c9", title: "Initial Call", chips: ["Meeting", "Notes"], excerpt: "Last note: recorded…" },
      ],
    },
    // Set 3: Development & DevOps
    {
      inbox: [
        { id: "c1", title: "Feature Request", chips: ["Entity: Feature", "Spec"], excerpt: "Last note: requirements…" },
        { id: "c2", title: "Bug Report", chips: ["Issue", "Priority"], excerpt: "Last note: triage needed…" },
        { id: "c3", title: "Code Review", chips: ["PR", "Comments"], excerpt: "Last note: feedback ready…" },
      ],
      progress: [
        { id: "c4", title: "API Design", chips: ["Entity: API", "Docs"], excerpt: "Last note: schema draft…" },
        { id: "c5", title: "Test Suite", chips: ["Unit", "Integration"], excerpt: "Last note: coverage 85%…" },
        { id: "c6", title: "Deploy Plan", chips: ["Staging", "Prod"], excerpt: "Last note: pipeline ready…" },
      ],
      done: [
        { id: "c7", title: "Version Release", chips: ["Tag", "Notes"], excerpt: "Last note: deployed…" },
        { id: "c8", title: "Documentation", chips: ["API", "Guide"], excerpt: "Last note: published…" },
        { id: "c9", title: "Performance Test", chips: ["Load", "Results"], excerpt: "Last note: passed…" },
      ],
    },
    // Set 4: Compliance & Security
    {
      inbox: [
        { id: "c1", title: "Audit Request", chips: ["Entity: Audit", "Scope"], excerpt: "Last note: planning phase…" },
        { id: "c2", title: "Policy Update", chips: ["Security", "Review"], excerpt: "Last note: draft ready…" },
        { id: "c3", title: "Risk Assessment", chips: ["Threat", "Analysis"], excerpt: "Last note: evaluation…" },
      ],
      progress: [
        { id: "c4", title: "Compliance Check", chips: ["Entity: Standard", "ISO"], excerpt: "Last note: gap analysis…" },
        { id: "c5", title: "Security Scan", chips: ["Vulnerability", "Report"], excerpt: "Last note: scan running…" },
        { id: "c6", title: "Access Review", chips: ["Permissions", "Users"], excerpt: "Last note: review in progress…" },
      ],
      done: [
        { id: "c7", title: "Audit Report", chips: ["Findings", "Recommendations"], excerpt: "Last note: submitted…" },
        { id: "c8", title: "Policy Approved", chips: ["Version", "Effective"], excerpt: "Last note: published…" },
        { id: "c9", title: "Training Complete", chips: ["Security", "Certification"], excerpt: "Last note: certified…" },
      ],
    },
    // Set 5: Data & Analytics
    {
      inbox: [
        { id: "c1", title: "Data Pipeline", chips: ["Entity: Pipeline", "ETL"], excerpt: "Last note: design phase…" },
        { id: "c2", title: "Report Request", chips: ["Dashboard", "Metrics"], excerpt: "Last note: requirements…" },
        { id: "c3", title: "Model Training", chips: ["ML", "Dataset"], excerpt: "Last note: data prep…" },
      ],
      progress: [
        { id: "c4", title: "Data Cleanup", chips: ["Entity: Dataset", "Quality"], excerpt: "Last note: validation…" },
        { id: "c5", title: "Analytics Dashboard", chips: ["Visualization", "KPIs"], excerpt: "Last note: building…" },
        { id: "c6", title: "Insight Generation", chips: ["Patterns", "Trends"], excerpt: "Last note: analyzing…" },
      ],
      done: [
        { id: "c7", title: "Data Export", chips: ["CSV", "API"], excerpt: "Last note: delivered…" },
        { id: "c8", title: "Report Published", chips: ["PDF", "Share"], excerpt: "Last note: distributed…" },
        { id: "c9", title: "Model Deployed", chips: ["Prediction", "API"], excerpt: "Last note: live…" },
      ],
    },
    // Set 6: Marketing & Sales
    {
      inbox: [
        { id: "c1", title: "Campaign Brief", chips: ["Entity: Campaign", "Target"], excerpt: "Last note: strategy draft…" },
        { id: "c2", title: "Lead Qualification", chips: ["Prospect", "Score"], excerpt: "Last note: scoring model…" },
        { id: "c3", title: "Content Calendar", chips: ["Blog", "Social"], excerpt: "Last note: schedule ready…" },
      ],
      progress: [
        { id: "c4", title: "Sales Deck", chips: ["Entity: Presentation", "Pitch"], excerpt: "Last note: slides ready…" },
        { id: "c5", title: "Email Campaign", chips: ["Template", "List"], excerpt: "Last note: A/B testing…" },
        { id: "c6", title: "Webinar Setup", chips: ["Platform", "Content"], excerpt: "Last note: tech check…" },
      ],
      done: [
        { id: "c7", title: "Campaign Launch", chips: ["Go-live", "Monitor"], excerpt: "Last note: launched…" },
        { id: "c8", title: "Lead Nurture", chips: ["Follow-up", "Convert"], excerpt: "Last note: sequence active…" },
        { id: "c9", title: "ROI Analysis", chips: ["Metrics", "Report"], excerpt: "Last note: calculated…" },
      ],
    },
    // Set 7: Finance & Operations
    {
      inbox: [
        { id: "c1", title: "Budget Review", chips: ["Entity: Budget", "Q4"], excerpt: "Last note: variance analysis…" },
        { id: "c2", title: "Invoice Processing", chips: ["Payment", "Approval"], excerpt: "Last note: pending review…" },
        { id: "c3", title: "Expense Report", chips: ["Reimbursement", "Receipts"], excerpt: "Last note: submitted…" },
      ],
      progress: [
        { id: "c4", title: "Financial Forecast", chips: ["Entity: Projection", "Model"], excerpt: "Last note: updating…" },
        { id: "c5", title: "Vendor Payment", chips: ["Invoice", "Process"], excerpt: "Last note: processing…" },
        { id: "c6", title: "Cost Analysis", chips: ["Breakdown", "Optimization"], excerpt: "Last note: calculating…" },
      ],
      done: [
        { id: "c7", title: "Monthly Close", chips: ["Books", "Reconciliation"], excerpt: "Last note: completed…" },
        { id: "c8", title: "Tax Preparation", chips: ["Filing", "Documents"], excerpt: "Last note: filed…" },
        { id: "c9", title: "Audit Support", chips: ["Records", "Compliance"], excerpt: "Last note: provided…" },
      ],
    },
    // Set 8: HR & People
    {
      inbox: [
        { id: "c1", title: "Recruitment Plan", chips: ["Entity: Role", "Pipeline"], excerpt: "Last note: job posting…" },
        { id: "c2", title: "Performance Review", chips: ["Employee", "Goals"], excerpt: "Last note: feedback ready…" },
        { id: "c3", title: "Training Program", chips: ["Skills", "Development"], excerpt: "Last note: curriculum…" },
      ],
      progress: [
        { id: "c4", title: "Onboarding Flow", chips: ["Entity: New Hire", "Process"], excerpt: "Last note: checklist…" },
        { id: "c5", title: "Team Building", chips: ["Event", "Planning"], excerpt: "Last note: venue booked…" },
        { id: "c6", title: "Policy Update", chips: ["Handbook", "Review"], excerpt: "Last note: legal review…" },
      ],
      done: [
        { id: "c7", title: "New Hire Welcome", chips: ["Orientation", "Setup"], excerpt: "Last note: completed…" },
        { id: "c8", title: "Review Completed", chips: ["Feedback", "Goals"], excerpt: "Last note: documented…" },
        { id: "c9", title: "Training Delivered", chips: ["Session", "Certification"], excerpt: "Last note: completed…" },
      ],
    },
    // Set 9: Product & Innovation
    {
      inbox: [
        { id: "c1", title: "Product Roadmap", chips: ["Entity: Feature", "Timeline"], excerpt: "Last note: planning phase…" },
        { id: "c2", title: "User Research", chips: ["Interview", "Insights"], excerpt: "Last note: analysis ready…" },
        { id: "c3", title: "Competitive Analysis", chips: ["Market", "Positioning"], excerpt: "Last note: research done…" },
      ],
      progress: [
        { id: "c4", title: "Prototype Design", chips: ["Entity: Mockup", "UX"], excerpt: "Last note: wireframes…" },
        { id: "c5", title: "User Testing", chips: ["Beta", "Feedback"], excerpt: "Last note: sessions scheduled…" },
        { id: "c6", title: "Feature Spec", chips: ["Requirements", "Acceptance"], excerpt: "Last note: draft ready…" },
      ],
      done: [
        { id: "c7", title: "MVP Launch", chips: ["Release", "Metrics"], excerpt: "Last note: deployed…" },
        { id: "c8", title: "User Feedback", chips: ["Survey", "Analysis"], excerpt: "Last note: compiled…" },
        { id: "c9", title: "Iteration Plan", chips: ["Improvements", "Next"], excerpt: "Last note: prioritized…" },
      ],
    },
  ];

  // Individual card animation logic
  useEffect(() => {
    if (reduced) return;
    
    const changeIndividualCard = (cardIndex: number) => {
      setCardStates(prev => {
        const newStates = [...prev];
        newStates[cardIndex] = (newStates[cardIndex] + 1) % contentSets.length;
        return newStates;
      });
      
      // Update the columns with the new card content
      setColumns(prev => {
        const newColumns = { ...prev };
        const allCards = [...prev.inbox, ...prev.progress, ...prev.done];
        const cardToUpdate = allCards[cardIndex];
        
        if (cardToUpdate) {
          // Use the updated card state to get the new content set
          const newContentSetIndex = (cardStates[cardIndex] + 1) % contentSets.length;
          const newContentSet = contentSets[newContentSetIndex];
          
          // Determine which column and position this card is in
          let newCard;
          if (cardIndex < 3) {
            // Inbox cards (0, 1, 2)
            newCard = newContentSet.inbox[cardIndex];
          } else if (cardIndex < 6) {
            // Progress cards (3, 4, 5)
            newCard = newContentSet.progress[cardIndex - 3];
          } else {
            // Done cards (6, 7, 8)
            newCard = newContentSet.done[cardIndex - 6];
          }
          
          if (newCard) {
            // Find which column the card is in and update it
            if (prev.inbox.includes(cardToUpdate)) {
              const cardIndexInColumn = prev.inbox.findIndex(c => c.id === cardToUpdate.id);
              newColumns.inbox[cardIndexInColumn] = { ...newCard, id: cardToUpdate.id };
            } else if (prev.progress.includes(cardToUpdate)) {
              const cardIndexInColumn = prev.progress.findIndex(c => c.id === cardToUpdate.id);
              newColumns.progress[cardIndexInColumn] = { ...newCard, id: cardToUpdate.id };
            } else if (prev.done.includes(cardToUpdate)) {
              const cardIndexInColumn = prev.done.findIndex(c => c.id === cardToUpdate.id);
              newColumns.done[cardIndexInColumn] = { ...newCard, id: cardToUpdate.id };
            }
          }
        }
        
        return newColumns;
      });
    };
    
    const getRandomInterval = () => Math.random() * 2000 + 2000; // 2-4 seconds
    
    const scheduleCardChanges = () => {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Schedule each card to change at different times with more variation
      for (let i = 0; i < 9; i++) {
        // Add some randomness to the timing to prevent all cards from changing in sync
        const baseDelay = 2000 + (i * 1500); // Start at 2s, then every 1.5s
        const randomOffset = Math.random() * 1000; // Add 0-1s random offset
        const delay = baseDelay + randomOffset;
        
        const timeout = setTimeout(() => {
          changeIndividualCard(i);
        }, delay);
        timeouts.push(timeout);
      }
      
      return timeouts;
    };
    
    // Create a recursive function to continuously schedule card changes
    let allTimeouts: NodeJS.Timeout[] = [];
    
    const scheduleContinuousChanges = () => {
      // Clear any existing timeouts
      allTimeouts.forEach(clearTimeout);
      allTimeouts = [];
      
      // Schedule new card changes
      const timeouts = scheduleCardChanges();
      allTimeouts.push(...timeouts);
      
      // Schedule the next round of changes
      const nextRoundTimeout = setTimeout(() => {
        scheduleContinuousChanges();
      }, 18000); // Schedule next round after 18 seconds
      allTimeouts.push(nextRoundTimeout);
    };
    
    // Initial delay before starting changes
    const initialTimeout = setTimeout(() => {
      scheduleContinuousChanges();
    }, 2000);
    allTimeouts.push(initialTimeout);
    
    return () => {
      allTimeouts.forEach(clearTimeout);
    };
  }, [reduced]);

  function onDragStart(cardId: string) {
    setDraggingId(cardId);
  }
  function onDragEnd() {
    setDraggingId(null);
    setDragOverCol(null);
  }
  function onDrop(target: keyof typeof initialCols) {
    if (!draggingId) return;
    // simple move: remove from any column and add to target top
    const next = { inbox: [...columns.inbox], progress: [...columns.progress], done: [...columns.done] };
    let moved: CardItem | null = null;
    (Object.keys(next) as (keyof typeof next)[]).forEach((k) => {
      const idx = next[k].findIndex((c) => c.id === draggingId);
      if (idx >= 0) {
        moved = next[k].splice(idx, 1)[0];
      }
    });
    if (moved) {
      next[target].unshift(moved);
      setColumns(next);
      toast.success("Context linked (+1)");
    }
    onDragEnd();
  }

  return (
    <Canvas className={className} aspectW={600} aspectH={360} maxWidth={600}>
      <div className="absolute inset-0" style={{ padding: outer, paddingTop: outer + 27 }} />

      {/* Board */}
      <div className="absolute" style={{ left: outer, right: outer, top: outer + 27, bottom: outer }}>
        <div className="grid h-full items-start" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: gutter }}>
          {colOrder.map((colKey) => {
            const cards = columns[colKey];
            const glow = dragOverCol === colKey && draggingId != null;
            return (
              <div key={colKey} className="rounded-md border bg-background/50">
                <div className="px-2 py-2 text-xs font-medium text-muted-foreground">{colTitles[colKey]}</div>
                <div
                  className={"h-[calc(100%-28px)] overflow-hidden px-2 pb-2"}
                  onDragOver={(e) => { e.preventDefault(); setDragOverCol(colKey); }}
                  onDragLeave={() => setDragOverCol(null)}
                  onDrop={() => onDrop(colKey)}
                >
                  <div className="space-y-2" style={{ lineHeight: 1.2 }}>
                    {cards.map((c, idx) => {
                      const isRelatedGlow = glow && idx === 0; // soft glow for a related card
                      const cardIndex = colKey === 'inbox' ? idx : colKey === 'progress' ? idx + 3 : idx + 6;
                      return (
                        <motion.div
                          key={`${c.id}-${cardStates[cardIndex]}`}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className={`rounded-md border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80 shrink-0`}
                          style={{ width: 160, height: 85, boxShadow: isRelatedGlow ? "0 0 0 3px hsl(var(--primary)/0.25)" : undefined }}
                          draggable
                          onDragStart={() => onDragStart(c.id)}
                          onDragEnd={onDragEnd}
                          role="button"
                          tabIndex={0}
                          aria-label={`${c.title} card`}
                        >
                          <CardBody className="p-1.5 gap-0.5 justify-between h-full">
                            <div className="text-xs font-medium truncate leading-tight">{c.title}</div>
                            <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                              {c.chips.map((chip, i) => (
                                <MiniChip key={i} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                              ))}
                            </div>
                            <div className="text-[11px] text-muted-foreground truncate leading-tight mt-0">{c.excerpt}</div>
                            <div className="flex items-center gap-2 text-muted-foreground py-0">
                              <GhostIcon className="h-3 w-3" />
                              <GhostIcon className="h-3 w-3" />
                              <GhostIcon className="h-3 w-3" />
                            </div>
                          </CardBody>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Canvas>
  );
}


