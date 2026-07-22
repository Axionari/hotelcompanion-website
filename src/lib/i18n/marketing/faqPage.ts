import type { Localized } from '../useCopy'

/* v3 copy deck {#12} — the four Q&As moved off the homepage to /faq.
   Text verbatim from the original homepage FAQ (HotelCompanion__Site_Copy). */

const en = {
  title: 'Frequently Asked Questions',
  backHome: '← Back to home',
  items: [
    {
      q: 'Is Hotel Companion an AI concierge?',
      a: 'No. AI is simply the interface. Hotel Companion is an enterprise platform that understands guest intent, coordinates operations, identifies commercial opportunities, and continuously learns from every interaction.',
    },
    {
      q: 'What does Hotel Companion know?',
      a: 'Everything you teach it. Your property. Your services. Your destination. Your operating procedures. Your policies. Your recommendations. Your brand standards. Your institutional knowledge.',
    },
    {
      q: 'Does Hotel Companion support multiple languages?',
      a: 'Yes. Guests communicate naturally in their preferred language while Hotel Companion preserves your hotel’s voice, standards, and hospitality philosophy.',
    },
    {
      q: 'What is Companion OS?',
      a: 'Companion OS is Axionari’s shared intelligence platform that powers Hotel Companion, Restaurant Companion, and future industry-specific Companions.',
    },
  ],
}

const es: typeof en = {
  title: 'Preguntas Frecuentes',
  backHome: '← Volver al inicio',
  items: [
    {
      q: '¿Hotel Companion es un concierge con IA?',
      a: 'No. La IA es simplemente la interfaz. Hotel Companion es una plataforma empresarial que entiende la intención del huésped, coordina operaciones, identifica oportunidades comerciales y aprende continuamente de cada interacción.',
    },
    {
      q: '¿Qué sabe Hotel Companion?',
      a: 'Todo lo que le enseñes. Tu propiedad. Tus servicios. Tu destino. Tus procedimientos operativos. Tus políticas. Tus recomendaciones. Tus estándares de marca. Tu conocimiento institucional.',
    },
    {
      q: '¿Hotel Companion admite varios idiomas?',
      a: 'Sí. Los huéspedes se comunican de forma natural en su idioma preferido mientras Hotel Companion preserva la voz, los estándares y la filosofía de hospitalidad de tu hotel.',
    },
    {
      q: '¿Qué es Companion OS?',
      a: 'Companion OS es la plataforma de inteligencia compartida de Axionari que impulsa a Hotel Companion, Restaurant Companion y a los futuros Companions específicos por industria.',
    },
  ],
}

export const faqPageCopy: Localized<typeof en> = { en, es }
