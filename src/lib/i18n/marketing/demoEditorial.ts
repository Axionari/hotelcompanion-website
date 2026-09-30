import type { Localized } from '../useCopy'

// Source: 2026-09-29 addendum in the EN and ES site copy decks.
const en = {
  "hero": {
    "eyebrow": "A working session for hotel leaders",
    "title": "Show us your hotel.",
    "accent": "See what it could earn.",
    "body": "Bring one real stay, one recurring service gap and one revenue question. We’ll map the guest conversation all the way to action.",
    "productDisclosure": "Guided demonstration · Demo property · Illustrative rates",
    "folioLabel": "Your working session",
    "folioTitle": "Built around the property you actually run.",
    "rows": [
      [
        "CONTEXT",
        "Your hotel, systems and service model"
      ],
      [
        "SCENARIO",
        "A real guest journey"
      ],
      [
        "PROOF",
        "Illustrative offers and approval rules"
      ],
      [
        "NEXT",
        "A practical deployment path"
      ]
    ]
  },
  "proof": [
    "YOUR PROPERTY",
    "GUIDED SCENARIOS",
    "APPROVED OFFERS",
    "A CLEAR NEXT STEP"
  ],
  "session": {
    "title": "Not a product tour.",
    "accent": "A working session.",
    "body": "We start with the way your property hosts today, then pressure-test Hotel Companion against the moments that matter most."
  },
  "room": {
    "title": "Bring the people who own",
    "accent": "the guest journey.",
    "body": "A small cross-functional room makes the session sharper. One person who knows daily operations is enough to begin."
  },
  "request": {
    "eyebrow": "03 · REQUEST YOUR SESSION",
    "title": "Tell us where",
    "accent": "hospitality gets stuck.",
    "note": "Your request goes directly to the Hotel Companion team. No generic sales sequence."
  },
  "after": {
    "title": "From first conversation",
    "accent": "to a live property.",
    "body": "The path is staged around knowledge, team readiness and the systems that matter to your operation."
  },
  "faq": {
    "title": "The questions worth asking",
    "accent": "before you invite us in."
  },
  "close": {
    "eyebrow": "PREFER TO START SMALL?",
    "title": "One property.",
    "accent": "A measured next step.",
    "body": "The Founding Partner Program turns the first deployment into a measured operating proof.",
    "link": "See the founding pilot",
    "imageAlt": "An intimate Caribbean boutique hotel suite and private pool at blue hour",
    "imageLabel": "YOUR HOTEL · THE WORKING VIEW"
  }
}

const es: typeof en = {
  "hero": {
    "eyebrow": "Una sesión de trabajo para líderes hoteleros",
    "title": "Muéstranos tu hotel.",
    "accent": "Mira qué valor puede crear.",
    "body": "Trae una estancia real, una falla de servicio recurrente y una pregunta de ingresos. Mapearemos la conversación del huésped hasta la acción.",
    "productDisclosure": "Demostración guiada · Propiedad demo · Tarifas ilustrativas",
    "folioLabel": "Tu sesión de trabajo",
    "folioTitle": "Construida alrededor de la propiedad que realmente operas.",
    "rows": [
      [
        "CONTEXTO",
        "Tu hotel, sistemas y modelo de servicio"
      ],
      [
        "ESCENARIO",
        "Un viaje real del huésped"
      ],
      [
        "PRUEBA",
        "Ofertas ilustrativas y reglas de aprobación"
      ],
      [
        "SIGUIENTE",
        "Una ruta práctica de despliegue"
      ]
    ]
  },
  "proof": [
    "TU PROPIEDAD",
    "ESCENARIOS GUIADOS",
    "OFERTAS APROBADAS",
    "UN SIGUIENTE PASO CLARO"
  ],
  "session": {
    "title": "No es un recorrido de producto.",
    "accent": "Es una sesión de trabajo.",
    "body": "Comenzamos con la forma en que hoy recibe tu propiedad y ponemos a prueba Hotel Companion en los momentos que más importan."
  },
  "room": {
    "title": "Trae a quienes cuidan",
    "accent": "el viaje del huésped.",
    "body": "Un grupo pequeño y multidisciplinario hace la sesión más precisa. Para comenzar basta una persona que conozca la operación diaria."
  },
  "request": {
    "eyebrow": "03 · SOLICITA TU SESIÓN",
    "title": "Cuéntanos dónde",
    "accent": "se atora la hospitalidad.",
    "note": "Tu solicitud llega directamente al equipo de Hotel Companion. Sin una secuencia genérica de ventas."
  },
  "after": {
    "title": "De la primera conversación",
    "accent": "a una propiedad en vivo.",
    "body": "La ruta avanza por etapas según el conocimiento, la preparación del equipo y los sistemas que importan a tu operación."
  },
  "faq": {
    "title": "Las preguntas que vale la pena hacer",
    "accent": "antes de invitarnos."
  },
  "close": {
    "eyebrow": "¿PREFIERES COMENZAR EN PEQUEÑO?",
    "title": "Una propiedad.",
    "accent": "Un siguiente paso medible.",
    "body": "El Programa de Socios Fundadores convierte el primer despliegue en una prueba operativa medible.",
    "link": "Conoce el piloto fundador",
    "imageAlt": "Una suite íntima y alberca privada en un hotel boutique caribeño al anochecer",
    "imageLabel": "TU HOTEL · LA VISTA DE TRABAJO"
  }
}

export const demoEditorialCopy: Localized<typeof en> = { en, es }
