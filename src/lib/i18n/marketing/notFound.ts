import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md / _ES.md {#not-found}. Verbatim. */

const en = {
  code: '404',
  title: 'Looks Like We Lost Our Way.',
  body1: 'The page you’re looking for doesn’t exist—or it may have moved.',
  body2: 'But since you’re here, let’s help you get where you wanted to go.',
  cards: [
    {
      title: 'Looking for Hotel Companion?',
      body: 'Discover how we’re helping hotels understand every guest through conversational intelligence.',
      cta: 'Explore Hotel Companion',
      href: '/',
    },
    {
      title: 'Looking for How It Works?',
      body: 'See how Hotel Companion connects guest intent, hotel knowledge, accountable action and verified outcomes.',
      cta: 'Explore the Product',
      href: '/platform#platform-model',
    },
    {
      title: 'Want to See It in Action?',
      body: 'Experience Hotel Companion through a personalized executive demonstration.',
      cta: 'Book a Demo',
      href: '/demo',
    },
  ],
  popularTitle: 'POPULAR PAGES',
  popular: [
    { label: 'Home', dek: 'Understand Every Guest. Capture Every Opportunity.', href: '/' },
    { label: 'Platform', dek: 'Discover the capabilities behind Hotel Companion.', href: '/platform' },
    {
      label: 'Solutions',
      dek: 'See how Hotel Companion supports every department and every property type.',
      href: '/solutions',
    },
    {
      label: 'Enterprise',
      dek: 'Learn how Companion OS scales across multi-property hospitality organizations.',
      href: '/enterprise',
    },
    {
      label: 'Resources',
      dek: 'Explore our essays on Guest Intelligence, AI, and the future of hospitality.',
      href: '/resources',
    },
    {
      label: 'Company',
      dek: 'Learn about our mission, philosophy, and the team behind Hotel Companion.',
      href: '/company',
    },
  ],
  closing: 'Every Conversation Leads Somewhere. Even this one.',
  closingBody: 'Let’s get you back on the right path.',
  cta: 'Return Home',
}

const es: typeof en = {
  code: '404',
  title: 'Parece que Nos Perdimos.',
  body1: 'La página que buscas no existe—o pudo haberse movido.',
  body2: 'Pero ya que estás aquí, te ayudamos a llegar a donde querías ir.',
  cards: [
    {
      title: '¿Buscas Hotel Companion?',
      body: 'Descubre cómo ayudamos a los hoteles a entender a cada huésped a través de la inteligencia conversacional.',
      cta: 'Explora Hotel Companion',
      href: '/',
    },
    {
      title: '¿Buscas Cómo Funciona?',
      body: 'Descubre cómo Hotel Companion conecta la intención del huésped, el conocimiento del hotel, la acción responsable y los resultados verificados.',
      cta: 'Explora el Producto',
      href: '/platform#platform-model',
    },
    {
      title: '¿Quieres Verlo en Acción?',
      body: 'Vive Hotel Companion a través de una demostración ejecutiva personalizada.',
      cta: 'Agenda una Demo',
      href: '/demo',
    },
  ],
  popularTitle: 'PÁGINAS POPULARES',
  popular: [
    { label: 'Inicio', dek: 'Entiende a Cada Huésped. Aprovecha Cada Oportunidad.', href: '/' },
    { label: 'Plataforma', dek: 'Descubre las capacidades detrás de Hotel Companion.', href: '/platform' },
    {
      label: 'Soluciones',
      dek: 'Cómo Hotel Companion apoya a cada departamento y a cada tipo de propiedad.',
      href: '/solutions',
    },
    {
      label: 'Enterprise',
      dek: 'Cómo Companion OS escala en organizaciones hoteleras multipropiedad.',
      href: '/enterprise',
    },
    {
      label: 'Recursos',
      dek: 'Explora nuestros ensayos sobre Inteligencia de Huéspedes, IA y el futuro de la hospitalidad.',
      href: '/resources',
    },
    {
      label: 'Empresa',
      dek: 'Conoce nuestra misión, filosofía y al equipo detrás de Hotel Companion.',
      href: '/company',
    },
  ],
  closing: 'Toda Conversación Lleva a Algún Lugar. Incluso esta.',
  closingBody: 'Regresemos al camino correcto.',
  cta: 'Volver al Inicio',
}

export const notFoundCopy: Localized<typeof en> = { en, es }
