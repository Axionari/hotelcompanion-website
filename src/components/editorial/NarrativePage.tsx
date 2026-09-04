'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { EditorialCloseMedia, type EditorialVisual } from '@/components/editorial/EditorialImage'
import { TabletOS } from '@/components/cds/TabletOS'
import { JourneyWalkthrough } from '@/components/cds/JourneyWalkthrough'
import { TwoStageAlert } from '@/components/cds/interactive'
import { AdaptivityFlow } from '@/components/v5/AdaptivityFlow'
import { EverySurface } from '@/components/v5/EverySurface'
import { IntelligenceModel } from '@/components/v5/IntelligenceModel'
import { PaymentFlow } from '@/components/v5/PaymentFlow'
import { WhiteLabelHotels } from '@/components/v5/WhiteLabelHotels'
import { MorningBriefing, RevenueMoment } from '@/components/v5/SolutionsProductProofs'
import { DepartmentPulse } from '@/components/v5/DepartmentPulse'
import { PlatformThread } from '@/components/v5/PlatformThread'
import {
  ArchitectureSpineDiagram,
  OutcomeLedgerDiagram,
  PortfolioStackDiagram,
  ProcessDiagram,
  RoutingDiagram,
  SecurityPostureDiagram,
} from '@/components/editorial/TechnicalDiagrams'
import { useCopy } from '@/lib/i18n/useCopy'
import {
  editorialPages,
  type EditorialItem,
  type EditorialPageCopy,
  type EditorialPageKey,
  type EditorialSection,
} from '@/lib/i18n/marketing/editorialPages'
import {
  editorialVisuals,
  type EditorialPageVisuals,
} from '@/lib/i18n/marketing/editorialVisuals'
import { globalCopy } from '@/lib/i18n/marketing/global'
import { platformCopy } from '@/lib/i18n/marketing/platform'
import { companionOsCopy } from '@/lib/i18n/marketing/companionOs'
import { companyCopy } from '@/lib/i18n/marketing/company'
import { enterpriseCopy } from '@/lib/i18n/marketing/enterprise'

type PageProps = {
  copy: EditorialPageCopy
  visual: EditorialPageVisuals
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="ed-eyebrow">{children}</div>
}

function Aliases({ ids }: { ids?: string[] }) {
  if (!ids?.length) return null
  return <>{ids.map((id) => <span key={id} id={id} className="ed-anchor" aria-hidden="true" />)}</>
}

function ItemTitle({ item }: { item: EditorialItem }) {
  if (!item.href) return <>{item.title}</>
  return item.href.startsWith('/') || item.href.startsWith('#') ? (
    <Link href={item.href}>{item.title}</Link>
  ) : (
    <a href={item.href}>{item.title}</a>
  )
}

function Actions({
  primary,
  primaryHref,
  secondary,
  secondaryHref,
  dark = false,
}: {
  primary: string
  primaryHref: string
  secondary?: string
  secondaryHref?: string
  dark?: boolean
}) {
  return (
    <div className="ed-actions">
      <Link className="ed-button ed-button-primary" href={primaryHref}>{primary}</Link>
      {secondary && secondaryHref ? (
        <Link className={`ed-button ${dark ? 'ed-button-dark' : 'ed-button-quiet'}`} href={secondaryHref}>{secondary}</Link>
      ) : null}
    </div>
  )
}

function HeroCopy({ copy, dark = false }: { copy: EditorialPageCopy['hero']; dark?: boolean }) {
  return (
    <div className={`ep-hero-copy${dark ? ' is-dark' : ''}`}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h1>{copy.title}<br /><em>{copy.accent}</em></h1>
      <p>{copy.body}</p>
      <Actions
        primary={copy.primary}
        primaryHref={copy.primaryHref}
        secondary={copy.secondary}
        secondaryHref={copy.secondaryHref}
        dark={dark}
      />
    </div>
  )
}

