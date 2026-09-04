import type { EditorialVisual } from '@/components/editorial/EditorialImage'
import type { Localized } from '../useCopy'
import type { EditorialPageKey } from './editorialPages'

export interface EditorialPageVisuals {
  afterSection: string
  divider: EditorialVisual
  closing: EditorialVisual
}

const visuals: Record<EditorialPageKey, Localized<EditorialPageVisuals>> = {
  platform: {
    en: {
      afterSection: 'platform-knows-property',
      divider: {
        src: '/assets/editorial/hc-caribbean-arrival.webp',
        alt: 'A low-rise limestone boutique hotel opening onto the turquoise Caribbean Sea',
        eyebrow: 'RIVIERA MAYA · THE PLACE IS PART OF THE KNOWLEDGE',
        caption: 'Every recommendation should feel as considered as the property itself.',
        position: 'center 54%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/editorial/hc-boutique-suite-blue-hour.webp',
        alt: 'An intimate Caribbean hotel suite and plunge pool glowing at blue hour',
        eyebrow: 'ONE STAY · FULLY UNDERSTOOD',
        position: 'center',
        overlay: 'soft',
      },
    },
    es: {
      afterSection: 'platform-knows-property',
      divider: {
        src: '/assets/editorial/hc-caribbean-arrival.webp',
        alt: 'Un hotel boutique de piedra caliza abierto al mar turquesa del Caribe',
        eyebrow: 'RIVIERA MAYA · EL LUGAR TAMBIÉN ES CONOCIMIENTO',
        caption: 'Cada recomendación debe sentirse tan cuidada como la propiedad.',
        position: 'center 54%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/editorial/hc-boutique-suite-blue-hour.webp',
        alt: 'Una suite íntima y su alberca privada brillando al anochecer en el Caribe',
        eyebrow: 'UNA ESTANCIA · COMPLETAMENTE COMPRENDIDA',
        position: 'center',
        overlay: 'soft',
      },
    },
  },
  solutions: {
    en: {
      afterSection: 'solutions-stay',
      divider: {
        src: '/assets/editorial/hc-secluded-cove.webp',
        alt: 'A secluded reef-blue Caribbean cove with an intimate hotel hidden among palms',
        eyebrow: 'FROM ARRIVAL TO RETURN',
        caption: 'The hotel should feel like one attentive host — even when five teams make it happen.',
        position: 'center 58%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/lux/footer-aerial-cove.webp',
        alt: 'A secluded white-sand Caribbean retreat seen above palms and luminous turquoise water',
        eyebrow: 'HOSPITALITY, IN MOTION',
        position: 'center 62%',
        overlay: 'deep',
      },
    },
    es: {
      afterSection: 'solutions-stay',
      divider: {
        src: '/assets/editorial/hc-secluded-cove.webp',
        alt: 'Una cala caribeña azul arrecife con un hotel íntimo escondido entre palmeras',
        eyebrow: 'DE LA LLEGADA AL REGRESO',
        caption: 'El hotel debe sentirse como un solo anfitrión atento — aunque cinco equipos lo hagan posible.',
        position: 'center 58%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/lux/footer-aerial-cove.webp',
        alt: 'Un refugio caribeño de arena blanca visto sobre palmas y agua turquesa luminosa',
        eyebrow: 'HOSPITALIDAD EN MOVIMIENTO',
        position: 'center 62%',
        overlay: 'deep',
      },
    },
  },
  enterprise: {
    en: {
      afterSection: 'secure',
      divider: {
        src: '/assets/editorial/hc-caribbean-lobby.webp',
        alt: 'A handcrafted open-air luxury hotel lobby framing the Caribbean horizon',
        eyebrow: 'LOCAL CHARACTER · SHARED DISCIPLINE',
        caption: 'Enterprise architecture should protect what makes each property worth choosing.',
        position: 'center 52%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/img/platform-pool-night.webp',
        alt: 'A sculptural luxury hotel pool and terrace illuminated after dark',
        eyebrow: 'ONE STANDARD · DISTINCT HOTELS',
        position: 'center 48%',
        overlay: 'deep',
      },
    },
    es: {
      afterSection: 'secure',
      divider: {
        src: '/assets/editorial/hc-caribbean-lobby.webp',
        alt: 'Un lobby abierto y artesanal enmarcando el horizonte del Caribe',
        eyebrow: 'CARÁCTER LOCAL · DISCIPLINA COMPARTIDA',
        caption: 'La arquitectura enterprise debe proteger aquello que hace que cada propiedad merezca ser elegida.',
        position: 'center 52%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/img/platform-pool-night.webp',
        alt: 'Una alberca y terraza escultóricas de un hotel de lujo iluminadas de noche',
        eyebrow: 'UN ESTÁNDAR · HOTELES DISTINTOS',
        position: 'center 48%',
        overlay: 'deep',
      },
    },
  },
  'companion-os': {
    en: {
      afterSection: 'companionos-one-platform',
      divider: {
        src: '/assets/lux/arch-palapa.webp',
        alt: 'A dramatic palm-vaulted arrival axis at a secluded tropical hotel',
        eyebrow: 'SHARED UNDERNEATH · SPECIALIZED AT THE EDGE',
        caption: 'The platform disappears. The character of the hotel remains.',
        position: 'center 42%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/editorial/hc-secluded-cove.webp',
        alt: 'A secluded white-sand Caribbean cove with a boutique hotel hidden among palms',
        eyebrow: 'THE INTELLIGENCE LAYER · MADE HOSPITABLE',
        position: 'center 58%',
        sizes: '(max-width: 780px) 100vw, 52vw',
        overlay: 'deep',
      },
    },
    es: {
      afterSection: 'companionos-one-platform',
      divider: {
        src: '/assets/lux/arch-palapa.webp',
        alt: 'Un eje de llegada con bóveda de palma en un hotel tropical aislado',
        eyebrow: 'COMPARTIDO ABAJO · ESPECIALIZADO EN EL BORDE',
        caption: 'La plataforma desaparece. El carácter del hotel permanece.',
        position: 'center 42%',
        overlay: 'balanced',
      },
      closing: {
        src: '/assets/editorial/hc-secluded-cove.webp',
        alt: 'Una cala caribeña de arena blanca con un hotel boutique escondido entre palmeras',
        eyebrow: 'LA CAPA DE INTELIGENCIA · HECHA HOSPITALARIA',
        position: 'center 58%',
        sizes: '(max-width: 780px) 100vw, 52vw',
        overlay: 'deep',
      },
    },
  },
  company: {
    en: {
      afterSection: 'belief',
      divider: {
        src: '/assets/ui/suite-garden.webp',
        alt: 'A warm boutique hotel suite opening into a private tropical garden',
        eyebrow: 'THE VIEW WE BUILD TOWARD',
        caption: 'Technology earns its place when the guest remembers the welcome, not the interface.',
        position: 'center 56%',
        overlay: 'deep',
      },
      closing: {
        src: '/assets/editorial/hc-caribbean-arrival.webp',
        alt: 'An extraordinary small Caribbean hotel looking across turquoise water at first light',
        eyebrow: 'BUILT FOR PLACES WORTH REMEMBERING',
        position: 'center 54%',
        overlay: 'deep',
      },
    },
    es: {
      afterSection: 'belief',
      divider: {
        src: '/assets/ui/suite-garden.webp',
        alt: 'Una cálida suite boutique abierta hacia un jardín tropical privado',
        eyebrow: 'LA VISTA HACIA LA QUE CONSTRUIMOS',
        caption: 'La tecnología gana su lugar cuando el huésped recuerda la bienvenida, no la interfaz.',
        position: 'center 56%',
        overlay: 'deep',
      },
      closing: {
        src: '/assets/editorial/hc-caribbean-arrival.webp',
        alt: 'Un extraordinario hotel pequeño del Caribe frente al agua turquesa al amanecer',
        eyebrow: 'CONSTRUIDO PARA LUGARES QUE VALE LA PENA RECORDAR',
        position: 'center 54%',
        overlay: 'deep',
      },
    },
  },
}

export const editorialVisuals = visuals
