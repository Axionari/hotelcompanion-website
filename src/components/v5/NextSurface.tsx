'use client'

import { CSSProperties } from 'react'
import { Reveal } from '@/components/cds/Reveal'
import { VoiceOrb } from '@/components/cds/VoiceOrb'

/**
 * On the horizon — the AR surface. As spatial computing arrives, the Companion
 * becomes a room you look around in: real dishes float in the air, the one you
 * gaze at sharpens while the rest fall back, it’s voice-first, and it still
 * remembers you ("you liked it in March"). Adapted from the spatial-menu
 * reference into our own system — Fraunces / Spline / General Sans, terracotta
 * actions, brass accents, warm dark bed, and the approved VoiceOrb.
 */

const MONO: CSSProperties = { fontFamily: 'var(--font-mono), ui-monospace, monospace' }
const SANS: CSSProperties = { fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }
const SERIF = "var(--font-serif), Georgia, serif"
const TERRA = '#C86A3A'
const GOLD = '#C9A15A'
const CREAM = '#F2E9DC'

/** Warm light bloom that sits over a photo to keep the floating-in-air feel. */
const BLOOM: CSSProperties = { position: 'absolute', inset: 0, background: 'radial-gradient(62% 56% at 54% 34%, rgba(255,206,146,0.22) 0%, transparent 66%)', mixBlendMode: 'screen', pointerEvents: 'none' }

/** A dimmed side dish — a real photo, present but out of gaze-focus. */
function SideDish({ side, title, price, meta, image }: { side: 'left' | 'right'; title: string; price: string; meta: string; image: string }) {
  return (
    <div
      className="absolute hidden md:block"
      style={{
        [side]: '6%',
        top: '33%',
        width: 'clamp(150px, 17%, 262px)',
        opacity: 0.66,
        filter: 'blur(1.3px)',
        transform: 'scale(0.96)',
      } as CSSProperties}
    >
      <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(200,140,80,0.18)', aspectRatio: '4 / 3', boxShadow: '0 24px 60px -24px rgba(0,0,0,0.7)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={title} src={image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={BLOOM} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,8,5,0.15) 0%, transparent 34%, rgba(12,8,5,0.92) 100%)' }} />
        <div style={{ position: 'absolute', left: '8%', right: '8%', bottom: '9%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: SERIF, fontSize: 'clamp(15px,1.5vw,22px)', color: CREAM, whiteSpace: 'nowrap' }}>{title}</div>
            <div style={{ ...MONO, fontSize: 'clamp(8px,0.85vw,10.5px)', letterSpacing: '.04em', color: 'rgba(242,233,220,0.62)', marginTop: 4 }}>{meta}</div>
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 'clamp(14px,1.4vw,20px)', color: GOLD }}>{price}</div>
        </div>
      </div>
    </div>
  )
}

function HudDot({ x, y, s = 4 }: { x: string; y: string; s?: number }) {
  return <span aria-hidden style={{ position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: 'rgba(240,190,130,0.8)', boxShadow: '0 0 10px rgba(240,190,130,0.8)' }} />
}

