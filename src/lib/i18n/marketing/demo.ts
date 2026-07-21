import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#demo}. Verbatim. */

const en = {
  hero: {
    title: 'Book a Personalized Demonstration',
    body1:
      'Discover how Hotel Companion helps hotels understand every guest, increase revenue, and coordinate operations through conversational intelligence.',
    body2:
      'This isn’t a product tour. It’s a working session tailored to your hotel, your guests, and your operational goals.',
    body3:
      'We’ll show you how every guest conversation becomes intelligence—and how that intelligence improves guest experiences, operational efficiency, and commercial performance.',
    cta: 'Schedule Your Demonstration',
  },
  experience: {
    title: 'What You’ll Experience',
    lead: 'Every demonstration is personalized, but typically includes:',
    items: [
      {
        id: 'voice-first',
        title: 'Voice-First Hospitality',
        body: 'See how guests naturally interact with Hotel Companion through conversation. Ask questions. Request services. Book experiences. Receive personalized recommendations. No menus. No searching. Just hospitality.',
      },
      {
        id: 'guest-intelligence',
        title: 'Guest Intelligence',
        body: 'Discover how every guest interaction becomes organizational intelligence. Identify trends. Understand guest intent. Recognize revenue opportunities. Surface operational insights. Transform conversations into measurable business value.',
      },
      {
        id: 'operational-coordination',
        title: 'Operational Coordination',
        body: 'Watch how guest requests become coordinated execution across multiple departments. Housekeeping. Maintenance. Food & Beverage. Spa. Transportation. Front Desk. Guest Services. Every request reaches the right team automatically.',
      },
      {
        id: 'revenue-intelligence',
        title: 'Revenue Intelligence',
        body: 'See how Hotel Companion identifies opportunities naturally through conversation. Room upgrades. Late checkout. Dining reservations. Spa treatments. Experiences. Transportation. Recommendations that improve the guest experience while increasing ancillary revenue.',
      },
      {
        id: 'companion-os',
        title: 'Companion OS',
        body: 'Understand the intelligence platform powering Hotel Companion. Shared knowledge. Organizational memory. Workflow orchestration. Enterprise analytics. Continuous learning.',
      },
    ],
  },
  who: {
    title: 'Who Should Attend',
    lead: 'Hotel Companion is designed for hospitality leaders responsible for guest experience, operations, and growth. Particularly valuable for:',
    roles: [
      'Hotel Owners',
      'General Managers',
      'Operations Directors',
      'Revenue Managers',
      'Guest Experience Leaders',
      'Digital Transformation Teams',
      'IT Directors',
      'Hotel Management Companies',
      'Multi-Property Groups',
      'Luxury Hospitality Brands',
      'Boutique Hotels',
      'Resorts',
    ],
  },
  discuss: {
    title: 'What We’ll Discuss',
    lead: 'Every property is different. We’ll tailor the demonstration around your specific operation. Typical topics:',
    body: 'How guests currently discover information. Common operational bottlenecks. Revenue opportunities hidden inside guest conversations. Knowledge management. Staff efficiency. Multilingual guest communication. Voice-enabled guest experiences. Enterprise deployment. Future roadmap.',
  },
  expect: {
    title: 'What to Expect',
    items: [
      { id: 'duration', title: '30–45 Minutes', body: 'A focused executive demonstration.' },
      { id: 'personalized', title: 'Personalized', body: 'Configured around your property type and operational priorities.' },
      { id: 'interactive', title: 'Interactive', body: 'Ask questions throughout the session. Explore real hospitality scenarios.' },
      {
        id: 'no-obligation',
        title: 'No Obligation',
        body: 'Our goal is education—not pressure. If Hotel Companion isn’t the right fit, we’ll tell you.',
      },
    ],
  },
  agenda: {
    title: 'Typical Agenda',
    items: [
      {
        title: 'Understanding Your Property',
        body: 'Property type. Guest profile. Current technology stack. Operational priorities. Business goals.',
      },
      {
        title: 'Live Product Demonstration',
        body: 'Voice conversations. Recommendations. Service requests. Operational workflows. Executive dashboards.',
      },
      { title: 'Companion OS', body: 'Knowledge. Memory. Reasoning. Workflow orchestration. Analytics.' },
      {
        title: 'Questions & Discussion',
        body: 'Your current challenges, questions, and how Hotel Companion could fit into your operation.',
      },
    ],
  },
  deployment: {
    title: 'From Demonstration to Deployment',
    stages: [
      { title: 'Discovery', body: 'Understanding your operation, workflows, knowledge, and guest experience.' },
      {
        title: 'Knowledge Configuration',
        body: 'Importing your hotel’s information, policies, amenities, destination knowledge, and operational procedures.',
      },
      {
        title: 'Platform Configuration',
        body: 'Voice. Brand personality. Languages. Workflows. Department routing. Enterprise settings.',
      },
      { title: 'Team Onboarding', body: 'Training your staff and administrators.' },
      {
        title: 'Go Live',
        body: 'Launch with continuous optimization as Hotel Companion learns from every guest interaction.',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'How long does implementation take?',
        a: 'Most deployments can be completed in weeks, depending on the complexity of the property and required integrations.',
      },
      {
        q: 'Do guests need to download an app?',
        a: 'No. Hotel Companion is designed to minimize friction and can be accessed through multiple channels, including voice-first experiences.',
      },
      {
        q: 'Does Hotel Companion integrate with existing hotel systems?',
        a: 'Yes. We are building Hotel Companion to integrate with modern hospitality platforms while remaining flexible for different operational environments.',
      },
      {
        q: 'How many languages are supported?',
        a: 'Hotel Companion is designed for multilingual hospitality environments and continues to expand language support.',
      },
      {
        q: 'Is guest information secure?',
        a: 'Yes. Security, privacy, and enterprise governance are foundational principles of Companion OS.',
      },
      {
        q: 'Is this only for luxury hotels?',
        a: 'No. Hotel Companion is designed for hotels that believe exceptional guest experiences create long-term business value, from boutique properties to global hospitality groups.',
      },
    ],
  },
  finalCta: {
    title: 'The Future of Hospitality Begins with Understanding.',
    body1:
      'Every guest conversation contains an opportunity. An opportunity to delight a guest. To improve an operation. To strengthen a team. To grow revenue. To learn something new.',
    body2:
      'Discover how Hotel Companion helps your organization transform everyday conversations into lasting competitive advantage.',
    cta: 'Book Your Personalized Demonstration',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const demoCopy: Localized<typeof en> = { en, es }
