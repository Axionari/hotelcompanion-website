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
    see: 'See',
    more: 'more',
    wordmark: 'Hotel Companion',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  footer: {
    /* v3 {#footer}: 4 columns (Company+Legal merged), Companion OS product
       link removed (G5), essays reduced to one line each, POWERED BY AXIONARI
       mark above the copyright line. */
    brand: {
      name: 'HOTEL COMPANION',
      headline: 'Understand Every Guest. Capture Every Opportunity.',
      body:
        'Hotel Companion is the Voice-First Guest Intelligence Platform for modern hotels, transforming every guest conversation into operational intelligence, revenue opportunities, and exceptional hospitality.',
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
          { label: 'FAQ', href: '/demo#faq' },
        ],
      },
      company: {
        title: 'Company & Legal',
        links: [
          { label: 'About', href: '/company' },
          { label: 'Contact', href: '/contact' },
          { label: 'Partners', href: '/contact#founding' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Cookie Policy', href: '/cookies' },
          { label: 'Security', href: '/security' },
          { label: 'Responsible AI', href: '/responsible-ai' },
          { label: 'Trust Center', href: '/trust' },
          { label: 'Accessibility', href: '/accessibility' },
        ],
        comingSoon: ['Careers', 'Press', 'Brand Assets'],
        comingSoonSuffix: 'Coming Soon',
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
    /* {#footer}: one quiet family endorsement line (connector + brand link). */
    osLine: {
      text: 'Built on',
      link: 'Companion OS',
    },
    axionariLine: {
      text: 'Powered by',
      link: 'Axionari',
    },
    legalLine: '© 2026 Hotel Companion. All rights reserved.',
    signIn: 'Sign In',
    more: 'more',
    /* Social: LinkedIn · X · YouTube · GitHub — NEEDS REAL DATA (no profile URLs exist yet);
       not rendered until URLs are provided, to avoid dead links. */
  },
}

/* Copy source: HotelCompanion__Site_Copy_ES.md — nav + {#footer}. Verbatim. */

const es: typeof en = {
  nav: {
    platform: 'Plataforma',
    solutions: 'Soluciones',
    enterprise: 'Enterprise',
    companionOs: 'Companion OS',
    resources: 'Recursos',
    company: 'Empresa',
    bookDemo: 'Agenda una Demo',
    see: 'Ver',
    more: 'más',
    wordmark: 'Hotel Companion',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  footer: {
    /* v3 {#footer}: 4 columnas (Empresa+Legal fusionadas), enlace Companion OS
       eliminado (G5), ensayos reducidos a una línea, marca POWERED BY AXIONARI
       sobre la línea de copyright. */
    brand: {
      name: 'HOTEL COMPANION',
      headline: 'Entiende a Cada Huésped. Aprovecha Cada Oportunidad.',
      body:
        'Hotel Companion es la Plataforma de Inteligencia de Huéspedes por Voz para hoteles modernos, que transforma cada conversación en inteligencia operativa, oportunidades de ingreso y hospitalidad excepcional.',
      cta: 'Agenda una Demostración',
    },
    columns: {
      product: {
        title: 'Producto',
        links: [
          { label: 'Inicio', href: '/' },
          { label: 'Plataforma', href: '/platform' },
          { label: 'Soluciones', href: '/solutions' },
          { label: 'Enterprise', href: '/enterprise' },
          { label: 'Recursos', href: '/resources' },
          { label: 'Empresa', href: '/company' },
          { label: 'Agenda Demo', href: '/demo' },
        ],
      },
      solutions: {
        title: 'Soluciones',
        links: [
          { label: 'Hoteles de Lujo', href: '/solutions#luxury' },
          { label: 'Hoteles Boutique', href: '/solutions#boutique' },
          { label: 'Resorts', href: '/solutions#resorts' },
          { label: 'Hoteles de Negocios', href: '/solutions#business' },
          { label: 'Grupos Hoteleros', href: '/solutions#enterprise-groups' },
          { label: 'Propiedades Independientes', href: '/solutions#boutique' },
          { label: 'Programa de Socios Fundadores', href: '/contact#founding' },
        ],
      },
      resources: {
        title: 'Recursos',
        links: [
          { label: 'El Futuro de la Hospitalidad Es Conversacional', href: '/resources/library/future-of-hospitality-is-conversational' },
          { label: 'Más Allá del Concierge con IA', href: '/resources/library/beyond-the-ai-concierge' },
          { label: 'Cada Conversación Es Ingreso', href: '/resources/library/every-conversation-is-revenue' },
          { label: 'La Voz Es la Nueva Interfaz', href: '/resources/library/voice-is-the-new-interface' },
          { label: 'El Futuro de la Inteligencia Organizacional', href: '/resources/library/what-happens-when-every-guest-conversation-becomes-intelligence' },
          { label: 'Biblioteca', href: '/resources#library' },
          { label: 'Preguntas Frecuentes', href: '/demo#faq' },
        ],
      },
      company: {
        title: 'Empresa y Legal',
        links: [
          { label: 'Nosotros', href: '/company' },
          { label: 'Contacto', href: '/contact' },
          { label: 'Alianzas', href: '/contact#founding' },
          { label: 'Aviso de Privacidad', href: '/privacy' },
          { label: 'Términos del Servicio', href: '/terms' },
          { label: 'Política de Cookies', href: '/cookies' },
          { label: 'Seguridad', href: '/security' },
          { label: 'IA Responsable', href: '/responsible-ai' },
          { label: 'Centro de Confianza', href: '/trust' },
          { label: 'Accesibilidad', href: '/accessibility' },
        ],
        comingSoon: ['Carreras', 'Prensa', 'Recursos de Marca'],
        comingSoonSuffix: 'Próximamente',
      },
    },
    newsletter: {
      title: 'Mantente Conectado',
      body:
        'Recibe ideas ocasionales sobre Inteligencia de Huéspedes, IA, excelencia operativa y el futuro de la hospitalidad.',
      placeholder: 'Correo de Trabajo',
      submit: 'Suscribirse',
      success: 'Gracias — ya estás en la lista.',
      error: 'Algo salió mal. Por favor intenta de nuevo.',
    },
    /* {#footer}: una línea sobria de respaldo familiar (conector + marca). */
    osLine: {
      text: 'Construido sobre',
      link: 'Companion OS',
    },
    axionariLine: {
      text: 'Impulsado por',
      link: 'Axionari',
    },
    legalLine: '© 2026 Hotel Companion. Todos los derechos reservados.',
    signIn: 'Iniciar Sesión',
    more: 'más',
  },
}

export const globalCopy: Localized<typeof en> = { en, es }
