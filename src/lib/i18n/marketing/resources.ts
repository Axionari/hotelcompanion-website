import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#resources} (the expanded, approved version). Verbatim. */

const en = {
  hero: {
    title: 'Insights for the Future of Hospitality.',
    body1:
      'Explore ideas, research, and practical guidance on guest intelligence, AI, operational excellence, and the future of hospitality.',
    body2:
      'Whether you’re evaluating AI, improving guest experiences, or rethinking hotel operations, our library is designed to help hospitality leaders understand what’s next.',
  },
  featured: {
    eyebrow: '01 · FEATURED',
    title: 'The Future of Hospitality Is Conversational.',
    body1:
      'Guests no longer want to navigate apps, search websites, or wait on hold. They simply want to ask.',
    body2:
      'Discover why conversational intelligence is becoming the new operating interface for hotels—and how forward-thinking properties are turning every guest interaction into exceptional service and measurable business value.',
    cta: 'Read Article',
    slug: 'future-of-hospitality-is-conversational',
  },
  library: {
    eyebrow: '02 · LIBRARY',
    title: 'Featured Articles',
    /* Card labels + deks are the copy deck's friendlier variants; each maps to a
       canonical essay slug (essays file {#essay-index} mapping note). */
    cards: [
      {
        label: 'Understanding Guest Intelligence',
        dek: 'Why guest conversations are becoming the hospitality industry’s most valuable source of operational and commercial intelligence.',
        slug: 'future-of-hospitality-is-conversational',
      },
      {
        label: 'Beyond the AI Concierge',
        dek: 'Why the next generation of hospitality technology is moving beyond chatbots toward Guest Intelligence Platforms.',
        slug: 'beyond-the-ai-concierge',
      },
      {
        label: 'Every Conversation Is Revenue',
        dek: 'How hotels can identify revenue opportunities naturally through guest conversations without compromising hospitality.',
        slug: 'every-conversation-is-revenue',
      },
      {
        label: 'Voice Is the New Interface',
        dek: 'Why speaking is becoming the most natural way for guests to interact with hotels.',
        slug: 'voice-is-the-new-interface',
      },
      {
        label: 'Building the Intelligent Hotel',
        dek: 'How conversational AI, organizational knowledge, and operational intelligence create a new operating model for hospitality.',
        slug: 'the-operating-system-for-hospitality',
      },
      {
        label: 'From Questions to Workflows',
        dek: 'How guest requests become coordinated operational execution across every department.',
        slug: 'every-department-should-share-the-same-intelligence',
      },
      {
        label: 'The Knowledge Advantage',
        dek: 'Why your hotel’s greatest competitive advantage is the knowledge your team already possesses.',
        slug: 'the-hotel-knowledge-problem',
      },
      {
        label: 'The Hotel of the Future',
        dek: 'How AI, voice, automation, and organizational intelligence are reshaping guest expectations.',
        slug: 'what-happens-when-every-guest-conversation-becomes-intelligence',
      },
    ],
  },
  categories: {
    eyebrow: '03 · TOPICS',
    title: 'Browse by Topic',
    all: 'All',
    descriptions: {
      'Guest Experience': 'Creating memorable stays through intelligent, personalized hospitality.',
      'Revenue Growth': 'Increasing ancillary revenue through better conversations and smarter recommendations.',
      'Hotel Operations': 'Improving coordination, efficiency, and service across every department.',
      'Artificial Intelligence': 'Understanding how AI is transforming hospitality without replacing human service.',
      'Voice Technology': 'Why conversational interfaces are becoming the new standard for guest interaction.',
      'Companion OS': 'Insights into the intelligence platform powering Hotel Companion and the future Companion ecosystem.',
    } as Record<string, string>,
  },
  faq: {
    eyebrow: '04 · FAQ',
    title: 'Frequently Asked Questions',
    body:
      'Learn more about Hotel Companion, Companion OS, implementation, security, multilingual support, enterprise deployment, and guest experience.',
    cta: 'Explore FAQs',
  },
  updates: {
    eyebrow: '05 · PRODUCT UPDATES',
    title: 'Product Updates',
    body:
      'Follow the evolution of Hotel Companion as we build the next generation of intelligent hospitality software.',
    lead: 'Stay informed about:',
    items: [
      'New capabilities.',
      'Platform improvements.',
      'AI enhancements.',
      'Companion OS updates.',
      'Enterprise features.',
      'Performance improvements.',
      'Release notes.',
    ],
    status: 'Coming Soon',
  },
  newsletter: {
    eyebrow: '06 · NEWSLETTER',
    title: 'Stay Ahead of What’s Next.',
    body1: 'Hospitality is changing rapidly.',
    body2:
      'Receive occasional insights on AI, guest intelligence, operational innovation, and the future of hospitality—written for hotel leaders, not technologists.',
    cta: 'Join the Newsletter',
    placeholder: 'Business Email',
    success: 'Thank you — you’re on the list.',
  },
  finalCta: {
    title: 'Great Hospitality Never Stops Learning.',
    subtitle: 'Neither do we.',
    body:
      'Explore new ideas. Challenge conventional thinking. Discover how intelligent hospitality is redefining the guest experience.',
    cta: 'Book a Demo',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const resourcesCopy: Localized<typeof en> = { en, es }
