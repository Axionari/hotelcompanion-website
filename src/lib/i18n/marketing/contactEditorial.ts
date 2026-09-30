import type { Localized } from '../useCopy'

// Source: 2026-09-29 addendum in the EN and ES site copy decks.
const en = {
  "commitmentsLabel": "PILOT COMMITMENTS",
  "timelineLabel": "THE PILOT REVIEW",
  "hero": {
    "eyebrow": "Founding Partner Program",
    "title": "One hotel.",
    "accent": "A measurable next step.",
    "body": "A focused operating proof for hospitality leaders who want to shape Hotel Companion — and measure what it changes.",
    "folioLabel": "The pilot contract",
    "folioTitle": "Not a promise. An operating proof.",
    "rows": [
      [
        "SCOPE",
        "One property"
      ],
      [
        "BEFORE LAUNCH",
        "Scope and measures agreed"
      ],
      [
        "DURING THE PILOT",
        "Guest and commercial outcomes"
      ],
      [
        "AT REVIEW",
        "Evidence guides expansion"
      ]
    ]
  },
  "proof": [
    "EARLY ACCESS",
    "PRIORITY SUPPORT",
    "ROADMAP INFLUENCE",
    "PREFERENTIAL TERMS"
  ],
  "founding": {
    "title": "Build it with us.",
    "accent": "Measure it with your guests."
  },
  "commitments": {
    "title": "A pilot with",
    "accent": "mutual obligations.",
    "body": "The strongest proof has a champion, a cadence and visible ownership on both sides."
  },
  "timeline": {
    "title": "The decision is scheduled",
    "accent": "before we begin.",
    "body": "Agree the comparison, costs, duration and review date before launch. Examine guest experience and additional contribution together."
  },
  "contact": {
    "title": "Start with",
    "accent": "a direct conversation.",
    "body": "Explore the product, discuss a pilot or reach the team already supporting your hotel."
  },
  "closeVisual": {
    "alt": "A private limestone Caribbean hotel appearing through tropical foliage at first light",
    "label": "ONE PROPERTY · A CLEAR PROOF"
  }
}

const es: typeof en = {
  "commitmentsLabel": "COMPROMISOS DEL PILOTO",
  "timelineLabel": "LA REVISIÓN DEL PILOTO",
  "hero": {
    "eyebrow": "Programa de Socios Fundadores",
    "title": "Un hotel.",
    "accent": "Un siguiente paso medible.",
    "body": "Una prueba operativa enfocada para líderes de hospitalidad que quieren dar forma a Hotel Companion — y medir lo que cambia.",
    "folioLabel": "El acuerdo del piloto",
    "folioTitle": "No es una promesa. Es una prueba operativa.",
    "rows": [
      [
        "ALCANCE",
        "Una propiedad"
      ],
      [
        "ANTES DE COMENZAR",
        "Alcance y medidas acordados"
      ],
      [
        "DURANTE EL PILOTO",
        "Resultados del huésped y del hotel"
      ],
      [
        "EN LA REVISIÓN",
        "La evidencia guía la ampliación"
      ]
    ]
  },
  "proof": [
    "ACCESO ANTICIPADO",
    "SOPORTE PRIORITARIO",
    "INFLUENCIA EN LA HOJA DE RUTA",
    "TÉRMINOS PREFERENTES"
  ],
  "founding": {
    "title": "Constrúyelo con nosotros.",
    "accent": "Mídelo con tus huéspedes."
  },
  "commitments": {
    "title": "Un piloto con",
    "accent": "compromisos mutuos.",
    "body": "La prueba más sólida tiene un responsable, una cadencia y dueños visibles de ambos lados."
  },
  "timeline": {
    "title": "La decisión se agenda",
    "accent": "antes de comenzar.",
    "body": "Acuerda comparación, costos, duración y fecha de revisión antes de comenzar. Evalúa la experiencia del huésped y la contribución adicional juntas."
  },
  "contact": {
    "title": "Comienza con",
    "accent": "una conversación directa.",
    "body": "Explora el producto, conversa sobre un piloto o contacta al equipo que ya acompaña a tu hotel."
  },
  "closeVisual": {
    "alt": "Un hotel privado de piedra caliza que aparece entre vegetación tropical al amanecer",
    "label": "UNA PROPIEDAD · UNA PRUEBA CLARA"
  }
}

export const contactEditorialCopy: Localized<typeof en> = { en, es }
