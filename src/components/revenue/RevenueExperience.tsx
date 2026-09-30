'use client'

import { useId, useState } from 'react'
import { Phone, Smartphone, Monitor, MessageCircle, ArrowUpRight, Check } from 'lucide-react'
import { useCopy } from '@/lib/i18n/useCopy'
import { revenueMarketingCopy } from '@/lib/i18n/marketing/revenueMarketing'
import styles from './RevenueExperience.module.css'

/** A clearly labeled, non-transactional example. No invented customer metrics. */
export function ConversationPreview() {
  const c = useCopy(revenueMarketingCopy).preview
  return (
    <figure className={styles.conversation}>
      <figcaption>{c.label}</figcaption>
      <div className={styles.browserBar}><span aria-hidden="true">•••</span><span>{c.brand}</span><MessageCircle size={16} aria-hidden="true" /></div>
      <div className={styles.thread}>
        <span className={styles.channel}><Smartphone size={14} aria-hidden="true" />{c.channel}</span>
        <blockquote className={styles.guest}>{c.guest}</blockquote>
        <p className={styles.reply}>{c.reply}</p>
        <div className={styles.package}>
          <span aria-hidden="true"><ArrowUpRight size={22} /></span>
          <div><strong>{c.offer}</strong><p>{c.detail}</p></div>
        </div>
      </div>
      <small className={styles.caption}>{c.footer}</small>
    </figure>
  )
}

export function RevenueWorkbench() {
  const c = useCopy(revenueMarketingCopy)
  const [selected, setSelected] = useState(0)
  const id = useId()
  const example = c.workbench.examples[selected]
  return (
    <div className={styles.workbench}>
      <div className={styles.options} role="group" aria-label={c.workbench.label}>
        {c.workbench.examples.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}>{item.tab}</button>
        ))}
      </div>
      <div className={styles.example} id={id} aria-live="polite" aria-atomic="true">
        <div className={styles.exampleGuest}>
          <span>{c.workbench.guestLabel}</span><blockquote>{example.guest}</blockquote>
          <span>{c.workbench.offerLabel}</span><p>{example.offer}</p>
        </div>
        <div className={styles.exampleRules}>
          <span>{c.workbench.reasonLabel}</span><h3>{example.reason}</h3>
          <span>{c.workbench.ruleLabel}</span><p>{example.rule}</p>
        </div>
      </div>
      <p className={styles.disclosure}>{c.revenue.disclosure}</p>
    </div>
  )
}

export function RevenueCapabilities() {
  const c = useCopy(revenueMarketingCopy).revenue
  return (
    <div className={styles.capabilities}>
      <article><span>01</span><h3>{c.recommendationTitle}</h3><p>{c.recommendationBody}</p></article>
      <article><span>02</span><h3>{c.dealTitle}</h3><p>{c.dealBody}</p></article>
    </div>
  )
}

export function ControlProposal() {
  const c = useCopy(revenueMarketingCopy).control
  return (
    <figure className={styles.control}>
      <figcaption>{c.sample}</figcaption>
      <h3>{c.proposalTitle}</h3><p>{c.proposalDetail}</p>
      <dl>{c.rows.map(row => <div key={row.label}><dt><Check size={14} aria-hidden="true" />{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
    </figure>
  )
}

export function ChannelOptions() {
  const c = useCopy(revenueMarketingCopy).channels
  const icons = [Phone, Smartphone, Monitor]
  return (
    <div className={styles.channelOptions}>
      <div className={styles.channelGrid}>{c.items.map((item, index) => {
        const Icon = icons[index]
        return <article key={item.title}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></article>
      })}</div>
      <p className={styles.optional}>{c.optional}</p>
    </div>
  )
}
