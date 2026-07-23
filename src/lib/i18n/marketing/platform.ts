import type { Localized } from '../useCopy'
import type { ScreenId } from './deviceScreens'

/* Copy source: HotelCompanion__Site_Copy.md {#platform}. Verbatim. */

const en = {
  /* P5 editorial rollout: numbered-act labels + hero proof chips.
     Labels only — every reading line below is the approved site copy. */
  acts: {
    voice: 'THE VOICE',
    surfaces: 'THE SURFACES',
    knowledge: 'THE KNOWLEDGE',
    lifecycle: 'THE LIFECYCLE',
    action: 'THE ACTION',
    intelligence: 'THE INTELLIGENCE',
    command: 'THE COMMAND CENTRE',
    faq: 'COMMON QUESTIONS',
    next: 'NEXT STEP',
  },
  heroChips: ['VOICE-FIRST', 'IN-ROOM TABLET', 'QR CODES', 'WEB WIDGET', 'ANY LANGUAGE', 'MULTI-PROPERTY'],
  hero: {
    title: 'One Platform. Every Guest Interaction.',
    positioning: 'The Voice-First Guest Intelligence Platform built for modern hospitality.',
    body:
      'Hotel Companion combines conversational AI, organizational knowledge, operational execution, and enterprise intelligence into a single platform that helps hotels deliver exceptional guest experiences while increasing revenue and improving operations.',
  },
  /* P5.7 — RC Features "One Conversation" + "Every way of speaking" (the big
     orb). Adapted to HC: "host" → "Companion", "mid-order" → "mid-conversation". */
  oneConversation: {
    label: 'ONE CONVERSATION',
    statement: 'Tap. Type. Say.',
    deck: 'Same Companion. Same conversation. Guests move between touch, typing, and voice mid-conversation — and nothing breaks, repeats, or starts over.',
  },
  everyWay: {
    eyebrow: 'VOICE-FIRST',
    statement: 'Every way of speaking.',
    line: 'Guests talk the way they talk. The Companion listens, thinks, and answers — out loud.',
    states: ['Idle', 'Listening', 'Thinking', 'Speaking'],
  },
  voiceFirst: {
    title: 'Voice-First by Design.',
    beats: [
      'Hospitality begins with conversation.',
      'Guests shouldn’t learn software.',
      'Software should understand guests.',
    ],
    body1:
      'Hotel Companion allows guests to speak naturally, just as they would with your best employee.',
    body2:
      'Whether asking for fresh towels, booking dinner, upgrading a room, or finding the perfect beach, every interaction feels immediate, effortless, and human.',
    availableLead: 'Available through:',
    surfaces: [
      'In-room tablets',
      'Mobile devices',
      'QR codes',
      'Guest messaging',
      'Future voice-enabled experiences',
    ],
    close: ['No commands.', 'No menus.', 'No learning curve.', 'Just conversation.'],
  },
  yourVoice: {
    beats: ['Every hotel has a personality. Now your assistant does too.'],
    /* One guest question, answered five ways — the voice-morph interaction. */
    morphQuestion: 'Where should we have dinner tonight?',
    morphDeviceLabel: 'MarAzul Riviera Maya',
    morphStatus: 'Speaking',
    voiceTag: 'Voice',
    voices: [
      {
        name: 'Warm & Local',
        desc: 'Feels like a friend who knows the area.',
        reply: 'Casa Mariposa, on the plaza — family run, and the fish comes in that morning. Want me to hold a table at eight?',
      },
      {
        name: 'Refined Concierge',
        desc: 'Polished, precise, always professional.',
        reply: 'I would recommend Almar, our chef’s tasting room. A table for two at eight o’clock — shall I confirm it?',
      },
      {
        name: 'Barefoot Luxury',
        desc: 'Relaxed but impeccable—like the hotel itself.',
        reply: 'Almar, right on the sand — barefoot is welcome. Eight o’clock, just as the sun goes down. Shall I keep it for you?',
      },
      {
        name: 'Playful Explorer',
        desc: 'Adventurous, fun, expressive.',
        reply: 'Two ways to go: tacos where the fishermen eat, or Almar on the beach. Say the word and I’ll book either one.',
      },
      {
        name: 'Zen & Mindful',
        desc: 'Calm, unhurried, present.',
        reply: 'Almar is quiet at eight, with the water close by. Take your time deciding — I’ll hold a table for you.',
      },
    ],
    close: ['It doesn’t sound like AI.', 'It sounds like your hotel.'],
  },
  knowsProperty: {
    lead: 'Hotel Companion understands every detail of your operation.',
    items: [
      'Room categories.',
      'Restaurants.',
      'Bars.',
      'Spa.',
      'Pools.',
      'Beach clubs.',
      'Golf.',
      'Meeting rooms.',
      'Business services.',
      'Kids programs.',
      'Parking.',
      'Transportation.',
      'Accessibility.',
      'Loyalty benefits.',
      'Operating hours.',
      'Menus.',
      'Amenities.',
      'Special offers.',
      'Policies.',
      'FAQs.',
    ],
  },
  destination: {
    title: 'Knows Your Destination Like a Local Expert.',
    beats: ['Your guests aren’t just visiting a hotel.', 'They’re exploring a destination.'],
    lead: 'Hotel Companion provides personalized recommendations for:',
    items: [
      'Restaurants',
      'Hidden gems',
      'Local experiences',
      'Museums',
      'Nightlife',
      'Shopping',
      'Beaches',
      'Parks',
      'Adventure tours',
      'Family activities',
      'Transportation',
      'Medical services',
      'Pharmacies',
      'Hospitals',
      'Weather',
      'Seasonal events',
      'Cultural attractions',
    ],
  },
  reservations: {
    items: [
      'Restaurants.',
      'Spa treatments.',
      'Golf tee times.',
      'Activities.',
      'Airport transportation.',
      'Meeting rooms.',
      'Private dining.',
      'Beach cabanas.',
      'Fitness classes.',
      'Excursions.',
      'Kids clubs.',
      'VIP experiences.',
    ],
  },
  requestAction: {
    /* P5.13 — pass-through diagram labels (RC "Nothing new to operate"). */
    flow: { label1: 'CONTEXT ATTACHED', node: 'Hotel Companion', label2: 'ROUTED · NOTHING RE-KEYED', caption: 'THE TEAMS YOU ALREADY RUN' },
    /* Left-hand label on each routing-flow row. */
    routingFrom: 'Guest request',
    departments: [
      'Housekeeping.',
      'Engineering.',
      'Front Desk.',
      'Guest Services.',
      'Transportation.',
      'Food & Beverage.',
      'Spa.',
      'Security.',
      'Management.',
    ],
    close: ['Every request is tracked from creation to completion.', 'Nothing is forgotten.', 'Nothing falls through the cracks.'],
  },
  revenueIntel: {
    title: 'Revenue Intelligence.',
    lead: 'Every conversation reveals buying intent.',
    body:
      'Hotel Companion continuously identifies opportunities to deliver additional value through personalized recommendations.',
    items: [
      'Room upgrades.',
      'Suite upgrades.',
      'Premium views.',
      'Late checkout.',
      'Early check-in.',
      'Spa treatments.',
      'Dining experiences.',
      'Wine pairings.',
      'Transportation.',
      'Excursions.',
      'Golf.',
      'Celebration packages.',
      'Retail.',
      'VIP services.',
    ],
  },
  guestMemory: {
    body: 'Hotel Companion continuously builds a richer understanding of every returning guest.',
    items: [
      'Preferred room types.',
      'Favorite restaurants.',
      'Dietary preferences.',
      'Languages.',
      'Accessibility needs.',
      'Celebrations.',
      'Past stays.',
      'Previous conversations.',
    ],
  },
  guestIntel: {
    title: 'Guest Intelligence.',
    lead: 'Behind every conversation is valuable intelligence.',
    body: 'Hotel Companion continuously understands:',
    items: [
      'Guest intent.',
      'Frequently asked questions.',
      'Popular services.',
      'Emerging trends.',
      'Knowledge gaps.',
      'Guest preferences.',
      'Operational friction.',
      'Commercial opportunities.',
    ],
  },
  dashboards: {
    close: ['Don’t just understand what happened.', 'Understand why.'],
    live: 'Watching from day one.',
  },
  enterpriseReady: {
    title: 'Enterprise-Ready.',
    close: 'Ready for a single boutique hotel or a global hospitality portfolio.',
  },
  notGenericAi: {
    body: [
      'Ask a general-purpose AI about your spa hours.',
      'It will guess, invent an answer, or tell the guest to check your website.',
    ],
    beats: [
      'The guest was already on your website.',
      'They didn’t need a redirect.',
      'They needed a conversation.',
    ],
    close: 'That is the difference between general intelligence and trained, contextual knowledge.',
  },
  lifecycle: {
    title: 'With Your Guests From Arrival to Review.',
    stages: [
      {
        name: 'Before they arrive',
        body: 'The assistant link arrives in the booking confirmation. Guests explore the property, plan meals, and book treatments before they’ve packed their bags.',
      },
      {
        name: 'While they’re there',
        body: 'In-room tablets and QR codes in every space—lobby, pool, spa, restaurant. Every question answered instantly, in any language, at any hour.',
      },
      {
        name: 'After they leave',
        body: 'A warm follow-up with a direct link to leave a review. Happy guests become public advocates.',
      },
    ],
  },
  /* P5.5 — the JourneyWalkthrough sequence (stage text left, tablet screen
     right). Screen ids map to deviceScreens; tally carries the revenue story. */
  journey: {
    tallyLabel: 'Revenue this stay',
    steps: [
      { act: 'PRE', title: 'They book direct.', caption: 'The Companion sells the property, answers everything, and closes the booking — no OTA commission.', screen: 'home' as ScreenId, tally: '+$0' },
      { act: 'PRE', title: 'The first upsell, before arrival.', caption: 'An ocean-view suite offered while they are still choosing.', screen: 'upgrade' as ScreenId, tally: '+$250' },
      { act: 'DURING', title: 'Every answer is a picture.', caption: 'They ask for the best cenote. They see it.', screen: 'beach' as ScreenId, tally: '+$250' },
      { act: 'DURING', title: 'Room service, tapped not typed.', caption: 'A dish grid, an order total, straight to the kitchen.', screen: 'roomservice' as ScreenId, tally: '+$312' },
      { act: 'DURING', title: 'Wellness, booked in one tap.', caption: 'Treatments with real availability, not a phone number.', screen: 'spa' as ScreenId, tally: '+$402' },
      { act: 'AFTER', title: 'The review earns the next booking.', caption: 'A warm follow-up, a direct link, and a guest who returns direct.', screen: 'followup' as ScreenId, tally: '+$402' },
    ],
  },
  issueDetection: {
    lead: 'A leak. A broken AC. No hot water.',
    features: [
      { name: 'Multilingual detection', desc: 'Recognizes maintenance and emergency intent in any language.' },
      { name: 'Room number captured', desc: 'Asks the guest for their room automatically.' },
      {
        name: 'Two-stage alerts',
        desc: 'First alert the moment the issue is reported; a second the moment the room number is confirmed.',
      },
      { name: 'Guest always reassured', desc: 'A warm, immediate response. Never a dead end.' },
    ],
  },
  /* Panel labels for the two-panel knowledge split (PC's "YOUR HOTEL / YOUR DESTINATION"). */
  knowledgeSplit: {
    property: 'Your Hotel',
    destination: 'Your Destination',
  },
  /* The 2 AM exchange that drives the two-stage alert flow. */
  issueAlert: {
    guest: 'There’s water on the bathroom floor.',
    reply: 'I’m sorry about that — I’ve alerted Engineering right now. Which room are you in?',
    deviceLabel: 'MarAzul Riviera Maya · 02:14',
    ticketTag: 'Request · Engineering',
    ticketStatus: 'Open',
  },
  /* Command-centre mockup chrome and sample figures. NEEDS REAL DATA before launch. */
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
  channels: {
    lead: 'Guests reach the assistant wherever they already are.',
    items: [
      { name: 'In-room tablet', desc: 'Voice-first, always powered, always connected. The concierge in every room.' },
      {
        name: 'QR codes',
        desc: 'Print and place anywhere: rooms, lobby, pool deck, restaurant menus, key-card sleeves. Scan and the assistant opens instantly. No app to download.',
      },
      {
        name: 'Website widget',
        desc: 'Embed the assistant on your site. Guests get answers before they’ve even booked.',
      },
      {
        name: 'Shareable link',
        desc: 'Drop it in booking confirmations, pre-arrival emails, or WhatsApp. One tap and the conversation begins.',
      },
      {
        name: 'Voice, and whatever comes next',
        desc: 'Off-property, a strong connection enables voice; a weak one falls back gracefully to text.',
      },
    ],
  },
  finalCta: {
    title: 'Hospitality Runs on Conversations.',
    beats: [
      'Deliver unforgettable guest experiences.',
      'Increase ancillary revenue.',
      'Empower every department.',
      'Understand every interaction.',
    ],
    cta: 'Book a Demo',
  },
}

