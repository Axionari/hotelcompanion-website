import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#solutions}. Verbatim. */

const en = {
  /* P5 editorial rollout: numbered-act labels only — every reading line
     below is the approved site copy. Segment acts reuse each segment's own
     eyebrow as its label (the .eyebrow class renders mono-caps). */
  acts: {
    departments: 'THE DEPARTMENTS',
    next: 'NEXT STEP',
  },
  hero: {
    title: 'One Platform. Every Department.',
    body1:
      'Every guest interaction creates an opportunity to deliver better service, generate more revenue, and operate more efficiently.',
    body2:
      'Hotel Companion becomes an intelligent layer across your entire hotel, helping every department respond faster, work smarter, and deliver exceptional hospitality through one Voice-First Guest Intelligence Platform.',
  },
  departmentsEyebrow: '01 · BY DEPARTMENT',
  departmentsTitle: 'Every department, one shared intelligence.',
  departments: [
    {
      id: 'front-desk',
      eyebrow: 'Front Desk',
      title: 'Every Arrival Starts Better.',
      body: [
        'Your front desk should create memorable first impressions—not spend its day answering repetitive questions.',
        'Hotel Companion instantly assists guests before, during, and after arrival.',
        'Check-in information. Parking. Wi-Fi. Property maps. Operating hours. Hotel policies. Directions. Luggage assistance. Transportation. Late checkout. Early check-in. Room upgrades.',
        'Your team spends less time answering routine questions and more time welcoming guests.',
      ],
    },
    {
      id: 'concierge',
      eyebrow: 'Concierge',
      title: 'A Concierge Available 24 Hours a Day.',
      body: [
        'Every guest receives expert recommendations instantly.',
        'Restaurants. Nightlife. Shopping. Beaches. Museums. Excursions. Private experiences. Transportation. Family activities. Hidden local favorites. Weather recommendations. Business services.',
        'Every recommendation is personalized. Every conversation feels human. Every guest feels looked after.',
      ],
    },
    {
      id: 'guest-services',
      eyebrow: 'Guest Services',
      title: 'Every Request. Perfectly Coordinated.',
      body: [
        'Hotel Companion handles everyday guest requests with speed and consistency.',
        'Extra towels. Extra pillows. Blankets. Laundry. Wake-up calls. Baby cribs. Celebration arrangements. Accessibility assistance. Airport transportation. Lost & Found. Special requests. VIP services.',
        'Every request is routed automatically to the appropriate team.',
        'Guests always know their request is being handled. Staff always know what to do next.',
      ],
    },
    {
      id: 'housekeeping',
      eyebrow: 'Housekeeping',
      title: 'Faster Response. Better Visibility.',
      body: [
        'Housekeeping receives structured requests instantly.',
        'Room cleaning. Turndown service. Fresh linens. Extra amenities. Baby cribs. Rollaway beds. Special requests.',
        'Guests receive updates. Managers gain visibility. Nothing gets overlooked.',
        'Every request moves from conversation to completion.',
      ],
    },
    {
      id: 'engineering',
      eyebrow: 'Engineering & Maintenance',
      title: 'Resolve Issues Before They Become Bad Reviews.',
      body: [
        'Guests report problems naturally through conversation.',
        'Air conditioning. Lighting. Television. Internet. Water pressure. Leaks. Electrical issues. Door locks. Room equipment.',
        'Maintenance teams receive complete, actionable information immediately, helping resolve issues faster and improving the guest experience before small problems become public complaints.',
        'Two-stage alerts: the first the moment the issue is reported, a second the moment the room number is confirmed—so nothing falls through the cracks at 2 AM.',
      ],
    },
    {
      id: 'fnb',
      eyebrow: 'Food & Beverage',
      title: 'Every Meal Is an Opportunity.',
      body: [
        'Hotel Companion helps guests discover and enjoy every dining experience your property offers.',
        'Browse menus. Reserve tables. Order room service. Discover chef recommendations. Private dining. Wine experiences. Dietary accommodations. Celebration dinners.',
        'Every recommendation increases guest satisfaction while creating new revenue opportunities across your property.',
      ],
    },
    {
      id: 'spa',
      eyebrow: 'Spa & Wellness',
      title: 'Wellness Begins With Conversation.',
      body: [
        'Guests can instantly explore and reserve wellness experiences.',
        'Spa treatments. Massage therapies. Fitness classes. Wellness programs. Beauty services. Private sessions. Retreat packages. Availability. Recommendations.',
        'Every interaction removes friction from booking while increasing utilization of your wellness facilities.',
      ],
    },
    {
      id: 'revenue',
      eyebrow: 'Sales & Revenue Management',
      title: 'Turn Guest Intent Into Revenue.',
      body: [
        'Every conversation reveals commercial opportunities.',
        'Interest in upgrades. Longer stays. Special occasions. Premium experiences. Transportation. Dining. Spa. Activities. Celebrations. Private events.',
        'Hotel Companion continuously surfaces these opportunities so your team can act at exactly the right moment.',
        'Hospitality first. Revenue naturally follows.',
      ],
    },
    {
      id: 'gm',
      eyebrow: 'General Manager',
      title: 'Understand Your Hotel Like Never Before.',
      body: [
        'Hotel Companion gives leadership visibility into the conversations shaping the guest experience.',
        'Guest behavior. Revenue opportunities. Service demand. Operational bottlenecks. Department performance. Knowledge gaps. Maintenance trends. Guest expectations. Commercial insights.',
        'Executive dashboards transform thousands of conversations into actionable intelligence that helps leaders make faster, better decisions.',
      ],
    },
  ],
  segmentsEyebrow: '02 · BY PROPERTY TYPE',
  segmentsTitle: 'Built for every kind of hospitality organization.',
  segments: [
    {
      id: 'multi-property',
      eyebrow: 'Multi-Property Groups',
      title: 'One Platform. Every Property.',
      body: [
        'Maintain consistency across your portfolio while allowing every hotel to preserve its unique identity.',
        'Corporate knowledge. Property-specific information. Shared governance. Localized recommendations. Portfolio-wide analytics. Operational intelligence across every location.',
        'One Companion. Unlimited properties.',
      ],
    },
    {
      id: 'luxury',
      eyebrow: 'Luxury Hotels',
      title: 'Personalized Hospitality at Scale.',
      body: [
        'Luxury guests expect to feel recognized.',
        'Hotel Companion remembers preferences, understands context, and helps deliver personalized service throughout every stay.',
        'Recognize returning guests. Coordinate VIP arrivals. Recommend curated experiences. Support concierge teams. Maintain impeccable brand standards. Deliver exceptional hospitality—24 hours a day.',
      ],
    },
    {
      id: 'resorts',
      eyebrow: 'Resorts',
      title: 'Coordinate Complex Guest Experiences.',
      body: [
        'Resorts offer far more than rooms.',
        'Hotel Companion connects every experience into one seamless journey.',
        'Restaurants. Pools. Beach clubs. Spa. Golf. Activities. Transportation. Entertainment. Excursions.',
        'Every amenity becomes instantly accessible through conversation.',
      ],
    },
    {
      id: 'boutique',
      eyebrow: 'Boutique Hotels',
      title: 'Preserve What Makes You Unique.',
      body: [
        'Boutique hospitality is deeply personal.',
        'Hotel Companion extends that experience without sacrificing authenticity.',
        'Every recommendation reflects your property’s personality. Every guest interaction feels intentional. Every experience remains distinctly yours.',
      ],
    },
    {
      id: 'business',
      eyebrow: 'Business Hotels',
      title: 'Help Business Travelers Move Faster.',
      body: [
        'Business travelers value speed, accuracy, and convenience.',
        'Hotel Companion provides immediate access to everything they need.',
        'Airport transportation. Meeting rooms. Business services. Printing. Dining. Fitness. Express checkout. Late checkout. Workspace information.',
        'Reliable assistance—available at any hour.',
      ],
    },
    {
      id: 'enterprise-groups',
      eyebrow: 'Enterprise Hotel Groups',
      title: 'Consistency Across Every Hotel.',
      body: [
        'Deliver the same exceptional experience across your portfolio while empowering every property with local knowledge.',
        'Shared standards. Centralized governance. Portfolio-wide intelligence. Localized execution.',
        'One intelligent platform supporting every hotel in your organization.',
      ],
    },
  ],
  finalCta: {
    title: 'Hospitality Is a Team Sport.',
    body: 'When every department shares the same intelligence, every guest receives a better experience.',
    beats: [
      'Empower your teams.',
      'Increase ancillary revenue.',
      'Reduce operational friction.',
      'Understand every guest.',
      'Coordinate every interaction.',
    ],
    platform: 'One Voice-First Guest Intelligence Platform.',
    cta: 'Book a Demo',
  },
}

