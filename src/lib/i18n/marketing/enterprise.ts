import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#enterprise}. Verbatim. */

const en = {
  hero: {
    title: 'Built for Modern Hospitality Enterprises.',
    positioning: 'Scale exceptional hospitality across every property with confidence.',
    body:
      'Hotel Companion combines enterprise-grade security, centralized governance, operational intelligence, and scalable deployment into a platform designed for hospitality organizations of every size—from independent hotels to global brands.',
  },
  sections: [
    {
      id: 'shared-intel',
      eyebrow: '01 · SHARED INTELLIGENCE',
      title: 'Enterprise Hospitality Starts with Shared Intelligence.',
      body: [
        'Every hotel has unique experiences. Every organization shares the same standards.',
        'Hotel Companion allows you to maintain consistent brand knowledge, service standards, and operational excellence while giving each property the flexibility to reflect its destination, culture, and personality.',
      ],
      coda: 'One platform. Shared intelligence. Local execution.',
    },
    {
      id: 'multi-property',
      eyebrow: '02 · MULTI-PROPERTY',
      title: 'Multi-Property by Design.',
      body: [
        'Manage one hotel or hundreds from a single platform.',
        'Centralize organizational knowledge. Maintain property-specific information. Distribute updates instantly. Share best practices. Standardize service quality. Monitor performance across every location.',
      ],
      coda: 'Each property remains unique. Your operational intelligence becomes shared.',
    },
    {
      id: 'knowledge',
      eyebrow: '03 · KNOWLEDGE MANAGEMENT',
      title: 'Enterprise Knowledge Management.',
      body: [
        'Knowledge is one of your organization’s most valuable assets.',
        'Hotel Companion transforms institutional knowledge into a living intelligence layer that every guest and every employee can access instantly.',
        'Policies. Operating procedures. Brand standards. Service protocols. Amenities. Local recommendations. Frequently asked questions. Internal documentation.',
      ],
      coda: 'Knowledge evolves continuously as your organization grows.',
    },
    {
      id: 'admin',
      eyebrow: '04 · ADMINISTRATION',
      title: 'Centralized Administration.',
      body: [
        'Manage your entire hospitality portfolio from one place.',
        'Properties. Users. Roles. Permissions. Knowledge. Brand voice. Languages. Content. Configurations. Updates.',
      ],
      coda: 'Enterprise administration without operational complexity.',
    },
    {
      id: 'secure',
      eyebrow: '05 · SECURITY',
      title: 'Secure by Design.',
      body: [
        'Enterprise trust begins with security.',
        'Hotel Companion is built with security at every layer.',
        'Role-based access. Encrypted communications. Protected knowledge. Auditability. Secure authentication. Privacy-first architecture.',
      ],
      coda: 'Your data remains your data. Protected. Governed. Controlled.',
    },
    {
      id: 'governance',
      eyebrow: '06 · GOVERNANCE',
      title: 'Governance Without Friction.',
      body: [
        'Maintain consistency while empowering local teams.',
        'Corporate standards. Property autonomy. Approval workflows. Version control. Content governance. Operational oversight.',
      ],
      coda: 'Enterprise organizations gain confidence without sacrificing agility.',
    },
    {
      id: 'operational-intel',
      eyebrow: '07 · OPERATIONAL INTELLIGENCE',
      title: 'Operational Intelligence.',
      body: [
        'Thousands of guest conversations reveal patterns no dashboard has ever captured before.',
        'Hotel Companion continuously surfaces:',
        'Operational bottlenecks. Frequently requested services. Knowledge gaps. Maintenance trends. Peak demand periods. Department workload. Service response times. Emerging guest expectations.',
      ],
      coda: 'Every conversation becomes operational intelligence.',
    },
    {
      id: 'commercial-intel',
      eyebrow: '08 · COMMERCIAL INTELLIGENCE',
      title: 'Commercial Intelligence.',
      body: [
        'Revenue opportunities shouldn’t depend on chance.',
        'Hotel Companion identifies commercial intent across every guest interaction.',
        'Upgrade opportunities. Extended stays. Celebrations. Premium experiences. Spa demand. Dining interest. Transportation needs. Activity bookings.',
      ],
      coda: 'Leadership gains visibility into revenue opportunities that traditionally disappear inside conversations.',
    },
    {
      id: 'dashboards',
      eyebrow: '09 · DASHBOARDS',
      title: 'Executive Dashboards.',
      body: [
        'One view of your entire operation.',
        'Monitor:',
        'Guest conversations. Revenue opportunities. Operational performance. Knowledge health. Department activity. Service trends. Commercial insights. Guest satisfaction drivers. Property comparisons. Portfolio performance.',
      ],
      coda: 'Understand what is happening across your organization—and why.',
    },
    {
      id: 'integrates',
      eyebrow: '10 · INTEGRATION',
      title: 'Integrates Into Your Operation.',
      body: [
        'Hotel Companion is designed to complement your existing hospitality ecosystem.',
        'Rather than replacing your operation, it enhances it.',
        'Connect conversations. Coordinate teams. Expand knowledge. Improve visibility. Accelerate execution.',
      ],
      coda: 'Your technology stack continues working. Your guests simply receive a better experience.',
    },
    {
      id: 'deploy',
      eyebrow: '11 · DEPLOYMENT',
      title: 'Deploy in Days.',
      body: [
        'Enterprise software shouldn’t require months of implementation.',
        'Hotel Companion is designed for rapid deployment.',
        'Quick onboarding. Guided implementation. Minimal training. Immediate value. Scale at your own pace.',
      ],
      coda:
        'Whether deploying a single property or an entire portfolio, your teams can begin delivering value almost immediately.',
    },
    {
      id: 'grow',
      eyebrow: '12 · SCALE',
      title: 'Built to Grow With You.',
      body: [
        'Start with one property. Expand to ten. Scale to hundreds.',
        'Hotel Companion grows alongside your organization without requiring a new platform, a new architecture, or a different operating model.',
      ],
      coda: 'One platform. Unlimited potential.',
    },
  ],
  companionOs: {
    title: 'Powered by Companion OS.',
    lead: 'Every enterprise capability is powered by Companion OS.',
    close: 'One intelligence platform powering every Companion across every industry.',
  },
  finalCta: {
    title: 'Enterprise Hospitality Deserves Enterprise Intelligence.',
    beats: [
      'Deliver consistent service across every property.',
      'Empower every department.',
      'Protect organizational knowledge.',
      'Increase operational visibility.',
      'Turn every guest conversation into measurable business intelligence.',
      'Scale hospitality with confidence.',
    ],
    cta: 'Book a Demo',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const enterpriseCopy: Localized<typeof en> = { en, es }
