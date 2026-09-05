import type { Localized } from '../useCopy'

export type EditorialPageKey = 'platform' | 'solutions' | 'enterprise' | 'companion-os' | 'company'
export type EditorialTone = 'paper' | 'sand' | 'night' | 'cocoa'
export type EditorialPresentation = 'ledger' | 'cards' | 'flow' | 'stack' | 'faq'

export interface EditorialItem {
  id?: string
  href?: string
  label?: string
  title: string
  body?: string
}

export interface EditorialSection {
  id: string
  aliases?: string[]
  motif?: string
  no: string
  label: string
  title: string
  accent?: string
  body?: string
  tone: EditorialTone
  presentation: EditorialPresentation
  items: EditorialItem[]
  note?: string
  link?: { href: string; label: string }
}

export interface EditorialPageCopy {
  hero: {
    id: string
    eyebrow: string
    title: string
    accent: string
    body: string
    primary: string
    primaryHref: string
    secondary?: string
    secondaryHref?: string
    folioLabel: string
    folioTitle: string
    folioRows: Array<{ label: string; value: string }>
  }
  proof: string[]
  sections: EditorialSection[]
  closing: {
    id: string
    aliases?: string[]
    eyebrow: string
    title: string
    accent: string
    body: string
    primary: string
    primaryHref: string
    secondary?: string
    secondaryHref?: string
  }
}

const platformEn: EditorialPageCopy = {
  hero: {
    id: 'platform-hero',
    eyebrow: 'Product',
    title: 'One conversation',
    accent: 'follows the stay.',
    body: 'Across voice, tablet, QR, web and messaging, the guest keeps one continuous relationship with the hotel — from the first question to the return.',
    primary: 'Request a Demo',
    primaryHref: '/demo',
    secondary: 'See the service loop',
    secondaryHref: '#platform-request-action',
    folioLabel: 'A SINGLE OPERATING THREAD',
    folioTitle: 'The guest asks once.',
    folioRows: [
      { label: '01 · RECOGNIZED', value: 'Stay and permission established' },
      { label: '02 · GROUNDED', value: 'Property truth applied' },
      { label: '03 · OWNED', value: 'The right team accepts' },
      { label: '04 · VERIFIED', value: 'The guest confirms the outcome' },
    ],
  },
  proof: ['VOICE', 'TABLET', 'QR', 'WEB', 'MESSAGING', 'ENGLISH & SPANISH'],
  sections: [
    {
      id: 'platform-voice-first',
      aliases: ['platform-model', 'platform-your-voice', 'platform-adaptivity', 'every-surface', 'next-surface'],
      no: '01', label: 'EVERYWHERE THE GUEST ALREADY IS',
      title: 'The surface changes.', accent: 'The conversation does not.',
      body: 'Hotel Companion carries context across the moments that already make up a stay. Each surface is useful on its own; together they feel like one hotel remembering.',
      tone: 'paper', presentation: 'ledger',
      items: [
        { label: 'BEFORE', title: 'A direct answer becomes a direct path.', body: 'Questions about rooms, dates and experiences can move into the hotel’s verified booking flow.' },
        { label: 'ARRIVAL', title: 'The welcome already has context.', body: 'Arrival time, language, permission and preferences move with the guest.' },
        { label: 'DURING', title: 'A request keeps its history.', body: 'The guest can speak, tap or scan without explaining the stay again.' },
        { label: 'RETURN', title: 'Recognition begins with consent.', body: 'Useful memory is preserved according to the hotel’s policy and the guest’s permission.' },
      ],
    },
    {
      id: 'platform-knows-property',
      aliases: ['platform-destination', 'platform-not-generic-ai'],
      no: '02', label: 'KNOWS WHAT IS TRUE',
      title: 'Warm in tone.', accent: 'Grounded in fact.',
      body: 'The Companion speaks in the hotel’s voice, but it answers from governed property knowledge and connected systems — not from generic guesses.',
      tone: 'sand', presentation: 'cards',
      items: [
        { label: 'THE HOTEL', title: 'Rooms, rituals, policies and people.', body: 'The knowledge guests need, with owners and an update path.' },
        { label: 'THE PLACE', title: 'A destination with judgment.', body: 'Recommendations reflect distance, timing, suitability and the hotel’s point of view.' },
        { label: 'THE BOUNDARY', title: 'Availability is checked, never imagined.', body: 'Rates, inventory, payments and fulfillment remain with the systems authorized to confirm them.' },
      ],
      note: 'Hotel Companion complements the PMS, booking engine and operating systems. It does not replace them.',
    },
    {
      id: 'platform-request-action',
      aliases: ['platform-issue-detection', 'platform-reservations'],
      no: '03', label: 'FROM REQUEST TO VERIFIED RESOLUTION',
      title: 'Sent is a message.', accent: 'Resolved is an outcome.',
      body: 'Every service request keeps the room, the stay, the context and the responsible team attached until the guest confirms the result.',
      tone: 'night', presentation: 'flow',
      items: [
        { title: 'Understood', body: 'Grounded in the stay and real service capability.' },
        { title: 'Accepted', body: 'A person or connected system takes ownership.' },
        { title: 'In progress', body: 'The guest receives a useful update.' },
        { title: 'Completed', body: 'The hotel records the work as done.' },
        { title: 'Verified', body: 'The guest confirms the outcome.' },
      ],
      note: 'GUIDED EXAMPLE · ACTUAL ROUTING DEPENDS ON EACH HOTEL’S CONNECTED SYSTEMS',
    },
    {
      id: 'platform-intelligence',
      aliases: ['platform-lifecycle', 'platform-revenue-intel', 'platform-guest-memory'],
      no: '04', label: 'SERVICE FIRST. REVENUE IN CONTEXT.',
      title: 'Recognition becomes service.', accent: 'Intent becomes opportunity.',
      body: 'Hotel Companion helps the hotel act on what the guest is already trying to do — without turning the stay into a sales funnel.',
      tone: 'cocoa', presentation: 'cards',
      items: [
        { label: 'DIRECT', title: 'Keep the ready guest close.', body: 'Answer the real question and guide them into the hotel’s own verified booking path.' },
        { label: 'UPGRADE', title: 'Offer more when the reason is clear.', body: 'Space, view, arrival pattern and occasion create context; availability and price still require confirmation.' },
        { label: 'RETURN', title: 'Remember what made the stay work.', body: 'Use permitted preferences to make the next arrival feel recognized.' },
      ],
    },
    {
      id: 'platform-dashboards',
      aliases: ['dashboards-resolution'],
      no: '05', label: 'THE HOTEL LEARNS BY MORNING',
      title: 'What happened.', accent: 'What the team can improve.',
      body: 'Everyday questions reveal unmet demand, operating friction and commercial intent. The morning briefing turns those signals into a short, reviewable action list.',
      tone: 'paper', presentation: 'stack',
      items: [
        { label: 'OBSERVED', title: 'Late-arrival dining requests cluster after the kitchen closes.' },
        { label: 'VERIFIED', title: 'Front desk recovered them with a simple cold menu.' },
        { label: 'RECOMMENDED', title: 'Approve a seven-day late-arrival menu test.' },
      ],
      note: 'ILLUSTRATIVE BRIEFING · SAMPLE PROPERTY DATA',
    },
    {
      id: 'platform-faq',
      no: '06', label: 'PRACTICAL QUESTIONS',
      title: 'Clear boundaries.', accent: 'Before the first guest.',
      tone: 'sand', presentation: 'faq',
      items: [
        { title: 'Does Hotel Companion replace our PMS or booking engine?', body: 'No. It provides the conversational and intelligence layer around the systems your hotel already trusts.' },
        { title: 'Can it use our hotel’s own voice and knowledge?', body: 'Yes. Brand language and approved knowledge are configured for the property, with governance over what is published.' },
        { title: 'How are payments handled?', body: 'Payment details go directly to the authorized processor through a secure session. Hotel Companion receives only the reference needed to continue the workflow.' },
        { title: 'Can we start without a deep integration?', body: 'Yes. The founding pilot starts with verified knowledge and a tightly defined guest journey, then adds connections where they create measurable value.' },
      ],
      link: { href: '/enterprise', label: 'See enterprise architecture' },
    },
  ],
  closing: {
    id: 'platform-final-cta', aliases: ['platform-enterprise-ready'],
    eyebrow: 'A WORKING SESSION', title: 'Bring us one guest journey.', accent: 'We will make the operating thread visible.',
    body: 'Your booking path, one service request, one revenue moment and the morning proof — under your hotel’s name.',
    primary: 'Request a Demo', primaryHref: '/demo', secondary: 'Enterprise', secondaryHref: '/enterprise',
  },
}