const es: typeof en = {
  acts: {
    voice: 'LA VOZ',
    surfaces: 'LAS SUPERFICIES',
    knowledge: 'EL CONOCIMIENTO',
    lifecycle: 'EL CICLO DE LA ESTANCIA',
    action: 'LA ACCIÓN',
    intelligence: 'LA INTELIGENCIA',
    command: 'EL CENTRO DE MANDO',
    faq: 'PREGUNTAS FRECUENTES',
    next: 'SIGUIENTE PASO',
  },
  heroChips: ['LA VOZ PRIMERO', 'TABLET EN LA HABITACIÓN', 'CÓDIGOS QR', 'WIDGET WEB', 'CUALQUIER IDIOMA', 'MULTIPROPIEDAD'],
  hero: {
    title: 'Una Plataforma. Cada Interacción con el Huésped.',
    positioning: 'La Plataforma de Inteligencia de Huéspedes por Voz creada para la hospitalidad moderna.',
    body:
      'Hotel Companion combina IA conversacional, conocimiento organizacional, ejecución operativa e inteligencia empresarial en una sola plataforma que ayuda a los hoteles a brindar experiencias excepcionales mientras aumentan los ingresos y mejoran las operaciones.',
  },
  oneConversation: {
    label: 'UNA CONVERSACIÓN',
    statement: 'Toca. Escribe. Habla.',
    deck: 'El mismo Companion. La misma conversación. Los huéspedes alternan entre el toque, el texto y la voz a mitad de la conversación — y nada se rompe, se repite ni vuelve a empezar.',
  },
  everyWay: {
    eyebrow: 'LA VOZ PRIMERO',
    statement: 'Cada forma de hablar.',
    line: 'Los huéspedes hablan como hablan. El Companion escucha, piensa y responde — en voz alta.',
    states: ['Inactivo', 'Escuchando', 'Pensando', 'Hablando'],
  },
  voiceFirst: {
    title: 'Diseñado con la Voz Primero.',
    beats: [
      'La hospitalidad comienza con una conversación.',
      'Los huéspedes no deberían aprender a usar software.',
      'El software debería entender a los huéspedes.',
    ],
    body1:
      'Hotel Companion permite a los huéspedes hablar con naturalidad, tal como lo harían con tu mejor empleado.',
    body2:
      'Ya sea pidiendo toallas limpias, reservando una cena, mejorando una habitación o encontrando la playa perfecta, cada interacción se siente inmediata, sencilla y humana.',
    availableLead: 'Disponible a través de:',
    surfaces: [
      'Tablets en la habitación',
      'Dispositivos móviles',
      'Códigos QR',
      'Mensajería con el huésped',
      'Futuras experiencias por voz',
    ],
    close: ['Sin comandos.', 'Sin menús.', 'Sin curva de aprendizaje.', 'Solo conversación.'],
  },
  yourVoice: {
    beats: ['Cada hotel tiene una personalidad. Ahora tu asistente también.'],
    /* Una sola pregunta del huésped, respondida de cinco formas. */
    morphQuestion: '¿Dónde deberíamos cenar esta noche?',
    morphDeviceLabel: 'MarAzul Riviera Maya',
    morphStatus: 'Hablando',
    voiceTag: 'Voz',
    voices: [
      {
        name: 'Cálido y Local',
        desc: 'Se siente como un amigo que conoce la zona.',
        reply: 'Casa Mariposa, en la plaza — es familiar y el pescado llega esa misma mañana. ¿Te aparto una mesa a las ocho?',
      },
      {
        name: 'Concierge Refinado',
        desc: 'Pulido, preciso, siempre profesional.',
        reply: 'Le recomiendo Almar, la sala de degustación de nuestro chef. Una mesa para dos a las ocho, ¿la confirmo?',
      },
      {
        name: 'Lujo Descalzo',
        desc: 'Relajado pero impecable—como el hotel mismo.',
        reply: 'Almar, justo sobre la arena — descalzo es bienvenido. A las ocho, justo cuando cae el sol. ¿Se la aparto?',
      },
      {
        name: 'Explorador Alegre',
        desc: 'Aventurero, divertido, expresivo.',
        reply: 'Dos caminos: tacos donde comen los pescadores, o Almar en la playa. Dime cuál y te reservo el que quieras.',
      },
      {
        name: 'Zen y Consciente',
        desc: 'Tranquilo, sin prisas, presente.',
        reply: 'Almar está tranquilo a las ocho, con el agua muy cerca. Tómate tu tiempo para decidir — te aparto una mesa.',
      },
    ],
    close: ['No suena como IA.', 'Suena como tu hotel.'],
  },
  knowsProperty: {
    lead: 'Hotel Companion entiende cada detalle de tu operación.',
    items: [
      'Categorías de habitación.',
      'Restaurantes.',
      'Bares.',
      'Spa.',
      'Albercas.',
      'Clubes de playa.',
      'Golf.',
      'Salas de juntas.',
      'Servicios de negocios.',
      'Programas para niños.',
      'Estacionamiento.',
      'Transporte.',
      'Accesibilidad.',
      'Beneficios de lealtad.',
      'Horarios de operación.',
      'Menús.',
      'Amenidades.',
      'Ofertas especiales.',
      'Políticas.',
      'Preguntas frecuentes.',
    ],
  },
  destination: {
    title: 'Conoce Tu Destino Como un Experto Local.',
    beats: ['Tus huéspedes no solo visitan un hotel.', 'Están explorando un destino.'],
    lead: 'Hotel Companion ofrece recomendaciones personalizadas de:',
    items: [
      'Restaurantes',
      'Joyas escondidas',
      'Experiencias locales',
      'Museos',
      'Vida nocturna',
      'Compras',
      'Playas',
      'Parques',
      'Tours de aventura',
      'Actividades familiares',
      'Transporte',
      'Servicios médicos',
      'Farmacias',
      'Hospitales',
      'Clima',
      'Eventos de temporada',
      'Atracciones culturales',
    ],
  },
  reservations: {
    items: [
      'Restaurantes.',
      'Tratamientos de spa.',
      'Horarios de golf.',
      'Actividades.',
      'Transporte al aeropuerto.',
      'Salas de juntas.',
      'Cenas privadas.',
      'Cabañas de playa.',
      'Clases de fitness.',
      'Excursiones.',
      'Clubes para niños.',
      'Experiencias VIP.',
    ],
  },
  requestAction: {
    flow: { label1: 'CONTEXTO ADJUNTO', node: 'Hotel Companion', label2: 'ENRUTADA · SIN VOLVER A TECLEAR', caption: 'LOS EQUIPOS QUE YA OPERAN' },
    /* Etiqueta izquierda de cada fila del flujo de enrutamiento. */
    routingFrom: 'Solicitud del huésped',
    departments: [
      'Ama de Llaves.',
      'Ingeniería.',
      'Recepción.',
      'Servicios al Huésped.',
      'Transporte.',
      'Alimentos y Bebidas.',
      'Spa.',
      'Seguridad.',
      'Gerencia.',
    ],
    close: ['Cada solicitud se da seguimiento desde su creación hasta su cumplimiento.', 'Nada se olvida.', 'Nada se pierde.'],
  },
  revenueIntel: {
    title: 'Inteligencia de Ingresos.',
    lead: 'Cada conversación revela una intención de compra.',
    body:
      'Hotel Companion identifica continuamente oportunidades para entregar valor adicional mediante recomendaciones personalizadas.',
    items: [
      'Mejoras de habitación.',
      'Mejoras a suite.',
      'Vistas premium.',
      'Salida tardía.',
      'Entrada anticipada.',
      'Tratamientos de spa.',
      'Experiencias gastronómicas.',
      'Maridajes de vino.',
      'Transporte.',
      'Excursiones.',
      'Golf.',
      'Paquetes de celebración.',
      'Retail.',
      'Servicios VIP.',
    ],
  },
  guestMemory: {
    body: 'Hotel Companion construye continuamente una comprensión más rica de cada huésped que regresa.',
    items: [
      'Tipos de habitación preferidos.',
      'Restaurantes favoritos.',
      'Preferencias alimentarias.',
      'Idiomas.',
      'Necesidades de accesibilidad.',
      'Celebraciones.',
      'Estancias anteriores.',
      'Conversaciones previas.',
    ],
  },
  guestIntel: {
    title: 'Inteligencia del Huésped.',
    lead: 'Detrás de cada conversación hay inteligencia valiosa.',
    body: 'Hotel Companion entiende continuamente:',
    items: [
      'Intención del huésped.',
      'Preguntas frecuentes.',
      'Servicios populares.',
      'Tendencias emergentes.',
      'Vacíos de conocimiento.',
      'Preferencias del huésped.',
      'Fricción operativa.',
      'Oportunidades comerciales.',
    ],
  },
  dashboards: {
    close: ['No solo entiendas qué pasó.', 'Entiende por qué.'],
    live: 'Observando desde el primer día.',
  },
  enterpriseReady: {
    title: 'Listo para la Empresa.',
    close: 'Listo para un solo hotel boutique o para un portafolio hotelero global.',
  },
  notGenericAi: {
    body: [
      'Pregúntale a una IA de propósito general por los horarios de tu spa.',
      'Adivinará, inventará una respuesta o le dirá al huésped que revise tu sitio web.',
    ],
    beats: [
      'El huésped ya estaba en tu sitio web.',
      'No necesitaba una redirección.',
      'Necesitaba una conversación.',
    ],
    close: 'Esa es la diferencia entre la inteligencia general y el conocimiento entrenado y contextual.',
  },
  lifecycle: {
    title: 'Con Tus Huéspedes Desde la Llegada Hasta la Reseña.',
    stages: [
      {
        name: 'Antes de que lleguen',
        body: 'El enlace al asistente llega en su confirmación de reserva. Los huéspedes exploran la propiedad, planean comidas y reservan tratamientos antes de hacer las maletas.',
      },
      {
        name: 'Mientras están ahí',
        body: 'Tablets en la habitación y códigos QR en cada espacio—lobby, alberca, spa, restaurante. Cada pregunta respondida al instante, en cualquier idioma, a cualquier hora.',
      },
      {
        name: 'Después de que se van',
        body: 'Un seguimiento cálido con un enlace directo para dejar una reseña. Los huéspedes felices se vuelven promotores públicos.',
      },
    ],
  },
  journey: {
    tallyLabel: 'Ingresos de esta estancia',
    steps: [
      { act: 'ANTES', title: 'Reservan directo.', caption: 'El Companion vende la propiedad, responde todo y cierra la reserva — sin comisión de OTA.', screen: 'home' as ScreenId, tally: '+$0' },
      { act: 'ANTES', title: 'La primera mejora, antes de llegar.', caption: 'Una suite con vista al mar ofrecida mientras aún están eligiendo.', screen: 'upgrade' as ScreenId, tally: '+$250' },
      { act: 'DURANTE', title: 'Cada respuesta es una imagen.', caption: 'Preguntan por el mejor cenote. Lo ven.', screen: 'beach' as ScreenId, tally: '+$250' },
      { act: 'DURANTE', title: 'Servicio a cuarto, con un toque.', caption: 'Una parrilla de platillos, un total, directo a la cocina.', screen: 'roomservice' as ScreenId, tally: '+$312' },
      { act: 'DURANTE', title: 'Bienestar, reservado en un toque.', caption: 'Tratamientos con disponibilidad real, no un número de teléfono.', screen: 'spa' as ScreenId, tally: '+$402' },
      { act: 'DESPUÉS', title: 'La reseña gana la próxima reserva.', caption: 'Un seguimiento cálido, un enlace directo y un huésped que vuelve directo.', screen: 'followup' as ScreenId, tally: '+$402' },
    ],
  },
  issueDetection: {
    lead: 'Una fuga. Un aire acondicionado descompuesto. Sin agua caliente.',
    features: [
      { name: 'Detección multilingüe', desc: 'Reconoce la intención de mantenimiento y emergencia en cualquier idioma.' },
      { name: 'Número de habitación capturado', desc: 'Le pide al huésped su habitación automáticamente.' },
      {
        name: 'Alertas en dos etapas',
        desc: 'Una primera alerta en cuanto se reporta el problema; una segunda en cuanto se confirma el número de habitación.',
      },
      { name: 'Huésped siempre tranquilizado', desc: 'Una respuesta cálida e inmediata. Nunca un callejón sin salida.' },
    ],
  },
  /* Etiquetas de los dos paneles del bloque de conocimiento. */
  knowledgeSplit: {
    property: 'Tu Hotel',
    destination: 'Tu Destino',
  },
  /* El intercambio de las 2 AM que impulsa el flujo de alertas en dos etapas. */
  issueAlert: {
    guest: 'Hay agua en el piso del baño.',
    reply: 'Lamento mucho eso — ya avisé a Ingeniería en este momento. ¿En qué habitación se encuentra?',
    deviceLabel: 'MarAzul Riviera Maya · 02:14',
    ticketTag: 'Solicitud · Ingeniería',
    ticketStatus: 'Abierto',
  },
  /* Cifras de ejemplo del centro de mando. NEEDS REAL DATA antes del lanzamiento. */
  dashboard: {
    title: 'Centro de mando',
    resolvedLabel: 'resuelto por el asistente',
    escalatedLabel: 'escalado a tu equipo',
    metrics: [
      { label: 'Preguntas este mes', value: '4,820' },
      { label: 'Idiomas detectados', value: '12' },
      { label: 'Solicitudes enrutadas', value: '1,140' },
      { label: 'Primera respuesta prom.', value: 'Inmediata' },
    ],
    properties: [
      { name: 'MarAzul Riviera Maya', value: '1,908' },
      { name: 'Casa Ventana Tulum', value: '1,472' },
      { name: 'Hacienda del Mar', value: '1,440' },
    ],
  },
  channels: {
    lead: 'Los huéspedes llegan al asistente donde ya están.',
    items: [
      {
        name: 'Tablet en la habitación',
        desc: 'Con la voz primero, siempre encendida, siempre conectada. El concierge en cada habitación.',
      },
      {
        name: 'Códigos QR',
        desc: 'Imprime y coloca donde sea: habitaciones, lobby, alberca, menús del restaurante, portallaves. Escanean y el asistente se abre al instante. Sin app que descargar.',
      },
      {
        name: 'Widget del sitio web',
        desc: 'Integra el asistente en tu sitio. Los huéspedes obtienen respuestas incluso antes de reservar.',
      },
      {
        name: 'Enlace para compartir',
        desc: 'En confirmaciones de reserva, correos previos a la llegada o WhatsApp. Un toque y la conversación comienza.',
      },
      {
        name: 'Voz, y lo que venga después',
        desc: 'Fuera de la propiedad, una buena conexión habilita la voz; una débil vuelve al texto sin problema.',
      },
    ],
  },
  finalCta: {
    title: 'La Hospitalidad Funciona con Conversaciones.',
    beats: [
      'Brinda experiencias inolvidables.',
      'Aumenta el ingreso complementario.',
      'Empodera a cada departamento.',
      'Entiende cada interacción.',
    ],
    cta: 'Agenda una Demo',
  },
}

export const platformCopy: Localized<typeof en> = { en, es }
