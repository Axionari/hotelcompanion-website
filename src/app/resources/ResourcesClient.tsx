'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { type Localized, useCopy } from '@/lib/i18n/useCopy'
import type { EssayMeta } from '@/lib/library'
import { articleVisuals } from '@/lib/i18n/marketing/articleVisuals'
import { ExperienceFrame } from '@/components/experience/ExperiencePages'
import { useWords } from '@/components/experience/Experience'
import { SignatureClosing } from '@/components/experience/SignatureSections'
import styles from './resources.module.css'

export interface ResourcesContent { essays: EssayMeta[]; categories: string[] }

const photos = articleVisuals.map(visual => visual.en.src)

export default function ResourcesClient({ content }: { content: Localized<ResourcesContent> }) {
  const t = useWords()
  const { essays, categories } = useCopy(content)
  const [active, setActive] = useState('')
  const selected = categories.includes(active) ? active : ''
  const visible = selected ? essays.filter(essay => essay.category === selected) : essays
  const [featured, ...remaining] = visible

  return (
    <ExperienceFrame>
      <div className={`hc-signature-journal ${styles.journal}`}>
      <header className={`${styles.container} ${styles.masthead}`}>
        <div className={styles.mastheadLine}><p>{t('THE HC JOURNAL', 'EL JOURNAL DE HC')}</p><a href="#library">{t('Explore the journal', 'Explora el journal')}<ArrowDown size={15} aria-hidden="true" /></a></div>
        <div className={styles.mastheadTitle}><h1>{t('Ideas for better', 'Ideas para una mejor')} <span>{t('hospitality.', 'hospitalidad.')}</span></h1><p>{t('Guest experience, hotel revenue and the thoughtful use of AI.', 'Experiencia del huésped, ingresos del hotel y uso atento de la IA.')}</p></div>
      </header>
      <section className={`${styles.container} ${styles.library}`} id="library" aria-label={t('Essay library', 'Biblioteca de ensayos')}>
        <div className={styles.toolbar}>
          <p aria-live="polite">
            {visible.length} {visible.length === 1 ? t('essay', 'ensayo') : t('essays', 'ensayos')}
          </p>
          <label>
            <span>{t('Explore', 'Explora')}</span>
            <select value={selected} onChange={event => setActive(event.target.value)}>
              <option value="">{t('All topics', 'Todos los temas')}</option>
              {categories.map(category => <option key={category}>{category}</option>)}
            </select>
          </label>
        </div>

        {featured && (
          <article className={styles.feature}>
            <Link className={styles.featureLink} href={`/resources/library/${featured.slug}`}>
              <div className={styles.featureImage}>
                <Image
                  src={photos[(featured.order - 1) % photos.length]}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 1280px"
                  priority
                />
              </div>
              <div className={styles.featureCopy}>
                <p className={styles.eyebrow}>{t('Featured essay', 'Lectura destacada')}</p>
                <p className={styles.category}>{featured.category}</p>
                <h2>{featured.title}</h2>
                <p className={styles.subtitle}>{featured.subtitle}</p>
                <span className={styles.featureAction}>
                  <span>{t('Read the essay', 'Leer el ensayo')} <span className={styles.readingTime}>· {featured.readingTime}</span></span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>
        )}

        {remaining.length > 0 && (
          <ol className={styles.index}>
            {remaining.map(essay => (
              <li key={essay.slug}>
                <Link className={styles.indexLink} href={`/resources/library/${essay.slug}`}>
                  <span className={styles.indexCategory}>{essay.category}</span>
                  <h2>{essay.title}</h2>
                  <span className={styles.indexMeta}>
                    <span>{essay.readingTime}</span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
      <SignatureClosing />
      </div>
    </ExperienceFrame>
  )
}
