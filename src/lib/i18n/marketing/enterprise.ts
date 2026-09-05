import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#enterprise}. Verbatim. */

const en = {
  /* P5 editorial rollout: numbered-act labels + hero proof chips.
     Labels only — every reading line below is the approved site copy. */
  acts: {
    shared: 'SHARED INTELLIGENCE',
    multi: 'MULTI-PROPERTY',
    knowledge: 'KNOWLEDGE & ADMINISTRATION',
    security: 'SECURITY',
    payment: 'PAYMENT ARCHITECTURE',
    governance: 'GOVERNANCE',
    intelligence: 'INTELLIGENCE',
    fit: 'INTEGRATION & BOUNDARIES',
    deploy: 'DEPLOYMENT & SCALE',
    next: 'NEXT STEP',
  },
  heroChips: [
    'MULTI-PROPERTY',
    'ROLE-BASED ACCESS',
    'ENCRYPTED COMMUNICATIONS',
    'AUDITABILITY',
    'CENTRALIZED GOVERNANCE',
    'STAGED ROLLOUT',
  ],
  hero: {
    title: 'Built for Modern Hospitality Enterprises.',
    positioning: 'The intelligence operating system for hospitality organizations.',
    body:
      'One shared layer of intelligence across every property — organizational knowledge that compounds instead of resetting, service standards applied consistently, and operations that stay connected as the portfolio grows.',
  },
  /* Trust strip beneath the hero — hairline small-caps row. */
  trust: 'Enterprise-grade security · Centralized governance · Operational intelligence · Scalable deployment',
  /* Convergence diagram labels for {#enterprise-shared-intel}. */
  sharedIntel: {
    inputs: [
      'Brand knowledge',
      'Service standards',
      'Operational excellence',
      'Destination & culture',
      'Property personality',
    ],
    node: 'Hotel Companion',
  },
  /* P5.1 — RC "architecture" artifact (TenantStack) for {#shared-intel}.
     Tier names are structural labels; every chip is drawn from approved copy
     (admin roles, integrates capabilities, hero trust line). */
  architecture: {
    tiers: {
      org: {
        eyebrow: 'YOUR ORGANIZATION',
        title: 'Brands, properties, and teams',
        chips: ['Multiple brands', 'Every property', 'Roles & permissions'],
      },
      layer: {
        eyebrow: 'HOTEL COMPANION',
        title: 'One intelligent layer, every property',
        chips: ['Conversations', 'Teams', 'Knowledge', 'Visibility', 'Execution'],
      },
      foundation: {
        eyebrow: 'THE FOUNDATION',
        title: 'Companion OS',
        sub: 'Axionari’s shared intelligence platform',
        chips: ['Enterprise-grade security', 'Centralized governance', 'Scalable deployment'],
      },
    },
    caption: 'ONE PLATFORM · SHARED INTELLIGENCE · LOCAL EXECUTION',
  },
  securityPosture: {
    label: 'Current security facts',
    tag: 'SEPTEMBER 2026',
    rows: [
      { label: 'ENCRYPTION', value: 'Customer data is encrypted in transit and at rest.' },
      { label: 'PAYMENTS', value: 'Raw card data goes directly to Stripe; Hotel Companion receives a tokenized reference.' },
      { label: 'CUSTOMER CONTROL', value: 'Hotel knowledge remains customer-owned, with role-based access and accountable content owners.' },
      { label: 'ASSURANCE STATUS', value: 'No external certification is claimed here. Current controls and documentation are reviewed during procurement.' },
    ],
  },
  /* P5.16 — Enterprise outcomes band (from the approved sales.axionari.com
     "Enterprise Outcomes" row, verbatim). */
  outcomes: {
    eyebrow: 'ENTERPRISE OUTCOMES',
    items: [
      { title: 'Better Decisions', sub: 'Understand what matters.' },
      { title: 'Faster Execution', sub: 'Act immediately.' },
      { title: 'Organizational Alignment', sub: 'Operate from shared context.' },
      { title: 'Continuous Learning', sub: 'Every decision improves the system.' },
    ],
  },
  /* P5.13 — the staged deployment path (ArrowFlow). Replaces the "Deploy in
     Days" calendar promise: value lands before integration; connections are
     staged and measured. NEEDS CONFIRM (Eduardo): stages + phrasing. */
  deployPath: {
    title: 'Initial value in 1–3 weeks. Integrations staged to your stack.',
    steps: [
      { title: 'Initial value', sub: '1–3 weeks · Property knowledge verified and live.' },
      { title: 'Destination knowledge', sub: 'Local recommendations, policies and context — reviewed with your team.' },
      { title: 'Guest journeys', sub: 'Priority conversations and team workflows go live first.' },
      { title: 'System integrations', sub: 'PMS, POS and payments follow; timing depends on access, requirements and approvals.' },
    ],
    caption: 'VALUE BEFORE INTEGRATION · STAGED TO YOUR STACK · TIMING SCOPED TOGETHER',
  },
  /* P5.4 — the hybrid checkout flow (PaymentFlow diagram + steps). Card data
     is captured by Stripe directly; only a token returns to Postgres. */
  payment: {
    statement: 'Card data never touches the host.',
    deck:
      'When a guest pays on the companion screen, the raw card data flows straight to Stripe — never through Hotel Companion. Only a token comes back.',
    lanes: {
      client: { label: 'THE GUEST', sub: 'The companion screen' },
      api: { label: 'HOTEL COMPANION', sub: 'Booking & guest records' },
      stripe: { label: 'STRIPE', sub: 'PCI Level 1 · certified vault' },
    },
    device: { total: 'Order total', amount: '$45.90', cta: 'Tap to pay' },
    bypass: 'Raw card data never enters Hotel Companion',
    token: 'Tokenized reference — never the card',
    record: { title: 'BOOKING · MAR-4192', row: 'Ocean-View Suite · 3 nights', token: 'CARD · •••• 4242 · TOKEN ONLY' },
    steps: [
      { name: 'Intent', desc: 'The Companion confirms the total and opens a secure payment session.' },
      { name: 'Sandboxed rendering', desc: 'The payment form is Stripe’s own, rendered inside a secure frame — never the Companion’s.' },
      { name: 'Isolated capture', desc: 'The guest enters details or uses Apple Pay. Raw card data flows directly to Stripe’s Level 1 vault.' },
      { name: 'Tokenization', desc: 'A secure reference token returns to the booking record. Raw card data is never stored.' },
      { name: 'Fulfillment', desc: 'The Companion masks the display and resumes the conversation: “Thank you — your reservation is confirmed.”' },
    ],
  },
  sections: [
    {
      id: 'shared-intel',
      eyebrow: '01 · SHARED INTELLIGENCE',
      title: 'Enterprise Hospitality Starts with Shared Intelligence.',
      body: [
        'Every hotel has unique experiences. Every organization shares the same standards.',
        'Hotel Companion allows you to maintain consistent brand knowledge, service standards, and operational excellence while giving each property the flexibility to reflect its destination, culture, and personality.',
      ],
      coda: 'One platform. Shared intelligence. Local execution.',
    },
    {
      id: 'multi-property',
      eyebrow: '02 · MULTI-PROPERTY',
      title: 'Multi-Property by Design.',
      body: [
        'Manage one hotel or hundreds from a single platform.',
        'Centralize organizational knowledge. Maintain property-specific information. Distribute updates instantly. Share best practices. Standardize service quality. Monitor performance across every location.',
      ],
      coda: 'Each property remains unique. Your operational intelligence becomes shared.',
    },
    {
      id: 'knowledge',
      eyebrow: '03 · KNOWLEDGE MANAGEMENT',
      title: 'Enterprise Knowledge Management.',
      body: [
        'Knowledge is one of your organization’s most valuable assets.',
        'Hotel Companion transforms institutional knowledge into a living intelligence layer that every guest and every employee can access instantly.',
        'Policies. Operating procedures. Brand standards. Service protocols. Amenities. Local recommendations. Frequently asked questions. Internal documentation.',
      ],
      coda: 'Knowledge evolves continuously as your organization grows.',
    },
    {
      id: 'admin',
      eyebrow: '04 · ADMINISTRATION',
      title: 'Centralized Administration.',
      body: [
        'Manage your entire hospitality portfolio from one place.',
        'Properties. Users. Roles. Permissions. Knowledge. Brand voice. Languages. Content. Configurations. Updates.',
      ],
      coda: 'Enterprise administration without operational complexity.',
    },
    {
      id: 'secure',
      eyebrow: '05 · SECURITY',
      title: 'Secure by Design.',
      body: [
        'Enterprise trust begins with security.',
        'Hotel Companion is built with security at every layer.',
        'Role-based access. Encrypted communications. Protected knowledge. Auditability. Secure authentication. Privacy-first architecture.',
      ],
      coda: 'Your data remains your data. Protected. Governed. Controlled.',
    },
    {
      id: 'governance',
      eyebrow: '06 · GOVERNANCE',
      title: 'Governance Without Friction.',
      body: [
        'Maintain consistency while empowering local teams.',
        'Corporate standards. Property autonomy. Approval workflows. Version control. Content governance. Operational oversight.',
      ],
      coda: 'Enterprise organizations gain confidence without sacrificing agility.',
    },
    {
      id: 'operational-intel',
      eyebrow: '07 · OPERATIONAL INTELLIGENCE',
      title: 'Operational Intelligence.',
      body: [
        'Thousands of guest conversations reveal patterns no dashboard has ever captured before.',
        'Hotel Companion continuously surfaces:',
        'Operational bottlenecks. Frequently requested services. Knowledge gaps. Maintenance trends. Peak demand periods. Department workload. Service response times. Emerging guest expectations.',
      ],
      coda: 'Every conversation becomes operational intelligence.',
    },
    {
      id: 'commercial-intel',
      eyebrow: '08 · COMMERCIAL INTELLIGENCE',
      title: 'Commercial Intelligence.',
      body: [
        'Revenue opportunities shouldn’t depend on chance.',
        'Hotel Companion identifies commercial intent across every guest interaction.',
        'Upgrade opportunities. Extended stays. Celebrations. Premium experiences. Spa demand. Dining interest. Transportation needs. Activity bookings.',
      ],
      coda: 'Leadership gains visibility into revenue opportunities that traditionally disappear inside conversations.',
    },
    {
      id: 'integrates',
      eyebrow: '10 · INTEGRATION',
      title: 'Integrates Into Your Operation.',
      body: [
        'Hotel Companion is designed to complement your existing hospitality ecosystem.',
        'Rather than replacing your operation, it enhances it.',
        'Connect conversations. Coordinate teams. Expand knowledge. Improve visibility. Accelerate execution.',
      ],
      coda: 'Your technology stack continues working. Your guests simply receive a better experience.',
    },
    {
      id: 'deploy',
      eyebrow: '12 · DEPLOYMENT',
      title: 'Initial Value in 1–3 Weeks.',
      body: [
        'A verified property and destination knowledge base, priority guest journeys, and team workflows go live first.',
        'PMS, POS, and payment connections follow in a staged rollout.',
        'Integration timing depends on API access, provider requirements, and approvals.',
      ],
      coda:
        'Value before integration. Systems staged to your stack.',
    },
    {
      id: 'grow',
      eyebrow: '13 · SCALE',
      title: 'Built to Grow With You.',
      body: [
        'Start with one property. Expand to ten. Scale to hundreds.',
        'Hotel Companion grows alongside your organization without requiring a new platform, a new architecture, or a different operating model.',
      ],
      coda: 'One platform. Unlimited potential.',
    },
  ],
  whatItIsNot: {
    title: 'What Hotel Companion Is Not.',
    lead: [
      'Your PMS manages reservations.',
      'Your operational tools manage execution.',
      'Hotel Companion understands the guest conversations happening around them—and helps your team focus on what matters most.',
    ],
    items: [
      { name: 'Not a PMS', desc: 'It doesn’t touch reservations or payments.' },
      { name: 'Not a generic assistant', desc: 'It understands context and intent, not just keywords.' },
      { name: 'Not another app', desc: 'Guests scan, tap, or speak. Nothing to download.' },
      { name: 'Not a rip-and-replace integration', desc: 'It complements the systems you already run.' },
    ],
    close: ['It doesn’t replace your operation.', 'It understands the conversations between every part of it.'],
  },
  finalCta: {
    title: 'Enterprise Hospitality Deserves Enterprise Intelligence.',
    beats: [
      'Deliver consistent service across every property.',
      'Empower every department.',
      'Protect organizational knowledge.',
      'Increase operational visibility.',
      'Turn every guest conversation into measurable business intelligence.',
      'Scale hospitality with confidence.',
    ],
    cta: 'Book a Demo',
  },
}

