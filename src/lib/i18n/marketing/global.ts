import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md — nav (§4 of build brief) + {#footer}. Verbatim. */

const en = {
  nav: {
    platform: 'Platform',
    solutions: 'Solutions',
    enterprise: 'Enterprise',
    companionOs: 'Companion OS',
    resources: 'Resources',
    company: 'Company',
    bookDemo: 'Book a Demo',
    wordmark: 'Hotel Companion',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  footer: {
    brand: {
      name: 'HOTEL COMPANION',
      headline: 'Understand Every Guest. Capture Every Opportunity.',
      body:
        'Hotel Companion is the Voice-First Guest Intelligence Platform for modern hotels, transforming every guest conversation into operational intelligence, revenue opportunities, and exceptional hospitality.',
      endorsement: 'Powered by Companion OS.',
      cta: 'Book a Demonstration',
    },
    columns: {
      product: {
        title: 'Product',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Platform', href: '/platform' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Enterprise', href: '/enterprise' },
          { label: 'Companion OS', href: '/companion-os' },
          { label: 'Resources', href: '/resources' },
          { label: 'Company', href: '/company' },
          { label: 'Book Demo', href: '/demo' },
        ],
      },
      solutions: {
        title: 'Solutions',
        links: [
          { label: 'Luxury Hotels', href: '/solutions#luxury' },
          { label: 'Boutique Hotels', href: '/solutions#boutique' },
          { label: 'Resorts', href: '/solutions#resorts' },
          { label: 'Business Hotels', href: '/solutions#business' },
          { label: 'Hotel Groups', href: '/solutions#enterprise-groups' },
          { label: 'Independent Properties', href: '/solutions#boutique' },
          { label: 'Founding Partner Program', href: '/contact#founding' },
        ],
      },
      resources: {
        title: 'Resources',
        links: [
          { label: 'The Future of Hospitality Is Conversational', href: '/resources/library/future-of-hospitality-is-conversational' },
          { label: 'Beyond the AI Concierge', href: '/resources/library/beyond-the-ai-concierge' },
          { label: 'Every Conversation Is Revenue', href: '/resources/library/every-conversation-is-revenue' },
          { label: 'Voice Is the New Interface', href: '/resources/library/voice-is-the-new-interface' },
          { label: 'The Future of Organizational Intelligence', href: '/resources/library/what-happens-when-every-guest-conversation-becomes-intelligence' },
          { label: 'Library', href: '/resources#library' },
          { label: 'Product Updates', href: '/resources#updates' },
          { label: 'FAQ', href: '/resources#faq' },
        ],
      },
      company: {
        title: 'Company',
        links: [
          { label: 'About', href: '/company' },
          { label: 'Contact', href: '/contact' },
          { label: 'Partners', href: '/contact#founding' },
        ],
        comingSoon: ['Careers', 'Press', 'Brand Assets'],
        comingSoonSuffix: 'Coming Soon',
      },
      legal: {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Cookie Policy', href: '/cookies' },
          { label: 'Security', href: '/security' },
          { label: 'Responsible AI', href: '/responsible-ai' },
          { label: 'Trust Center', href: '/trust' },
          { label: 'Accessibility', href: '/accessibility' },
        ],
      },
    },
    newsletter: {
      title: 'Stay Connected',
      body:
        'Receive occasional insights on Guest Intelligence, AI, operational excellence, and the future of hospitality.',
      placeholder: 'Business Email',
      submit: 'Subscribe',
      success: 'Thank you — you’re on the list.',
      error: 'Something went wrong. Please try again.',
    },
    companionOs: {
      title: 'Built on Companion OS',
      headline: 'One intelligence platform. Unlimited Companions.',
      body:
        'Hotel Companion is powered by Companion OS, the intelligence layer designed to help organizations understand people, preserve knowledge, coordinate execution, and continuously improve.',
      link: 'Learn more about Companion OS',
    },
    axionari: {
      title: 'Powered by Axionari',
      body:
        'Axionari builds Organizational Intelligence Platforms that help enterprises understand, learn, and execute more effectively. Hotel Companion is part of the growing Companion ecosystem.',
      link: 'Learn about Axionari',
    },
    legalLine:
      '© 2026 Hotel Companion. All rights reserved. Powered by Companion OS. Built by Axionari.',
    signIn: 'Sign In',
    /* Social: LinkedIn · X · YouTube · GitHub — NEEDS REAL DATA (no profile URLs exist yet);
       not rendered until URLs are provided, to avoid dead links. */
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN per brief guardrail 8
   (do not ship machine-translated ES silently). */
const es: typeof en = en

export const globalCopy: Localized<typeof en> = { en, es }
