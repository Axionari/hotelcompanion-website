import type { Localized } from '../useCopy'

/** Non-body chrome around Library articles (labels, not essay copy). */
const en = {
  eyebrow: 'LIBRARY',
  nextArticle: 'NEXT ARTICLE',
  seriesEnd: 'END OF THE LIBRARY SERIES',
  seriesEndLine: 'Every conversation leads somewhere.',
  explore: 'EXPLORE THE LIBRARY',
  allResources: 'All resources',
  cta: 'Book a Demo',
}

const es: typeof en = {
  eyebrow: 'BIBLIOTECA',
  nextArticle: 'SIGUIENTE ARTÍCULO',
  seriesEnd: 'FIN DE LA SERIE DE LA BIBLIOTECA',
  seriesEndLine: 'Cada conversación lleva a algún lugar.',
  explore: 'EXPLORA LA BIBLIOTECA',
  allResources: 'Todos los recursos',
  cta: 'Agenda una Demo',
}

export const libraryChrome: Localized<typeof en> = { en, es }
