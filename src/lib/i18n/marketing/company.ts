import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#company}. Verbatim. */

const en = {
  hero: {
    title: 'We’re Building the Future of Intelligent Hospitality.',
    body1:
      'We believe every guest conversation should create better experiences, stronger operations, and more valuable businesses.',
    body2:
      'Hotel Companion is built by Axionari to help hospitality organizations transform conversations into intelligence, execution, and measurable business outcomes.',
  },
  sections: [
    {
      id: 'belief',
      eyebrow: '01 · OUR BELIEF',
      title: 'Hospitality Is Human. Intelligence Should Be Invisible.',
      body: [
        'Technology should never compete with hospitality. It should elevate it.',
        'The best technology disappears into the background, allowing people to focus on what they do best: creating memorable experiences.',
        'Hotel Companion exists to make every interaction feel more personal, every operation more coordinated, and every decision more informed.',
      ],
      coda: 'Guests remember how they felt. Not the technology behind it.',
    },
    {
      id: 'mission',
      eyebrow: '02 · OUR MISSION',
      title: 'Help Every Hotel Understand Every Guest.',
      body: [
        'Hotels generate thousands of conversations every day. Most are forgotten the moment they end.',
        'We believe those conversations contain an organization’s most valuable intelligence.',
        'Guest needs. Guest intent. Guest preferences. Operational challenges. Revenue opportunities. Service expectations.',
      ],
      coda:
        'Hotel Companion transforms those conversations into intelligence that helps every department deliver better hospitality.',
    },
    {
      id: 'approach',
      eyebrow: '03 · OUR APPROACH',
      title: 'Built for Hospitality. Designed for Enterprise.',
      body: [
        'Hotel Companion combines the simplicity of natural conversation with the rigor of enterprise software.',
        'Voice-first experiences. Organizational knowledge. Operational workflows. Guest intelligence. Enterprise analytics.',
      ],
      coda: 'One platform connecting every guest interaction with every department.',
    },
    {
      id: 'companion-os',
      eyebrow: '04 · COMPANION OS',
      title: 'One Platform. Unlimited Possibilities.',
      body: [
        'Hotel Companion is powered by Companion OS, Axionari’s shared intelligence platform.',
        'Rather than building isolated AI products, we built a common intelligence foundation capable of understanding organizations, coordinating execution, and continuously learning.',
        'Today it powers Hotel Companion and Restaurant Companion.',
      ],
      coda: 'Tomorrow it will power an expanding family of industry-specific Companions.',
    },
    {
      id: 'axionari',
      eyebrow: '05 · ABOUT AXIONARI',
      title: 'Enterprise Execution Systems.',
      body: [
        'Axionari builds intelligent systems that help organizations understand what is happening, coordinate what comes next, and continuously improve through AI.',
        'Companion OS is the intelligence platform behind that vision.',
      ],
      coda: 'Hotel Companion is one application of that platform, purpose-built for hospitality.',
    },
    {
      id: 'philosophy',
      eyebrow: '06 · OUR PHILOSOPHY',
      title: 'Understanding Creates Better Execution.',
      body: [
        'Organizations already possess extraordinary knowledge.',
        'The challenge isn’t creating more information. It’s making that knowledge instantly accessible, actionable, and useful.',
        'We believe AI should help organizations understand faster, decide better, and execute with confidence.',
      ],
      coda: 'That philosophy guides everything we build.',
    },
    {
      id: 'founding-partners',
      eyebrow: '07 · FOUNDING PARTNERS',
      title: 'Building the Future Together.',
      body: [
        'We’re working closely with a limited number of hospitality organizations to shape the future of intelligent guest experiences.',
        'Our Founding Partners don’t simply use the platform. They help define it.',
      ],
      coda: 'Together, we’re building the next generation of hospitality technology.',
    },
  ],
  contact: {
    title: 'Let’s Build the Future of Hospitality.',
    body:
      'Whether you’re exploring new ways to improve guest experiences, increase ancillary revenue, or modernize hotel operations, we’d love to learn about your organization.',
    channels: [
      { label: 'General Inquiries', email: 'hello@hotelcompanion.ai' },
      { label: 'Sales', email: 'sales@hotelcompanion.ai' },
      { label: 'Partnerships', email: 'partners@hotelcompanion.ai' },
    ],
  },
  finalCta: {
    title: 'The Future of Hospitality Begins with Understanding.',
    body:
      'Every guest interaction matters. Every conversation creates intelligence. Every hotel deserves technology that makes hospitality more human—not more complicated.',
    platform: 'Let’s build it together.',
    cta: 'Book a Demo',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const companyCopy: Localized<typeof en> = { en, es }
