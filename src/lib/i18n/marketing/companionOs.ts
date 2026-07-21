import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#companionos}. Verbatim. */

const en = {
  hero: {
    title: 'One Intelligence Platform. Unlimited Companions.',
    positioning: 'Companion OS is the intelligence platform powering every Companion.',
    body:
      'Rather than building a different AI for every industry, Axionari built a shared intelligence platform capable of understanding organizations, reasoning across knowledge, coordinating execution, and continuously learning from every interaction.',
    close: ['Every Companion is built on the same foundation.', 'Every industry gains specialized intelligence.'],
  },
  why: {
    title: 'Why Companion OS Exists.',
    beats: [
      'Organizations don’t need another chatbot.',
      'They need intelligence that understands how their business operates.',
    ],
    industries: 'Hospitality. Restaurants. Healthcare. Education. Retail. Airports.',
    body: [
      'Every industry has unique workflows, knowledge, and customer expectations.',
      'Yet they all require the same underlying capabilities.',
    ],
    capabilities: 'Understanding. Reasoning. Memory. Coordination. Execution.',
    coda: 'Companion OS provides that foundation.',
  },
  onePlatform: {
    title: 'One Platform. Industry Intelligence.',
    body: [
      'Companion OS separates universal intelligence from industry expertise.',
      'The platform provides the intelligence. Each Companion provides the specialization.',
    ],
    specializations: [
      'Hotel Companion understands hospitality.',
      'Restaurant Companion understands restaurants.',
      'Future Companions will understand their industries with the same depth.',
    ],
    coda: 'One platform. Unlimited possibilities.',
  },
  /* Capability deep-dives — all eight, in canonical taxonomy order. */
  deepDives: [
    {
      id: 'voice',
      eyebrow: '01 · VOICE INTELLIGENCE',
      title: 'Voice Intelligence.',
      body: [
        'Conversation is the most natural interface between people and organizations.',
        'Companion OS understands natural language, intent, context, and meaning.',
        'Guests simply ask. The platform understands. Reasons. Responds. Learns.',
      ],
      coda: 'Every conversation feels effortless because the technology disappears behind the experience.',
    },
    {
      id: 'knowledge',
      eyebrow: '02 · KNOWLEDGE ARCHITECTURE',
      title: 'Knowledge Architecture.',
      body: [
        'Every organization possesses valuable knowledge.',
        'Policies. Procedures. Services. Products. People. Locations. Experiences. Recommendations.',
        'Companion OS transforms organizational knowledge into a living intelligence layer that remains accurate, searchable, and continuously improving.',
      ],
      coda: 'Knowledge stops living inside documents. It becomes instantly accessible through conversation.',
    },
    {
      id: 'memory',
      eyebrow: '03 · ORGANIZATIONAL MEMORY',
      title: 'Organizational Memory.',
      body: [
        'Great organizations remember.',
        'Companion OS remembers everything that matters.',
        'Past conversations. Guest preferences. Operational patterns. Frequently requested services. Knowledge gaps. Emerging trends. Commercial opportunities.',
      ],
      coda: 'Institutional knowledge grows stronger with every interaction. The platform becomes more valuable over time.',
    },
    {
      id: 'reasoning',
      eyebrow: '04 · REASONING ENGINE',
      title: 'Reasoning Engine.',
      body: [
        'Knowing information isn’t enough.',
        'Organizations need intelligence capable of reasoning.',
        'Understanding context. Recognizing intent. Connecting information. Making recommendations. Prioritizing actions. Coordinating outcomes.',
      ],
      coda: 'Companion OS doesn’t simply retrieve information. It understands how to apply it.',
    },
    {
      id: 'workflow',
      eyebrow: '05 · WORKFLOW ORCHESTRATION',
      title: 'Workflow Orchestration.',
      body: [
        'Conversation should lead directly to execution.',
        'Companion OS transforms requests into coordinated operational workflows.',
      ],
      chain: [
        'Guest request.',
        'Correct department.',
        'Correct information.',
        'Correct action.',
        'Completed experience.',
      ],
      after: ['Every Companion connects conversations with execution.'],
      coda: 'Nothing is lost. Nothing is forgotten. Everything is coordinated.',
    },
    {
      id: 'operational',
      eyebrow: '06 · OPERATIONAL INTELLIGENCE',
      title: 'Operational Intelligence.',
      body: [
        'Every interaction reveals how an organization operates.',
        'Companion OS continuously identifies:',
        'Operational bottlenecks. Emerging trends. Knowledge gaps. Service demand. Department workload. Commercial opportunities. Performance patterns.',
      ],
      coda: 'Leadership gains visibility that traditional systems never capture.',
    },
    {
      id: 'analytics',
      eyebrow: '07 · ENTERPRISE ANALYTICS',
      title: 'Enterprise Analytics.',
      body: [
        'Understanding should reach leadership, not just the front line.',
        'Companion OS turns thousands of everyday conversations into executive intelligence.',
      ],
      items: [
        'Guest behavior.',
        'Revenue opportunities.',
        'Service demand.',
        'Department performance.',
        'Knowledge health.',
        'Emerging trends.',
        'Portfolio comparisons.',
      ],
      after: ['Not another dashboard to monitor.', 'Answers that lead to decisions.'],
      coda: 'Every conversation becomes measurable business intelligence.',
    },
    {
      id: 'learning',
      eyebrow: '08 · CONTINUOUS LEARNING',
      title: 'Continuous Learning.',
      body: [
        'Organizations evolve. Their intelligence should evolve with them.',
        'Every conversation improves recommendations. Every interaction strengthens knowledge. Every request expands understanding. Every outcome makes the platform smarter.',
      ],
      coda: 'Companion OS continuously adapts alongside your organization.',
    },
  ],
  enterprise: {
    title: 'Built for Enterprise.',
    body: [
      'Companion OS is designed to support organizations of every size.',
      'Enterprise security. Role-based governance. Scalable architecture. Multi-location management. Knowledge administration. Operational analytics. Continuous deployment.',
    ],
    coda: 'One platform supporting one location—or thousands.',
  },
  ecosystem: {
    title: 'The Companion Ecosystem.',
    lead: 'Companion OS powers a growing family of industry-specific Companions.',
    today: 'Today: Hotel Companion, Restaurant Companion.',
    tomorrow:
      'Tomorrow: Campus Companion, Hospital Companion, Retail Companion, Airport Companion, Destination Companion.',
    body: 'And every future Companion built on the same intelligence platform.',
    coda: 'One platform. Many industries. Shared intelligence. Specialized expertise.',
  },
  axionari: {
    title: 'Built by Axionari.',
    body: [
      'Axionari builds Enterprise Execution Systems that help organizations understand what is happening, coordinate what comes next, and continuously improve through intelligence.',
      'Companion OS is the intelligence platform behind that vision.',
    ],
    coda: 'Every Companion is an application of the same philosophy: Understanding creates better execution.',
  },
  finalCta: {
    title: 'Intelligence Shouldn’t Be Rebuilt for Every Industry.',
    subtitle: 'It should be shared.',
    body:
      'Companion OS gives every Companion the ability to understand, reason, remember, coordinate, and continuously improve—while each product specializes in the needs of its industry.',
    platform: 'One Intelligence Platform. Unlimited Companions.',
    cta: 'Explore Hotel Companion',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const companionOsCopy: Localized<typeof en> = { en, es }
