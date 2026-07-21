import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#contact}. Verbatim. */

const en = {
  hero: {
    title: 'Let’s Build the Future of Hospitality Together.',
    body:
      'Whether you’re exploring Hotel Companion, evaluating a pilot, or simply curious about the future of Guest Intelligence, we’d love to hear from you.',
    coda: 'Every conversation starts somewhere. Let’s start one.',
  },
  channelsEyebrow: '01 · GET IN TOUCH',
  channelsTitle: 'How can we help?',
  channels: [
    {
      id: 'sales',
      eyebrow: 'Sales',
      title: 'Explore the platform.',
      body: 'Interested in learning how Hotel Companion can transform your guest experience? Our team will walk you through the platform, answer your questions, and explore whether we’re a good fit for your organization.',
      email: 'sales@hotelcompanion.ai',
      cta: { label: 'Book a Demonstration', href: '/demo' },
    },
    {
      id: 'partnerships',
      eyebrow: 'Partnerships',
      title: 'Build with us.',
      body: 'We’re building the future of hospitality with forward-thinking hotel groups, technology partners, systems integrators, and industry leaders.',
      email: 'partners@hotelcompanion.ai',
    },
    {
      id: 'customer-success',
      eyebrow: 'Customer Success',
      title: 'Already with us.',
      body: 'Already working with Hotel Companion? Our Customer Success team is here to help you maximize the value of your deployment.',
      email: 'support@hotelcompanion.ai',
    },
    {
      id: 'media',
      eyebrow: 'Media & Speaking',
      title: 'Press and events.',
      body: 'For interviews, conferences, podcasts, speaking engagements, or media inquiries.',
      email: 'press@hotelcompanion.ai',
    },
    {
      id: 'general',
      eyebrow: 'General Inquiries',
      title: 'Anything else.',
      body: 'Questions about Hotel Companion or Companion OS? We’ll make sure your message reaches the right person.',
      email: 'hello@hotelcompanion.ai',
    },
  ],
  hq: {
    title: 'Headquarters',
    line: 'Hotel Companion — Powered by Axionari — Mexico City, Mexico — Serving hospitality organizations worldwide.',
  },
  schedule: {
    title: 'Schedule a Conversation',
    body: 'Rather speak with us directly? Book a personalized demonstration with one of our hospitality specialists.',
    cta: 'Book a Demo',
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'How quickly can we expect a response?',
        a: 'We aim to respond to all inquiries within one business day.',
      },
      {
        q: 'Do you work with independent hotels?',
        a: 'Yes. We work with boutique hotels, independent properties, resorts, luxury hotels, and multi-property groups.',
      },
      {
        q: 'Can we start with a pilot?',
        a: 'Absolutely. Many organizations begin with a pilot deployment before expanding across additional properties.',
      },
      {
        q: 'Do you support international hotels?',
        a: 'Yes. Hotel Companion is designed for multilingual hospitality environments and global operations.',
      },
      {
        q: 'Are you currently accepting design partners?',
        a: 'Yes. We’re working closely with a limited number of forward-thinking hospitality organizations to shape the future of Guest Intelligence.',
      },
    ],
  },
  founding: {
    title: 'Join the Founding Partner Program',
    body:
      'We’re looking for a small group of hospitality leaders who want to help define the next generation of intelligent guest experiences.',
    receiveLead: 'Founding partners receive:',
    items: [
      'Early access to new capabilities',
      'Direct collaboration with our product team',
      'Priority support',
      'Influence over our roadmap',
      'Preferential commercial terms',
    ],
    close: 'If you’re interested in helping shape the future of hospitality, we’d love to hear from you.',
    cta: 'Become a Founding Partner',
  },
  closing: {
    title: 'Every Great Partnership Begins with a Conversation.',
    body1: 'Technology doesn’t transform organizations. People do.',
    body2:
      'We’re excited to learn about your hotel, your guests, and your vision for the future of hospitality. Let’s build it together.',
    cta: 'Get in Touch',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const contactCopy: Localized<typeof en> = { en, es }
