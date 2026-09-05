import type { CSSProperties } from 'react'
import styles from './TechnicalDiagrams.module.css'

type DiagramLabels = {
  title: string
  meta: string
  caption?: string
  trailing?: string
}

type ProcessStep = { title: string; sub?: string }

export function ProcessDiagram({
  labels,
  steps,
  loop,
}: {
  labels: DiagramLabels
  steps: ReadonlyArray<ProcessStep>
  loop?: string
}) {
  return (
    <figure className={`${styles.plate}${steps.length <= 4 ? ` ${styles.processCompact}` : ''}`} aria-label={labels.title}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <div className={styles.processBody}>
        <ol className={styles.processGrid} style={{ '--process-count': steps.length } as CSSProperties}>
          {steps.map((step, index) => (
            <li className={styles.processStep} key={step.title}>
              <span className={styles.processNode}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              {step.sub ? <p>{step.sub}</p> : null}
            </li>
          ))}
        </ol>
        {loop ? (
          <div className={styles.processLoop} aria-label={loop}>
            <span aria-hidden="true">↶</span><i aria-hidden="true" /><span>{loop}</span>
          </div>
        ) : null}
      </div>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </figure>
  )
}

const fragmentNodes = [
  { x: 12, y: 17 },
  { x: 37, y: 10 },
  { x: 70, y: 14 },
  { x: 88, y: 35 },
  { x: 84, y: 76 },
  { x: 60, y: 88 },
  { x: 28, y: 85 },
  { x: 10, y: 61 },
] as const

const breakPositions = [
  { left: '27%', top: '31%' },
  { left: '68%', top: '31%' },
  { left: '65%', top: '73%' },
] as const

const contrastNodePoints = [
  { x: 62, y: 38 },
  { x: 448, y: 34 },
  { x: 520, y: 150 },
  { x: 446, y: 266 },
  { x: 84, y: 270 },
  { x: 38, y: 150 },
] as const

const contrastFaultPoints = [
  { x: 188, y: 92 },
  { x: 378, y: 88 },
  { x: 382, y: 222 },
] as const

export function FragmentationDiagram({
  labels,
  center,
  systems,
  markers,
}: {
  labels: DiagramLabels
  center: string
  systems: ReadonlyArray<string>
  markers: ReadonlyArray<string>
}) {
  return (
    <figure className={styles.plate} aria-label={`${labels.title}. ${labels.caption ?? ''}`}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <div className={styles.fragmentField}>
        <svg className={styles.fragmentSvg} viewBox="0 0 1000 500" aria-hidden="true" preserveAspectRatio="none">
          {fragmentNodes.slice(0, systems.length).map((point, index) => {
            const x = point.x * 10
            const y = point.y * 5
            const mx = 500 + (x - 500) * .48
            const my = 250 + (y - 250) * .48
            return <path className={styles.fragmentLine} key={`${x}-${y}`} d={`M500 250 Q${mx} ${my + (index % 2 ? 18 : -18)} ${x} ${y}`} />
          })}
        </svg>
        <div className={styles.fragmentCore}><span>{center}</span></div>
        {fragmentNodes.slice(0, systems.length).map((point, index) => (
          <span
            className={styles.fragmentNode}
            key={systems[index]}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {systems[index]}
          </span>
        ))}
        {breakPositions.slice(0, markers.length).map((position, index) => (
          <span className={styles.breakMarker} key={markers[index]} style={position}>{markers[index]}</span>
        ))}
      </div>
      <div className={styles.fragmentMobile}>
        <strong>{center}</strong>
        <ul>{systems.map((system) => <li key={system}>{system}</li>)}</ul>
        <div className={styles.fragmentMobileMarkers}>
          {markers.map((marker) => <span key={marker}>{marker}</span>)}
        </div>
      </div>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </figure>
  )
}