const platformEs: EditorialPageCopy = {
  ...platformEn,
  hero: {
    ...platformEn.hero,
    eyebrow: 'Producto', title: 'Una conversación', accent: 'acompaña toda la estancia.',
    body: 'Por voz, tablet, QR, web y mensajería, el huésped mantiene una relación continua con el hotel — desde la primera pregunta hasta su regreso.',
    primary: 'Solicita una Demo', secondary: 'Mira el ciclo de servicio',
    folioLabel: 'UN SOLO HILO OPERATIVO', folioTitle: 'El huésped pregunta una vez.',
    folioRows: [
      { label: '01 · RECONOCIDO', value: 'Estancia y permiso establecidos' },
      { label: '02 · CONTEXTUALIZADO', value: 'Se aplica la verdad del hotel' },
      { label: '03 · CON DUEÑO', value: 'El equipo correcto acepta' },
      { label: '04 · VERIFICADO', value: 'El huésped confirma el resultado' },
    ],
  },
  proof: ['VOZ', 'TABLET', 'QR', 'WEB', 'MENSAJERÍA', 'ESPAÑOL E INGLÉS'],
  sections: [
    { ...platformEn.sections[0], label: 'DONDE EL HUÉSPED YA ESTÁ', title: 'La superficie cambia.', accent: 'La conversación no.', body: 'Hotel Companion lleva el contexto por los momentos que ya forman una estancia. Cada superficie funciona por sí sola; juntas se sienten como un hotel que recuerda.', items: [
      { label: 'ANTES', title: 'Una respuesta directa se vuelve una ruta directa.', body: 'Las preguntas sobre habitaciones, fechas y experiencias pueden avanzar al flujo verificado de reserva del hotel.' },
      { label: 'LLEGADA', title: 'La bienvenida ya tiene contexto.', body: 'Hora de llegada, idioma, permiso y preferencias acompañan al huésped.' },
      { label: 'DURANTE', title: 'Una solicitud conserva su historia.', body: 'El huésped puede hablar, tocar o escanear sin volver a explicar la estancia.' },
      { label: 'REGRESO', title: 'El reconocimiento comienza con permiso.', body: 'La memoria útil se conserva según la política del hotel y el consentimiento del huésped.' },
    ] },
    { ...platformEn.sections[1], label: 'SABE QUÉ ES VERDAD', title: 'Cálido en el tono.', accent: 'Fundado en hechos.', body: 'El Companion habla con la voz del hotel, pero responde desde conocimiento gobernado y sistemas conectados — no desde conjeturas genéricas.', items: [
      { label: 'EL HOTEL', title: 'Habitaciones, rituales, políticas y personas.', body: 'El conocimiento que el huésped necesita, con responsables y una ruta de actualización.' },
      { label: 'EL LUGAR', title: 'Un destino con criterio.', body: 'Las recomendaciones consideran distancia, horario, afinidad y el punto de vista del hotel.' },
      { label: 'EL LÍMITE', title: 'La disponibilidad se verifica, nunca se inventa.', body: 'Tarifas, inventario, pagos y cumplimiento permanecen en los sistemas autorizados para confirmarlos.' },
    ], note: 'Hotel Companion complementa el PMS, el motor de reservas y los sistemas operativos. No los reemplaza.' },
    { ...platformEn.sections[2], label: 'DE SOLICITUD A RESOLUCIÓN VERIFICADA', title: 'Enviado es un mensaje.', accent: 'Resuelto es un resultado.', body: 'Cada solicitud conserva habitación, estancia, contexto y equipo responsable hasta que el huésped confirma el resultado.', items: [
      { title: 'Entendido', body: 'Vinculado con la estancia y la capacidad real del hotel.' }, { title: 'Aceptado', body: 'Una persona o sistema conectado asume la responsabilidad.' }, { title: 'En progreso', body: 'El huésped recibe una actualización útil.' }, { title: 'Completado', body: 'El hotel registra el trabajo como terminado.' }, { title: 'Verificado', body: 'El huésped confirma el resultado.' },
    ], note: 'EJEMPLO GUIADO · EL ENRUTAMIENTO REAL DEPENDE DE LOS SISTEMAS CONECTADOS DE CADA HOTEL' },
    { ...platformEn.sections[3], label: 'SERVICIO PRIMERO. INGRESOS EN CONTEXTO.', title: 'El reconocimiento se vuelve servicio.', accent: 'La intención, oportunidad.', body: 'Hotel Companion ayuda al hotel a actuar sobre lo que el huésped ya intenta hacer — sin convertir la estancia en un embudo de ventas.', items: [
      { label: 'DIRECTO', title: 'Mantén cerca al huésped listo.', body: 'Responde la pregunta real y guíalo a la ruta verificada de reserva del hotel.' }, { label: 'MEJORA', title: 'Ofrece más cuando la razón es clara.', body: 'Espacio, vista, llegada y ocasión aportan contexto; disponibilidad y precio aún deben confirmarse.' }, { label: 'REGRESO', title: 'Recuerda qué hizo funcionar la estancia.', body: 'Usa preferencias permitidas para que la próxima llegada se sienta reconocida.' },
    ] },
    { ...platformEn.sections[4], label: 'EL HOTEL APRENDE AL AMANECER', title: 'Qué pasó.', accent: 'Qué puede mejorar el equipo.', body: 'Las preguntas cotidianas revelan demanda, fricción operativa e intención comercial. El informe matutino las convierte en una lista breve y revisable.', items: [
      { label: 'OBSERVADO', title: 'Las solicitudes de cena tardía se concentran después del cierre.' }, { label: 'VERIFICADO', title: 'Recepción las recuperó con un menú frío sencillo.' }, { label: 'RECOMENDADO', title: 'Aprobar una prueba de menú tardío durante siete días.' },
    ], note: 'INFORME ILUSTRATIVO · DATOS DE UNA PROPIEDAD DE MUESTRA' },
    { ...platformEn.sections[5], label: 'PREGUNTAS PRÁCTICAS', title: 'Límites claros.', accent: 'Antes del primer huésped.', items: [
      { title: '¿Hotel Companion reemplaza nuestro PMS o motor de reservas?', body: 'No. Aporta la capa conversacional y de inteligencia alrededor de los sistemas que el hotel ya utiliza.' }, { title: '¿Puede usar la voz y el conocimiento de nuestro hotel?', body: 'Sí. El lenguaje de marca y el conocimiento aprobado se configuran para la propiedad, con gobierno sobre lo publicado.' }, { title: '¿Cómo se manejan los pagos?', body: 'Los datos van directo al procesador autorizado mediante una sesión segura. Hotel Companion recibe solo la referencia necesaria para continuar.' }, { title: '¿Podemos comenzar sin una integración profunda?', body: 'Sí. El piloto inicia con conocimiento verificado y una experiencia acotada, y después conecta donde haya valor medible.' },
    ], link: { href: '/enterprise', label: 'Ver arquitectura enterprise' } },
  ],
  closing: { ...platformEn.closing, eyebrow: 'UNA SESIÓN DE TRABAJO', title: 'Tráenos una experiencia del huésped.', accent: 'Haremos visible el hilo operativo.', body: 'Tu ruta de reserva, una solicitud, un momento de ingreso y la evidencia de la mañana — bajo el nombre de tu hotel.', primary: 'Solicita una Demo', secondary: 'Enterprise' },
}

