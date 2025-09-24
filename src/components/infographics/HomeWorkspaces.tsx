"use client";
import React, { useMemo, useState } from "react";
import { Canvas, SectionTitle, MiniChip, GhostIcon, CardBody } from "@/components/infographics/primitives";
import { toast } from "sonner";

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

  const colOrder: (keyof typeof initialCols)[] = ["inbox", "progress", "done"];
  const colTitles: Record<string, string> = { inbox: "Inbox", progress: "In Progress", done: "Done" };

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
      <div className="absolute inset-0" style={{ padding: outer }} />

      {/* Board */}
      <div className="absolute" style={{ left: outer, right: outer, top: outer, bottom: outer }}>
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
                      return (
                        <div
                          key={c.id}
                          className={`rounded-md border bg-card text-card-foreground shadow-sm transition-shadow shrink-0`}
                          style={{ width: 160, height: 80, boxShadow: isRelatedGlow ? "0 0 0 3px hsl(var(--primary)/0.25)" : undefined }}
                          draggable
                          onDragStart={() => onDragStart(c.id)}
                          onDragEnd={onDragEnd}
                          role="button"
                          tabIndex={0}
                          aria-label={`${c.title} card`}
                        >
                          <CardBody className="p-2 gap-1 justify-between h-full">
                            <div className="text-xs font-medium truncate leading-none">{c.title}</div>
                            <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                              {c.chips.map((chip, i) => (
                                <MiniChip key={i} className="h-5 px-1 text-[10px]">{chip}</MiniChip>
                              ))}
                            </div>
                            <div className="text-[11px] text-muted-foreground truncate">{c.excerpt}</div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <GhostIcon className="h-3 w-3" />
                              <GhostIcon className="h-3 w-3" />
                              <GhostIcon className="h-3 w-3" />
                            </div>
                          </CardBody>
                        </div>
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


