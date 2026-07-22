import type { Localized } from '../useCopy'
import type { ReceiptSeg } from '@/components/cds/ReceiptCard'

/* v3 copy deck {#04} — THE SUN ARC. Verbatim strings.
   Stop 2's mini-UI reuses deviceScreens.beach (identical strings by design).
   $71 / +$120 / +$402: ILLUSTRATIVE — audit before production promotion */

const en = {
  caption: 'One day with the Companion — from first light to the smallest hour.',
  orbLabel: 'ONE VOICE · NOON',
  closing: 'One day. One voice. +$402 the OTA will never see.',
  stops: [
    {
      time: '3 WEEKS OUT',
      tag: 'WEB',
      web: { room: 'Ocean-View Suite', price: '$250 · night', cta: 'Book direct' },
      receipt: [
        [
          { t: 'check', s: '✓' },
          { t: 'text', s: '0% COMMISSION ·' },
          { t: 'money', s: '$71' },
          { t: 'text', s: 'LESS THAN THE OTA' },
        ],
      ] as ReceiptSeg[][],
    },
    {
      time: '10:04',
      tag: 'TABLET · SUITE 214',
      receipt: null,
    },
    {
      time: '6:48 PM',
      tag: 'WATCH · POOLSIDE',
      watch: { big: '20 min', line: 'GOLDEN HOUR FROM YOUR TERRACE', cta: 'Reserve cabana' },
      receipt: [
        [
          { t: 'check', s: '✓' },
          { t: 'text', s: 'CABANA RESERVED ·' },
          { t: 'money', s: '+$120' },
          { t: 'text', s: 'TO FOLIO' },
        ],
      ] as ReceiptSeg[][],
    },
    {
      time: '2:14 AM',
      tag: 'VOICE · LIGHTS OFF',
      voice: {
        guest: "There's water on the bathroom floor.",
        reply: "I'm so sorry — Engineering is already on the way.",
      },
      receipt: [
        [
          { t: 'route', s: '→' },
          { t: 'text', s: 'ENGINEERING ·' },
          { t: 'id', s: 'ROOM 214' },
          { t: 'text', s: '· 02:14 ·' },
          { t: 'text', s: "GUEST'S EXACT WORDS ATTACHED" },
        ],
      ] as ReceiptSeg[][],
    },
    {
      time: '+2 DAYS',
      tag: 'PHONE',
      phone: {
        header: 'A NOTE FROM MARAZUL',
        body: 'It was a pleasure, Maya. Your rate is held for March.',
        cta1: '★ Leave a review',
        cta2: 'Book again',
      },
      receipt: [
        [
          { t: 'check', s: '✓' },
          { t: 'text', s: '★5 PUBLIC · DIRECT REBOOK CAPTURED' },
        ],
      ] as ReceiptSeg[][],
    },
  ],
}

const es: typeof en = {
  caption: 'Un día con el Companion — del primer rayo de luz a la hora más pequeña.',
  orbLabel: 'UNA VOZ · MEDIODÍA',
  closing: 'Un día. Una voz. +$402 que la OTA nunca verá.',
  stops: [
    {
      time: '3 SEMANAS ANTES',
      tag: 'WEB',
      web: { room: 'Suite Vista al Mar', price: '$250 · noche', cta: 'Reserva directa' },
      receipt: [
        [
          { t: 'check', s: '✓' },
          { t: 'text', s: '0% COMISIÓN ·' },
          { t: 'money', s: '$71' },
          { t: 'text', s: 'MENOS QUE LA OTA' },
        ],
      ] as ReceiptSeg[][],
    },
    {
      time: '10:04',
      tag: 'TABLET · SUITE 214',
      receipt: null,
    },
    {
      time: '6:48 PM',
      tag: 'RELOJ · ALBERCA',
      watch: { big: '20 min', line: 'GOLDEN HOUR DESDE TU TERRAZA', cta: 'Reservar cabaña' },
      receipt: [
        [
          { t: 'check', s: '✓' },
          { t: 'text', s: 'CABAÑA RESERVADA ·' },
          { t: 'money', s: '+$120' },
          { t: 'text', s: 'AL FOLIO' },
        ],
      ] as ReceiptSeg[][],
    },
    {
      time: '2:14 AM',
      tag: 'VOZ · A OSCURAS',
      voice: {
        guest: 'Hay agua en el piso del baño.',
        reply: 'Lo siento mucho — Ingeniería ya va en camino.',
      },
      receipt: [
        [
          { t: 'route', s: '→' },
          { t: 'text', s: 'INGENIERÍA ·' },
          { t: 'id', s: 'HAB 214' },
          { t: 'text', s: '· 02:14 ·' },
          { t: 'text', s: 'PALABRAS EXACTAS ADJUNTAS' },
        ],
      ] as ReceiptSeg[][],
    },
    {
      time: '+2 DÍAS',
      tag: 'TELÉFONO',
      phone: {
        header: 'UNA NOTA DE MARAZUL',
        body: 'Fue un placer, Maya. Tu tarifa queda apartada para marzo.',
        cta1: '★ Dejar reseña',
        cta2: 'Reservar de nuevo',
      },
      receipt: [
        [
          { t: 'check', s: '✓' },
          { t: 'text', s: '★5 PÚBLICA · RESERVA DIRECTA CAPTURADA' },
        ],
      ] as ReceiptSeg[][],
    },
  ],
}

export const sunArcCopy: Localized<typeof en> = { en, es }