const solutionsEn: EditorialPageCopy = {
  hero: { id: 'solutions-hero', eyebrow: 'Capabilities', title: 'One guest.', accent: 'Every team already knows.', body: 'Hotel Companion gives each department the context it needs — without making the guest manage the handoff.', primary: 'Request a Demo', primaryHref: '/demo', secondary: 'See every brand', secondaryHref: '#white-label', folioLabel: '15:42 · ARRIVAL', folioTitle: 'Maya lands early.', folioRows: [
    { label: 'FRONT DESK', value: 'Room readiness confirmed' }, { label: 'CONCIERGE', value: 'Sunrise yoga preference known' }, { label: 'HOUSEKEEPING', value: 'Mat delivered before arrival' }, { label: 'REVENUE', value: 'Ocean suite offered with context' },
  ] },
  proof: ['FRONT DESK', 'CONCIERGE', 'GUEST SERVICES', 'HOUSEKEEPING', 'ENGINEERING', 'F&B', 'SPA', 'REVENUE', 'GM'],
  sections: [
    { id: 'solutions-departments', no: '01', label: 'ARRIVAL & RECOGNITION', title: 'A welcome without', accent: 'the internal handoff.', body: 'Front desk and concierge see the same arrival context, permissions and preferences — then each owns the part that belongs to them.', tone: 'paper', presentation: 'cards', items: [
      { label: 'FRONT DESK', title: 'Fewer repeated questions.', body: 'Useful arrival context is ready before the guest reaches the desk.' }, { label: 'CONCIERGE', title: 'Recommendations with judgment.', body: 'Timing, distance, preference and hotel point of view shape the answer.' }, { label: 'THE GUEST', title: 'One story, not five explanations.', body: 'Context moves through the stay while the relationship stays personal.' },
    ] },
    { id: 'solutions-stay', no: '02', label: 'THE STAY IN MOTION', title: 'Every request', accent: 'finds an owner.', body: 'Guest services, housekeeping and engineering receive structured context and keep the guest informed until the result is verified.', tone: 'night', presentation: 'flow', items: [
      { title: 'Guest asks', body: 'Room, stay and request are understood.' }, { title: 'Team accepts', body: 'Ownership becomes visible.' }, { title: 'Work moves', body: 'Updates stay attached.' }, { title: 'Guest verifies', body: 'Completion becomes an outcome.' },
    ] },
    { id: 'solutions-revenue', no: '03', label: 'REVENUE THAT FEELS LIKE HOSTING', title: 'The right addition.', accent: 'At the right moment.', body: 'Dining, spa, room upgrades and experiences become easier to discover when they answer an actual guest need.', tone: 'cocoa', presentation: 'cards', items: [
      { label: 'ROOM', title: 'More space for the reason they came.', body: 'A considered upgrade, subject to live availability and price.' }, { label: 'TABLE', title: 'A reservation that fits the evening.', body: 'Cuisine, time and occasion become context.' }, { label: 'EXPERIENCE', title: 'The place beyond the property.', body: 'Recommended with timing, transport and suitability in view.' },
    ] },
    { id: 'solutions-morning', no: '04', label: 'THE MORNING VIEW', title: 'Demand, friction and intent.', accent: 'In one briefing.', body: 'The GM and revenue team see patterns that otherwise disappear inside individual conversations.', tone: 'sand', presentation: 'ledger', items: [
      { label: 'DEMAND', title: 'What guests repeatedly asked for.', body: 'Services, hours and experiences worth testing.' }, { label: 'FRICTION', title: 'Where the stay lost momentum.', body: 'Waits, gaps and handoffs that need ownership.' }, { label: 'INTENT', title: 'Where a useful offer was possible.', body: 'Direct-booking, upgrade and ancillary moments, measured without pressure.' },
    ] },
    { id: 'solutions-property-fit', aliases: ['solutions-enterprise'], no: '05', label: 'BUILT AROUND THE WAY YOU HOST', title: 'One operating logic.', accent: 'A different expression at every hotel.', body: 'The layer stays consistent; the knowledge, voice, service model and governance belong to the property or brand.', tone: 'paper', presentation: 'ledger', items: [
      { id: 'luxury', label: 'LUXURY', title: 'Recognition without performance.', body: 'Subtle memory, discreet service and careful escalation.' }, { id: 'resorts', label: 'RESORT', title: 'One journey across a complex property.', body: 'Rooms, dining, spa, activities and transport remain connected.' }, { id: 'boutique', label: 'BOUTIQUE & INDEPENDENT', title: 'The hotel’s personality survives the system.', body: 'Distinctive language and local knowledge stay visible.' }, { id: 'business', label: 'BUSINESS', title: 'Fast answers at inconvenient hours.', body: 'Arrival, transport, meeting and service needs move quickly.' }, { id: 'enterprise-groups', label: 'HOTEL GROUPS', title: 'Shared standards. Local autonomy.', body: 'Portfolio governance without flattening each property’s identity.' },
    ] },
  ],
  closing: { id: 'solutions-final-cta', eyebrow: 'YOUR HOTEL, IN MOTION', title: 'Show us one stay.', accent: 'We will map every handoff.', body: 'See where service, revenue and guest memory connect across your teams.', primary: 'Request a Demo', primaryHref: '/demo', secondary: 'Enterprise', secondaryHref: '/enterprise' },
}

