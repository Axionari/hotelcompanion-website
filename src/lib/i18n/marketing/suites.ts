import type { Localized } from '../useCopy'

/**
 * Device-UI content for the homepage's big accommodations tablet (SuiteShowcase).
 * DEVICE UI content, not marketing copy (same scope as deviceScreens): the full
 * guided booking flow — welcome → language → browse → suite → your stay →
 * review → payment → confirming → confirmed → loyalty — the RC ordering demo's
 * logic applied to a hotel stay. Demo numbers only.
 */
const en = {
  property: 'MarAzul Riviera Maya',
  tagline: 'OCEANFRONT · SPA · FINE DINING',
  listening: 'Listening',
  cartLabel: 'stay',
  total: '$1,220',

  welcome: { hello: 'Welcome', hello2: 'Bienvenido', en: 'English', es: 'Español' },

  browseAsk: 'Where would you like to stay?',
  browseTitle: 'Accommodations',
  browseMeta: '3 suites · tonight',
  nightShort: '/night',
  featured: 'Most booked',
  view: 'View',
  list: [
    { key: 'garden', name: 'Garden Villa', price: '$180', meta: 'Plunge pool · tropical garden', image: '/assets/ui/suite-3.webp' },
    { key: 'ocean', name: 'Ocean-View Suite', price: '$250', meta: 'Private terrace · ocean view', image: '/assets/ui/suite-ocean.webp', featured: true },
    { key: 'penthouse', name: 'Beachfront Penthouse', price: '$520', meta: 'Rooftop terrace · steps to the sand', image: '/assets/ui/suite-2.webp' },
  ],

  detailAsk: 'Tell me about the Ocean-View Suite',
  /* Per-room detail content — each accommodation carries its own price,
     description, amenities, and includes. Index matches `list` order. */
  details: [
    {
      key: 'garden',
      name: 'Garden Villa',
      price: '$180',
      night: '/ night',
      tagline: 'Plunge pool · tropical garden',
      desc: 'A private plunge pool wrapped in tropical garden — quiet, shaded, and a short barefoot walk from the spa.',
      features: ['Queen bed', 'Plunge pool', 'Garden terrace', '48 m²', 'Outdoor shower', 'Hammock'],
      includesLabel: 'INCLUDES · MORNINGS',
      includesTitle: 'Breakfast in the garden',
      includesNote: 'and late checkout on your last day.',
      cta: 'Add to my stay',
      images: ['/assets/ui/suite-3.webp'],
    },
    {
      key: 'ocean',
      name: 'Ocean-View Suite',
      price: '$250',
      night: '/ night',
      tagline: 'Private terrace · ocean view',
      desc: 'A king bed, a private terrace, and an unbroken view of the Caribbean — the suite guests ask for by name.',
      features: ['King bed', 'Private terrace', 'Ocean view', '65 m²', 'Rain shower', 'Nespresso'],
      includesLabel: 'INCLUDES · WELLNESS',
      includesTitle: 'Daily breakfast for two',
      includesNote: 'and a $60 spa credit every stay.',
      cta: 'Add to my stay',
      images: ['/assets/ui/suite-ocean.webp', '/assets/ui/suite-2.webp'],
    },
    {
      key: 'penthouse',
      name: 'Beachfront Penthouse',
      price: '$520',
      night: '/ night',
      tagline: 'Rooftop terrace · steps to the sand',
      desc: 'The top floor to yourself — a private rooftop over the sand, and the house’s best sunset.',
      features: ['King bed', 'Rooftop terrace', 'Beachfront', '120 m²', 'Soaking tub', 'Butler service'],
      includesLabel: 'INCLUDES · ARRIVALS',
      includesTitle: 'Private airport transfer',
      includesNote: 'and a bottle of mezcal on arrival.',
      cta: 'Add to my stay',
      images: ['/assets/ui/suite-2.webp', '/assets/ui/suite-ocean.webp'],
    },
  ],

  cart: {
    label: 'YOUR STAY',
    title: 'Here’s the plan',
    add: '+ Add an experience',
    reviewCta: 'Review stay',
    items: [
      { name: 'Ocean-View Suite', meta: '3 nights · $250', price: '$750', qty: 3, image: '/assets/ui/suite-ocean.webp' },
      { name: 'Cacao Ceremony', meta: 'Spa Ixchel · 90 min', price: '$180', qty: 1, image: '/assets/ui/spa-1.webp' },
      { name: 'Sunset dinner for two', meta: 'Casa Marea', price: '$140', qty: 1, image: '/assets/ui/dish-2.webp' },
    ],
  },

  /* The PMS handshake — live availability confirmed before booking. */
  availability: {
    label: 'AVAILABILITY',
    title: 'Confirming availability',
    sub: 'Confirming dates and rate directly in the hotel’s PMS — real inventory, nothing assumed.',
    checks: [
      { item: 'Jul 25 – 28 · 3 nights · 2 guests', status: 'Available' },
      { item: 'Ocean-View Suite', status: 'Rate held · $250/night' },
      { item: 'Spa Ixchel · Cacao Ceremony', status: 'Fri 5:30 PM open' },
    ],
    hold: 'REMAINING ON YOUR HOLD',
    caption: 'CONFIRMED IN THE PMS · REAL-TIME',
  },
  review: {
    label: 'ALMOST THERE',
    title: 'Before we confirm',
    options: [
      { icon: '⌂', title: 'Check-in', sub: 'Fri, Jul 25' },
      { icon: '☾', title: 'Nights', sub: '3', active: true },
      { icon: '⧉', title: 'Guests', sub: '2' },
    ],
    summary: [
      { name: 'Ocean-View Suite · 3 nights', price: '$750' },
      { name: 'Cacao Ceremony', price: '$180' },
      { name: 'Sunset dinner for two', price: '$140' },
    ],
    subtotalLabel: 'Subtotal',
    subtotal: '$1,070',
    feesLabel: 'Taxes & resort fee',
    fees: '$150',
    totalLabel: 'Total',
    total: '$1,220',
    cta: 'Proceed to payment',
  },

  payment: {
    label: 'PAYMENT',
    title: 'How you’d like to pay',
    amount: '$1,220',
    apple: 'Apple Pay',
    google: 'G Pay',
    orCard: 'Or pay with card',
    secure: 'SECURE CHECKOUT',
    stripe: 'STRIPE',
    cardNote: 'Card details are entered in Stripe’s secure form — never in this app.',
    trust: 'HOSTED BY STRIPE · PCI-COMPLIANT · MARAZUL NEVER SEES YOUR CARD',
    securedBy: 'SECURED BY STRIPE',
    pay: 'Pay',
  },

  verifying: {
    label: 'PROCESSING',
    title: 'Confirming your booking',
    note: 'One moment — confirming with your card.',
    secure: 'ENCRYPTED · YOU CAN STAY ON THIS SCREEN',
  },

  confirmed: {
    label: 'CONFIRMED',
    title: 'Your reservation has been confirmed.',
    paid: 'Paid with · Visa ending 4242',
    refLabel: 'CONFIRMATION CODE',
    ref: 'MAR-4192',
    whenLabel: 'CHECK-IN',
    when: 'Fri, Jul 25 · 3 nights',
    summary: [
      { name: 'Ocean-View Suite · 3 nights', price: '$750' },
      { name: 'Cacao Ceremony', price: '$180' },
      { name: 'Sunset dinner for two', price: '$140' },
    ],
    subtotalLabel: 'Subtotal',
    subtotal: '$1,070',
    feesLabel: 'Taxes & resort fee',
    fees: '$150',
    totalLabel: 'Total',
    total: '$1,220',
  },

  loyalty: {
    label: 'MARAZUL CIRCLE',
    title: 'Join the MarAzul Circle',
    note: 'One tap at checkout — this stay already counts.',
    benefits: [
      'Members’ rate on every direct booking',
      'A free night after ten nights',
      'Late checkout & upgrades, when available',
      'Spa and dining credits every stay',
    ],
    cta: 'Join · earn a free night on this stay',
  },

  /* Persistent voice bar under every screen — voice-first, always listening. */
  voiceBar: {
    label: 'LISTENING — JUST KEEP TALKING',
    chips: ['Show me the spa', 'Dinner tonight', 'My day plan'],
  },
  pills: {
    labels: ['Welcome', 'Browse', 'Suite', 'Your stay', 'Availability', 'Review', 'Pay', 'Processing', 'Confirmed', 'Loyalty'],
    hint: 'The guest’s journey — tap any step',
  },
  /* Demo honesty: the quiet staging label under the in-room journey. */
  demoNote: 'Guided demonstration · demo property',
}