export function IntelligenceLayerDiagram({
  labels,
  guest,
  node,
  nodeSub,
  systemsLabel,
  systems,
}: {
  labels: DiagramLabels
  guest: string
  node: string
  nodeSub: string
  systemsLabel: string
  systems: ReadonlyArray<string>
}) {
  return (
    <figure className={styles.plate} aria-label={`${labels.title}. ${labels.caption ?? ''}`}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <div className={styles.layerMap}>
        <div className={styles.layerSource}><span className={styles.layerSourceMark}>{guest}</span></div>
        <div className={styles.layerCore}>
          <small>Hotel Companion</small>
          <strong>{node}</strong>
          <span>{nodeSub}</span>
        </div>
        <div className={styles.layerSystems}>
          <small>{systemsLabel}</small>
          <ul className={styles.systemGrid}>{systems.map((system) => <li key={system}>{system}</li>)}</ul>
        </div>
      </div>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </figure>
  )
}

export function SystemContrastDiagram({
  labels,
  current,
  target,
}: {
  labels: DiagramLabels
  current: {
    label: string
    title: string
    center: string
    systems: ReadonlyArray<string>
    markers: ReadonlyArray<string>
  }
  target: {
    label: string
    title: string
    guest: string
    node: string
    systems: ReadonlyArray<string>
  }
}) {
  return (
    <figure className={`${styles.plate} ${styles.contrastPlate}`} aria-label={`${labels.title}. ${labels.caption ?? ''}`}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <div className={styles.contrastGrid}>
        <section className={styles.contrastCurrent}>
          <small>{current.label}</small>
          <h3>{current.title}</h3>
          <div className={styles.contrastCurrentMap}>
            <svg className={styles.contrastCurrentSvg} viewBox="0 0 560 300" aria-hidden="true" preserveAspectRatio="none">
              {contrastNodePoints.map((point, index) => (
                <line
                  className={styles.contrastFragmentLine}
                  key={`${point.x}-${point.y}`}
                  x1="280"
                  y1="150"
                  x2={point.x}
                  y2={point.y}
                  style={{ animationDelay: `${-index * 1.15}s` }}
                />
              ))}
              {contrastNodePoints.map((point) => (
                <circle className={styles.contrastEndpoint} key={`endpoint-${point.x}-${point.y}`} cx={point.x} cy={point.y} r="2.4" />
              ))}
              {contrastFaultPoints.map((point) => (
                <g className={styles.contrastFault} key={`fault-${point.x}-${point.y}`}>
                  <circle cx={point.x} cy={point.y} r="7" />
                  <path d={`M${point.x - 2.5} ${point.y - 2.5}L${point.x + 2.5} ${point.y + 2.5}M${point.x + 2.5} ${point.y - 2.5}L${point.x - 2.5} ${point.y + 2.5}`} />
                </g>
              ))}
            </svg>
            <strong>{current.center}</strong>
            <ul>{current.systems.slice(0, 6).map((system, index) => (
              <li key={system}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><b>{system}</b></li>
            ))}</ul>
          </div>
          <div className={styles.contrastMarkers}>{current.markers.map((marker) => <span key={marker}>{marker}</span>)}</div>
        </section>

        <div className={styles.contrastBridge} aria-hidden="true"><i /><span>Hotel Companion</span><i /></div>

        <section className={styles.contrastTarget}>
          <small>{target.label}</small>
          <h3>{target.title}</h3>
          <div className={styles.contrastTargetMap}>
            <span>{target.guest}</span>
            <strong>{target.node}</strong>
            <ul>{target.systems.slice(0, 6).map((system) => <li key={system}>{system}</li>)}</ul>
          </div>
        </section>
      </div>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span></figcaption> : null}
    </figure>
  )
}

export type PortfolioTier = {
  eyebrow: string
  title: string
  sub?: string
  chips: ReadonlyArray<string>
  highlight?: boolean
}