const solutionsEs: EditorialPageCopy = {
  ...solutionsEn,
  hero: { ...solutionsEn.hero, eyebrow: 'Capacidades', title: 'Un huésped.', accent: 'Todos los equipos ya saben.', body: 'Hotel Companion da a cada departamento el contexto que necesita — sin obligar al huésped a administrar el relevo.', primary: 'Solicita una Demo', secondary: 'Ver cada marca', folioLabel: '15:42 · LLEGADA', folioTitle: 'Maya llega temprano.', folioRows: [
    { label: 'RECEPCIÓN', value: 'Habitación confirmada' }, { label: 'CONCIERGE', value: 'Preferencia de yoga conocida' }, { label: 'HOUSEKEEPING', value: 'Tapete listo antes de llegar' }, { label: 'INGRESOS', value: 'Suite ofrecida con contexto' },
  ] },
  proof: ['RECEPCIÓN', 'CONCIERGE', 'SERVICIO', 'HOUSEKEEPING', 'INGENIERÍA', 'A&B', 'SPA', 'INGRESOS', 'DIRECCIÓN'],
  sections: [
    { ...solutionsEn.sections[0], label: 'LLEGADA Y RECONOCIMIENTO', title: 'Una bienvenida sin', accent: 'el relevo interno.', body: 'Recepción y concierge ven el mismo contexto, permisos y preferencias — y cada uno se hace cargo de lo suyo.', items: [
      { label: 'RECEPCIÓN', title: 'Menos preguntas repetidas.', body: 'El contexto útil de llegada está listo antes de que el huésped alcance el mostrador.' }, { label: 'CONCIERGE', title: 'Recomendaciones con criterio.', body: 'Horario, distancia, preferencia y punto de vista del hotel moldean la respuesta.' }, { label: 'EL HUÉSPED', title: 'Una historia, no cinco explicaciones.', body: 'El contexto acompaña la estancia mientras la relación sigue siendo personal.' },
    ] },
    { ...solutionsEn.sections[1], label: 'LA ESTANCIA EN MOVIMIENTO', title: 'Cada solicitud', accent: 'encuentra responsable.', body: 'Servicio, housekeeping e ingeniería reciben contexto estructurado y mantienen informado al huésped hasta verificar el resultado.', items: [
      { title: 'El huésped pide', body: 'Se entiende habitación, estancia y solicitud.' }, { title: 'El equipo acepta', body: 'La responsabilidad se vuelve visible.' }, { title: 'El trabajo avanza', body: 'Las actualizaciones permanecen unidas.' }, { title: 'El huésped verifica', body: 'La terminación se vuelve resultado.' },
    ] },
    { ...solutionsEn.sections[2], label: 'INGRESOS QUE SE SIENTEN COMO HOSPITALIDAD', title: 'La adición correcta.', accent: 'En el momento preciso.', body: 'Restaurante, spa, mejoras y experiencias se descubren mejor cuando responden a una necesidad real.', items: [
      { label: 'HABITACIÓN', title: 'Más espacio para la razón del viaje.', body: 'Una mejora considerada, sujeta a disponibilidad y precio vigentes.' }, { label: 'MESA', title: 'Una reserva que encaja con la noche.', body: 'Cocina, horario y ocasión aportan contexto.' }, { label: 'EXPERIENCIA', title: 'El lugar más allá del hotel.', body: 'Recomendado considerando horario, transporte y afinidad.' },
    ] },
    { ...solutionsEn.sections[3], label: 'LA MIRADA DE LA MAÑANA', title: 'Demanda, fricción e intención.', accent: 'En un solo informe.', body: 'Dirección e ingresos ven patrones que de otra forma desaparecen dentro de conversaciones aisladas.', items: [
      { label: 'DEMANDA', title: 'Lo que los huéspedes pidieron una y otra vez.', body: 'Servicios, horarios y experiencias que vale la pena probar.' }, { label: 'FRICCIÓN', title: 'Dónde perdió ritmo la estancia.', body: 'Esperas, vacíos y relevos que necesitan dueño.' }, { label: 'INTENCIÓN', title: 'Dónde era posible una oferta útil.', body: 'Reservas directas, mejoras y momentos adicionales, medidos sin presión.' },
    ] },
    { ...solutionsEn.sections[4], label: 'CONSTRUIDO ALREDEDOR DE TU FORMA DE RECIBIR', title: 'Una lógica operativa.', accent: 'Una expresión distinta en cada hotel.', body: 'La capa se mantiene consistente; el conocimiento, la voz, el servicio y el gobierno pertenecen al hotel o la marca.', items: [
      { id: 'luxury', label: 'LUJO', title: 'Reconocimiento sin actuación.', body: 'Memoria sutil, servicio discreto y escalamiento cuidadoso.' }, { id: 'resorts', label: 'RESORT', title: 'Una experiencia en una propiedad compleja.', body: 'Habitaciones, restaurantes, spa, actividades y transporte siguen conectados.' }, { id: 'boutique', label: 'BOUTIQUE E INDEPENDIENTE', title: 'La personalidad del hotel sobrevive al sistema.', body: 'El lenguaje distintivo y el conocimiento local permanecen visibles.' }, { id: 'business', label: 'NEGOCIOS', title: 'Respuestas rápidas a horas difíciles.', body: 'Llegada, transporte, reuniones y servicio avanzan con rapidez.' }, { id: 'enterprise-groups', label: 'GRUPOS HOTELEROS', title: 'Estándares compartidos. Autonomía local.', body: 'Gobierno de portafolio sin aplanar la identidad de cada propiedad.' },
    ] },
  ],
  closing: { ...solutionsEn.closing, eyebrow: 'TU HOTEL, EN MOVIMIENTO', title: 'Muéstranos una estancia.', accent: 'Mapearemos cada relevo.', body: 'Mira dónde se conectan servicio, ingresos y memoria del huésped entre tus equipos.', primary: 'Solicita una Demo' },
}

const enterpriseEn: EditorialPageCopy = {
  hero: { id: 'enterprise-hero', eyebrow: 'Enterprise', title: 'Every property stays itself.', accent: 'Intelligence travels.', body: 'One governed layer connects brand knowledge, local execution and portfolio insight — without flattening the hotels guests came to experience.', primary: 'Discuss your portfolio', primaryHref: '/demo', secondary: 'Trust architecture', secondaryHref: '#secure', folioLabel: 'PORTFOLIO POSTURE', folioTitle: 'Shared where it should be.', folioRows: [
    { label: 'BRAND', value: 'Standards and approved knowledge' }, { label: 'PROPERTY', value: 'Voice, services and local truth' }, { label: 'PEOPLE', value: 'Roles, permissions and owners' }, { label: 'LEADERSHIP', value: 'Patterns, proof and decisions' },
  ] },
  proof: ['LOCAL IDENTITY', 'CENTRAL GOVERNANCE', 'DATA OWNERSHIP', 'AUDITABILITY', 'STAGED ROLLOUT'],
  sections: [
    { id: 'shared-intel', aliases: ['multi-property'], no: '01', label: 'ONE LAYER. LOCAL EXECUTION.', title: 'Consistency where it matters.', accent: 'Character where it counts.', body: 'Portfolio standards travel across the group. Each property keeps its own voice, knowledge, services and operating reality.', tone: 'paper', presentation: 'stack', items: [
      { label: 'ORGANIZATION', title: 'Brand standards · governance · portfolio insight' }, { label: 'HOTEL COMPANION', title: 'Shared intelligence · controlled distribution · verification' }, { label: 'PROPERTY', title: 'Local identity · local knowledge · local ownership' },
    ] },
    { id: 'knowledge', aliases: ['admin', 'governance'], no: '02', label: 'KNOWLEDGE WITH OWNERS', title: 'A living asset.', accent: 'Never an uncontrolled answer bank.', body: 'Publishing, permission and accountability are designed into how hotel knowledge changes.', tone: 'sand', presentation: 'ledger', items: [
      { label: 'OWNERSHIP', title: 'Every knowledge domain has a responsible team.', body: 'Brand, property and department content can remain distinct.' }, { label: 'APPROVAL', title: 'Changes follow the organization’s review path.', body: 'Draft, approve, publish and retire with visibility.' }, { label: 'PERMISSION', title: 'Access follows role and scope.', body: 'People see and change only what their responsibility requires.' }, { label: 'HISTORY', title: 'Important changes remain reviewable.', body: 'Versioning and auditability support operational trust.' },
    ] },
    { id: 'secure', aliases: ['payment', 'integrates', 'what-it-is-not'], no: '03', label: 'TRUST HAS AN ARCHITECTURE', title: 'Connected.', accent: 'With clear boundaries.', body: 'Hotel Companion complements the PMS, payment processor and hotel systems through governed connections. It does not replace them, and raw card data does not enter Hotel Companion.', tone: 'night', presentation: 'cards', items: [
      { label: 'ACCESS', title: 'Role-based control.', body: 'Authentication, permissions and accountable ownership around sensitive knowledge.' }, { label: 'DATA', title: 'The customer remains in control.', body: 'Organizational knowledge stays the customer’s asset and is used to deliver the service.' }, { label: 'PAYMENTS', title: 'Processor-first handling.', body: 'Payment details go directly to the authorized processor; the workflow receives a tokenized reference.' },
    ], link: { href: '/trust', label: 'Open the Trust Center' } },
    { id: 'operational-intel', aliases: ['commercial-intel', 'enterprise-outcomes'], no: '04', label: 'SEE ACROSS THE PORTFOLIO', title: 'Local signals.', accent: 'Leadership visibility.', body: 'Conversation reveals where guests ask, where teams recover and where useful demand is accumulating.', tone: 'cocoa', presentation: 'cards', items: [
      { label: 'SERVICE', title: 'Demand and friction by property.', body: 'See recurring needs, waits and recovery patterns without losing local context.' }, { label: 'COMMERCIAL', title: 'Intent before it disappears.', body: 'Direct-booking, upgrade and ancillary signals can be reviewed across the group.' }, { label: 'KNOWLEDGE', title: 'Gaps become an operating agenda.', body: 'Repeated unanswered questions show where approved knowledge or service needs attention.' },
    ] },
    { id: 'deploy', aliases: ['grow'], no: '05', label: 'VALUE BEFORE INTEGRATION', title: 'Initial value in 1–3 weeks.', accent: 'Integrations staged to your stack.', body: 'A verified property and destination knowledge base, priority guest journeys and team workflows go live first. PMS, POS and payment connections follow; timing depends on API access, provider requirements and approvals.', tone: 'paper', presentation: 'flow', items: [
      { title: 'Initial value', body: 'Property and destination knowledge are verified and made live.' }, { title: 'Priority journeys', body: 'Guest conversations and team workflows begin delivering value.' }, { title: 'System integrations', body: 'PMS, POS and payment connections follow in stages.' }, { title: 'Technical discovery', body: 'Access, provider requirements and approvals determine timing.' },
    ], note: 'INITIAL SCOPE AND SYSTEM TIMING ARE CONFIRMED DURING TECHNICAL DISCOVERY', link: { href: '/contact#founding', label: 'See the founding pilot' } },
  ],
  closing: { id: 'enterprise-final-cta', eyebrow: 'PORTFOLIO WORKING SESSION', title: 'Keep the hotels distinct.', accent: 'Make the intelligence coherent.', body: 'Bring one property, one shared standard and one measure. We will map the governed path between them.', primary: 'Discuss your portfolio', primaryHref: '/demo', secondary: 'Trust Center', secondaryHref: '/trust' },
}

