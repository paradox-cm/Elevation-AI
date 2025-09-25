"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// NodeLine component for drawing connections
function NodeLine({ x1, y1, x2, y2, dashed = false, className }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean; className?: string }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={`stroke-[1.5] ${className || ""}`}
      stroke="currentColor"
      strokeOpacity={0.35}
      strokeLinecap="round"
      strokeDasharray={dashed ? "4 4" : undefined}
    />
  );
}

interface PartnersNetworkProps {
  className?: string;
  width?: number;
  height?: number;
}

export function PartnersNetwork({ className, width = 800, height = 400 }: PartnersNetworkProps) {
  const reduced = usePrefersReducedMotion();
  const [currentState, setCurrentState] = useState(0);

  // Define network nodes (partner positions)
  const nodes = useMemo(() => [
    { id: 1, x: 100, y: 100, label: "Core Platform" },
    { id: 2, x: 300, y: 80, label: "Consulting Partners" },
    { id: 3, x: 500, y: 120, label: "Technology Partners" },
    { id: 4, x: 200, y: 200, label: "Ambassadors" },
    { id: 5, x: 400, y: 220, label: "Integration Partners" },
    { id: 6, x: 150, y: 300, label: "Regional Partners" },
    { id: 7, x: 350, y: 320, label: "Solution Partners" },
    { id: 8, x: 550, y: 280, label: "Channel Partners" },
    { id: 9, x: 250, y: 350, label: "Strategic Partners" },
  ], []);

  // Define different connection sets for animation
  const connectionSets = useMemo(() => [
    // State 0: Core connections
    [
      { from: 1, to: 2, label: "Platform ↔ Consulting" },
      { from: 1, to: 4, label: "Platform ↔ Ambassadors" },
      { from: 1, to: 5, label: "Platform ↔ Integration" },
      { from: 2, to: 7, label: "Consulting ↔ Solutions" },
    ],
    // State 1: Extended network
    [
      { from: 1, to: 3, label: "Platform ↔ Technology" },
      { from: 2, to: 5, label: "Consulting ↔ Integration" },
      { from: 4, to: 6, label: "Ambassadors ↔ Regional" },
      { from: 3, to: 8, label: "Technology ↔ Channel" },
      { from: 5, to: 9, label: "Integration ↔ Strategic" },
    ],
    // State 2: Full ecosystem
    [
      { from: 1, to: 6, label: "Platform ↔ Regional" },
      { from: 2, to: 8, label: "Consulting ↔ Channel" },
      { from: 3, to: 7, label: "Technology ↔ Solutions" },
      { from: 4, to: 9, label: "Ambassadors ↔ Strategic" },
      { from: 6, to: 7, label: "Regional ↔ Solutions" },
      { from: 8, to: 9, label: "Channel ↔ Strategic" },
    ]
  ], []);

  // Auto-cycle through connection states
  useEffect(() => {
    if (reduced) return;
    
    const interval = setInterval(() => {
      setCurrentState(prev => (prev + 1) % connectionSets.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, [reduced, connectionSets.length]);

  const currentConnections = connectionSets[currentState];

  return (
    <div className={`relative ${className || ""}`} style={{ width, height }}>
      <svg 
        className="absolute inset-0 pointer-events-none" 
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden
      >
        <g className="text-muted-foreground/50">
          <AnimatePresence mode="wait">
            {currentConnections.map((connection, i) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              
              if (!fromNode || !toNode) return null;
              
              return (
                <motion.g 
                  key={`${connection.from}-${connection.to}-${currentState}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                >
                  <NodeLine 
                    x1={fromNode.x} 
                    y1={fromNode.y} 
                    x2={toNode.x} 
                    y2={toNode.y} 
                  />
                  {/* Connection endpoints */}
                  <circle cx={fromNode.x} cy={fromNode.y} r={4} className="fill-current" />
                  <circle cx={toNode.x} cy={toNode.y} r={4} className="fill-current" />
                </motion.g>
              );
            })}
          </AnimatePresence>
        </g>
        
        {/* Static nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={6}
            className="fill-primary/20 stroke-primary/40 stroke-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: node.id * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default PartnersNetwork;
