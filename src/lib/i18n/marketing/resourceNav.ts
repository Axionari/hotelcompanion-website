import type { Localized } from '../useCopy'

/**
 * Client-safe navigation index. Keep this separate from `lib/library`, which
 * reads essay files from disk and therefore cannot be imported by SiteNav.
 */
const en = {
  label: 'Resources',
  ariaLabel: 'Hotel Companion resources',
  groups: [
    {
      label: 'Guest Intelligence',
      links: [
        {
          label: 'The Future of Hospitality Is Conversational',
          href: '/resources/library/future-of-hospitality-is-conversational',
        },
        {
          label: 'Beyond the AI Concierge',
          href: '/resources/library/beyond-the-ai-concierge',
        },
        {
          label: 'The Rise of Guest Intelligence Platforms',
          href: '/resources/library/the-rise-of-guest-intelligence-platforms',
        },
      ],
    },
    {
      label: 'Revenue & Experience',
      links: [
        {
          label: 'Every Conversation Is Revenue',
          href: '/resources/library/every-conversation-is-revenue',
        },
        {
          label: 'Voice Is the New Interface',
          href: '/resources/library/voice-is-the-new-interface',
        },
        {
          label: 'Designing Hotels That Never Sleep',
          href: '/resources/library/designing-hotels-that-never-sleep',
        },
      ],
    },
    {
      label: 'Hotel Operations',
      links: [
        {
          label: 'Hotels Don’t Have a Data Problem',
          href: '/resources/library/hotels-dont-have-a-data-problem',
        },
        {
          label: 'The Hotel Knowledge Problem',
          href: '/resources/library/the-hotel-knowledge-problem',
        },
        {
          label: 'Every Department Should Share the Same Intelligence',
          href: '/resources/library/every-department-should-share-the-same-intelligence',
        },
      ],
    },
    {
      label: 'Platform',
      links: [
        {
          label: 'Hospitality Is an Intelligence Business',
          href: '/resources/library/hospitality-is-an-intelligence-business',
        },
        {
          label: 'The Operating System for Hospitality',
          href: '/resources/library/the-operating-system-for-hospitality',
        },
        {
          label: 'When Every Guest Conversation Becomes Intelligence',
          href: '/resources/library/what-happens-when-every-guest-conversation-becomes-intelligence',
        },
      ],
    },
  ],
  viewAll: 'View all resources',
}

const es: typeof en = {
  label: 'Recursos',
  ariaLabel: 'Recursos de Hotel Companion',
  groups: [
    {
      label: 'Inteligencia de Huéspedes',
      links: [
        {
          label: 'El Futuro de la Hospitalidad Es Conversacional',
          href: '/resources/library/future-of-hospitality-is-conversational',
        },
        {
          label: 'Más Allá del Concierge con IA',
          href: '/resources/library/beyond-the-ai-concierge',
        },
        {
          label: 'El Auge de las Plataformas de Inteligencia de Huéspedes',
          href: '/resources/library/the-rise-of-guest-intelligence-platforms',
        },
      ],
    },
    {
      label: 'Ingresos y Experiencia',
      links: [
        {
          label: 'Cada Conversación Es Ingreso',
          href: '/resources/library/every-conversation-is-revenue',
        },
        {
          label: 'La Voz Es la Nueva Interfaz',
          href: '/resources/library/voice-is-the-new-interface',
        },
        {
          label: 'Diseñando Hoteles que Nunca Duermen',
          href: '/resources/library/designing-hotels-that-never-sleep',
        },
      ],
    },
    {
      label: 'Operaciones Hoteleras',
      links: [
        {
          label: 'Los Hoteles No Tienen un Problema de Datos',
          href: '/resources/library/hotels-dont-have-a-data-problem',
        },
        {
          label: 'El Problema del Conocimiento Hotelero',
          href: '/resources/library/the-hotel-knowledge-problem',
        },
        {
          label: 'Cada Departamento Debería Compartir la Misma Inteligencia',
          href: '/resources/library/every-department-should-share-the-same-intelligence',
        },
      ],
    },
    {
      label: 'Plataforma',
      links: [
        {
          label: 'La Hospitalidad Es un Negocio de Inteligencia',
          href: '/resources/library/hospitality-is-an-intelligence-business',
        },
        {
          label: 'El Sistema Operativo de la Hospitalidad',
          href: '/resources/library/the-operating-system-for-hospitality',
        },
        {
          label: 'Cuando Cada Conversación se Convierte en Inteligencia',
          href: '/resources/library/what-happens-when-every-guest-conversation-becomes-intelligence',
        },
      ],
    },
  ],
  viewAll: 'Ver todos los recursos',
}

export const resourceNavCopy: Localized<typeof en> = { en, es }
