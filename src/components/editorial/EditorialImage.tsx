import Image from 'next/image'

export interface EditorialVisual {
  src: string
  alt: string
  eyebrow?: string
  caption?: string
  position?: string
  sizes?: string
  overlay?: 'soft' | 'balanced' | 'deep'
}

export function EditorialImageBreak({
  visual,
  className = '',
}: {
  visual: EditorialVisual
  className?: string
}) {
  return (
    <figure className={`ed-image-break overlay-${visual.overlay ?? 'balanced'} ${className}`.trim()}>
      <div className="ed-image-break-media">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="100vw"
          quality={75}
          style={{ objectFit: 'cover', objectPosition: visual.position ?? 'center' }}
        />
      </div>
      {(visual.eyebrow || visual.caption) && (
        <figcaption className="ed-wrap">
          {visual.eyebrow && <span>{visual.eyebrow}</span>}
          {visual.caption && <p>{visual.caption}</p>}
        </figcaption>
      )}
    </figure>
  )
}

export function EditorialCloseMedia({ visual }: { visual: EditorialVisual }) {
  return (
    <div className={`ed-close-media overlay-${visual.overlay ?? 'balanced'}`}>
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes={visual.sizes ?? '100vw'}
        quality={75}
        style={{ objectFit: 'cover', objectPosition: visual.position ?? 'center' }}
      />
      {visual.eyebrow && <span className="ed-close-media-label">{visual.eyebrow}</span>}
    </div>
  )
}

export function EditorialArticlePlate({ visual }: { visual: EditorialVisual }) {
  return (
    <figure className="ed-article-plate">
      <div className="ed-article-plate-media">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 1160px) 100vw, 1120px"
          quality={75}
          style={{ objectFit: 'cover', objectPosition: visual.position ?? 'center' }}
        />
      </div>
      {(visual.eyebrow || visual.caption) && (
        <figcaption>
          {visual.eyebrow && <span>{visual.eyebrow}</span>}
          {visual.caption && <p>{visual.caption}</p>}
        </figcaption>
      )}
    </figure>
  )
}