const es: typeof en = {
  property: 'MarAzul Riviera Maya',
  tagline: 'FRENTE AL MAR · SPA · ALTA COCINA',
  listening: 'Escuchando',
  cartLabel: 'estancia',
  total: '$1,220',

  welcome: { hello: 'Bienvenido', hello2: 'Welcome', en: 'English', es: 'Español' },

  browseAsk: '¿Dónde te gustaría hospedarte?',
  browseTitle: 'Alojamiento',
  browseMeta: '3 suites · esta noche',
  nightShort: '/noche',
  featured: 'La más reservada',
  view: 'Ver',
  list: [
    { key: 'garden', name: 'Villa Jardín', price: '$180', meta: 'Alberca privada · jardín tropical', image: '/assets/ui/suite-3.webp' },
    { key: 'ocean', name: 'Suite Vista al Mar', price: '$250', meta: 'Terraza privada · vista al mar', image: '/assets/ui/suite-ocean.webp', featured: true },
    { key: 'penthouse', name: 'Penthouse Frente al Mar', price: '$520', meta: 'Terraza en la azotea · a pasos de la arena', image: '/assets/ui/suite-2.webp' },
  ],

  detailAsk: 'Cuéntame sobre la Suite Vista al Mar',
  details: [
    {
      key: 'garden',
      name: 'Villa Jardín',
      price: '$180',
      night: '/ noche',
      tagline: 'Alberca privada · jardín tropical',
      desc: 'Una alberca privada envuelta en jardín tropical — tranquila, sombreada y a unos pasos descalzos del spa.',
      features: ['Cama queen', 'Alberca privada', 'Terraza al jardín', '48 m²', 'Regadera exterior', 'Hamaca'],
      includesLabel: 'INCLUYE · MAÑANAS',
      includesTitle: 'Desayuno en el jardín',
      includesNote: 'y salida tardía en tu último día.',
      cta: 'Agregar a mi estancia',
      images: ['/assets/ui/suite-3.webp'],
    },
    {
      key: 'ocean',
      name: 'Suite Vista al Mar',
      price: '$250',
      night: '/ noche',
      tagline: 'Terraza privada · vista al mar',
      desc: 'Una cama king, una terraza privada y una vista ininterrumpida del Caribe — la suite que los huéspedes piden por su nombre.',
      features: ['Cama king', 'Terraza privada', 'Vista al mar', '65 m²', 'Regadera de lluvia', 'Nespresso'],
      includesLabel: 'INCLUYE · BIENESTAR',
      includesTitle: 'Desayuno diario para dos',
      includesNote: 'y un crédito de spa de $60 por estancia.',
      cta: 'Agregar a mi estancia',
      images: ['/assets/ui/suite-ocean.webp', '/assets/ui/suite-2.webp'],
    },
    {
      key: 'penthouse',
      name: 'Penthouse Frente al Mar',
      price: '$520',
      night: '/ noche',
      tagline: 'Terraza en la azotea · a pasos de la arena',
      desc: 'El último piso para ti — una azotea privada sobre la arena, y el mejor atardecer de la casa.',
      features: ['Cama king', 'Terraza en azotea', 'Frente al mar', '120 m²', 'Tina de inmersión', 'Servicio de mayordomo'],
      includesLabel: 'INCLUYE · LLEGADAS',
      includesTitle: 'Traslado privado del aeropuerto',
      includesNote: 'y una botella de mezcal a tu llegada.',
      cta: 'Agregar a mi estancia',
      images: ['/assets/ui/suite-2.webp', '/assets/ui/suite-ocean.webp'],
    },
  ],

  cart: {
    label: 'TU ESTANCIA',
    title: 'Este es el plan',
    add: '+ Agregar una experiencia',
    reviewCta: 'Revisar estancia',
    items: [
      { name: 'Suite Vista al Mar', meta: '3 noches · $250', price: '$750', qty: 3, image: '/assets/ui/suite-ocean.webp' },
      { name: 'Ceremonia de Cacao', meta: 'Spa Ixchel · 90 min', price: '$180', qty: 1, image: '/assets/ui/spa-1.webp' },
      { name: 'Cena al atardecer para dos', meta: 'Casa Marea', price: '$140', qty: 1, image: '/assets/ui/dish-2.webp' },
    ],
  },

  availability: {
    label: 'DISPONIBILIDAD',
    title: 'Confirmando disponibilidad',
    sub: 'Confirmando fechas y tarifa directamente en el PMS del hotel — inventario real, nada supuesto.',
    checks: [
      { item: '25 – 28 Jul · 3 noches · 2 huéspedes', status: 'Disponible' },
      { item: 'Suite Vista al Mar', status: 'Tarifa apartada · $250/noche' },
      { item: 'Spa Ixchel · Ceremonia de Cacao', status: 'Vie 5:30 PM libre' },
    ],
    hold: 'RESTANTE EN TU APARTADO',
    caption: 'CONFIRMADO EN EL PMS · TIEMPO REAL',
  },
  review: {
    label: 'CASI LISTO',
    title: 'Antes de confirmar',
    options: [
      { icon: '⌂', title: 'Entrada', sub: 'Vie, 25 Jul' },
      { icon: '☾', title: 'Noches', sub: '3', active: true },
      { icon: '⧉', title: 'Huéspedes', sub: '2' },
    ],
    summary: [
      { name: 'Suite Vista al Mar · 3 noches', price: '$750' },
      { name: 'Ceremonia de Cacao', price: '$180' },
      { name: 'Cena al atardecer para dos', price: '$140' },
    ],
    subtotalLabel: 'Subtotal',
    subtotal: '$1,070',
    feesLabel: 'Impuestos y cuota de resort',
    fees: '$150',
    totalLabel: 'Total',
    total: '$1,220',
    cta: 'Proceder al pago',
  },

  payment: {
    label: 'PAGO',
    title: 'Cómo prefieres pagar',
    amount: '$1,220',
    apple: 'Apple Pay',
    google: 'G Pay',
    orCard: 'O paga con tarjeta',
    secure: 'PAGO SEGURO',
    stripe: 'STRIPE',
    cardNote: 'Los datos de la tarjeta se ingresan en el formulario seguro de Stripe — nunca en esta app.',
    trust: 'ALOJADO POR STRIPE · CONFORME A PCI · MARAZUL NUNCA VE TU TARJETA',
    securedBy: 'PROTEGIDO POR STRIPE',
    pay: 'Pagar',
  },

  verifying: {
    label: 'PROCESANDO',
    title: 'Confirmando tu reserva',
    note: 'Un momento — confirmando con tu tarjeta.',
    secure: 'CIFRADO · PUEDES QUEDARTE EN ESTA PANTALLA',
  },

  confirmed: {
    label: 'CONFIRMADO',
    title: 'Tu reservación ha sido confirmada.',
    paid: 'Pagado con · Visa terminación 4242',
    refLabel: 'CÓDIGO DE CONFIRMACIÓN',
    ref: 'MAR-4192',
    whenLabel: 'ENTRADA',
    when: 'Vie, 25 Jul · 3 noches',
    summary: [
      { name: 'Suite Vista al Mar · 3 noches', price: '$750' },
      { name: 'Ceremonia de Cacao', price: '$180' },
      { name: 'Cena al atardecer para dos', price: '$140' },
    ],
    subtotalLabel: 'Subtotal',
    subtotal: '$1,070',
    feesLabel: 'Impuestos y cuota de resort',
    fees: '$150',
    totalLabel: 'Total',
    total: '$1,220',
  },

  loyalty: {
    label: 'MARAZUL CIRCLE',
    title: 'Únete al MarAzul Circle',
    note: 'Un toque al pagar — esta estancia ya cuenta.',
    benefits: [
      'Tarifa de miembro en cada reserva directa',
      'Una noche gratis después de diez noches',
      'Salida tardía y mejoras, según disponibilidad',
      'Créditos de spa y restaurantes en cada estancia',
    ],
    cta: 'Únete · gana una noche gratis en esta estancia',
  },

  voiceBar: {
    label: 'ESCUCHANDO — SIGUE HABLANDO',
    chips: ['Muéstrame el spa', 'Cena esta noche', 'Mi plan del día'],
  },
  pills: {
    labels: ['Bienvenida', 'Explorar', 'Suite', 'Tu estancia', 'Disponibilidad', 'Revisar', 'Pagar', 'Procesando', 'Confirmado', 'Lealtad'],
    hint: 'El recorrido del huésped — toca cualquier paso',
  },
  demoNote: 'Demostración guiada · propiedad demo',
}

export const suitesCopy: Localized<typeof en> = { en, es }