const enterpriseEs: EditorialPageCopy = {
  ...enterpriseEn,
  hero: { ...enterpriseEn.hero, title: 'Cada hotel conserva su identidad.', accent: 'La inteligencia viaja.', body: 'Una capa gobernada conecta conocimiento de marca, ejecución local e inteligencia de portafolio — sin aplanar los hoteles que el huésped eligió vivir.', primary: 'Conversemos sobre tu portafolio', secondary: 'Arquitectura de confianza', folioLabel: 'POSTURA DEL PORTAFOLIO', folioTitle: 'Compartido donde debe estar.', folioRows: [
    { label: 'MARCA', value: 'Estándares y conocimiento aprobado' }, { label: 'PROPIEDAD', value: 'Voz, servicios y verdad local' }, { label: 'PERSONAS', value: 'Roles, permisos y responsables' }, { label: 'DIRECCIÓN', value: 'Patrones, evidencia y decisiones' },
  ] },
  proof: ['IDENTIDAD LOCAL', 'GOBIERNO CENTRAL', 'PROPIEDAD DE DATOS', 'AUDITABILIDAD', 'DESPLIEGUE POR ETAPAS'],
  sections: [
    { ...enterpriseEn.sections[0], label: 'UNA CAPA. EJECUCIÓN LOCAL.', title: 'Consistencia donde importa.', accent: 'Carácter donde cuenta.', body: 'Los estándares viajan por el grupo. Cada propiedad conserva su voz, conocimiento, servicios y realidad operativa.', items: [
      { label: 'ORGANIZACIÓN', title: 'Estándares · gobierno · inteligencia de portafolio' }, { label: 'HOTEL COMPANION', title: 'Inteligencia compartida · distribución controlada · verificación' }, { label: 'PROPIEDAD', title: 'Identidad local · conocimiento local · responsabilidad local' },
    ] },
    { ...enterpriseEn.sections[1], label: 'CONOCIMIENTO CON RESPONSABLES', title: 'Un activo vivo.', accent: 'Nunca un banco de respuestas sin control.', body: 'Publicación, permisos y responsabilidad forman parte de cómo cambia el conocimiento.', items: [
      { label: 'RESPONSABILIDAD', title: 'Cada dominio tiene un equipo responsable.', body: 'Marca, propiedad y departamentos pueden mantenerse distintos.' }, { label: 'APROBACIÓN', title: 'Los cambios siguen la revisión de la organización.', body: 'Borrador, aprobación, publicación y retiro con visibilidad.' }, { label: 'PERMISO', title: 'El acceso sigue el rol y el alcance.', body: 'Cada persona ve y cambia solo lo que le corresponde.' }, { label: 'HISTORIAL', title: 'Los cambios importantes son revisables.', body: 'Versiones y auditoría sostienen la confianza operativa.' },
    ] },
    { ...enterpriseEn.sections[2], label: 'LA CONFIANZA TIENE ARQUITECTURA', title: 'Conectado.', accent: 'Con límites claros.', body: 'Hotel Companion complementa PMS, procesador de pagos y sistemas hoteleros mediante conexiones gobernadas. No los reemplaza, y los datos brutos de tarjeta no entran a Hotel Companion.', items: [
      { label: 'ACCESO', title: 'Control basado en roles.', body: 'Autenticación, permisos y responsabilidad alrededor del conocimiento sensible.' }, { label: 'DATOS', title: 'El cliente mantiene el control.', body: 'El conocimiento organizacional sigue siendo su activo y se usa para prestar el servicio.' }, { label: 'PAGOS', title: 'El procesador recibe primero.', body: 'Los datos van directo al procesador autorizado; el flujo recibe una referencia tokenizada.' },
    ], link: { href: '/trust', label: 'Abrir el Centro de Confianza' } },
    { ...enterpriseEn.sections[3], label: 'MIRA TODO EL PORTAFOLIO', title: 'Señales locales.', accent: 'Visibilidad para dirección.', body: 'La conversación revela qué piden los huéspedes, dónde recuperan los equipos y dónde se acumula demanda útil.', items: [
      { label: 'SERVICIO', title: 'Demanda y fricción por propiedad.', body: 'Observa necesidades, esperas y recuperación sin perder contexto local.' }, { label: 'COMERCIAL', title: 'Intención antes de desaparecer.', body: 'Las señales de reserva directa, mejora y adicionales pueden revisarse en el grupo.' }, { label: 'CONOCIMIENTO', title: 'Los vacíos se vuelven agenda operativa.', body: 'Las preguntas sin respuesta muestran dónde debe mejorar el conocimiento o servicio.' },
    ] },
    { ...enterpriseEn.sections[4], label: 'VALOR ANTES DE LA INTEGRACIÓN', title: 'Valor inicial en 1–3 semanas.', accent: 'Integraciones por etapas para tu stack.', body: 'Una base de conocimiento verificada de la propiedad y el destino, los recorridos prioritarios del huésped y los flujos del equipo entran en operación primero. Las conexiones con PMS, POS y pagos siguen por etapas; el plazo depende del acceso a APIs, los requisitos de los proveedores y sus aprobaciones.', items: [
      { title: 'Valor inicial', body: 'El conocimiento de la propiedad y el destino se verifica y entra en operación.' }, { title: 'Recorridos prioritarios', body: 'Las conversaciones del huésped y los flujos del equipo empiezan a generar valor.' }, { title: 'Integraciones de sistemas', body: 'Las conexiones con PMS, POS y pagos siguen por etapas.' }, { title: 'Descubrimiento técnico', body: 'El acceso, los requisitos y las aprobaciones determinan el plazo.' },
    ], note: 'EL ALCANCE INICIAL Y LOS PLAZOS DE SISTEMAS SE CONFIRMAN DURANTE EL DESCUBRIMIENTO TÉCNICO', link: { href: '/contact#founding', label: 'Ver el piloto fundador' } },
  ],
  closing: { ...enterpriseEn.closing, eyebrow: 'SESIÓN DE PORTAFOLIO', title: 'Conserva distintos los hoteles.', accent: 'Haz coherente la inteligencia.', body: 'Trae una propiedad, un estándar compartido y una medida. Mapearemos la ruta gobernada entre ellos.', primary: 'Conversemos sobre tu portafolio', secondary: 'Centro de Confianza' },
}