const es: typeof en = {
  acts: {
    shared: 'INTELIGENCIA COMPARTIDA',
    multi: 'MULTIPROPIEDAD',
    knowledge: 'CONOCIMIENTO Y ADMINISTRACIÓN',
    security: 'SEGURIDAD',
    payment: 'ARQUITECTURA DE PAGOS',
    governance: 'GOBERNANZA',
    intelligence: 'INTELIGENCIA',
    fit: 'INTEGRACIÓN Y LÍMITES',
    deploy: 'IMPLEMENTACIÓN Y ESCALA',
    next: 'SIGUIENTE PASO',
  },
  heroChips: [
    'MULTIPROPIEDAD',
    'ACCESO BASADO EN ROLES',
    'COMUNICACIONES CIFRADAS',
    'AUDITABILIDAD',
    'GOBERNANZA CENTRALIZADA',
    'IMPLEMENTACIÓN POR ETAPAS',
  ],
  hero: {
    title: 'Creado para Empresas Modernas de Hospitalidad.',
    positioning: 'El sistema operativo de inteligencia para organizaciones hoteleras.',
    body:
      'Una sola capa de inteligencia compartida en cada propiedad — conocimiento organizacional que se acumula en lugar de reiniciarse, estándares de servicio aplicados con consistencia y operaciones que permanecen conectadas conforme crece el portafolio.',
  },
  trust:
    'Seguridad de nivel empresarial · Gobernanza centralizada · Inteligencia operativa · Implementación escalable',
  sharedIntel: {
    inputs: [
      'Conocimiento de marca',
      'Estándares de servicio',
      'Excelencia operativa',
      'Destino y cultura',
      'Personalidad de la propiedad',
    ],
    node: 'Hotel Companion',
  },
  architecture: {
    tiers: {
      org: {
        eyebrow: 'TU ORGANIZACIÓN',
        title: 'Marcas, propiedades y equipos',
        chips: ['Múltiples marcas', 'Cada propiedad', 'Roles y permisos'],
      },
      layer: {
        eyebrow: 'HOTEL COMPANION',
        title: 'Una capa inteligente, en cada propiedad',
        chips: ['Conversaciones', 'Equipos', 'Conocimiento', 'Visibilidad', 'Ejecución'],
      },
      foundation: {
        eyebrow: 'LA BASE',
        title: 'Companion OS',
        sub: 'La plataforma de inteligencia compartida de Axionari',
        chips: ['Seguridad de nivel empresarial', 'Gobernanza centralizada', 'Implementación escalable'],
      },
    },
    caption: 'UNA PLATAFORMA · INTELIGENCIA COMPARTIDA · EJECUCIÓN LOCAL',
  },
  securityPosture: {
    label: 'Hechos actuales de seguridad',
    tag: 'SEPTIEMBRE DE 2026',
    rows: [
      { label: 'CIFRADO', value: 'Los datos del cliente se cifran en tránsito y en reposo.' },
      { label: 'PAGOS', value: 'Los datos de tarjeta van directamente a Stripe; Hotel Companion recibe una referencia tokenizada.' },
      { label: 'CONTROL DEL CLIENTE', value: 'El conocimiento del hotel pertenece al cliente, con acceso por roles y responsables de contenido.' },
      { label: 'ESTADO DE GARANTÍAS', value: 'Aquí no se afirma ninguna certificación externa. Los controles y la documentación actuales se revisan durante el proceso de compra.' },
    ],
  },
  outcomes: {
    eyebrow: 'RESULTADOS EMPRESARIALES',
    items: [
      { title: 'Mejores Decisiones', sub: 'Entiende lo que importa.' },
      { title: 'Ejecución Más Rápida', sub: 'Actúa de inmediato.' },
      { title: 'Alineación Organizacional', sub: 'Opera desde un contexto compartido.' },
      { title: 'Aprendizaje Continuo', sub: 'Cada decisión mejora el sistema.' },
    ],
  },
  deployPath: {
    title: 'Valor inicial en 1–3 semanas. Integraciones por etapas para tu stack.',
    steps: [
      { title: 'Valor inicial', sub: '1–3 semanas · Conocimiento de la propiedad verificado y en vivo.' },
      { title: 'Conocimiento del destino', sub: 'Recomendaciones locales, políticas y contexto — revisados con tu equipo.' },
      { title: 'Recorridos del huésped', sub: 'Las conversaciones prioritarias y los flujos del equipo entran en operación primero.' },
      { title: 'Integraciones de sistemas', sub: 'PMS, POS y pagos siguen; el plazo depende de accesos, requisitos y aprobaciones.' },
    ],
    caption: 'VALOR ANTES DE LA INTEGRACIÓN · POR ETAPAS PARA TU STACK · PLAZOS DEFINIDOS EN CONJUNTO',
  },
  payment: {
    statement: 'Los datos de la tarjeta nunca tocan el host.',
    deck:
      'Cuando un huésped paga en la pantalla del companion, los datos de la tarjeta van directo a Stripe — nunca pasan por Hotel Companion. Solo regresa un token.',
    lanes: {
      client: { label: 'EL HUÉSPED', sub: 'La pantalla del companion' },
      api: { label: 'HOTEL COMPANION', sub: 'Reservas y registros del huésped' },
      stripe: { label: 'STRIPE', sub: 'PCI Nivel 1 · bóveda certificada' },
    },
    device: { total: 'Total del pedido', amount: '$45.90', cta: 'Toca para pagar' },
    bypass: 'Los datos de la tarjeta nunca entran a Hotel Companion',
    token: 'Referencia tokenizada — nunca la tarjeta',
    record: { title: 'RESERVA · MAR-4192', row: 'Suite Vista al Mar · 3 noches', token: 'TARJETA · •••• 4242 · SOLO TOKEN' },
    steps: [
      { name: 'Intención', desc: 'El Companion confirma el total y abre una sesión de pago segura.' },
      { name: 'Renderizado aislado', desc: 'El formulario de pago es el de Stripe, dentro de un marco seguro — nunca el del Companion.' },
      { name: 'Captura aislada', desc: 'El huésped ingresa sus datos o usa Apple Pay. Los datos de la tarjeta van directo a la bóveda Nivel 1 de Stripe.' },
      { name: 'Tokenización', desc: 'Un token de referencia seguro regresa al registro de la reserva. Los datos de la tarjeta nunca se almacenan.' },
      { name: 'Cumplimiento', desc: 'El Companion oculta la pantalla y retoma la conversación: “Gracias — tu reservación está confirmada.”' },
    ],
  },
  sections: [
    {
      id: 'shared-intel',
      eyebrow: '01 · INTELIGENCIA COMPARTIDA',
      title: 'La Hospitalidad Empresarial Comienza con Inteligencia Compartida.',
      body: [
        'Cada hotel tiene experiencias únicas. Cada organización comparte los mismos estándares.',
        'Hotel Companion te permite mantener un conocimiento de marca, estándares de servicio y excelencia operativa consistentes, dándole a cada propiedad la flexibilidad de reflejar su destino, su cultura y su personalidad.',
      ],
      coda: 'Una plataforma. Inteligencia compartida. Ejecución local.',
    },
    {
      id: 'multi-property',
      eyebrow: '02 · MULTIPROPIEDAD',
      title: 'Multipropiedad por Diseño.',
      body: [
        'Administra uno o cientos de hoteles desde una sola plataforma.',
        'Centraliza el conocimiento organizacional. Mantén información específica por propiedad. Distribuye actualizaciones al instante. Comparte mejores prácticas. Estandariza la calidad del servicio. Monitorea el desempeño en cada ubicación.',
      ],
      coda: 'Cada propiedad sigue siendo única. Tu inteligencia operativa se vuelve compartida.',
    },
    {
      id: 'knowledge',
      eyebrow: '03 · GESTIÓN DEL CONOCIMIENTO',
      title: 'Gestión del Conocimiento Empresarial.',
      body: [
        'El conocimiento es uno de los activos más valiosos de tu organización.',
        'Hotel Companion transforma el conocimiento institucional en una capa de inteligencia viva a la que cada huésped y cada empleado pueden acceder al instante.',
        'Políticas. Procedimientos operativos. Estándares de marca. Protocolos de servicio. Amenidades. Recomendaciones locales. Preguntas frecuentes. Documentación interna.',
      ],
      coda: 'El conocimiento evoluciona continuamente conforme tu organización crece.',
    },
    {
      id: 'admin',
      eyebrow: '04 · ADMINISTRACIÓN',
      title: 'Administración Centralizada.',
      body: [
        'Administra todo tu portafolio hotelero desde un solo lugar.',
        'Propiedades. Usuarios. Roles. Permisos. Conocimiento. Voz de marca. Idiomas. Contenido. Configuraciones. Actualizaciones.',
      ],
      coda: 'Administración empresarial sin complejidad operativa.',
    },
    {
      id: 'secure',
      eyebrow: '05 · SEGURIDAD',
      title: 'Seguro por Diseño.',
      body: [
        'La confianza empresarial comienza con la seguridad.',
        'Hotel Companion está construido con seguridad en cada capa.',
        'Acceso basado en roles. Comunicaciones cifradas. Conocimiento protegido. Auditabilidad. Autenticación segura. Arquitectura centrada en la privacidad.',
      ],
      coda: 'Tus datos siguen siendo tuyos. Protegidos. Gobernados. Controlados.',
    },
    {
      id: 'governance',
      eyebrow: '06 · GOBERNANZA',
      title: 'Gobernanza Sin Fricción.',
      body: [
        'Mantén la consistencia mientras empoderas a los equipos locales.',
        'Estándares corporativos. Autonomía de la propiedad. Flujos de aprobación. Control de versiones. Gobernanza de contenido. Supervisión operativa.',
      ],
      coda: 'Las organizaciones empresariales ganan confianza sin sacrificar agilidad.',
    },
    {
      id: 'operational-intel',
      eyebrow: '07 · INTELIGENCIA OPERATIVA',
      title: 'Inteligencia Operativa.',
      body: [
        'Miles de conversaciones con huéspedes revelan patrones que ningún tablero había capturado antes.',
        'Hotel Companion revela continuamente:',
        'Cuellos de botella operativos. Servicios solicitados con frecuencia. Vacíos de conocimiento. Tendencias de mantenimiento. Periodos de mayor demanda. Carga de trabajo por departamento. Tiempos de respuesta del servicio. Expectativas emergentes del huésped.',
      ],
      coda: 'Cada conversación se convierte en inteligencia operativa.',
    },
    {
      id: 'commercial-intel',
      eyebrow: '08 · INTELIGENCIA COMERCIAL',
      title: 'Inteligencia Comercial.',
      body: [
        'Las oportunidades de ingreso no deberían depender del azar.',
        'Hotel Companion identifica la intención comercial en cada interacción con el huésped.',
        'Oportunidades de mejora. Estancias extendidas. Celebraciones. Experiencias premium. Demanda de spa. Interés gastronómico. Necesidades de transporte. Reservas de actividades.',
      ],
      coda: 'La dirección gana visibilidad sobre oportunidades de ingreso que tradicionalmente desaparecen dentro de las conversaciones.',
    },
    {
      id: 'integrates',
      eyebrow: '10 · INTEGRACIÓN',
      title: 'Se Integra a Tu Operación.',
      body: [
        'Hotel Companion está diseñado para complementar tu ecosistema hotelero existente.',
        'En lugar de reemplazar tu operación, la potencia.',
        'Conecta conversaciones. Coordina equipos. Amplía el conocimiento. Mejora la visibilidad. Acelera la ejecución.',
      ],
      coda: 'Tu stack tecnológico sigue funcionando. Tus huéspedes simplemente reciben una mejor experiencia.',
    },
    {
      id: 'deploy',
      eyebrow: '12 · IMPLEMENTACIÓN',
      title: 'Implementa en Días.',
      body: [
        'El software empresarial no debería requerir meses de implementación.',
        'Hotel Companion está diseñado para una implementación rápida.',
        'Incorporación ágil. Implementación guiada. Capacitación mínima. Valor inmediato. Escala a tu propio ritmo.',
      ],
      coda:
        'Ya sea que implementes una sola propiedad o todo un portafolio, tus equipos pueden empezar a generar valor casi de inmediato.',
    },
    {
      id: 'grow',
      eyebrow: '13 · ESCALA',
      title: 'Creado para Crecer Contigo.',
      body: [
        'Empieza con una propiedad. Expándete a diez. Escala a cientos.',
        'Hotel Companion crece junto con tu organización sin requerir una nueva plataforma, una nueva arquitectura ni un modelo operativo diferente.',
      ],
      coda: 'Una plataforma. Potencial ilimitado.',
    },
  ],
  whatItIsNot: {
    title: 'Lo que Hotel Companion No Es.',
    lead: [
      'Tu PMS gestiona las reservaciones.',
      'Tus herramientas operativas gestionan la ejecución.',
      'Hotel Companion entiende las conversaciones con los huéspedes que ocurren alrededor de ellas—y ayuda a tu equipo a enfocarse en lo que más importa.',
    ],
    items: [
      { name: 'No es un PMS', desc: 'No toca reservaciones ni pagos.' },
      { name: 'No es un asistente genérico', desc: 'Entiende contexto e intención, no solo palabras clave.' },
      { name: 'No es otra app', desc: 'Los huéspedes escanean, tocan o hablan. Nada que descargar.' },
      { name: 'No es una integración de reemplazo total', desc: 'Complementa los sistemas que ya usas.' },
    ],
    close: ['No reemplaza tu operación.', 'Entiende las conversaciones entre cada parte de ella.'],
  },
  finalCta: {
    title: 'La Hospitalidad Empresarial Merece Inteligencia Empresarial.',
    beats: [
      'Brinda un servicio consistente en cada propiedad.',
      'Empodera a cada departamento.',
      'Protege el conocimiento organizacional.',
      'Aumenta la visibilidad operativa.',
      'Convierte cada conversación con un huésped en inteligencia de negocio medible.',
      'Escala la hospitalidad con confianza.',
    ],
    cta: 'Agenda una Demo',
  },
}

export const enterpriseCopy: Localized<typeof en> = { en, es }
