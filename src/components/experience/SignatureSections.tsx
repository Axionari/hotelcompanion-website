'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useWords } from './Experience'
import { Closing } from '../atelier/Atelier'
import styles from './signature-sections.module.css'

export const signatureFrameClass = styles.frame

export function SignatureIntro({ eyebrow, title, accent, body, image, visual, tone='photo', links=[] }: {
  eyebrow: string; title: string; accent?: string; body: string; image?: string; visual?: ReactNode;
  tone?: 'photo' | 'forest' | 'paper' | 'revenue' | 'statement'; links?: { label: string; href: string }[];
}) {
  const t = useWords()
  return <header className={`${styles.intro} sg-cover`} data-tone={tone} data-visual={Boolean(visual || image)}>
    <div className={`${styles.wrap} ${styles.introGrid}`}>
      <div className={styles.introCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}{accent && <><br/><span>{accent}</span></>}</h1>
        <p className={styles.lead}>{body}</p>
        <Link href="/demo" className={styles.action}>{t('Request a demo','Solicita una demo')}<ArrowUpRight size={18} aria-hidden="true"/></Link>
      </div>
      {visual ? <div className={styles.visual}>{visual}</div> : image ? <div className={styles.paperImage}><Image src={image} alt="" fill priority sizes="(max-width:800px) calc(100vw - 48px), 42vw"/></div> : null}
      {links.length > 0 && <nav className={styles.chapterNav} aria-label={t('Explore this page','Explora esta página')}>{links.map((link,index)=><Link key={link.href} href={link.href}><span className={styles.chapterNumber}>0{index+1}</span><span>{link.label}</span><ArrowDown size={15} aria-hidden="true"/></Link>)}</nav>}
    </div>
  </header>
}

export function SignatureClosing() {
  return <Closing/>
}

export function SignatureMoment({image,eyebrow,title,body}:{image:string;eyebrow:string;title:string;body:string}) {
  return <section className={styles.moment}><div className={`${styles.wrap} ${styles.momentGrid}`}><div className={styles.momentImage}><Image src={image} alt="" fill sizes="(max-width:800px) calc(100vw - 48px), 44vw"/></div><div className={styles.momentCopy}><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2><p className={styles.momentBody}>{body}</p></div></div></section>
}