const es: typeof en = {
  acts: {
    departments: 'LOS DEPARTAMENTOS',
    next: 'SIGUIENTE PASO',
  },
  hero: {
    title: 'Una Plataforma. Cada Departamento.',
    body1:
      'Cada interacción con el huésped crea una oportunidad para brindar mejor servicio, generar más ingresos y operar con mayor eficiencia.',
    body2:
      'Hotel Companion se convierte en una capa inteligente en todo tu hotel, ayudando a cada departamento a responder más rápido, trabajar mejor y brindar una hospitalidad excepcional a través de una sola Plataforma de Inteligencia de Huéspedes por Voz.',
  },
  departmentsEyebrow: '01 · POR DEPARTAMENTO',
  departmentsTitle: 'Cada departamento, una sola inteligencia compartida.',
  departments: [
    {
      id: 'front-desk',
      eyebrow: 'Recepción',
      title: 'Cada Llegada Comienza Mejor.',
      body: [
        'Tu recepción debería crear primeras impresiones memorables—no pasar el día respondiendo preguntas repetitivas.',
        'Hotel Companion asiste a los huéspedes al instante antes, durante y después de la llegada.',
        'Información de check-in. Estacionamiento. Wi-Fi. Mapas de la propiedad. Horarios. Políticas del hotel. Indicaciones. Asistencia con equipaje. Transporte. Salida tardía. Entrada anticipada. Mejoras de habitación.',
        'Tu equipo dedica menos tiempo a preguntas rutinarias y más tiempo a recibir huéspedes.',
      ],
    },
    {
      id: 'concierge',
      eyebrow: 'Concierge',
      title: 'Un Concierge Disponible las 24 Horas.',
      body: [
        'Cada huésped recibe recomendaciones expertas al instante.',
        'Restaurantes. Vida nocturna. Compras. Playas. Museos. Excursiones. Experiencias privadas. Transporte. Actividades familiares. Favoritos locales escondidos. Recomendaciones según el clima. Servicios de negocios.',
        'Cada recomendación es personalizada. Cada conversación se siente humana. Cada huésped se siente atendido.',
      ],
    },
    {
      id: 'guest-services',
      eyebrow: 'Servicios al Huésped',
      title: 'Cada Solicitud. Perfectamente Coordinada.',
      body: [
        'Hotel Companion atiende las solicitudes cotidianas con rapidez y consistencia.',
        'Toallas extra. Almohadas extra. Cobijas. Lavandería. Llamadas de despertador. Cunas. Arreglos de celebración. Asistencia de accesibilidad. Transporte al aeropuerto. Objetos perdidos. Solicitudes especiales. Servicios VIP.',
        'Cada solicitud se enruta automáticamente al equipo correcto.',
        'Los huéspedes siempre saben que su solicitud está siendo atendida. El personal siempre sabe qué hacer a continuación.',
      ],
    },
    {
      id: 'housekeeping',
      eyebrow: 'Ama de Llaves',
      title: 'Respuesta Más Rápida. Mejor Visibilidad.',
      body: [
        'Ama de Llaves recibe solicitudes estructuradas al instante.',
        'Limpieza de habitación. Servicio de cortesía nocturno. Blancos frescos. Amenidades extra. Cunas. Camas plegables. Solicitudes especiales.',
        'Los huéspedes reciben actualizaciones. Los gerentes ganan visibilidad. Nada se pasa por alto.',
        'Cada solicitud avanza de la conversación al cumplimiento.',
      ],
    },
    {
      id: 'engineering',
      eyebrow: 'Ingeniería y Mantenimiento',
      title: 'Resuelve Problemas Antes de que Se Vuelvan Malas Reseñas.',
      body: [
        'Los huéspedes reportan problemas de forma natural mediante la conversación.',
        'Aire acondicionado. Iluminación. Televisión. Internet. Presión de agua. Fugas. Problemas eléctricos. Cerraduras. Equipo de la habitación.',
        'Los equipos de mantenimiento reciben de inmediato información completa y accionable, ayudando a resolver problemas más rápido y a mejorar la experiencia del huésped antes de que los pequeños detalles se conviertan en quejas públicas.',
        'Alertas en dos etapas: la primera en cuanto se reporta el problema, una segunda en cuanto se confirma el número de habitación—para que nada se pierda a las 2 de la mañana.',
      ],
    },
    {
      id: 'fnb',
      eyebrow: 'Alimentos y Bebidas',
      title: 'Cada Comida Es una Oportunidad.',
      body: [
        'Hotel Companion ayuda a los huéspedes a descubrir y disfrutar cada experiencia gastronómica de tu propiedad.',
        'Explorar menús. Reservar mesas. Pedir servicio a la habitación. Descubrir recomendaciones del chef. Cenas privadas. Experiencias de vino. Adaptaciones alimentarias. Cenas de celebración.',
        'Cada recomendación aumenta la satisfacción del huésped mientras crea nuevas oportunidades de ingreso en toda tu propiedad.',
      ],
    },
    {
      id: 'spa',
      eyebrow: 'Spa y Bienestar',
      title: 'El Bienestar Comienza con una Conversación.',
      body: [
        'Los huéspedes pueden explorar y reservar experiencias de bienestar al instante.',
        'Tratamientos de spa. Terapias de masaje. Clases de fitness. Programas de bienestar. Servicios de belleza. Sesiones privadas. Paquetes de retiro. Disponibilidad. Recomendaciones.',
        'Cada interacción elimina fricción en las reservas mientras aumenta el uso de tus instalaciones de bienestar.',
      ],
    },
    {
      id: 'revenue',
      eyebrow: 'Ventas y Revenue Management',
      title: 'Convierte la Intención del Huésped en Ingreso.',
      body: [
        'Cada conversación revela oportunidades comerciales.',
        'Interés en mejoras. Estancias más largas. Ocasiones especiales. Experiencias premium. Transporte. Gastronomía. Spa. Actividades. Celebraciones. Eventos privados.',
        'Hotel Companion revela continuamente estas oportunidades para que tu equipo actúe en el momento exacto.',
        'La hospitalidad va primero. El ingreso llega de forma natural.',
      ],
    },
    {
      id: 'gm',
      eyebrow: 'Gerente General',
      title: 'Comprende Tu Hotel Como Nunca Antes.',
      body: [
        'Hotel Companion le da a la dirección visibilidad sobre las conversaciones que moldean la experiencia del huésped.',
        'Comportamiento del huésped. Oportunidades de ingreso. Demanda de servicios. Cuellos de botella operativos. Desempeño por departamento. Vacíos de conocimiento. Tendencias de mantenimiento. Expectativas del huésped. Perspectivas comerciales.',
        'Los tableros ejecutivos transforman miles de conversaciones en inteligencia accionable que ayuda a los líderes a tomar decisiones más rápidas y mejores.',
      ],
    },
  ],
  segmentsEyebrow: '02 · POR TIPO DE PROPIEDAD',
  segmentsTitle: 'Creado para cada tipo de organización de hospitalidad.',
  segments: [
    {
      id: 'multi-property',
      eyebrow: 'Grupos Multipropiedad',
      title: 'Una Plataforma. Cada Propiedad.',
      body: [
        'Mantén la consistencia en tu portafolio mientras cada hotel preserva su identidad única.',
        'Conocimiento corporativo. Información específica por propiedad. Gobernanza compartida. Recomendaciones locales. Analítica de todo el portafolio. Inteligencia operativa en cada ubicación.',
        'Un solo Companion. Propiedades ilimitadas.',
      ],
    },
    {
      id: 'luxury',
      eyebrow: 'Hoteles de Lujo',
      title: 'Hospitalidad Personalizada a Escala.',
      body: [
        'Los huéspedes de lujo esperan sentirse reconocidos.',
        'Hotel Companion recuerda preferencias, entiende el contexto y ayuda a brindar un servicio personalizado durante toda la estancia.',
        'Reconoce a los huéspedes que regresan. Coordina llegadas VIP. Recomienda experiencias seleccionadas. Apoya a los equipos de concierge. Mantén estándares de marca impecables. Brinda una hospitalidad excepcional—las 24 horas.',
      ],
    },
    {
      id: 'resorts',
      eyebrow: 'Resorts',
      title: 'Coordina Experiencias Complejas para el Huésped.',
      body: [
        'Los resorts ofrecen mucho más que habitaciones.',
        'Hotel Companion conecta cada experiencia en un solo recorrido fluido.',
        'Restaurantes. Albercas. Clubes de playa. Spa. Golf. Actividades. Transporte. Entretenimiento. Excursiones.',
        'Cada amenidad se vuelve accesible al instante mediante la conversación.',
      ],
    },
    {
      id: 'boutique',
      eyebrow: 'Hoteles Boutique',
      title: 'Preserva lo que Te Hace Único.',
      body: [
        'La hospitalidad boutique es profundamente personal.',
        'Hotel Companion extiende esa experiencia sin sacrificar autenticidad.',
        'Cada recomendación refleja la personalidad de tu propiedad. Cada interacción se siente intencional. Cada experiencia sigue siendo inconfundiblemente tuya.',
      ],
    },
    {
      id: 'business',
      eyebrow: 'Hoteles de Negocios',
      title: 'Ayuda a los Viajeros de Negocios a Avanzar Más Rápido.',
      body: [
        'Los viajeros de negocios valoran la rapidez, la precisión y la comodidad.',
        'Hotel Companion ofrece acceso inmediato a todo lo que necesitan.',
        'Transporte al aeropuerto. Salas de juntas. Servicios de negocios. Impresión. Gastronomía. Fitness. Salida exprés. Salida tardía. Información de espacios de trabajo.',
        'Asistencia confiable—disponible a cualquier hora.',
      ],
    },
    {
      id: 'enterprise-groups',
      eyebrow: 'Grupos Hoteleros Empresariales',
      title: 'Consistencia en Cada Hotel.',
      body: [
        'Ofrece la misma experiencia excepcional en todo tu portafolio mientras empoderas a cada propiedad con conocimiento local.',
        'Estándares compartidos. Gobernanza centralizada. Inteligencia de todo el portafolio. Ejecución local.',
        'Una sola plataforma inteligente que apoya a cada hotel de tu organización.',
      ],
    },
  ],
  finalCta: {
    title: 'La Hospitalidad Es un Trabajo en Equipo.',
    body: 'Cuando cada departamento comparte la misma inteligencia, cada huésped recibe una mejor experiencia.',
    beats: [
      'Empodera a tus equipos.',
      'Aumenta el ingreso complementario.',
      'Reduce la fricción operativa.',
      'Entiende a cada huésped.',
      'Coordina cada interacción.',
    ],
    platform: 'Una sola Plataforma de Inteligencia de Huéspedes por Voz.',
    cta: 'Agenda una Demo',
  },
}

export const solutionsCopy: Localized<typeof en> = { en, es }
