import type { Localized } from '../useCopy'

/* v3 copy deck {#05} — THE CONSTELLATION. Role captions + caption + closing
   line verbatim; device screen contents reuse existing demo content
   (surfaceWall laptop/tv/watch, deviceScreens beach, liveDemo orb idle). */

const en = {
  caption:
    '"Best beach near here?" — asked once, answered everywhere. The layout adapts. The intelligence doesn\'t.',
  closing: 'Five screens. One memory. She never repeated herself once.',
  roles: {
    web: 'WEB · BOOKS BEFORE THEY ARRIVE',
    tv: 'TV · GREETS ON ARRIVAL',
    tablet: 'TABLET · THE ANSWER IS A PICTURE',
    watch: 'WATCH · BRINGS HER BACK',
    phone: 'PHONE · BEFORE, DURING, AFTER',
    voice: 'VOICE ONLY · DESCRIBED ALOUD',
  },
}

const es: typeof en = {
  caption:
    '«¿La mejor playa cerca?» — preguntado una vez, respondido en todas partes. El diseño se adapta. La inteligencia no.',
  closing: 'Cinco pantallas. Una memoria. Nunca tuvo que repetirse.',
  roles: {
    web: 'WEB · RESERVA ANTES DE LLEGAR',
    tv: 'TV · SALUDA AL LLEGAR',
    tablet: 'TABLET · LA RESPUESTA ES UNA IMAGEN',
    watch: 'RELOJ · LA TRAE DE VUELTA',
    phone: 'TELÉFONO · ANTES, DURANTE Y DESPUÉS',
    voice: 'SOLO VOZ · DESCRITO EN VOZ ALTA',
  },
}

export const constellationCopy: Localized<typeof en> = { en, es }