const osEn: EditorialPageCopy = {
  hero: { id: 'companionos-hero', eyebrow: 'Companion OS', title: 'One intelligence layer.', accent: 'Industry-native at the edge.', body: 'Companion OS supplies the shared operating cycle beneath Hotel Companion and Restaurant Companion. Industry knowledge stays specialized at the edge.', primary: 'Meet Hotel Companion', primaryHref: '/', secondary: 'See the operating cycle', secondaryHref: '#companionos-model', folioLabel: 'THE SHARED ENGINE', folioTitle: 'Interaction becomes accountable action.', folioRows: [
    { label: 'CONTEXT', value: 'Who, where, why now' }, { label: 'KNOWLEDGE', value: 'Approved organizational truth' }, { label: 'ACTION', value: 'Owned and connected execution' }, { label: 'OUTCOME', value: 'Verified, reviewable learning' },
  ] },
  proof: ['CONTEXT', 'KNOWLEDGE', 'REASONING', 'WORKFLOW', 'VERIFICATION', 'GOVERNED IMPROVEMENT'],
  sections: [
    { id: 'companionos-model', aliases: ['companionos-why'], motif: 'OUTCOME ↻ CONTEXT', no: '01', label: 'THE OPERATING CYCLE', title: 'Understand the moment.', accent: 'Stay through the outcome.', body: 'The platform connects what was asked with what the organization knows, who must act and whether the result actually happened.', tone: 'paper', presentation: 'flow', items: [
      { title: 'Context', body: 'Identity, place, time, permission and intent.' }, { title: 'Knowledge', body: 'Approved policy, product and operating truth.' }, { title: 'Reasoning', body: 'The most useful next step within clear boundaries.' }, { title: 'Action', body: 'A person or system accepts the work.' }, { title: 'Verification', body: 'The outcome returns to the loop.' },
    ] },
    { id: 'companionos-one-platform', motif: 'SHARED FOUNDATION', no: '02', label: 'SHARED UNDERNEATH. SPECIALIZED AT THE EDGE.', title: 'One foundation.', accent: 'Two distinct forms of hospitality.', body: 'The shared platform handles context, knowledge, orchestration and insight. Each Companion brings the language, workflows and commercial logic of its own industry.', tone: 'night', presentation: 'cards', items: [
      { label: 'HOTEL COMPANION', title: 'The stay remembers.', body: 'Booking, arrival, service, revenue, return and the operating proof behind them.' }, { label: 'RESTAURANT COMPANION', title: 'The table remembers.', body: 'Discovery, reservation, service, loyalty, revenue and the operating proof behind them.' },
    ] },
    { id: 'companionos-architecture', no: '03', label: 'FOUR ARCHITECTURAL MOVEMENTS', title: 'Less magic.', accent: 'More accountable intelligence.', body: 'The capability taxonomy becomes useful when each part has a clear operational role.', tone: 'sand', presentation: 'ledger', items: [
      { id: 'voice', label: '01 · INTERACTION', title: 'Conversation and context.', body: 'Voice and messaging capture intent in the moment it occurs.' }, { id: 'knowledge', label: '02 · UNDERSTANDING', title: 'Knowledge and organizational memory.', body: 'Approved truth and permitted context make the answer specific.' }, { id: 'workflow', label: '03 · EXECUTION', title: 'Reasoning and workflow orchestration.', body: 'A recommendation becomes owned work through people and connected systems.' }, { id: 'analytics', label: '04 · IMPROVEMENT', title: 'Operational insight and governed learning.', body: 'Verified outcomes become reviewable signals for the organization.' },
    ],
    },
    { id: 'companionos-enterprise', no: '04', label: 'BUILT FOR ORGANIZATIONS, NOT DEMOS', title: 'Governed from the start.', accent: 'Useful at the edge.', body: 'The platform is designed around ownership, access, administration and boundaries — the conditions that let intelligence operate inside a real organization.', tone: 'cocoa', presentation: 'cards', items: [
      { id: 'memory', label: 'MEMORY', title: 'Permission and purpose.', body: 'Retain what is useful and authorized; minimize what is not.' }, { id: 'reasoning', label: 'REASONING', title: 'Recommendations inside policy.', body: 'Human review remains appropriate for critical operational, financial, legal and safety decisions.' }, { id: 'operational', label: 'OPERATIONS', title: 'Ownership and auditability.', body: 'Actions, updates and outcomes remain visible to the responsible teams.' }, { id: 'learning', label: 'IMPROVEMENT', title: 'Governed, not autonomous.', body: 'Approved knowledge and verified outcomes inform reviewable changes.' },
    ], link: { href: '/trust', label: 'See trust and responsible AI' } },
    { id: 'companionos-ecosystem', aliases: ['companionos-axionari'], no: '05', label: 'THE FAMILY & ITS BUILDER', title: 'A shared philosophy.', accent: 'Applied with industry depth.', body: 'Axionari builds the Companion OS foundation. Hotel Companion and Restaurant Companion are its two current industry applications.', tone: 'paper', presentation: 'stack', items: [
      { label: 'TODAY', title: 'Hotel Companion · Restaurant Companion' }, { label: 'FOUNDATION', title: 'Companion OS' }, { label: 'BUILDER', title: 'Axionari · Enterprise Execution Systems' },
    ] },
  ],
  closing: { id: 'companionos-final', eyebrow: 'HOSPITALITY, APPLIED', title: 'The engine stays underneath.', accent: 'The guest feels the hotel.', body: 'Companion OS is the shared Axionari foundation beneath Hotel Companion and Restaurant Companion. See it expressed through a complete stay.', primary: 'Meet Hotel Companion', primaryHref: '/', secondary: 'About Axionari', secondaryHref: '/company' },
}

const osEs: EditorialPageCopy = {
  ...osEn,
  hero: { ...osEn.hero, title: 'Una capa de inteligencia.', accent: 'Especializada en cada industria.', body: 'Companion OS aporta el ciclo operativo compartido bajo Hotel Companion y Restaurant Companion. El conocimiento de cada industria permanece especializado.', primary: 'Conoce Hotel Companion', secondary: 'Mira el ciclo operativo', folioLabel: 'EL MOTOR COMPARTIDO', folioTitle: 'La interacción se vuelve acción responsable.', folioRows: [
    { label: 'CONTEXTO', value: 'Quién, dónde, por qué ahora' }, { label: 'CONOCIMIENTO', value: 'Verdad organizacional aprobada' }, { label: 'ACCIÓN', value: 'Ejecución con dueño y conexión' }, { label: 'RESULTADO', value: 'Mejora verificada y revisable' },
  ] },
  proof: ['CONTEXTO', 'CONOCIMIENTO', 'RAZONAMIENTO', 'FLUJO', 'VERIFICACIÓN', 'MEJORA GOBERNADA'],
  sections: [
    { ...osEn.sections[0], motif: 'RESULTADO ↻ CONTEXTO', label: 'EL CICLO OPERATIVO', title: 'Entender el momento.', accent: 'Acompañar hasta el resultado.', body: 'La plataforma conecta lo solicitado con lo que la organización sabe, quién debe actuar y si el resultado realmente ocurrió.', items: [
      { title: 'Contexto', body: 'Identidad, lugar, tiempo, permiso e intención.' }, { title: 'Conocimiento', body: 'Política, producto y verdad operativa aprobados.' }, { title: 'Razonamiento', body: 'El siguiente paso más útil dentro de límites claros.' }, { title: 'Acción', body: 'Una persona o sistema acepta el trabajo.' }, { title: 'Verificación', body: 'El resultado vuelve al ciclo.' },
    ] },
    { ...osEn.sections[1], motif: 'BASE COMPARTIDA', label: 'COMPARTIDO ABAJO. ESPECIALIZADO EN EL BORDE.', title: 'Una base.', accent: 'Dos formas distintas de hospitalidad.', body: 'La plataforma compartida maneja contexto, conocimiento, orquestación e inteligencia. Cada Companion aporta lenguaje, flujos y lógica comercial de su industria.', items: [
      { label: 'HOTEL COMPANION', title: 'La estancia recuerda.', body: 'Reserva, llegada, servicio, ingresos, regreso y la evidencia operativa detrás.' }, { label: 'RESTAURANT COMPANION', title: 'La mesa recuerda.', body: 'Descubrimiento, reserva, servicio, lealtad, ingresos y la evidencia operativa detrás.' },
    ] },
    { ...osEn.sections[2], label: 'CUATRO MOVIMIENTOS ARQUITECTÓNICOS', title: 'Menos magia.', accent: 'Más inteligencia responsable.', body: 'La taxonomía se vuelve útil cuando cada parte tiene un rol operativo claro.', items: [
      { id: 'voice', label: '01 · INTERACCIÓN', title: 'Conversación y contexto.', body: 'Voz y mensajería capturan la intención en el momento.' }, { id: 'knowledge', label: '02 · ENTENDIMIENTO', title: 'Conocimiento y memoria organizacional.', body: 'Verdad aprobada y contexto permitido vuelven específica la respuesta.' }, { id: 'workflow', label: '03 · EJECUCIÓN', title: 'Razonamiento y orquestación.', body: 'Una recomendación se vuelve trabajo con dueño mediante personas y sistemas.' }, { id: 'analytics', label: '04 · MEJORA', title: 'Inteligencia operativa y aprendizaje gobernado.', body: 'Los resultados verificados se vuelven señales revisables.' },
    ] },
    { ...osEn.sections[3], label: 'CONSTRUIDO PARA ORGANIZACIONES, NO DEMOS', title: 'Gobernado desde el inicio.', accent: 'Útil en el borde.', body: 'La plataforma se diseña alrededor de propiedad, acceso, administración y límites — las condiciones para operar en una organización real.', items: [
      { id: 'memory', label: 'MEMORIA', title: 'Permiso y propósito.', body: 'Conservar lo útil y autorizado; minimizar lo demás.' }, { id: 'reasoning', label: 'RAZONAMIENTO', title: 'Recomendaciones dentro de política.', body: 'La revisión humana sigue siendo apropiada para decisiones críticas.' }, { id: 'operational', label: 'OPERACIONES', title: 'Responsabilidad y auditoría.', body: 'Acciones, actualizaciones y resultados permanecen visibles.' }, { id: 'learning', label: 'MEJORA', title: 'Gobernada, no autónoma.', body: 'Conocimiento aprobado y resultados verificados informan cambios revisables.' },
    ], link: { href: '/trust', label: 'Ver confianza e IA responsable' } },
    { ...osEn.sections[4], label: 'LA FAMILIA Y SU CREADOR', title: 'Una filosofía compartida.', accent: 'Aplicada con profundidad de industria.', body: 'Axionari construye la base Companion OS. Hotel Companion y Restaurant Companion son sus dos aplicaciones actuales.', items: [
      { label: 'HOY', title: 'Hotel Companion · Restaurant Companion' }, { label: 'BASE', title: 'Companion OS' }, { label: 'CREADOR', title: 'Axionari · Enterprise Execution Systems' },
    ] },
  ],
  closing: { ...osEn.closing, eyebrow: 'HOSPITALIDAD, APLICADA', title: 'El motor permanece debajo.', accent: 'El huésped siente el hotel.', body: 'Companion OS es la base compartida de Axionari bajo Hotel Companion y Restaurant Companion. Mírala expresada durante una estancia completa.', primary: 'Conoce Hotel Companion', secondary: 'Acerca de Axionari' },
}

