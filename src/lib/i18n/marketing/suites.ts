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
    { key: 'ocean', name: 'Ocean-View Suite', price: '$250', meta: 'Private terrace · ocean view', image: '/assets/ui/suite-1.webp', featured: true },
    { key: 'penthouse', name: 'Beachfront Penthouse', price: '$520', meta: 'Rooftop terrace · steps to the sand', image: '/assets/ui/suite-2.webp' },
  ],

  detailAsk: 'Tell me about the Ocean-View Suite',
  detail: {
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
    images: ['/assets/ui/suite-1.webp', '/assets/ui/suite-2.webp', '/assets/ui/suite-3.webp'],
  },

  cart: {
    label: 'YOUR STAY',
    title: 'Here’s the plan',
    add: '+ Add an experience',
    reviewCta: 'Review stay',
    items: [
      { name: 'Ocean-View Suite', meta: '3 nights · $250', price: '$750', qty: 3, image: '/assets/ui/suite-1.webp' },
      { name: 'Cacao Ceremony', meta: 'Spa Ixchel · 90 min', price: '$180', qty: 1, image: '/assets/ui/spa-1.webp' },
      { name: 'Sunset dinner for two', meta: 'Casa Marea', price: '$140', qty: 1, image: '/assets/ui/dish-2.webp' },
    ],
  },

  /* The PMS handshake — live availability confirmed before booking. */
  availability: {
    label: 'LIVE AVAILABILITY',
    title: 'Checking with the property',
    sub: 'Confirming dates and rate directly in the hotel’s PMS — live inventory, nothing assumed.',
    checks: [
      { item: 'Jul 25 – 28 · 3 nights · 2 guests', status: 'Available' },
      { item: 'Ocean-View Suite', status: 'Rate held · $250/night' },
      { item: 'Spa Ixchel · Cacao Ceremony', status: 'Fri 5:30 PM open' },
    ],
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
  },

  confirmed: {
    label: 'CONFIRMED',
    title: 'Your suite is reserved.',
    paid: 'Paid with · Visa ending 4242',
    refLabel: 'BOOKING',
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

  loyalty: { title: 'Join the MarAzul Circle', note: 'Earn a free night on this stay — one tap' },

  pills: {
    labels: ['Welcome', 'Browse', 'Suite', 'Your stay', 'Availability', 'Review', 'Pay', 'Processing', 'Confirmed', 'Loyalty'],
    hint: 'The guest’s journey — tap any step',
  },
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
    { key: 'ocean', name: 'Suite Vista al Mar', price: '$250', meta: 'Terraza privada · vista al mar', image: '/assets/ui/suite-1.webp', featured: true },
    { key: 'penthouse', name: 'Penthouse Frente al Mar', price: '$520', meta: 'Terraza en la azotea · a pasos de la arena', image: '/assets/ui/suite-2.webp' },
  ],

  detailAsk: 'Cuéntame sobre la Suite Vista al Mar',
  detail: {
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
    images: ['/assets/ui/suite-1.webp', '/assets/ui/suite-2.webp', '/assets/ui/suite-3.webp'],
  },

  cart: {
    label: 'TU ESTANCIA',
    title: 'Este es el plan',
    add: '+ Agregar una experiencia',
    reviewCta: 'Revisar estancia',
    items: [
      { name: 'Suite Vista al Mar', meta: '3 noches · $250', price: '$750', qty: 3, image: '/assets/ui/suite-1.webp' },
      { name: 'Ceremonia de Cacao', meta: 'Spa Ixchel · 90 min', price: '$180', qty: 1, image: '/assets/ui/spa-1.webp' },
      { name: 'Cena al atardecer para dos', meta: 'Casa Marea', price: '$140', qty: 1, image: '/assets/ui/dish-2.webp' },
    ],
  },

  availability: {
    label: 'DISPONIBILIDAD EN VIVO',
    title: 'Consultando con la propiedad',
    sub: 'Confirmando fechas y tarifa directamente en el PMS del hotel — inventario en vivo, nada supuesto.',
    checks: [
      { item: '25 – 28 Jul · 3 noches · 2 huéspedes', status: 'Disponible' },
      { item: 'Suite Vista al Mar', status: 'Tarifa apartada · $250/noche' },
      { item: 'Spa Ixchel · Ceremonia de Cacao', status: 'Vie 5:30 PM libre' },
    ],
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
  },

  confirmed: {
    label: 'CONFIRMADO',
    title: 'Tu suite está reservada.',
    paid: 'Pagado con · Visa terminación 4242',
    refLabel: 'RESERVA',
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

  loyalty: { title: 'Únete al MarAzul Circle', note: 'Gana una noche gratis en esta estancia — con un toque' },

  pills: {
    labels: ['Bienvenida', 'Explorar', 'Suite', 'Tu estancia', 'Disponibilidad', 'Revisar', 'Pagar', 'Procesando', 'Confirmado', 'Lealtad'],
    hint: 'El recorrido del huésped — toca cualquier paso',
  },
}

export const suitesCopy: Localized<typeof en> = { en, es }
