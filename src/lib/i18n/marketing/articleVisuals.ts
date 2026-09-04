import type { EditorialVisual } from '@/components/editorial/EditorialImage'
import type { Localized } from '../useCopy'

const image = (
  src: string,
  altEn: string,
  altEs: string,
  position = 'center',
): Localized<EditorialVisual> => ({
  en: { src, alt: altEn, eyebrow: 'A VIEW FROM THE HOTEL', position },
  es: { src, alt: altEs, eyebrow: 'UNA VISTA DESDE EL HOTEL', position },
})

export const articleVisuals: Localized<EditorialVisual>[] = [
  image(
    '/assets/ui/suite-garden.webp',
    'A serene boutique hotel suite opening to a private tropical garden',
    'Una serena suite de hotel boutique abierta a un jardín tropical privado',
    'center 56%',
  ),
  image(
    '/assets/editorial/hc-caribbean-lobby.webp',
    'A handcrafted open-air hotel lobby framing the Caribbean Sea',
    'Un lobby artesanal y abierto que enmarca el mar Caribe',
    'center 50%',
  ),
  image(
    '/assets/ui/suite-ocean.webp',
    'A sculptural ocean-view suite in an intimate luxury hotel',
    'Una suite escultórica con vista al mar en un hotel de lujo íntimo',
    'center 48%',
  ),
  image(
    '/assets/ui/suite-sculpted.webp',
    'Quietly sculpted details in a warm, contemporary boutique hotel suite',
    'Detalles escultóricos y serenos en una suite boutique contemporánea',
    'center 52%',
  ),
  image(
    '/assets/img/luxury-lobby.webp',
    'A refined boutique hotel reception shaped by warm light and natural materials',
    'Una recepción boutique refinada por luz cálida y materiales naturales',
    'center 52%',
  ),
  image(
    '/assets/lux/cenote-wild.webp',
    'A wild limestone cenote glowing beneath the Riviera Maya forest',
    'Un cenote de piedra caliza brillando bajo la selva de la Riviera Maya',
    'center 50%',
  ),
  image(
    '/assets/lux/hotel-companion-hero-v2.webp',
    'A private limestone hotel and infinity pool set into the Caribbean coast',
    'Un hotel privado de piedra caliza y alberca infinita sobre la costa caribeña',
    'center 52%',
  ),
  image(
    '/assets/lux/footer-aerial-cove.webp',
    'An elevated view over a palm-lined white-sand Caribbean cove',
    'Una vista elevada de una cala caribeña de arena blanca entre palmeras',
    'center 58%',
  ),
  image(
    '/assets/lux/hotel-companion-closing-blue-hour-v2.webp',
    'A candlelit hotel terrace and long pool beside the Caribbean at blue hour',
    'Una terraza iluminada por velas y alberca junto al Caribe al anochecer',
    'center 50%',
  ),
  image(
    '/assets/lux/breather-thatch-beach-band.webp',
    'A palm-framed path from a small tropical hotel to the sea',
    'Un sendero entre palmeras desde un pequeño hotel tropical hasta el mar',
    'center 48%',
  ),
  image(
    '/assets/lux/arch-palapa.webp',
    'A soaring palapa arrival axis looking through jungle toward the Caribbean',
    'Un gran eje de llegada bajo palapa que mira entre la selva hacia el Caribe',
    'center 42%',
  ),
  image(
    '/assets/editorial/hc-secluded-cove.webp',
    'A reef-blue Caribbean cove with intimate hotel pavilions hidden among palms',
    'Una cala caribeña azul arrecife con pabellones íntimos escondidos entre palmeras',
    'center 58%',
  ),
]