const companyEn: EditorialPageCopy = {
  hero: { id: 'company-hero', eyebrow: 'Company', title: 'The best hospitality', accent: 'still lives in people’s heads.', body: 'We built Hotel Companion to preserve that judgment, make it available in the moment and help every team act on it — without putting technology between the hotel and the guest.', primary: 'Meet the product', primaryHref: '/platform', secondary: 'Meet the team', secondaryHref: '#leadership', folioLabel: 'OUR BELIEF', folioTitle: 'Guests remember how they felt.', folioRows: [
    { label: 'NOT', value: 'The interface they used' }, { label: 'NOT', value: 'The software behind it' }, { label: 'BUT', value: 'The welcome, the care, the recovery' }, { label: 'SO', value: 'The intelligence should disappear' },
  ] },
  proof: ['HOSPITALITY FIRST', 'HUMAN OVERSIGHT', 'OPERATIONAL DISCIPLINE', 'MEASURABLE VALUE'],
  sections: [
    { id: 'why-hotels', no: '01', label: 'WHY HOTELS', title: 'The knowledge already exists.', accent: 'The moment often does not wait.', body: 'A room upgrade, a dinner reservation, a recovery and a return can all depend on what one excellent team member happens to know.', tone: 'paper', presentation: 'ledger', items: [
      { label: 'WHEN BUSY', title: 'The answer waits.', body: 'The guest’s need does not.' }, { label: 'AFTER HOURS', title: 'The knowledge goes home.', body: 'The hotel still has to operate.' }, { label: 'AFTER THE STAY', title: 'The conversation disappears.', body: 'The next decision loses what the last one revealed.' },
    ], note: 'HOTEL COMPANION EXISTS TO KEEP THE USEFUL PART — WITH PERMISSION, OWNERSHIP AND PURPOSE.' },
    { id: 'mission', no: '02', label: 'THE MISSION', title: 'Preserve hospitality knowledge.', accent: 'Compound its value.', body: 'Every conversation can improve the present stay and reveal something the organization should understand for the next one.', tone: 'sand', presentation: 'cards', items: [
      { label: 'EXPERIENCE', title: 'Make recognition useful.', body: 'Context should help the team care better, not merely know more.' }, { label: 'OPERATIONS', title: 'Make ownership visible.', body: 'A request should become accountable work and a verified outcome.' }, { label: 'BUSINESS', title: 'Make intent measurable.', body: 'Demand, friction and revenue moments should reach the people who can act.' },
    ] },
    { id: 'belief', aliases: ['approach', 'philosophy'], no: '03', label: 'THE PRINCIPLES', title: 'Hospitality is human.', accent: 'Intelligence should be quiet.', body: 'The system earns its place when it gives people more context, more time and a clearer next action.', tone: 'night', presentation: 'cards', items: [
      { label: 'HOSPITALITY FIRST', title: 'The relationship belongs to the hotel.', body: 'Technology supports the welcome; it does not perform it.' }, { label: 'HUMAN CONTROL', title: 'Critical decisions keep responsible owners.', body: 'AI assists. People remain accountable.' }, { label: 'PROOF', title: 'Understanding should improve execution.', body: 'A useful system shows what changed, what happened and what to do next.' },
    ] },
    { id: 'axionari', aliases: ['companion-os'], no: '04', label: 'THE BUILDER', title: 'Industry depth at the edge.', accent: 'A shared intelligence layer underneath.', body: 'Axionari builds Companion OS, the common foundation beneath Hotel Companion and Restaurant Companion.', tone: 'cocoa', presentation: 'stack', items: [
      { label: 'HOSPITALITY PRODUCTS', title: 'Hotel Companion · Restaurant Companion' }, { label: 'SHARED FOUNDATION', title: 'Companion OS' }, { label: 'BUILDER', title: 'Axionari · Enterprise Execution Systems' },
    ] },
    { id: 'leadership', aliases: ['band-company-dusk'], no: '05', label: 'LEADERSHIP', title: 'Built across operations,', accent: 'enterprise systems and hospitality.', body: 'The team combines company building, partnerships, implementation, engineering and enterprise operating experience.', tone: 'paper', presentation: 'ledger', items: [
      { label: 'FOUNDER & CEO', title: 'Eduardo Vertiz', body: 'Vision, product strategy, enterprise architecture and organizational intelligence.' }, { label: 'CO-FOUNDER · ENTERPRISE STRATEGY', title: 'Omar Rosario', body: 'Hospitality partnerships, luxury experiences and strategic growth.' }, { label: 'STRATEGIC PARTNERSHIPS', title: 'Yadir Sánchez-Cuevas', body: 'Enterprise technology, partnerships and capital formation.' }, { label: 'SYSTEMS & IMPLEMENTATION', title: 'Luis Sierra', body: 'Enterprise architecture, AI integration and complex implementation.' }, { label: 'PROJECTS & PARTNERSHIPS', title: 'Juan Pablo Rojas Ramírez', body: 'Project leadership, partnerships and market development.' }, { label: 'AI ENGINEERING', title: 'Andrés Dapena', body: 'Platform architecture, cloud infrastructure and enterprise systems.' },
    ] },
    { id: 'contact', no: '06', label: 'START A CONVERSATION', title: 'Bring the hotel you know.', accent: 'We will listen first.', tone: 'sand', presentation: 'cards', items: [
      { label: 'PRODUCT', title: 'See Hotel Companion around a real stay.', body: 'Request a working session tailored to your property.' }, { label: 'FOUNDING HOTEL', title: 'Run the ninety-day proof.', body: 'One property, four agreed measures and a decision at Day 90.' }, { label: 'EMAIL', title: 'sales@axionari.com', body: 'For direct product and partnership conversations.', href: 'mailto:sales@axionari.com' },
    ], link: { href: '/contact#founding', label: 'The founding hotel program' } },
  ],
  closing: { id: 'company-final-cta', eyebrow: 'THE INVITATION', title: 'The future of hospitality begins', accent: 'with understanding.', body: 'Let us learn how your hotel welcomes, serves and remembers — then make that intelligence useful across the stay.', primary: 'Request a Demo', primaryHref: '/demo', secondary: 'Contact', secondaryHref: '/contact' },
}

