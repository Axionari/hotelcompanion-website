'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
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

  return (
    <ExperienceFrame>
      <div className={`hc-signature-journal ${styles.journal}`}>
      <header className={`${styles.container} ${styles.masthead}`}>
        <div className={styles.mastheadCopy}>
          <div className={styles.mastheadLine}><p>{t('THE HC JOURNAL', 'EL JOURNAL DE HC')}</p></div>
          <div className={styles.mastheadTitle}><h1>{t('Ideas for better', 'Ideas para una mejor')} <span>{t('hospitality.', 'hospitalidad.')}</span></h1><p>{t('A practical perspective on guest experience, hotel revenue and the thoughtful use of AI.', 'Una perspectiva práctica sobre la experiencia del huésped, los ingresos del hotel y el uso atento de la IA.')}</p></div>
        </div>
        <figure className={styles.mastheadPhoto}><Image src="/assets/editorial/hc-caribbean-lobby.webp" alt={t('An open hotel lobby looking toward the sea', 'Un lobby abierto con vista al mar')} fill priority sizes="(max-width:750px) 100vw, 40vw"/><figcaption><span>{t('FOR HOTEL LEADERS', 'PARA LÍDERES HOTELEROS')}</span><i>{t('A more considered stay.', 'Una estancia más atenta.')}</i></figcaption></figure>
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

        <ol className={styles.grid}>
          {visible.map((essay,index) => (
            <li key={essay.slug}>
              <Link className={styles.card} href={`/resources/library/${essay.slug}`}>
                <div className={styles.cardImage}><Image src={photos[(essay.order - 1) % photos.length]} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" priority={index<3}/></div>
                <div className={styles.cardCopy}>
                  <span className={styles.indexCategory}>{essay.category}<span>{String(essay.order).padStart(2,'0')}</span></span>
                  <h2>{essay.title}</h2>
                  <p>{essay.subtitle}</p>
                  <span className={styles.indexMeta}><span>{essay.readingTime}</span><ArrowUpRight size={18} aria-hidden="true" /></span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <SignatureClosing />
      </div>
    </ExperienceFrame>
  )
}
