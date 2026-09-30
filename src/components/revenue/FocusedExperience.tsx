'use client'

import { ArrowUpRight, AudioLines, MessageCircle, Smartphone } from 'lucide-react'
import { useCopy } from '@/lib/i18n/useCopy'
import { focusedHomeCopy } from '@/lib/i18n/marketing/focusedHome'
import { RevenueWorkbench } from './RevenueExperience'
import styles from './RevenueExperience.module.css'

export function StayConversation() {
  const c = useCopy(focusedHomeCopy).conversation
  return <figure className={`${styles.conversation} hc-stay-conversation`}>
    <figcaption>{c.label}</figcaption>
    <div className={styles.browserBar}><AudioLines size={18} aria-hidden="true" /><span>{c.brand}</span><MessageCircle size={17} aria-hidden="true" /></div>
    <div className={styles.thread}>
      <span className={styles.channel}><Smartphone size={14} aria-hidden="true" />{c.channel}</span>
      <blockquote className={styles.guest}>{c.guest}</blockquote>
      <p className={styles.reply}>{c.reply}</p>
      <div className={styles.package}><span aria-hidden="true"><ArrowUpRight size={20} /></span><div><strong>{c.cardTitle}</strong><p>{c.cardBody}</p></div></div>
    </div>
    <small className={styles.caption}>{c.footer}</small>
  </figure>
}

export function FocusedRevenue() {
  const c = useCopy(focusedHomeCopy).revenue
  return <div className="hc-focused-value">
    <div className="hc-focused-capabilities">
      <article><span>01</span><h3>{c.recommendationsTitle}</h3><p>{c.recommendationsBody}</p></article>
      <article><span>02</span><h3>{c.dealsTitle}</h3><p>{c.dealsBody}</p></article>
    </div>
    <div className="hc-focused-package">
      <div><span>{c.exampleLabel}</span><h3>{c.exampleTitle}</h3></div>
      <div><p>{c.exampleBody}</p><small>{c.conditions}</small></div>
    </div>
    <div className="hc-focused-control"><div><span>{c.controlLabel}</span><h3>{c.controlTitle}</h3></div><p>{c.controlBody}</p></div>
    {/* Browsers may restore this native disclosure's open attribute on reload. */}
    <details className="hc-focused-examples" suppressHydrationWarning><summary>{c.explore}<span aria-hidden="true">+</span></summary><RevenueWorkbench /></details>
  </div>
}