const companyEs: EditorialPageCopy = {
  ...companyEn,
  hero: { ...companyEn.hero, eyebrow: 'Empresa', title: 'La mejor hospitalidad', accent: 'todavía vive en la mente de las personas.', body: 'Construimos Hotel Companion para conservar ese criterio, hacerlo disponible en el momento y ayudar a cada equipo a actuar — sin poner tecnología entre el hotel y el huésped.', primary: 'Conoce el producto', secondary: 'Conoce al equipo', folioLabel: 'NUESTRA CONVICCIÓN', folioTitle: 'Los huéspedes recuerdan cómo se sintieron.', folioRows: [
    { label: 'NO', value: 'La interfaz que usaron' }, { label: 'NO', value: 'El software detrás' }, { label: 'SINO', value: 'La bienvenida, el cuidado, la recuperación' }, { label: 'POR ESO', value: 'La inteligencia debe desaparecer' },
  ] },
  proof: ['HOSPITALIDAD PRIMERO', 'SUPERVISIÓN HUMANA', 'DISCIPLINA OPERATIVA', 'VALOR MEDIBLE'],
  sections: [
    { ...companyEn.sections[0], label: 'POR QUÉ HOTELES', title: 'El conocimiento ya existe.', accent: 'El momento no siempre espera.', body: 'Una mejora, una cena, una recuperación y un regreso pueden depender de lo que sabe una sola persona excelente.', items: [
      { label: 'CON OCUPACIÓN', title: 'La respuesta espera.', body: 'La necesidad del huésped no.' }, { label: 'FUERA DE HORARIO', title: 'El conocimiento se va a casa.', body: 'El hotel debe seguir operando.' }, { label: 'DESPUÉS', title: 'La conversación desaparece.', body: 'La siguiente decisión pierde lo que reveló la anterior.' },
    ], note: 'HOTEL COMPANION EXISTE PARA CONSERVAR LO ÚTIL — CON PERMISO, RESPONSABILIDAD Y PROPÓSITO.' },
    { ...companyEn.sections[1], label: 'LA MISIÓN', title: 'Conservar el conocimiento hospitalario.', accent: 'Multiplicar su valor.', body: 'Cada conversación puede mejorar la estancia presente y revelar algo que la organización debe entender para la siguiente.', items: [
      { label: 'EXPERIENCIA', title: 'Hacer útil el reconocimiento.', body: 'El contexto debe ayudar al equipo a cuidar mejor, no solo saber más.' }, { label: 'OPERACIONES', title: 'Hacer visible la responsabilidad.', body: 'Una solicitud debe convertirse en trabajo con dueño y resultado verificado.' }, { label: 'NEGOCIO', title: 'Hacer medible la intención.', body: 'Demanda, fricción y oportunidades deben llegar a quien puede actuar.' },
    ] },
    { ...companyEn.sections[2], label: 'LOS PRINCIPIOS', title: 'La hospitalidad es humana.', accent: 'La inteligencia debe ser silenciosa.', body: 'El sistema gana su lugar cuando da a las personas más contexto, más tiempo y una siguiente acción clara.', items: [
      { label: 'HOSPITALIDAD PRIMERO', title: 'La relación pertenece al hotel.', body: 'La tecnología apoya la bienvenida; no la representa.' }, { label: 'CONTROL HUMANO', title: 'Las decisiones críticas conservan responsables.', body: 'La IA asiste. Las personas responden.' }, { label: 'EVIDENCIA', title: 'Entender debe mejorar la ejecución.', body: 'Un sistema útil muestra qué cambió, qué ocurrió y qué sigue.' },
    ] },
    { ...companyEn.sections[3], label: 'EL CREADOR', title: 'Profundidad de industria en el borde.', accent: 'Una capa compartida debajo.', body: 'Axionari construye Companion OS, la base común de Hotel Companion y Restaurant Companion.', items: [
      { label: 'PRODUCTOS DE HOSPITALIDAD', title: 'Hotel Companion · Restaurant Companion' }, { label: 'BASE COMPARTIDA', title: 'Companion OS' }, { label: 'CREADOR', title: 'Axionari · Enterprise Execution Systems' },
    ] },
    { ...companyEn.sections[4], label: 'LIDERAZGO', title: 'Construido entre operaciones,', accent: 'sistemas enterprise y hospitalidad.', body: 'El equipo combina creación de empresas, alianzas, implementación, ingeniería y experiencia operativa.', items: [
      { label: 'FUNDADOR Y CEO', title: 'Eduardo Vertiz', body: 'Visión, estrategia de producto, arquitectura enterprise e inteligencia organizacional.' }, { label: 'COFUNDADOR · ESTRATEGIA', title: 'Omar Rosario', body: 'Alianzas hoteleras, experiencias de lujo y crecimiento estratégico.' }, { label: 'ALIANZAS ESTRATÉGICAS', title: 'Yadir Sánchez-Cuevas', body: 'Tecnología enterprise, alianzas y formación de capital.' }, { label: 'SISTEMAS E IMPLEMENTACIÓN', title: 'Luis Sierra', body: 'Arquitectura enterprise, integración de IA e implementación compleja.' }, { label: 'PROYECTOS Y ALIANZAS', title: 'Juan Pablo Rojas Ramírez', body: 'Liderazgo de proyectos, alianzas y desarrollo de mercado.' }, { label: 'INGENIERÍA DE IA', title: 'Andrés Dapena', body: 'Arquitectura de plataforma, nube y sistemas enterprise.' },
    ] },
    { ...companyEn.sections[5], label: 'INICIA UNA CONVERSACIÓN', title: 'Trae el hotel que conoces.', accent: 'Primero escucharemos.', items: [
      { label: 'PRODUCTO', title: 'Mira Hotel Companion alrededor de una estancia real.', body: 'Solicita una sesión adaptada a tu propiedad.' }, { label: 'HOTEL FUNDADOR', title: 'Ejecuta la prueba de noventa días.', body: 'Una propiedad, cuatro medidas acordadas y una decisión al Día 90.' }, { label: 'EMAIL', title: 'sales@axionari.com', body: 'Para conversaciones directas de producto y alianzas.', href: 'mailto:sales@axionari.com' },
    ], link: { href: '/contact#founding', label: 'El programa para hoteles fundadores' } },
  ],
  closing: { ...companyEn.closing, eyebrow: 'LA INVITACIÓN', title: 'El futuro de la hospitalidad comienza', accent: 'con entendimiento.', body: 'Déjanos aprender cómo recibe, sirve y recuerda tu hotel — y volver útil esa inteligencia en toda la estancia.', primary: 'Solicita una Demo', secondary: 'Contacto' },
}

export const editorialPages: Record<EditorialPageKey, Localized<EditorialPageCopy>> = {
  platform: { en: platformEn, es: platformEs },
  solutions: { en: solutionsEn, es: solutionsEs },
  enterprise: { en: enterpriseEn, es: enterpriseEs },
  'companion-os': { en: osEn, es: osEs },
  company: { en: companyEn, es: companyEs },
}
