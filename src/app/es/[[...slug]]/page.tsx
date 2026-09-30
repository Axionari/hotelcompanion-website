import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import HomeExperienceClient from '@/app/HomeExperienceClient'
import ResourcesClient from '@/app/resources/ResourcesClient'
import DemoClient from '@/app/demo/DemoClient'
import ExperiencePage from '@/components/experience/ExperiencePages'
import { ArticleLayout } from '@/components/cds/ArticleLayout'
import { LegalLayout } from '@/components/cds/LegalLayout'
import { accessibilityDoc } from '@/lib/i18n/marketing/accessibility'
import {
  cookiesDoc,
  privacyDoc,
  responsibleAiDoc,
  securityDoc,
  termsDoc,
  trustDoc,
} from '@/lib/i18n/marketing/legal'
import { demoCopy } from '@/lib/i18n/marketing/demo'
import {
  ESSAYS,
  ESSAYS_BY_LANG,
  ESSAYS_ES,
  getEssay,
  readEssayBody,
} from '@/lib/library'
import type { Language } from '@/lib/i18n/translations'
import { createPageMetadata } from '@/lib/siteMetadata'

const PUBLIC_ROUTES = [
  'platform',
  'revenue',
  'implementation',
  'solutions',
  'enterprise',
  'resources',
  'company',
  'demo',
  'contact',
  'trust',
  'security',
  'responsible-ai',
  'accessibility',
  'privacy',
  'terms',
  'cookies',
  'faq',
] as const

const SPANISH_META: Record<string, { title: string; description: string }> = {
  revenue: { title: 'Ingresos', description: 'Recomendaciones con contexto, paquetes aprobados y contribución adicional medible para hoteles.' },
  implementation: { title: 'Implementación y piloto', description: 'Una implementación enfocada con conexiones verificadas, reglas aprobadas y piloto elegible basado en resultados.' },
  '': {
    title: 'Hotel Companion — Mejores ofertas. Más ingresos.',
    description: 'Convierte conversaciones en ofertas relevantes, compras completadas y contribución adicional medible. Voz, contexto, atención 24/7 y un piloto basado en resultados.',
  },
  platform: {
    title: 'Producto',
    description: 'Una conversación durante la reserva, la llegada, el servicio, los ingresos y el regreso — basada en conocimiento hotelero y llevada hasta un resultado verificado.',
  },
  solutions: {
    title: 'Experiencia del huésped',
    description: 'Teléfono, web y móvil, con voz natural, contexto y una transferencia clara al equipo del hotel. Tablets en la habitación.',
  },
  enterprise: {
    title: 'Grupos hoteleros',
    description: 'Estándares compartidos, identidad por hotel y una vista operativa del portafolio. Empieza en un hotel y amplía con evidencia.',
  },
  resources: {
    title: 'Recursos',
    description: 'Ideas para el futuro de la hospitalidad. Ensayos sobre inteligencia del huésped, IA, excelencia operativa y el futuro hotelero, escritos para sus líderes.',
  },
  company: {
    title: 'Compañía',
    description: 'Por qué Axionari creó Hotel Companion: para preservar el criterio hotelero, hacer visible la responsabilidad y convertir la intención del huésped en valor operativo medible.',
  },
  demo: {
    title: 'Solicita una demo',
    description: 'Una sesión de trabajo personalizada para tu hotel, tus huéspedes y tus objetivos operativos — no un recorrido genérico de producto.',
  },
  contact: {
    title: 'Contacto',
    description: 'Explora un piloto enfocado en tu hotel, con alcance, medición y condiciones acordados antes del lanzamiento.',
  },
  trust: {
    title: 'Centro de confianza',
    description: 'Seguridad, privacidad, IA responsable, términos y cookies — cómo Hotel Companion protege la información y opera con transparencia.',
  },
  security: {
    title: 'Seguridad',
    description: 'Seguridad de nivel empresarial para la hospitalidad: cifrado, control de acceso, infraestructura segura y protección responsable de la IA.',
  },
  'responsible-ai': {
    title: 'IA responsable',
    description: 'La inteligencia artificial debe hacer la hospitalidad más humana, no menos. Nuestros principios para construir IA responsablemente.',
  },
  accessibility: {
    title: 'Accesibilidad',
    description: 'La accesibilidad es parte de la hospitalidad. Hotel Companion está diseñado para ser usable, legible y navegable por tantas personas como sea posible.',
  },
  privacy: {
    title: 'Política de privacidad',
    description: 'Cómo Hotel Companion recopila, utiliza y protege la información. La privacidad, la seguridad y la IA responsable son principios fundamentales.',
  },
  terms: {
    title: 'Términos de servicio',
    description: 'Los términos que rigen el acceso y uso de Hotel Companion, Companion OS y servicios relacionados.',
  },
  cookies: {
    title: 'Política de cookies',
    description: 'Cómo Hotel Companion utiliza cookies y tecnologías similares, y cómo administrar tus preferencias.',
  },
}

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: [] as string[] },
    ...PUBLIC_ROUTES.map((route) => ({ slug: [route] as string[] })),
    ...ESSAYS.map((essay) => ({ slug: ['resources', 'library', essay.slug] })),
  ]
}