function HeroFolio({ copy, className = '' }: { copy: EditorialPageCopy['hero']; className?: string }) {
  return (
    <aside className={`ep-folio ${className}`.trim()} aria-label={copy.folioLabel}>
      <div className="ep-folio-head"><span>{copy.folioLabel}</span><i aria-hidden="true" /></div>
      <h2>{copy.folioTitle}</h2>
      <dl>{copy.folioRows.map((row, index) => (
        <div key={`${row.label}-${index}`}><dt>{row.label}</dt><dd>{row.value}</dd></div>
      ))}</dl>
      <small>HOTEL COMPANION · 01—04</small>
    </aside>
  )
}

function ProofRail({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <div className={`ep-proof ${className}`.trim()}>
      <ul className="ed-wrap">{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
    </div>
  )
}

function SectionIntro({ section, className = '' }: { section: EditorialSection; className?: string }) {
  return (
    <div className={`ep-section-intro ${className}`.trim()}>
      <Eyebrow>{section.no} · {section.label}</Eyebrow>
      <h2>{section.title}{section.accent ? <><br /><em>{section.accent}</em></> : null}</h2>
      {section.body ? <p>{section.body}</p> : null}
    </div>
  )
}

function SectionMeta({ section }: { section: EditorialSection }) {
  if (!section.note && !section.link) return null
  return (
    <div className="ep-section-meta">
      {section.note ? <small>{section.note}</small> : null}
      {section.link ? <Link href={section.link.href}>{section.link.label} <span aria-hidden="true">→</span></Link> : null}
    </div>
  )
}

function ArticleItems({ section, className }: { section: EditorialSection; className: string }) {
  return (
    <div className={className}>
      {section.items.map((item, index) => (
        <article key={item.title} id={item.id}>
          <span>{item.label ?? String(index + 1).padStart(2, '0')}</span>
          <h3><ItemTitle item={item} /></h3>
          {item.body ? <p>{item.body}</p> : null}
        </article>
      ))}
    </div>
  )
}

/**
 * The Company page needs more biography than the shared editorial item can
 * carry gracefully. This keeps the redesign's open, ruled-page language while
 * restoring the complete leadership profiles published on the original HC
 * site — without turning the section back into a grid of interchangeable cards.
 */
function LeadershipProfiles({
  members,
}: {
  members: ReadonlyArray<{
    name: string
    role: string
    location?: string
    bio: string
    skills?: ReadonlyArray<string>
  }>
}) {
  return (
    <div className="ep-leadership-profiles">
      {members.map((member, index) => {
        const headingId = `leadership-profile-${index + 1}`
        return (
          <article key={member.name} className="ep-leadership-profile" aria-labelledby={headingId}>
            <span className="ep-leadership-index">{String(index + 1).padStart(2, '0')}</span>
            <header className="ep-leadership-identity">
              <p className="ep-leadership-role">{member.role}</p>
              <h3 id={headingId}>{member.name}</h3>
              {member.location ? <p className="ep-leadership-location">{member.location}</p> : null}
            </header>
            <div className="ep-leadership-biography">
              <p>{member.bio}</p>
              {member.skills?.length ? (
                <ul className="ep-leadership-expertise">
                  {member.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function StepItems({ section, className }: { section: EditorialSection; className: string }) {
  return (
    <ol className={className}>
      {section.items.map((item, index) => (
        <li key={item.title} id={item.id}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div><h3><ItemTitle item={item} /></h3>{item.body ? <p>{item.body}</p> : null}</div>
        </li>
      ))}
    </ol>
  )
}

function FaqItems({ section }: { section: EditorialSection }) {
  return (
    <div className="ed-faq ep-faq">
      {section.items.map((item, index) => (
        <details key={item.title} open={index === 0}>
          <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</summary>
          {item.body ? <p>{item.body}</p> : null}
        </details>
      ))}
    </div>
  )
}

function EditorialPhoto({
  visual,
  className,
  sizes = '(max-width: 820px) 100vw, 54vw',
}: {
  visual: EditorialVisual
  className: string
  sizes?: string
}) {
  return (
    <figure className={`ep-photo ${className}`}>
      <div className="ep-photo-media">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes={sizes}
          quality={75}
          style={{ objectFit: 'cover', objectPosition: visual.position ?? 'center' }}
        />
      </div>
      {visual.eyebrow || visual.caption ? (
        <figcaption>
          {visual.eyebrow ? <span>{visual.eyebrow}</span> : null}
          {visual.caption ? <p>{visual.caption}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}

function ImageClosing({ copy, visual, variant }: PageProps & { variant: 'platform' | 'solutions' | 'enterprise' | 'os' | 'company' }) {
  return (
    <section className={`ed-close has-media ep-close ep-close-${variant}`} id={copy.closing.id}>
      <Aliases ids={copy.closing.aliases} />
      <EditorialCloseMedia visual={visual.closing} />
      <div className="ed-wrap ep-close-content">
        <Eyebrow>{copy.closing.eyebrow}</Eyebrow>
        <h2>{copy.closing.title}<br /><em>{copy.closing.accent}</em></h2>
        <div className="ep-close-details">
          <p>{copy.closing.body}</p>
          <Actions
            primary={copy.closing.primary}
            primaryHref={copy.closing.primaryHref}
            secondary={copy.closing.secondary}
            secondaryHref={copy.closing.secondaryHref}
            dark
          />
        </div>
      </div>
    </section>
  )
}

function PageShell({ className, children }: { className: string; children: React.ReactNode }) {
  const { nav } = useCopy(globalCopy)
  return (
    <div className={`ed-page ep-page ${className}`}>
      <a className="ed-skip-link" href="#main-content">{nav.skipToContent}</a>
      <SiteNav appearance="light" />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  )
}

function sectionById(copy: EditorialPageCopy, id: string) {
  const section = copy.sections.find((entry) => entry.id === id)
  if (!section) throw new Error(`Missing editorial section: ${id}`)
  return section
}

function PlatformPage({ copy, visual }: PageProps) {
  const product = useCopy(platformCopy)
  const surfaces = sectionById(copy, 'platform-voice-first')
  const knowledge = sectionById(copy, 'platform-knows-property')
  const loop = sectionById(copy, 'platform-request-action')
  const revenue = sectionById(copy, 'platform-intelligence')
  const morning = sectionById(copy, 'platform-dashboards')
  const faq = sectionById(copy, 'platform-faq')
  return (
    <PageShell className="ep-platform ed-page-platform">
      <header className="ep-hero ep-platform-hero" id={copy.hero.id}>
        <div className="ed-wrap ep-platform-hero-grid">
          <HeroCopy copy={copy.hero} />
          <div className="ep-product-hero ep-platform-thread">
            <PlatformThread />
          </div>
        </div>
      </header>
      <ProofRail items={copy.proof} className="ep-proof-platform" />

      <section className="ep-section ep-platform-model" id="platform-model">
        <div className="ed-wrap ep-platform-model-layout">
          <div className="ep-technical-heading is-dark">
            <Eyebrow>{product.model.eyebrow}</Eyebrow>
            <h2>{product.model.title}</h2>
            <p>{product.model.deck}</p>
          </div>
          <div className="ep-intelligence-model-stage">
            <IntelligenceModel c={product.model} />
          </div>
        </div>
      </section>

      <section className="ep-section ep-platform-surfaces" id={surfaces.id}>
        <Aliases ids={surfaces.aliases?.filter((id) => id !== 'platform-model' && id !== 'platform-adaptivity')} />
        <div className="ed-wrap">
          <SectionIntro section={surfaces} />
          <div className="ep-every-surface-stage">
            <EverySurface id="platform-device-family" showHeader={false} compact />
          </div>
        </div>
      </section>

      <section className="ep-section ep-platform-adaptivity" id="platform-adaptivity">
        <div className="ed-wrap ep-platform-adaptivity-layout">
          <div className="ep-technical-heading is-dark">
            <Eyebrow>{product.adaptivity.eyebrow}</Eyebrow>
            <h2>{product.adaptivity.title}</h2>
            <p>{product.adaptivity.deck}</p>
          </div>
          <div className="ep-adaptivity-stage">
            <AdaptivityFlow c={product.adaptivity} />
          </div>
        </div>
      </section>

      <section className="ep-section ep-platform-knowledge" id={knowledge.id}>
        <Aliases ids={knowledge.aliases} />
        <div className="ed-wrap ep-property-spread">
          <SectionIntro section={knowledge} />
          <EditorialPhoto visual={visual.divider} className="ep-property-photo" />
          <ArticleItems section={knowledge} className="ep-knowledge-columns" />
          <SectionMeta section={knowledge} />
        </div>
      </section>

      <section className="ep-section ep-platform-loop" id={loop.id}>
        <Aliases ids={loop.aliases} />
        <div className="ed-wrap ep-loop-layout">
          <SectionIntro section={loop} />
          <div className="ep-loop-product">
            <TwoStageAlert
              guest={product.issueAlert.guest}
              reply={product.issueAlert.reply}
              deviceLabel={product.issueAlert.deviceLabel}
              ticketTag={product.issueAlert.ticketTag}
              ticketStatus={product.issueAlert.ticketStatus}
              stages={loop.items.map((item) => ({ title: item.title, body: item.body ?? '' }))}
            />
          </div>
          <div className="ep-routing-proof">
            <RoutingDiagram
              labels={{
                title: loop.label,
                meta: product.requestAction.flow.caption,
                caption: product.requestAction.close.join(' '),
              }}
              from={product.requestAction.routingFrom}
              contextLabel={product.requestAction.flow.label1}
              node={product.requestAction.flow.node}
              routeLabel={product.requestAction.flow.label2}
              systemsLabel={product.requestAction.flow.caption}
              systems={product.requestAction.departments}
            />
          </div>
          <SectionMeta section={loop} />
        </div>
      </section>

      <section className="ep-section ep-platform-revenue" id={revenue.id}>
        <Aliases ids={revenue.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={revenue} />
          <div className="ep-journey-product">
            <JourneyWalkthrough steps={product.journey.steps} tallyLabel={product.journey.tallyLabel} />
          </div>
        </div>
      </section>

      <section className="ep-section ep-platform-morning" id={morning.id}>
        <Aliases ids={morning.aliases} />
        <div className="ed-wrap ep-morning-layout">
          <SectionIntro section={morning} />
          <ArticleItems section={morning} className="ep-morning-brief" />
          <SectionMeta section={morning} />
        </div>
      </section>

      <section className="ep-section ep-platform-faq" id={faq.id}>
        <Aliases ids={faq.aliases} />
        <div className="ed-wrap ep-faq-layout">
          <SectionIntro section={faq} />
          <div><FaqItems section={faq} /><SectionMeta section={faq} /></div>
        </div>
      </section>
      <ImageClosing copy={copy} visual={visual} variant="platform" />
    </PageShell>
  )
}

function SolutionsPage({ copy, visual }: PageProps) {
  const arrival = sectionById(copy, 'solutions-departments')
  const stay = sectionById(copy, 'solutions-stay')
  const revenue = sectionById(copy, 'solutions-revenue')
  const morning = sectionById(copy, 'solutions-morning')
  return (
    <PageShell className="ep-solutions ed-page-solutions">
      <header className="ep-hero ep-solutions-hero" id={copy.hero.id}>
        <div className="ed-wrap ep-solutions-hero-product-grid">
          <HeroCopy copy={copy.hero} />
          <div className="ep-product-hero ep-solutions-pulse">
            <DepartmentPulse title={copy.hero.folioTitle} rows={copy.hero.folioRows} />
          </div>
        </div>
      </header>
      <ProofRail items={copy.proof} className="ep-proof-solutions" />

      <section className="ep-section ep-solutions-arrival" id={arrival.id}>
        <Aliases ids={arrival.aliases} />
        <div className="ed-wrap ep-arrival-layout">
          <SectionIntro section={arrival} />
          <ArticleItems section={arrival} className="ep-arrival-trio" />
        </div>
      </section>

      <section className="ep-section ep-solutions-stay" id={stay.id}>
        <Aliases ids={stay.aliases} />
        <div className="ed-wrap ep-solutions-stay-product">
          <div className="ep-solutions-stay-copy">
            <SectionIntro section={stay} />
            <StepItems section={stay} className="ep-motion-flow" />
          </div>
          <div className="ep-tablet-os-stage">
            <TabletOS cycle={['issue', 'roomservice', 'spa']} />
          </div>
        </div>
      </section>

      <div className="ep-solutions-panorama-wrap" id="solutions-panorama">
        <EditorialPhoto visual={visual.divider} className="ep-solutions-panorama" sizes="(max-width: 1280px) 100vw, 1240px" />
      </div>

      <section className="ep-section ep-solutions-revenue" id={revenue.id}>
        <Aliases ids={revenue.aliases} />
        <div className="ed-wrap ep-solutions-revenue-layout">
          <SectionIntro section={revenue} />
          <div className="ep-solutions-revenue-product">
            <RevenueMoment />
          </div>
        </div>
      </section>

      <section className="ep-section ep-solutions-morning" id={morning.id}>
        <Aliases ids={morning.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={morning} />
          <div className="ep-solutions-morning-product">
            <MorningBriefing />
          </div>
        </div>
      </section>

      <WhiteLabelHotels />
      <ImageClosing copy={copy} visual={visual} variant="solutions" />
    </PageShell>
  )
}

function EnterprisePage({ copy, visual }: PageProps) {
  const enterprise = useCopy(enterpriseCopy)
  const layers = sectionById(copy, 'shared-intel')
  const knowledge = sectionById(copy, 'knowledge')
  const secure = sectionById(copy, 'secure')
  const signals = sectionById(copy, 'operational-intel')
  const deploy = sectionById(copy, 'deploy')
  return (
    <PageShell className="ep-enterprise ed-page-enterprise">
      <header className="ep-hero ep-enterprise-hero" id={copy.hero.id}>
        <div className="ed-wrap ep-enterprise-hero-grid">
          <HeroCopy copy={copy.hero} dark />
          <HeroFolio copy={copy.hero} className="ep-portfolio-manifest" />
        </div>
      </header>
      <ProofRail items={copy.proof} className="ep-proof-enterprise" />

      <section className="ep-section ep-enterprise-layers" id={layers.id}>
        <Aliases ids={layers.aliases} />
        <div className="ed-wrap ep-enterprise-layers-layout">
          <SectionIntro section={layers} />
          <div className="ep-enterprise-stack-stage">
            <PortfolioStackDiagram
              labels={{
                title: layers.label,
                meta: enterprise.architecture.caption,
              }}
              tiers={[
                enterprise.architecture.tiers.org,
                { ...enterprise.architecture.tiers.layer, highlight: true },
                enterprise.architecture.tiers.foundation,
              ]}
            />
          </div>
        </div>
      </section>

      <section className="ep-section ep-enterprise-knowledge" id={knowledge.id}>
        <Aliases ids={knowledge.aliases} />
        <div className="ed-wrap ep-enterprise-ledger-layout">
          <SectionIntro section={knowledge} />
          <ArticleItems section={knowledge} className="ep-governance-ledger" />
        </div>
      </section>

      <section className="ep-enterprise-secure" id={secure.id}>
        <Aliases ids={secure.aliases?.filter((id) => id !== 'payment')} />
        <div className="ep-secure-diptych">
          <div className="ep-secure-copy">
            <SectionIntro section={secure} />
            <ArticleItems section={secure} className="ep-secure-list" />
            <SectionMeta section={secure} />
          </div>
          <EditorialPhoto visual={visual.divider} className="ep-secure-photo" sizes="(max-width: 820px) 100vw, 46vw" />
        </div>
        <div className="ed-wrap ep-security-architecture">
          <SecurityPostureDiagram
            labels={{
              title: enterprise.securityPosture.label,
              meta: enterprise.securityPosture.tag,
              caption: enterprise.trust,
            }}
            rows={enterprise.securityPosture.rows}
          />
        </div>
        <div className="ed-wrap ep-payment-architecture" id="payment">
          <div className="ep-technical-heading is-dark">
            <Eyebrow>{enterprise.acts.payment}</Eyebrow>
            <h2>{enterprise.payment.statement}</h2>
            <p>{enterprise.payment.deck}</p>
          </div>
          <div className="ep-payment-flow-stage">
            <PaymentFlow copy={enterprise.payment} />
          </div>
        </div>
      </section>

      <section className="ep-section ep-enterprise-signals" id={signals.id}>
        <Aliases ids={signals.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={signals} />
          <ArticleItems section={signals} className="ep-portfolio-signals" />
          <div className="ep-outcome-ledger-stage">
            <OutcomeLedgerDiagram
              labels={{ title: enterprise.outcomes.eyebrow, meta: signals.label }}
              items={enterprise.outcomes.items}
            />
          </div>
        </div>
      </section>

      <section className="ep-section ep-enterprise-deploy" id={deploy.id}>
        <Aliases ids={deploy.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={deploy} />
          <div className="ep-deployment-diagram">
            <ProcessDiagram
              labels={{
                title: enterprise.deployPath.title,
                meta: deploy.label,
                caption: enterprise.deployPath.caption,
              }}
              steps={enterprise.deployPath.steps}
            />
          </div>
          <SectionMeta section={deploy} />
        </div>
      </section>
      <ImageClosing copy={copy} visual={visual} variant="enterprise" />
    </PageShell>
  )
}

function CompanionOsPage({ copy, visual }: PageProps) {
  const product = useCopy(companionOsCopy)
  const cycle = sectionById(copy, 'companionos-model')
  const companions = sectionById(copy, 'companionos-one-platform')
  const architecture = sectionById(copy, 'companionos-architecture')
  const governance = sectionById(copy, 'companionos-enterprise')
  const ecosystem = sectionById(copy, 'companionos-ecosystem')
  return (
    <PageShell className="ep-os ed-page-companion-os">
      <header className="ep-hero ep-os-hero" id={copy.hero.id}>
        <div className="ep-os-rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="ed-wrap ep-os-hero-grid">
          <HeroCopy copy={copy.hero} dark />
          <HeroFolio copy={copy.hero} className="ep-os-engine" />
        </div>
      </header>
      <ProofRail items={copy.proof} className="ep-proof-os" />

      <section className="ep-section ep-os-cycle" id={cycle.id}>
        <Aliases ids={cycle.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={cycle} />
          <div className="ep-os-model-product">
            <IntelligenceModel c={product.model} />
          </div>
        </div>
      </section>

      <section className="ep-section ep-os-companions" id={companions.id}>
        <Aliases ids={companions.aliases} />
        <div className="ed-wrap ep-os-companions-layout">
          <SectionIntro section={companions} />
          <div className="ep-companion-pair-stage">
            <ArticleItems section={companions} className="ep-companion-pair" />
            {companions.motif ? <span className="ep-companion-pair-label" aria-hidden="true">{companions.motif}</span> : null}
          </div>
        </div>
      </section>

      <section className="ep-os-architecture" id={architecture.id}>
        <Aliases ids={architecture.aliases} />
        <div className="ep-os-architecture-grid">
          <div className="ep-os-architecture-copy">
            <SectionIntro section={architecture} />
          </div>
          <div className="ep-os-spine-diagram">
            <ArchitectureSpineDiagram
              labels={{
                title: architecture.label,
                meta: `${architecture.no} / ${String(architecture.items.length).padStart(2, '0')}`,
              }}
              items={architecture.items}
              loop={cycle.motif ?? product.model.loop}
            />
          </div>
        </div>
      </section>

      <section className="ep-section ep-os-governance" id={governance.id}>
        <Aliases ids={governance.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={governance} />
          <ArticleItems section={governance} className="ep-governance-matrix" />
          <SectionMeta section={governance} />
        </div>
      </section>

      <section className="ep-section ep-os-ecosystem" id={ecosystem.id}>
        <Aliases ids={ecosystem.aliases} />
        <div className="ed-wrap ep-ecosystem-layout">
          <SectionIntro section={ecosystem} />
          <ArticleItems section={ecosystem} className="ep-family-tree" />
        </div>
      </section>
      <ImageClosing copy={copy} visual={visual} variant="os" />
    </PageShell>
  )
}

function CompanyPage({ copy, visual }: PageProps) {
  const originalCompany = useCopy(companyCopy)
  const why = sectionById(copy, 'why-hotels')
  const mission = sectionById(copy, 'mission')
  const principles = sectionById(copy, 'belief')
  const builder = sectionById(copy, 'axionari')
  const leadership = sectionById(copy, 'leadership')
  const contact = sectionById(copy, 'contact')
  return (
    <PageShell className="ep-company ed-page-company">
      <header className="ep-hero ep-company-hero" id={copy.hero.id}>
        <div className="ed-wrap ep-company-hero-grid">
          <HeroCopy copy={copy.hero} />
          <div className="ep-company-portrait">
            <EditorialPhoto visual={visual.divider} className="ep-company-hero-photo" />
            <HeroFolio copy={copy.hero} className="ep-company-belief" />
          </div>
        </div>
      </header>
      <ProofRail items={copy.proof} className="ep-proof-company" />

      <section className="ep-section ep-company-why" id={why.id}>
        <Aliases ids={why.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={why} />
          <ArticleItems section={why} className="ep-company-moments" />
          <SectionMeta section={why} />
        </div>
      </section>

      <section className="ep-section ep-company-mission" id={mission.id}>
        <Aliases ids={mission.aliases} />
        <div className="ed-wrap ep-company-manifesto">
          <SectionIntro section={mission} />
          <ArticleItems section={mission} className="ep-mission-pillars" />
        </div>
      </section>

      <section className="ep-section ep-company-principles" id={principles.id}>
        <Aliases ids={principles.aliases} />
        <div className="ed-wrap ep-principles-layout">
          <SectionIntro section={principles} />
          <ArticleItems section={principles} className="ep-principles-list" />
        </div>
      </section>

      <section className="ep-section ep-company-builder" id={builder.id}>
        <Aliases ids={builder.aliases} />
        <div className="ed-wrap ep-builder-layout">
          <SectionIntro section={builder} />
          <ArticleItems section={builder} className="ep-builder-stack" />
        </div>
      </section>

      <section className="ep-section ep-company-leadership" id={leadership.id}>
        <Aliases ids={leadership.aliases} />
        <div className="ed-wrap">
          <SectionIntro section={{ ...leadership, body: originalCompany.leadership.deck }} />
          <LeadershipProfiles members={originalCompany.leadership.members} />
          <p className="ep-leadership-coda">{originalCompany.leadership.coda}</p>
        </div>
      </section>

      <section className="ep-section ep-company-contact" id={contact.id}>
        <Aliases ids={contact.aliases} />
        <div className="ed-wrap ep-company-contact-layout">
          <SectionIntro section={contact} />
          <ArticleItems section={contact} className="ep-company-paths" />
          <SectionMeta section={contact} />
        </div>
      </section>
      <ImageClosing copy={copy} visual={visual} variant="company" />
    </PageShell>
  )
}

const pageRenderers = {
  platform: PlatformPage,
  solutions: SolutionsPage,
  enterprise: EnterprisePage,
  'companion-os': CompanionOsPage,
  company: CompanyPage,
} satisfies Record<EditorialPageKey, React.ComponentType<PageProps>>

export default function NarrativePage({ page }: { page: EditorialPageKey }) {
  const copy = useCopy(editorialPages[page])
  const visual = useCopy(editorialVisuals[page])
  const Renderer = pageRenderers[page]
  return <Renderer copy={copy} visual={visual} />
}
