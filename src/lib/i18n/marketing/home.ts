import type { Localized } from '../useCopy'
import type { ScreenId } from './deviceScreens'

/* Copy source: HotelCompanion__Site_Copy.md {#home}. Verbatim — do not edit here. */

const en = {
  hero: {
    h1: 'Understand Every Guest. Capture Every Opportunity.',
    positioning: 'The Voice-First Guest Intelligence Platform for Hotels.',
    lead1:
      'Every guest conversation is an opportunity to deliver exceptional hospitality, generate new revenue, and strengthen your operation.',
    lead2:
      'Hotel Companion transforms natural conversations into personalized guest experiences, operational intelligence, and coordinated execution—available 24 hours a day, in every language, across every touchpoint.',
    primaryCta: 'Book a Demo',
    secondaryCta: 'Watch Product Tour',
    /* v3 copy deck {#01} — mono proof line under the CTA row */
    proofLine: '0% OTA COMMISSION · 24/7 · IN EVERY LANGUAGE · LIVE IN DAYS',
  },
  stake: {
    figure: '$160B',
    /* NEEDS CONFIRM: exact figure, report, year — Eduardo sourcing. Approved for use now. */
    caption: 'In annual value and operational savings AI automation can unlock for hospitality.',
    source: 'Source: McKinsey.',
    /* v3 copy deck {#02} — single line replacing the two closing paragraphs */
    close: 'The routine, resolved automatically — your team, free for the moments that matter.',
  },
  revenueExample: {
    prompt: 'A guest asks, at 10:14 PM:',
    guest: '“Is it possible to upgrade to an ocean-view suite for the rest of my stay?”',
    context: 'The assistant already knows one is available.',
    reply:
      '“Wonderful news—an Ocean-View Suite is open. $250/night, with a private terrace and direct sea views. Shall I have the front desk confirm the upgrade?”',
    accept: '“Yes, please.”',
    close: ['One upgrade.', 'Investment: covered.'],
  },
  whatItIsNot: {
    headline: 'It doesn’t replace your systems. It understands the conversations between them.',
    beats: [
      'Not a PMS. Not a generic assistant. Not another app to download.',
      'One intelligent layer that makes everything you already run work better.',
    ],
    cta: 'See how it fits',
  },
  trust: 'Built for forward-thinking hospitality leaders redefining the guest experience.',
  conversation: {
    title: 'Hospitality Begins with Conversation.',
    lead: 'The most important moments in hospitality begin with a question.',
    questions: [
      '“Can you recommend a great restaurant?”',
      '“Can we stay one more night?”',
      '“We’re celebrating our anniversary.”',
      '“Can someone bring extra towels?”',
      '“Where’s the best beach for sunset?”',
    ],
    beats: [
      'Every conversation reveals intent.',
      'Every request creates an opportunity.',
      'Every answer shapes the guest experience.',
    ],
    close: 'Hotel Companion ensures those moments are never missed.',
  },
  employee: {
    title: 'Your Highest-Performing Employee Never Sleeps.',
    lead: 'Imagine giving every guest immediate access to your best concierge.',
    bests: [
      'Your best front desk associate.',
      'Your best guest services professional.',
      'Your best local expert.',
      'Your best upseller.',
      'Your best brand ambassador.',
    ],
    cadence: ['Available instantly.', 'Every hour.', 'Every day.', 'Without increasing headcount.'],
    close:
      'Hotel Companion delivers consistent, personalized hospitality to every guest, regardless of occupancy, staffing levels, or time of day.',
  },
  voice: {
    title: 'Voice Is the New Interface for Hospitality.',
    beats: [
      'Guests don’t want another app.',
      'They don’t want complicated menus.',
      'They don’t want to search through endless information.',
      'They simply want to ask.',
    ],
    body:
      'Hotel Companion allows guests to interact naturally through conversation, whether using an in-room tablet, their mobile device, a QR code, or future voice-enabled experiences.',
    close: ['No training.', 'No learning curve.', 'Just effortless hospitality.'],
  },
  everyRoom: {
    title: 'Every Room Has a Digital Hospitality Professional.',
    lead: 'Hotel Companion instantly helps guests:',
    items: [
      'Reserve restaurants',
      'Book spa treatments',
      'Order room service',
      'Upgrade their room',
      'Request housekeeping',
      'Schedule airport transportation',
      'Arrange celebrations',
      'Discover local experiences',
      'Find the perfect beach',
      'Book excursions',
      'Locate pharmacies and hospitals',
      'Learn everything about your property',
      'Receive personalized recommendations',
      'Access your destination like a trusted local expert',
    ],
    close: 'Every answer reflects your hotel’s standards, knowledge, and personality.',
  },
  revenue: {
    title: 'Every Conversation Is Revenue.',
    /* v3 ADDENDUM_1 A1 — thesis line; `hi` renders in --champagne (Phase 3) */
    thesis: {
      pre: 'The booking, the upsell, the taxi, the review — each begins as a question. The Companion answers them all, and closes what it answers. ',
      hi: 'No OTA in between.',
    },
  },
  knows: {
    title: 'It Knows Your Hotel Like Your Best Employee.',
    lead: 'Hotel Companion understands every part of your operation.',
    /* v3 copy deck {#06} — one insider line per column, gold caption style */
    insiderProperty: 'Knows room 214 has the best sunset view.',
    insiderDestination: 'Knows where the locals eat on a Tuesday.',
    property: [
      'Every room.',
      'Every restaurant.',
      'Every menu.',
      'Every service.',
      'Every amenity.',
      'Every policy.',
      'Every promotion.',
      'Every department.',
      'Every operating procedure.',
      'Every recommendation.',
    ],
    destinationLead: 'It also understands your destination.',
    destination: [
      'Restaurants.',
      'Nightlife.',
      'Shopping.',
      'Culture.',
      'Activities.',
      'Transportation.',
      'Medical services.',
      'Local events.',
      'Hidden gems.',
    ],
    close: [
      'Everything your guests need.',
      'Everything your team already knows.',
      'Available instantly through natural conversation.',
    ],
  },
  intelligence: {
    /* v3 copy deck {#07} — merged Intelligence & Execution headline */
    title: 'Every conversation becomes intelligence — and execution.',
    items: [
      'Guest intent',
      'Guest preferences',
      'Revenue opportunities',
      'Operational bottlenecks',
      'Frequently requested services',
      'Knowledge gaps',
      'Maintenance trends',
      'Department workload',
      'Guest satisfaction drivers',
      'Commercial insights',
    ],
    close: ['Every interaction strengthens your operation.', 'Every conversation helps your hotel improve.'],
  },
  /* v3 copy deck {#08} — the Companion OS quiet band (old 10 compressed).
     Old execution/enterpriseIntel/convergence copy deleted per deck {#07}. */
  companionOs: {
    line: 'Built on Companion OS — the intelligence platform behind every Companion.',
    link: 'Meet the platform →',
  },
  liveInDays: {
    title: 'Live in Days. Not Months.',
    beats: ['Deploy quickly.', 'Train effortlessly.', 'Create value immediately.'],
    body:
      'Hotel Companion integrates with your hospitality operation without lengthy implementations or disruptive change.',
    /* v3 copy deck {#09} — two closing sentences become one */
    close: ['Your team keeps doing what it does best — every interaction, better.'],
  },
  foundingPartner: {
    title: 'Founding Partner Program',
    lead: 'We’re partnering with a limited number of innovative hotel groups to define the future of intelligent hospitality.',
    receiveLead: 'Founding Partners receive:',
    items: [
      'Priority onboarding',
      'Direct collaboration with our product team',
      'Executive support',
      'Preferred commercial terms',
      'Early access to new capabilities',
      'The opportunity to help shape the future of Companion OS.',
    ],
  },
  actionTabs: {
    deviceLabel: 'MarAzul Riviera Maya',
    tabs: [
      {
        label: 'Suite upgrade',
        guest: '“Is it possible to upgrade to an ocean-view suite for the rest of my stay?”',
        reply:
          '“Wonderful news—an Ocean-View Suite is open. $250/night, with a private terrace and direct sea views. Shall I have the front desk confirm the upgrade?”',
        outcome: 'One upgrade. Investment: covered.',
      },
      {
        label: 'Spa',
        guest: '“Do you have a spa?”',
        reply:
          '“Our Cenote spa is open 9am to 8pm daily. The Maya chocolate ritual is our most requested experience—shall I reserve it for tomorrow?”',
        outcome: 'A treatment booked, not a question deflected.',
      },
      {
        label: 'Late checkout',
        guest: '“Can we check out at 1pm?”',
        reply:
          '“Yes—late checkout until 1pm is available for your room. I have noted it with the front desk.”',
        outcome: 'Front Office notified. Nothing forgotten.',
      },
      {
        label: 'Maintenance',
        guest: '“The air conditioning in our room has stopped working.”',
        reply:
          '“I am alerting Engineering right now. Could you confirm your room number? Someone will be with you shortly.”',
        outcome: 'Engineering alerted at 2 AM. No dead end.',
      },
    ],
  },
  dashboard: {
    title: 'Command centre',
    resolvedLabel: 'resolved by the assistant',
    escalatedLabel: 'escalated to your team',
    metrics: [
      { label: 'Questions this month', value: '4,820' },
      { label: 'Languages detected', value: '12' },
      { label: 'Requests routed', value: '1,140' },
      { label: 'Avg. first response', value: 'Instant' },
    ],
    properties: [
      { name: 'MarAzul Riviera Maya', value: '1,908' },
      { name: 'Casa Ventana Tulum', value: '1,472' },
      { name: 'Hacienda del Mar', value: '1,440' },
    ],
  },
  otaStake: {
    /* NEEDS CONFIRM: figure, comparison and source — placeholder, wired to swap. */
    eyebrow: 'THE COST OF INTERMEDIARIES',
    figure: '2–3×',
    caption:
      'An OTA booking can cost 2–3× more than a direct one — 18–30% commission vs. 5–12% all-in.',
    source: 'Source: Kalibri Labs.',
    compare: [
      { label: 'OTA booking', pct: 30, note: '18–30%', accent: false },
      { label: 'Direct booking', pct: 12, note: '5–12%', accent: true },
    ],
  },
  journey: {
    /* v3 Phase 1 {#04}: the five explanation captions and the PRE/DURING/AFTER
       act bullets are deleted per the copy deck; titles, tally and the tablet
       stay for the Phase 3 arc rebuild.
       Tally values (+$250/+$312/+$402): ILLUSTRATIVE — audit before production promotion */
    tallyLabel: 'Revenue this stay',
    steps: [
      { title: 'They book direct.', screen: 'home' as ScreenId, tally: '+$0' },
      { title: 'The first upsell, before arrival.', screen: 'upgrade' as ScreenId, tally: '+$250' },
      { title: 'Every answer is a picture.', screen: 'beach' as ScreenId, tally: '+$250' },
      { title: 'Room service, tapped not typed.', screen: 'roomservice' as ScreenId, tally: '+$312' },
      { title: 'Wellness, booked in one tap.', screen: 'spa' as ScreenId, tally: '+$402' },
      { title: 'The review earns the next booking.', screen: 'followup' as ScreenId, tally: '+$402' },
    ],
  },
  surfaces2029: {
    title: 'One conversation. Every screen in the guest’s world.',
    caption: 'The interface adapts to the surface. The intelligence stays the same.',
    intent: '“Best beach near here?”',
    emergingLabel: 'Emerging',
    items: [
      { id: 'tablet', label: 'In-room tablet' },
      { id: 'phone', label: 'Phone' },
      { id: 'laptop', label: 'Web' },
      { id: 'watch', label: 'Watch' },
      { id: 'qr', label: 'QR' },
      { id: 'call', label: 'Voice call' },
      { id: 'ar', label: 'AR glasses', emerging: true },
      { id: 'ambient', label: 'Ambient display', emerging: true },
    ],
  },
  faq: {
    /* v3 copy deck {#12} — homepage keeps 4; the other 4 move to /faq */
    title: 'Frequently Asked Questions',
    allLink: 'All questions →',
    items: [
      {
        q: 'What is Hotel Companion?',
        a: 'Hotel Companion is the Voice-First Guest Intelligence Platform that helps hotels deliver exceptional hospitality while increasing revenue and improving operational performance.',
      },
      {
        q: 'How do guests interact with Hotel Companion?',
        a: 'Guests can communicate naturally through voice or text using in-room tablets, mobile devices, QR codes, and future conversational touchpoints.',
      },
      {
        q: 'Can Hotel Companion increase hotel revenue?',
        a: 'Yes. Hotel Companion identifies personalized opportunities for room upgrades, dining, spa services, transportation, excursions, premium experiences, and other ancillary revenue opportunities through natural guest conversations.',
      },
      {
        q: 'Does Hotel Companion replace hotel staff?',
        a: 'No. It extends your team by instantly handling routine interactions, allowing staff to focus on the moments where human hospitality creates the greatest impact.',
      },
    ],
  },
  enterpriseLink: 'Enterprise',
  foundingCta: 'Become a Founding Partner',
  /* v3 Phase 4 D4: old section 15 copy deleted — the ask-bar closes the page. */
}

