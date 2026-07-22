import type { Localized } from '../useCopy'
import type { ReceiptSeg } from '@/components/cds/ReceiptCard'

/* v3 copy deck {#13} — the ask-bar close. Scripted only, no network calls.
   Speakable phrases marked **…** render as <strong> (G3). */

export interface AskBarItem {
  chip: string
  answer: string
  receipt: ReceiptSeg[][]
}

const en: { placeholder: string; fallback: string; submitLabel: string; answerRegionLabel: string; items: AskBarItem[] } = {
  placeholder: 'Ask anything…',
  fallback: "That's a good one — bring it to your demo.",
  submitLabel: 'Ask',
  answerRegionLabel: 'Companion answer',
  items: [
    {
      chip: 'What would you upsell at my hotel?',
      answer:
        'At a beach resort: the cabana before sunset, the spa on day two’s afternoon, the rooftop dinner when they ask about cocktails. Say **"show me how"** in your demo.',
      /* +$402: ILLUSTRATIVE — audit before production promotion */
      receipt: [[{ t: 'check', s: '✓' }, { t: 'text', s: 'ON AVERAGE' }, { t: 'money', s: '+$402' }, { t: 'text', s: 'PER STAY' }]],
    },
    {
      chip: 'How do you handle 2 AM?',
      answer:
        '"There’s water on the bathroom floor" — 02:14. Engineering alerted with the guest’s exact words, before the sentence was finished.',
      receipt: [[{ t: 'check', s: '✓' }, { t: 'text', s: 'RESOLVED IN MINUTES · NO ONE WAKES UP ANGRY' }]],
    },
    {
      chip: 'What do you know about my destination?',
      answer:
        'Akumal: 20 minutes south, clear water this week. The best sunset table: golden hour at 7:52, taxi one tap away.',
      receipt: [[{ t: 'check', s: '✓' }, { t: 'text', s: 'EVERY ANSWER INCLUDES THE NEXT STEP' }]],
    },
  ],
}

const es: typeof en = {
  placeholder: 'Pregunta lo que sea…',
  fallback: 'Esa es buena — agéndala para tu demo.',
  submitLabel: 'Preguntar',
  answerRegionLabel: 'Respuesta del Companion',
  items: [
    {
      chip: '¿Qué venderías más en mi hotel?',
      answer:
        'En un resort de playa: la cabaña antes del atardecer, el spa la tarde del día dos, la cena en la azotea cuando preguntan por cócteles. Di **"muéstrame cómo"** en tu demo.',
      /* +$402: ILLUSTRATIVE — audit before production promotion */
      receipt: [[{ t: 'check', s: '✓' }, { t: 'text', s: 'EN PROMEDIO' }, { t: 'money', s: '+$402' }, { t: 'text', s: 'POR ESTANCIA' }]],
    },
    {
      chip: '¿Cómo manejas las 2 AM?',
      answer:
        '"Hay agua en el piso del baño" — 02:14. Ingeniería alertada con las palabras exactas del huésped, antes de terminar la frase.',
      receipt: [[{ t: 'check', s: '✓' }, { t: 'text', s: 'RESUELTO EN MINUTOS · NADIE DESPIERTA MOLESTO' }]],
    },
    {
      chip: '¿Qué sabes de mi destino?',
      answer:
        'Akumal: 20 minutos al sur, agua clara esta semana. La mejor mesa para el atardecer: golden hour a las 7:52, taxi a un toque.',
      receipt: [[{ t: 'check', s: '✓' }, { t: 'text', s: 'CADA RESPUESTA INCLUYE EL SIGUIENTE PASO' }]],
    },
  ],
}

export const askBarCopy: Localized<typeof en> = { en, es }