function routeKey(segments: string[]) {
  return segments.join('/')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug = [] } = await params
  const key = routeKey(slug)

  if (slug[0] === 'resources' && slug[1] === 'library' && slug.length === 3) {
    const essay = getEssay(slug[2], 'es')
    if (!essay) return {}
    return createPageMetadata({
      title: essay.title,
      description: essay.subtitle,
      path: `/resources/library/${essay.slug}`,
      type: 'article',
      lang: 'es',
    })
  }

  const entry = SPANISH_META[key]
  if (!entry) return {}
  return createPageMetadata({
    ...entry,
    path: key ? `/${key}` : '/',
    lang: 'es',
  })
}

function categoriesOf(essays: { category: string }[]) {
  return [...new Set(essays.map((essay) => essay.category))]
}

function bundle(slug: string, lang: Language) {
  const essay = getEssay(slug, lang)
  if (!essay) return null
  const next = essay.next ? (getEssay(essay.next, lang) ?? null) : null
  return {
    essay,
    blocks: readEssayBody(slug, lang),
    next,
    others: ESSAYS_BY_LANG[lang].filter((entry) => entry.slug !== slug && entry.slug !== next?.slug),
  }
}

const spanishHomeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.hotelcompanion.ai/#organization',
      name: 'Hotel Companion',
      url: 'https://www.hotelcompanion.ai',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.hotelcompanion.ai/#product',
      name: 'Hotel Companion',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://www.hotelcompanion.ai/es',
      inLanguage: 'es-MX',
      description: 'Una capa de inteligencia hotelera que conecta reservas, llegadas, servicio, ingresos y memoria del huésped en una sola conversación.',
      provider: { '@id': 'https://www.hotelcompanion.ai/#organization' },
    },
  ],
}

const spanishFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'es-MX',
  mainEntity: demoCopy.es.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default async function SpanishPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug = [] } = await params
  const key = routeKey(slug)

  if (key === 'faq') redirect('/es/demo#faq')

  let page: React.ReactNode
  if (key === '') {
    page = (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(spanishHomeSchema).replace(/</g, '\\u003c') }} />
        <HomeExperienceClient />
      </>
    )
  } else if (key === 'platform' || key === 'solutions' || key === 'enterprise' || key === 'company' || key === 'revenue' || key === 'implementation' || key === 'contact') {
    page = <ExperiencePage page={key} />
  } else if (key === 'resources') {
    page = (
      <ResourcesClient content={{
        en: { essays: ESSAYS, categories: categoriesOf(ESSAYS) },
        es: { essays: ESSAYS_ES, categories: categoriesOf(ESSAYS_ES) },
      }} />
    )
  } else if (key === 'demo') {
    page = (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(spanishFaqSchema).replace(/</g, '\\u003c') }} />
        <DemoClient />
      </>
    )
  } else if (key === 'trust') {
    page = <LegalLayout doc={trustDoc} />
  } else if (key === 'security') {
    page = <LegalLayout doc={securityDoc} />
  } else if (key === 'responsible-ai') {
    page = <LegalLayout doc={responsibleAiDoc} />
  } else if (key === 'accessibility') {
    page = <LegalLayout doc={accessibilityDoc} />
  } else if (key === 'privacy') {
    page = <LegalLayout doc={privacyDoc} />
  } else if (key === 'terms') {
    page = <LegalLayout doc={termsDoc} />
  } else if (key === 'cookies') {
    page = <LegalLayout doc={cookiesDoc} />
  } else if (slug[0] === 'resources' && slug[1] === 'library' && slug.length === 3) {
    const en = bundle(slug[2], 'en')
    const es = bundle(slug[2], 'es')
    if (!en || !es) notFound()
    page = <ArticleLayout content={{ en, es }} />
  } else {
    notFound()
  }

  return <div lang="es-MX">{page}</div>
}
