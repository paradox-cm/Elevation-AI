// Export all animation components
export { AgenticEngine } from './agentic-engine'
export { EnterpriseSecurity } from './enterprise-security'
export { FutureReady } from './future-ready'
export { IntelligentProcessAutomation } from './intelligent-process-automation'
export { KnowledgeBlocks } from './knowledge-blocks'
export { PersonalCopilot } from './personal-copilot'
export { RealTimeBusinessIntelligence } from './real-time-business-intelligence'
export { UnifiedKnowledge } from './unified-knowledge'
export { WorkspacesCanvases } from './workspaces-canvases'

// Animation configuration types
export interface AnimationProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

// Animation mapping for easy lookup
export const ANIMATION_COMPONENTS = {
  'agentic-engine': 'AgenticEngine',
  'enterprise-security': 'EnterpriseSecurity',
  'future-ready': 'FutureReady',
  'intelligent-process-automation': 'IntelligentProcessAutomation',
  'knowledge-blocks': 'KnowledgeBlocks',
  'personal-copilot': 'PersonalCopilot',
  'real-time-business-intelligence': 'RealTimeBusinessIntelligence',
  'unified-knowledge': 'UnifiedKnowledge',
  'workspaces-canvases': 'WorkspacesCanvases'
} as const

export type AnimationName = keyof typeof ANIMATION_COMPONENTS