export function NextSurface() {
  return (
    <section id="next-surface" className="scroll-mt-20" style={{ paddingBlock: 'clamp(104px, 14vw, 190px)' }}>
      <div className="container-rc">
        {/* header */}
        <Reveal>
        <div className="mb-10 md:mb-14" style={{ maxWidth: '46rem' }}>
          <div className="eyebrow eyebrow-accent mb-6">ON THE HORIZON · SPATIAL</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 530, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)', maxWidth: '18ch' }}>
            The surface after the screen. <em style={{ fontStyle: 'italic', fontWeight: 480, color: CREAM }}>Already fluent.</em>
          </h2>
          <p style={{ ...SANS, marginTop: 20, fontSize: 'clamp(15px, 1.5vw, 18px)', color: 'var(--text-dim, rgba(242,233,220,.6))', maxWidth: '54ch', lineHeight: 1.6 }}>
            When the glasses arrive, the menu is simply in the room — you gaze at a dish and it comes forward, you say &ldquo;I’ll have it,&rdquo; and it’s on the suite. Nothing to sign. It still remembers what you liked.
          </p>
        </div>
        </Reveal>

        {/* AR viewport — spatial "gaze to expand" menu; portrait on mobile with
            the focused dish as the hero and spatial peeks at the edges so it
            still reads as a room, full spatial composition at md+ */}
        <Reveal delay={120}>
        <div className="relative w-full overflow-hidden aspect-[3/4] sm:aspect-[3/2] md:aspect-[16/9]" style={{ borderRadius: 24, border: '1px solid rgba(200,106,58,.16)', background: 'radial-gradient(80% 70% at 50% 58%, rgba(112,66,34,0.95) 0%, rgba(44,25,13,0.96) 46%, #0b0705 100%)' }}>
          {/* ambient spatial dust */}
          <HudDot x="24%" y="30%" s={5} />
          <HudDot x="74%" y="24%" s={4} />
          <HudDot x="30%" y="78%" />
          <HudDot x="82%" y="70%" />

          {/* HUD */}
          <div className="hidden md:block" style={{ position: 'absolute', top: '6%', left: '4%', ...MONO, fontSize: 'clamp(8px,0.95vw,11px)', letterSpacing: '.24em', color: 'rgba(242,233,220,0.42)' }}>GAZE TO EXPAND</div>
          <div style={{ position: 'absolute', top: '5.5%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(200,140,80,0.3)', borderRadius: 999, padding: 'clamp(7px,0.9vw,11px) clamp(12px,1.6vw,20px)', background: 'rgba(20,13,9,0.5)', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, boxShadow: '0 0 10px rgba(201,161,90,0.9)' }} />
            <span style={{ ...MONO, fontSize: 'clamp(8px,1vw,12px)', letterSpacing: '.22em', color: GOLD }}>CASA MARIPOSA · MENU</span>
            <span style={{ ...MONO, fontSize: 'clamp(8px,1vw,12px)', letterSpacing: '.18em', color: 'rgba(242,233,220,0.5)' }}>TABLE 6</span>
          </div>
          <div className="hidden md:block" style={{ position: 'absolute', top: '6%', right: '4%', ...MONO, fontSize: 'clamp(8px,0.95vw,11px)', letterSpacing: '.24em', color: 'rgba(242,233,220,0.42)' }}>LISTENING</div>

          {/* side dishes — out of focus */}
          <SideDish side="left" title="Ceviche verde" price="$18" meta="bright · citrus · today’s catch" image="/assets/ui/dish-1.webp" />
          <SideDish side="right" title="Tres leches" price="$12" meta="the house classic · save room" image="/assets/ui/dish-3.webp" />

          {/* mobile spatial peeks — the menu continues beyond the frame, tilted
              in perspective so the small screen still reads as a room in AR */}
          <div className="md:hidden absolute" aria-hidden style={{ left: '-14%', top: '26%', width: '40%', opacity: 0.5, filter: 'blur(1.8px)', transform: 'perspective(560px) rotateY(24deg)' }}>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(200,140,80,0.18)', aspectRatio: '4 / 5' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src="/assets/ui/dish-1.webp" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,8,5,0.2) 0%, rgba(12,8,5,0.75) 100%)' }} />
            </div>
          </div>
          <div className="md:hidden absolute" aria-hidden style={{ right: '-14%', top: '40%', width: '40%', opacity: 0.5, filter: 'blur(1.8px)', transform: 'perspective(560px) rotateY(-24deg)' }}>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(200,140,80,0.18)', aspectRatio: '4 / 5' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src="/assets/ui/dish-3.webp" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,8,5,0.2) 0%, rgba(12,8,5,0.75) 100%)' }} />
            </div>
          </div>

          {/* focused dish — the one being gazed at (the mobile hero) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[13%] md:top-[13%] w-[82%] sm:w-[58%] md:w-[34%] md:max-w-[390px]">
            <div style={{ borderRadius: 24, padding: 'clamp(6px,0.7vw,9px)', border: '1px solid rgba(200,140,80,0.24)', boxShadow: '0 0 40px -8px rgba(200,120,60,0.35), 0 40px 90px -30px rgba(0,0,0,0.75)' }}>
              <div style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(20,13,9,0.55)', border: '1px solid rgba(200,140,80,0.28)' }}>
                {/* the dish — real photo, floating */}
                <div style={{ position: 'relative', aspectRatio: '16 / 10' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Pescado a la talla" src="/assets/ui/dish-2.webp" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={BLOOM} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,8,5,0.1) 0%, transparent 45%, rgba(12,8,5,0.6) 100%)' }} />
                  <span style={{ position: 'absolute', top: '7%', right: '7%', ...MONO, fontSize: 'clamp(7.5px,0.8vw,10px)', letterSpacing: '.14em', color: TERRA, border: '1px solid rgba(200,106,58,0.5)', background: 'rgba(11,9,8,0.55)', backdropFilter: 'blur(4px)', borderRadius: 999, padding: '4px 10px' }}>CHEF’S CATCH</span>
                </div>
                {/* detail */}
                <div style={{ background: 'rgba(12,8,5,0.78)', padding: 'clamp(13px,1.3vw,20px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                    <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(16px,1.6vw,24px)', color: CREAM, whiteSpace: 'nowrap' }}>Pescado a la talla</div>
                    <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 'clamp(15px,1.5vw,22px)', color: GOLD }}>$32</div>
                  </div>
                  <p style={{ ...SANS, fontSize: 'clamp(11px,1.05vw,14px)', lineHeight: 1.45, color: 'rgba(242,233,220,0.78)', marginTop: 9 }}>Caught this morning off Punta Allen — grilled whole over mesquite.</p>
                  <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
                    <span style={{ ...SANS, fontWeight: 600, fontSize: 'clamp(11px,1.15vw,15px)', color: '#fff', background: TERRA, borderRadius: 999, padding: 'clamp(8px,0.9vw,12px) clamp(14px,1.6vw,22px)', whiteSpace: 'nowrap' }}>&ldquo;I’ll have it&rdquo;</span>
                    <span style={{ ...SANS, fontWeight: 500, fontSize: 'clamp(11px,1.15vw,15px)', color: CREAM, border: '1px solid rgba(242,233,220,0.32)', borderRadius: 999, padding: 'clamp(8px,0.9vw,12px) clamp(14px,1.6vw,22px)', whiteSpace: 'nowrap' }}>Pair a wine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* companion whispers — the memory/upsell */}
          <div className="absolute hidden md:block" style={{ left: '4%', bottom: '13%', width: 'clamp(200px, 23%, 320px)', border: '1px solid rgba(200,140,80,0.18)', background: 'rgba(16,11,7,0.55)', backdropFilter: 'blur(8px)', borderRadius: 14, padding: 'clamp(12px,1.3vw,18px)' }}>
            <div style={{ ...MONO, fontSize: 'clamp(7.5px,0.85vw,10px)', letterSpacing: '.2em', color: GOLD, marginBottom: 7 }}>COMPANION WHISPERS</div>
            <div style={{ ...SANS, fontSize: 'clamp(12px,1.2vw,15px)', lineHeight: 1.45, color: 'rgba(242,233,220,0.86)' }}>The albariño by the glass was made for that fish — and you liked it in March.</div>
          </div>

          {/* on the suite */}
          <div className="absolute hidden md:flex" style={{ right: '4%', bottom: '22%', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 'clamp(20px,3vw,40px)', height: 1, background: 'rgba(200,140,80,0.5)' }} />
            <span style={{ ...MONO, fontSize: 'clamp(8px,0.95vw,11px)', letterSpacing: '.18em', color: 'rgba(242,233,220,0.5)' }}>ON THE SUITE · NOTHING TO SIGN</span>
          </div>

          {/* orb + voice suggestions */}
          <div className="absolute" style={{ left: '50%', bottom: '5%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px,1vw,14px)' }}>
            <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
              <div aria-hidden style={{ position: 'absolute', width: 'clamp(56px,7vw,98px)', height: 'clamp(56px,7vw,98px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,180,110,0.5) 0%, rgba(200,120,60,0.2) 45%, transparent 70%)' }} />
              <div style={{ position: 'relative' }}><VoiceOrb size="clamp(40px,5vw,64px)" state="speaking" showMic={false} /></div>
            </div>
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 'clamp(10px,1.4vw,20px)' }}>
              <span style={{ ...MONO, fontSize: 'clamp(8px,0.95vw,11px)', letterSpacing: '.14em', color: 'rgba(242,233,220,0.5)' }}>&ldquo;WHAT’S LIGHT?&rdquo;</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(242,233,220,0.4)' }} />
              <span style={{ ...MONO, fontSize: 'clamp(8px,0.95vw,11px)', letterSpacing: '.14em', color: 'rgba(242,233,220,0.5)' }}>&ldquo;ORDER FOR TWO&rdquo;</span>
            </div>
            {/* mobile HUD line — names the AR interaction where the chips are hidden */}
            <div className="md:hidden" style={{ ...MONO, fontSize: 9.5, letterSpacing: '.22em', color: 'rgba(242,233,220,0.45)', whiteSpace: 'nowrap' }}>GAZE TO EXPAND · LISTENING</div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
