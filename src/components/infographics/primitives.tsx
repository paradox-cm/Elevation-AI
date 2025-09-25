"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

type WithClassName = { className?: string };

export function SectionTitle({ title, subtitle, className }: { title: string; subtitle?: string } & WithClassName) {
  return (
    <div className={cn("mb-2", className)}>
      <h3 className="text-sm font-medium leading-none tracking-tight">{title}</h3>
      {subtitle ? (
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function Canvas({ children, className, maxWidth = 600, aspectW = 600, aspectH = 360 }: React.PropsWithChildren<WithClassName & { maxWidth?: number; aspectW?: number; aspectH?: number }>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = Math.min(1, containerWidth / maxWidth);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [maxWidth]);

  // 600×360 default responsive wrapper that scales proportionally when browser becomes narrower
  return (
    <div ref={containerRef} className={cn("w-full mx-auto", className)} style={{ maxWidth }}>
      <div
        className="relative w-full rounded-lg border bg-background dark:bg-transparent overflow-hidden"
        style={{ 
          aspectRatio: `${aspectW} / ${aspectH}`,
          // Scale down proportionally when container is smaller than maxWidth
          transform: `scale(${scale})`,
          transformOrigin: 'center top'
        }}
      >
        {/* macOS-like top menu bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-muted/30 border-b border-border/50 flex items-center px-3 z-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
          </div>
        </div>
        
        {/* Content with top padding to account for menu bar */}
        <div className="relative w-full h-full pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MobileCanvas({ children, className }: React.PropsWithChildren<WithClassName>) {
  // iPhone-style mobile canvas with proper proportions
  return (
    <div className={cn("w-full mx-auto flex justify-center", className)}>
      <div
        className="relative rounded-[2rem] border border-border bg-background dark:bg-transparent overflow-hidden shadow-lg"
        style={{ 
          width: "clamp(240px, 80vw, 360px)",
          height: "clamp(600px, 200vw, 900px)", // Taller iPhone aspect ratio
          maxHeight: "700px" // Increased max height
        }}
      >
        {/* iPhone notch simulation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-b-2xl border-x border-b border-border z-20"></div>
        
        {/* Content fills the entire iPhone screen with notch spacing */}
        <div className="relative w-full h-full pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MiniChip({ children, className }: React.PropsWithChildren<WithClassName>) {
  return (
    <Badge variant="secondary" className={cn("px-1.5 py-0 h-5 text-[10px] font-medium", className)}>
      {children}
    </Badge>
  );
}

export function MetricPill({ label, value, className }: { label: string; value: string } & WithClassName) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs", className)}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

export function NodeLine({ x1, y1, x2, y2, dashed = false, className }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean } & WithClassName) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={cn("stroke-[1.5]", className)}
      stroke="currentColor"
      strokeOpacity={0.35}
      strokeLinecap="round"
      strokeDasharray={dashed ? "4 4" : undefined}
    />
  );
}

export function GhostIcon({ className }: WithClassName) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 text-muted-foreground", className)} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" className="fill-current opacity-20" />
      <path d="M8 10h8M8 14h5" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WithTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top" align="center" className="px-2 py-1 text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { Button };

export function CardBody({ children, className }: React.PropsWithChildren<WithClassName>) {
  return (
    <div className={cn("flex flex-col gap-2 p-2 h-auto min-h-0 overflow-hidden", className)}>
      {children}
    </div>
  );
}