export function PortfolioStackDiagram({
  labels,
  tiers,
}: {
  labels: DiagramLabels
  tiers: ReadonlyArray<PortfolioTier>
}) {
  return (
    <figure className={`${styles.plate} ${styles.portfolioStack}`} aria-label={`${labels.title}. ${labels.caption ?? ''}`}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <div className={styles.portfolioLayers}>
        {tiers.map((tier, index) => (
          <div key={tier.eyebrow}>
            <article className={`${styles.portfolioTier}${tier.highlight ? ` ${styles.isHighlight}` : ''}`}>
              <span>{String(index + 1).padStart(2, '0')} · {tier.eyebrow}</span>
              <h3>{tier.title}{tier.sub ? <small>{tier.sub}</small> : null}</h3>
              <ul>{tier.chips.map((chip) => <li key={chip}>{chip}</li>)}</ul>
            </article>
            {index < tiers.length - 1 ? <div className={styles.portfolioConnector} aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </figure>
  )
}

export function ArchitectureSpineDiagram({
  labels,
  items,
  loop,
}: {
  labels: DiagramLabels
  items: ReadonlyArray<{ id?: string; label?: string; title: string; body?: string }>
  loop: string
}) {
  return (
    <figure className={`${styles.plate} ${styles.spine}`} aria-label={`${labels.title}. ${loop}`}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <ol className={styles.spineList}>
        {items.map((item, index) => (
          <li className={styles.spineItem} id={item.id} key={item.title}>
            <span>{item.label ?? String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{item.title}</h3>
              {item.body ? <p>{item.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.spineLoop}><span aria-hidden="true">↻</span><i aria-hidden="true" /><span>{loop}</span></div>
    </figure>
  )
}

export function RoutingDiagram({
  labels,
  from,
  contextLabel,
  node,
  routeLabel,
  systemsLabel,
  systems,
  fallback,
}: {
  labels: DiagramLabels
  from: string
  contextLabel: string
  node: string
  routeLabel: string
  systemsLabel: string
  systems: ReadonlyArray<string>
  fallback?: { label: string; action: string }
}) {
  return (
    <figure className={`${styles.plate} ${styles.darkPlate} ${styles.routingPlate}`} aria-label={`${labels.title}. ${labels.caption ?? ''}`}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <div className={styles.routingBody}>
        <div className={styles.routingSource}>
          <small>01</small>
          <strong>{from}</strong>
        </div>
        <div className={styles.routingConnector}>
          <i aria-hidden="true" />
          <span>{contextLabel}</span>
          <b aria-hidden="true">→</b>
        </div>
        <div className={styles.routingCore}>
          <small>02</small>
          <strong>{node}</strong>
          <span aria-hidden="true" />
        </div>
        <div className={styles.routingConnector}>
          <i aria-hidden="true" />
          <span>{routeLabel}</span>
          <b aria-hidden="true">→</b>
        </div>
        <div className={styles.routingTargets}>
          <small>{systemsLabel}</small>
          <ul>{systems.map((system, index) => <li key={system}><span>{String(index + 1).padStart(2, '0')}</span>{system}</li>)}</ul>
        </div>
      </div>
      {fallback ? (
        <div className={styles.routingFallback}>
          <span>{fallback.label}</span>
          <strong>{fallback.action}</strong>
        </div>
      ) : null}
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </figure>
  )
}

export function SecurityFactsPanel({
  labels,
  rows,
}: {
  labels: DiagramLabels
  rows: ReadonlyArray<{ label: string; value: string }>
}) {
  return (
    <section className={`${styles.plate} ${styles.darkPlate} ${styles.posturePlate}`} aria-label={labels.title}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <ol className={styles.postureRows}>
        {rows.map((row, index) => (
          <li key={row.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{row.label}</strong>
            <p>{row.value}</p>
            <i aria-hidden="true" />
          </li>
        ))}
      </ol>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </section>
  )
}

export function OutcomeLedgerDiagram({
  labels,
  items,
}: {
  labels: DiagramLabels
  items: ReadonlyArray<{ title: string; sub: string }>
}) {
  return (
    <figure className={`${styles.plate} ${styles.darkPlate} ${styles.outcomePlate}`} aria-label={labels.title}>
      <div className={styles.plateHeader}><span>{labels.title}</span><span>{labels.meta}</span></div>
      <ol className={styles.outcomeGrid}>
        {items.map((item, index) => (
          <li key={item.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.sub}</p>
          </li>
        ))}
      </ol>
      {labels.caption ? <figcaption className={styles.plateFooter}><span>{labels.caption}</span>{labels.trailing ? <span>{labels.trailing}</span> : null}</figcaption> : null}
    </figure>
  )
}
