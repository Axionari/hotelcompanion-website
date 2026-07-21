/**
 * Canonical Companion OS capability taxonomy (build brief §8).
 * The 8 capabilities appear identically on Home, Platform, Enterprise,
 * Solutions and Companion OS. This const is the ONLY source of truth —
 * rendering a different set or order anywhere is a bug.
 */
export const COMPANION_OS_CAPABILITIES = [
  { id: 'voice', name: 'Voice Intelligence' },
  { id: 'knowledge', name: 'Knowledge Architecture' },
  { id: 'memory', name: 'Organizational Memory' },
  { id: 'reasoning', name: 'Reasoning Engine' },
  { id: 'workflow', name: 'Workflow Orchestration' },
  { id: 'operational', name: 'Operational Intelligence' },
  { id: 'analytics', name: 'Enterprise Analytics' },
  { id: 'learning', name: 'Continuous Learning' },
] as const

export type CompanionOsCapability = (typeof COMPANION_OS_CAPABILITIES)[number]
