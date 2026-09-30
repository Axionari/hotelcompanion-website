import type { Localized } from '../useCopy'

const en = {
  channelLine: 'VOICE & TEXT · MOBILE & DESKTOP WEB',
  channelNote: 'Telephone and WhatsApp connections are scoped for your pilot. In-room tablets offer a dedicated guest experience, with hardware and installation tailored to your property.',
  conversation: {
    label: 'Illustrative guest conversation', brand: 'Your hotel', channel: 'Before arrival · Mobile web',
    guest: 'We’re coming back for our anniversary. The ocean-view room, like last time?',
    reply: 'Welcome back. I can help you explore the options and send your anniversary preferences to the team.',
    cardTitle: 'The details that make it your stay.',
    cardBody: 'Room preferences. Arrival plans. Something worth celebrating.',
    footer: 'Your hotel’s voice. On the guest’s own phone.',
  },
  revenue: {
    eyebrow: '04 · Revenue that feels like hospitality',
    recommendationsTitle: 'Recommendations with context.',
    recommendationsBody: 'Use what the guest tells you to suggest relevant experiences, with the hotel’s approved prices and costs in view. Sometimes the right decision is no offer.',
    dealsTitle: 'A better reason to say yes.',
    dealsBody: 'Combine a purchase with a benefit the hotel approves. Dinner and spa with a suite upgrade, for example. A useful addition to the conversation.',
    exampleLabel: 'One possible combination', exampleTitle: 'Dinner. Spa. A little more room.',
    exampleBody: 'An experience package with a suite benefit, proposed when the guest’s interests and the hotel’s economics align.',
    conditions: 'Illustrative package · Price, availability and fulfillment require hotel confirmation.',
    controlLabel: 'Companion Control', controlTitle: 'Your hotel sets the boundaries.',
    controlBody: 'Approve prices, margins and permitted benefits. Review each new deal before it reaches a guest. Track proposals, acceptances and completed purchases separately.',
    explore: 'Explore three offer examples',
  },
  pilot: {
    body: 'Start with one property. Explore a pilot with no upfront software or implementation fee, and an agreed share of verified additional contribution.',
    primary: 'Explore a pilot',
    note: 'Pilot eligibility, connections, measurement and commercial terms agreed in advance.',
  },
}

const es: typeof en = {
  channelLine: 'VOZ Y TEXTO · WEB MÓVIL Y COMPUTADORA',
  channelNote: 'Las conexiones de teléfono y WhatsApp se definen para tu piloto. Las tablets en la habitación ofrecen una experiencia dedicada, con dispositivos e instalación adaptados a tu hotel.',
  conversation: {
    label: 'Conversación ilustrativa', brand: 'Tu hotel', channel: 'Antes de llegar · Web móvil',
    guest: 'Volvemos para nuestro aniversario. ¿La habitación con vista al mar, como la última vez?',
    reply: 'Qué gusto recibirlos de nuevo. Puedo mostrarles las opciones y compartir sus preferencias para el aniversario con el equipo.',
    cardTitle: 'Los detalles que hacen tu estancia.',
    cardBody: 'Tu habitación. Tus planes de llegada. Algo que celebrar.',
    footer: 'La voz de tu hotel. En el teléfono del huésped.',
  },
  revenue: {
    eyebrow: '04 · Ingresos que se sienten como hospitalidad',
    recommendationsTitle: 'Recomendaciones con contexto.',
    recommendationsBody: 'Sugiere experiencias relevantes a partir de lo que cuenta el huésped, tomando en cuenta los precios y costos aprobados por el hotel. A veces, lo correcto es no ofrecer nada.',
    dealsTitle: 'Una mejor razón para decir sí.',
    dealsBody: 'Combina una compra con un beneficio aprobado por el hotel. Cena y spa con una mejora a suite, por ejemplo. Una propuesta útil dentro de la conversación.',
    exampleLabel: 'Una combinación posible', exampleTitle: 'Cena. Spa. Un poco más de espacio.',
    exampleBody: 'Un paquete de experiencias con un beneficio de suite, propuesto cuando coinciden los intereses del huésped y la rentabilidad del hotel.',
    conditions: 'Paquete ilustrativo · Precio, disponibilidad y prestación requieren confirmación del hotel.',
    controlLabel: 'Companion Control', controlTitle: 'Tu hotel define los límites.',
    controlBody: 'Aprueba precios, márgenes y beneficios permitidos. Revisa cada nueva oferta antes de presentarla. Registra por separado propuestas, aceptaciones y compras completadas.',
    explore: 'Explora tres ejemplos de ofertas',
  },
  pilot: {
    body: 'Empieza con una propiedad. Explora un piloto sin pago inicial de software ni implementación, con una participación acordada en la contribución adicional verificada.',
    primary: 'Explora un piloto',
    note: 'Elegibilidad, conexiones, medición y términos comerciales acordados antes del piloto.',
  },
}

export const focusedHomeCopy: Localized<typeof en> = { en, es }