/* Copy source: HotelCompanion__Site_Copy_ES.md {#home}. Verbatim — do not edit here. */

const es: typeof en = {
  hero: {
    h1: 'Entiende a Cada Huésped. Aprovecha Cada Oportunidad.',
    positioning: 'La Plataforma de Inteligencia de Huéspedes por Voz para Hoteles.',
    lead1:
      'Cada conversación con un huésped es una oportunidad para brindar una hospitalidad excepcional, generar nuevos ingresos y fortalecer tu operación.',
    lead2:
      'Hotel Companion transforma las conversaciones naturales en experiencias personalizadas, inteligencia operativa y ejecución coordinada—disponible las 24 horas, en todos los idiomas, en cada punto de contacto.',
    primaryCta: 'Agenda una Demo',
    secondaryCta: 'Ver el Recorrido del Producto',
    /* v3 copy deck {#01} — mono proof line under the CTA row */
    proofLine: '0% COMISIÓN OTA · 24/7 · EN CADA IDIOMA · EN MARCHA EN DÍAS',
  },
  stake: {
    figure: '$160 mil millones',
    /* NEEDS CONFIRM: cifra exacta, reporte, año. */
    caption: 'En valor anual y ahorros operativos que la automatización con IA puede desbloquear para la hospitalidad.',
    source: 'Fuente: McKinsey.',
    /* v3 copy deck {#02} — línea única que reemplaza los dos párrafos de cierre */
    close: 'Lo rutinario, resuelto automáticamente — tu equipo, libre para los momentos que importan.',
  },
  revenueExample: {
    prompt: 'Un huésped pregunta, a las 10:14 PM:',
    guest: '“¿Es posible mejorar a una suite con vista al mar por el resto de mi estancia?”',
    context: 'El asistente ya sabe que hay una disponible.',
    reply:
      '“Excelentes noticias—hay una Suite con Vista al Mar disponible. $250/noche, con terraza privada y vista directa al mar. ¿Le pido a recepción que confirme la mejora?”',
    accept: '“Sí, por favor.”',
    close: ['Una mejora.', 'Inversión: cubierta.'],
  },
  whatItIsNot: {
    headline: 'No reemplaza tus sistemas. Entiende las conversaciones entre ellos.',
    beats: [
      'No es un PMS. No es un asistente genérico. No es otra app para descargar.',
      'Una sola capa inteligente que hace que todo lo que ya usas funcione mejor.',
    ],
    cta: 'Descubre cómo encaja',
  },
  trust: 'Creado para líderes de hospitalidad visionarios que están redefiniendo la experiencia del huésped.',
  conversation: {
    title: 'La Hospitalidad Comienza con una Conversación.',
    lead: 'Los momentos más importantes de la hospitalidad comienzan con una pregunta.',
    questions: [
      '“¿Me recomiendas un buen restaurante?”',
      '“¿Podemos quedarnos una noche más?”',
      '“Estamos celebrando nuestro aniversario.”',
      '“¿Podrían traer más toallas?”',
      '“¿Cuál es la mejor playa para el atardecer?”',
    ],
    beats: [
      'Cada conversación revela una intención.',
      'Cada solicitud crea una oportunidad.',
      'Cada respuesta moldea la experiencia del huésped.',
    ],
    close: 'Hotel Companion garantiza que esos momentos nunca se pierdan.',
  },
  employee: {
    title: 'Tu Empleado de Mayor Desempeño Nunca Duerme.',
    lead: 'Imagina darle a cada huésped acceso inmediato a tu mejor concierge.',
    bests: [
      'Tu mejor recepcionista.',
      'Tu mejor profesional de servicios al huésped.',
      'Tu mejor experto local.',
      'Tu mejor vendedor.',
      'Tu mejor embajador de marca.',
    ],
    cadence: ['Disponible al instante.', 'A toda hora.', 'Todos los días.', 'Sin aumentar tu plantilla.'],
    close:
      'Hotel Companion ofrece una hospitalidad consistente y personalizada a cada huésped, sin importar la ocupación, el nivel de personal o la hora del día.',
  },
  voice: {
    title: 'La Voz Es la Nueva Interfaz de la Hospitalidad.',
    beats: [
      'Los huéspedes no quieren otra aplicación.',
      'No quieren menús complicados.',
      'No quieren buscar entre información interminable.',
      'Simplemente quieren preguntar.',
    ],
    body:
      'Hotel Companion permite a los huéspedes interactuar de forma natural mediante la conversación, ya sea a través de una tablet en la habitación, su dispositivo móvil, un código QR o futuras experiencias por voz.',
    close: ['Sin capacitación.', 'Sin curva de aprendizaje.', 'Solo hospitalidad sin esfuerzo.'],
  },
  everyRoom: {
    title: 'Cada Habitación Tiene un Profesional Digital de Hospitalidad.',
    lead: 'Hotel Companion ayuda a los huéspedes al instante a:',
    items: [
      'Reservar restaurantes',
      'Agendar tratamientos de spa',
      'Pedir servicio a la habitación',
      'Mejorar su habitación',
      'Solicitar limpieza',
      'Programar transporte al aeropuerto',
      'Organizar celebraciones',
      'Descubrir experiencias locales',
      'Encontrar la playa perfecta',
      'Reservar excursiones',
      'Ubicar farmacias y hospitales',
      'Conocer todo sobre tu propiedad',
      'Recibir recomendaciones personalizadas',
      'Descubrir tu destino como un experto local de confianza',
    ],
    close: 'Cada respuesta refleja los estándares, el conocimiento y la personalidad de tu hotel.',
  },
  revenue: {
    title: 'Cada Conversación Es Ingreso.',
    /* v3 ADDENDUM_1 A1 — línea tesis; `hi` se renderiza en --champagne (Fase 3) */
    thesis: {
      pre: 'La reserva, la mejora, el taxi, la reseña — cada una empieza como una pregunta. El Companion las responde y las cierra. ',
      hi: 'Sin OTA de por medio.',
    },
  },
  knows: {
    title: 'Conoce Tu Hotel Como Tu Mejor Empleado.',
    lead: 'Hotel Companion entiende cada parte de tu operación.',
    /* v3 copy deck {#06} — una línea "insider" por columna, estilo gold caption */
    insiderProperty: 'Sabe que la 214 tiene la mejor vista del atardecer.',
    insiderDestination: 'Sabe dónde comen los locales un martes.',
    property: [
      'Cada habitación.',
      'Cada restaurante.',
      'Cada menú.',
      'Cada servicio.',
      'Cada amenidad.',
      'Cada política.',
      'Cada promoción.',
      'Cada departamento.',
      'Cada procedimiento operativo.',
      'Cada recomendación.',
    ],
    destinationLead: 'También entiende tu destino.',
    destination: [
      'Restaurantes.',
      'Vida nocturna.',
      'Compras.',
      'Cultura.',
      'Actividades.',
      'Transporte.',
      'Servicios médicos.',
      'Eventos locales.',
      'Joyas escondidas.',
    ],
    close: [
      'Todo lo que tus huéspedes necesitan.',
      'Todo lo que tu equipo ya sabe.',
      'Disponible al instante mediante una conversación natural.',
    ],
  },
  intelligence: {
    /* v3 copy deck {#07} — headline de Inteligencia y Ejecución fusionadas */
    title: 'Cada conversación se convierte en inteligencia — y en ejecución.',
    items: [
      'Intención del huésped',
      'Preferencias del huésped',
      'Oportunidades de ingreso',
      'Cuellos de botella operativos',
      'Servicios solicitados con frecuencia',
      'Vacíos de conocimiento',
      'Tendencias de mantenimiento',
      'Carga de trabajo por departamento',
      'Factores de satisfacción del huésped',
      'Perspectivas comerciales',
    ],
    close: ['Cada interacción fortalece tu operación.', 'Cada conversación ayuda a tu hotel a mejorar.'],
  },
  /* v3 copy deck {#08} — banda silenciosa de Companion OS (antigua 10 comprimida).
     El copy antiguo de execution/enterpriseIntel/convergence se elimina según deck {#07}. */
  companionOs: {
    line: 'Construido sobre Companion OS — la plataforma de inteligencia detrás de cada Companion.',
    link: 'Conoce la plataforma →',
  },
  liveInDays: {
    title: 'En Marcha en Días. No en Meses.',
    beats: ['Implementa rápido.', 'Capacita sin esfuerzo.', 'Genera valor de inmediato.'],
    body:
      'Hotel Companion se integra a tu operación hotelera sin implementaciones prolongadas ni cambios disruptivos.',
    /* v3 copy deck {#09} — las dos frases de cierre se vuelven una */
    close: ['Tu equipo sigue haciendo lo que mejor sabe hacer — cada interacción, mejor.'],
  },
  foundingPartner: {
    title: 'Programa de Socios Fundadores',
    lead: 'Nos estamos asociando con un número limitado de grupos hoteleros innovadores para definir el futuro de la hospitalidad inteligente.',
    receiveLead: 'Los Socios Fundadores reciben:',
    items: [
      'Incorporación prioritaria',
      'Colaboración directa con nuestro equipo de producto',
      'Soporte ejecutivo',
      'Condiciones comerciales preferentes',
      'Acceso anticipado a nuevas capacidades',
      'La oportunidad de ayudar a dar forma al futuro de Companion OS.',
    ],
  },
  actionTabs: {
    deviceLabel: 'MarAzul Riviera Maya',
    tabs: [
      {
        label: 'Mejora de suite',
        guest: '“¿Es posible mejorar a una suite con vista al mar por el resto de mi estancia?”',
        reply:
          '“Excelentes noticias—hay una Suite con Vista al Mar disponible. $250/noche, con terraza privada y vista directa al mar. ¿Le pido a recepción que confirme la mejora?”',
        outcome: 'Una mejora. Inversión: cubierta.',
      },
      {
        label: 'Spa',
        guest: '“¿Tienen servicio de spa?”',
        reply:
          '“Nuestro spa Cenote abre de 9am a 8pm todos los días. El ritual de chocolate maya es nuestra experiencia más solicitada—¿se lo reservo para mañana?”',
        outcome: 'Un tratamiento reservado, no una pregunta esquivada.',
      },
      {
        label: 'Salida tardía',
        guest: '“¿Podemos hacer el check-out a la 1pm?”',
        reply:
          '“Sí—la salida tardía hasta la 1pm está disponible para su habitación. Ya lo dejé anotado en recepción.”',
        outcome: 'Recepción notificada. Nada se olvida.',
      },
      {
        label: 'Mantenimiento',
        guest: '“El aire acondicionado de nuestra habitación dejó de funcionar.”',
        reply:
          '“Estoy alertando a Mantenimiento en este momento. ¿Me confirma su número de habitación? Alguien estará con usted en breve.”',
        outcome: 'Mantenimiento alertado a las 2 AM. Nunca un callejón sin salida.',
      },
    ],
  },
  dashboard: {
    title: 'Centro de mando',
    resolvedLabel: 'resuelto por el asistente',
    escalatedLabel: 'escalado a tu equipo',
    metrics: [
      { label: 'Preguntas este mes', value: '4,820' },
      { label: 'Idiomas detectados', value: '12' },
      { label: 'Solicitudes enrutadas', value: '1,140' },
      { label: 'Primera respuesta', value: 'Inmediata' },
    ],
    properties: [
      { name: 'MarAzul Riviera Maya', value: '1,908' },
      { name: 'Casa Ventana Tulum', value: '1,472' },
      { name: 'Hacienda del Mar', value: '1,440' },
    ],
  },
  otaStake: {
    /* NEEDS CONFIRM: cifra, comparación y fuente — provisional, listo para reemplazar. */
    eyebrow: 'EL COSTO DE LOS INTERMEDIARIOS',
    figure: '2–3×',
    caption:
      'Una reserva por OTA puede costar 2–3× más que una directa — 18–30% de comisión frente a 5–12% todo incluido.',
    source: 'Fuente: Kalibri Labs.',
    compare: [
      { label: 'Reserva por OTA', pct: 30, note: '18–30%', accent: false },
      { label: 'Reserva directa', pct: 12, note: '5–12%', accent: true },
    ],
  },
  journey: {
    /* v3 Fase 1 {#04}: los cinco párrafos explicativos y los bullets
       ANTES/DURANTE/DESPUÉS se eliminan según el copy deck; títulos, ticker
       y tablet permanecen para el arco de la Fase 3.
       Tally values (+$250/+$312/+$402): ILLUSTRATIVE — audit before production promotion */
    tallyLabel: 'Ingresos de esta estancia',
    steps: [
      { title: 'Reservan directo.', screen: 'home' as ScreenId, tally: '+$0' },
      { title: 'La primera mejora, antes de llegar.', screen: 'upgrade' as ScreenId, tally: '+$250' },
      { title: 'Cada respuesta es una imagen.', screen: 'beach' as ScreenId, tally: '+$250' },
      { title: 'Servicio a cuarto, con un toque.', screen: 'roomservice' as ScreenId, tally: '+$312' },
      { title: 'Bienestar, reservado en un toque.', screen: 'spa' as ScreenId, tally: '+$402' },
      { title: 'La reseña gana la próxima reserva.', screen: 'followup' as ScreenId, tally: '+$402' },
    ],
  },
  surfaces2029: {
    title: 'Una conversación. Cada pantalla del mundo del huésped.',
    caption: 'La interfaz se adapta a la superficie. La inteligencia es la misma.',
    intent: '“¿La mejor playa cerca?”',
    emergingLabel: 'Emergente',
    items: [
      { id: 'tablet', label: 'Tablet en la habitación' },
      { id: 'phone', label: 'Teléfono' },
      { id: 'laptop', label: 'Web' },
      { id: 'watch', label: 'Reloj' },
      { id: 'qr', label: 'QR' },
      { id: 'call', label: 'Llamada de voz' },
      { id: 'ar', label: 'Lentes AR', emerging: true },
      { id: 'ambient', label: 'Pantalla ambiental', emerging: true },
    ],
  },
  faq: {
    /* v3 copy deck {#12} — el homepage conserva 4; las otras 4 pasan a /faq */
    title: 'Preguntas Frecuentes',
    allLink: 'Todas las preguntas →',
    items: [
      {
        q: '¿Qué es Hotel Companion?',
        a: 'Hotel Companion es la Plataforma de Inteligencia de Huéspedes por Voz que ayuda a los hoteles a brindar una hospitalidad excepcional mientras aumentan los ingresos y mejoran el desempeño operativo.',
      },
      {
        q: '¿Cómo interactúan los huéspedes con Hotel Companion?',
        a: 'Los huéspedes pueden comunicarse de forma natural por voz o texto usando tablets en la habitación, dispositivos móviles, códigos QR y futuros puntos de contacto conversacionales.',
      },
      {
        q: '¿Hotel Companion puede aumentar los ingresos del hotel?',
        a: 'Sí. Hotel Companion identifica oportunidades personalizadas de mejoras de habitación, gastronomía, servicios de spa, transporte, excursiones, experiencias premium y otras fuentes de ingreso complementario a través de conversaciones naturales con los huéspedes.',
      },
      {
        q: '¿Hotel Companion reemplaza al personal del hotel?',
        a: 'No. Extiende a tu equipo al atender al instante las interacciones rutinarias, permitiendo que el personal se enfoque en los momentos donde la hospitalidad humana genera el mayor impacto.',
      },
    ],
  },
  enterpriseLink: 'Enterprise',
  foundingCta: 'Conviértete en Socio Fundador',
  /* v3 Fase 4 D4: el copy de la antigua sección 15 se elimina — el ask-bar cierra la página. */
}

export const homeCopy: Localized<typeof en> = { en, es }
