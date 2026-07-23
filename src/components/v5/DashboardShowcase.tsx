'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

/**
 * DashboardShowcase — the operator command-center graphic, ported from the
 * marketing homepage on `main` (the version placecompanion.com ships). A
 * self-contained, animated browser-framed mock (no Supabase, no auth): the
 * hotel switcher, the analytics tab, a guest-questions line chart, a
 * "what guests ask about" bar chart, and the 91% AI-resolution ring. Reveals
 * on scroll via its own IntersectionObserver; bilingual via useLang.
 */
export function DashboardShowcase({ caption }: { caption?: string }) {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      questions: Math.round(18 + Math.sin(i * 0.4) * 12 + i * 1.2 + (d.getDay() === 0 || d.getDay() === 6 ? 15 : 0)),
    }
  })
  const categories = [
    { name: lang === 'es' ? 'Alimentos y bebidas' : 'Food & Beverage', pct: 28 },
    { name: lang === 'es' ? 'Actividades' : 'Local Activities', pct: 22 },
    { name: lang === 'es' ? 'Spa' : 'Spa & Wellness', pct: 18 },
    { name: lang === 'es' ? 'Habitaciones' : 'Room Services', pct: 14 },
    { name: lang === 'es' ? 'Transporte' : 'Transportation', pct: 10 },
    { name: lang === 'es' ? 'Check-in/out' : 'Check-in / Out', pct: 5 },
    { name: lang === 'es' ? 'Otro' : 'Other', pct: 3 },
  ]
  const total = days.reduce((sum, d) => sum + d.questions, 0)

  return (
    <div ref={ref}>
      {/* Browser frame mockup */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
          transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
          borderRadius: '16px',
          border: '1px solid rgba(232,227,220,0.10)',
          overflow: 'hidden',
          background: '#161310',
          boxShadow: '0 40px 80px -50px rgba(0,0,0,0.9)',
        }}
      >
        {/* Browser chrome bar */}
        <div style={{ background: '#161310', borderBottom: '1px solid rgba(232,227,220,0.06)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(232,227,220,0.12)' }} />
          ))}
          <div
            style={{ marginLeft: '8px', flex: 1, maxWidth: '320px', background: 'rgba(232,227,220,0.04)', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', color: '#4A4540', fontFamily: 'var(--font-sans)' }}
          >
            app.hotelcompanion.ai/dashboard
          </div>
        </div>

        {/* Dashboard shell — desktop */}
        <div className="hidden md:flex" style={{ height: '520px' }}>
          {/* Left sidebar */}
          <div
            style={{
              width: '200px',
              flexShrink: 0,
              background: '#0F0D0B',
              borderRight: '1px solid rgba(232,227,220,0.06)',
              padding: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-16px)',
              transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
            }}
          >
            <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A4540', padding: '0 16px', marginBottom: '10px' }}>
              {lang === 'es' ? 'Tus hoteles' : 'Your Hotels'}
            </p>
            {[
              { name: 'MarAzul Riviera Maya', active: true, issues: 2 },
              { name: 'Casa Sol Tulum', active: false, issues: 0 },
              { name: 'Villa del Mar', active: false, issues: 1 },
            ].map((prop, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 16px', background: prop.active ? '#1A1715' : 'transparent', borderLeft: prop.active ? '2px solid #C96A3A' : '2px solid transparent' }}>
                <span
                  className="font-sans"
                  style={{ fontSize: '12px', color: prop.active ? '#FAF9F5' : '#6B6560', fontWeight: prop.active ? 500 : 400, background: prop.active ? '#2C1810' : '#1A1715', border: `1px solid ${prop.active ? '#C96A3A' : 'rgba(232,227,220,0.08)'}`, borderRadius: '999px', padding: '3px 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: prop.issues > 0 ? '120px' : '150px', display: 'inline-block' }}
                >
                  {prop.name}
                </span>
                {prop.issues > 0 && (
                  <span style={{ background: '#C96A3A', color: '#FFFFFF', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '1px 6px', flexShrink: 0 }}>{prop.issues}</span>
                )}
              </div>
            ))}
            <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid rgba(232,227,220,0.06)' }}>
              <span className="font-sans" style={{ fontSize: '12px', color: '#4A4540' }}>+ {lang === 'es' ? 'Agregar hotel' : 'Add hotel'}</span>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#0F0D0B' }}>
            <div style={{ marginBottom: '20px', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
              <p className="font-serif" style={{ fontSize: '22px', color: '#FFFFFF', fontWeight: 400 }}>MarAzul Riviera Maya</p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#A8A099', marginTop: '2px' }}>Riviera Maya, Mexico</p>
            </div>

            <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(232,227,220,0.06)', marginBottom: '24px', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.55s' }}>
              {[
                'Analytics',
                lang === 'es' ? 'Incidencias 🔴' : 'Issues 🔴',
                lang === 'es' ? 'Despliegue' : 'Deploy',
                lang === 'es' ? 'Ajustes' : 'Settings',
              ].map((tab, i) => (
                <div key={i} className="font-sans" style={{ fontSize: '13px', color: i === 0 ? '#FAF9F5' : '#6B6560', padding: '8px 16px', borderBottom: i === 0 ? '2px solid #C96A3A' : '2px solid transparent', marginBottom: '-1px' }}>
                  {tab}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              {/* Line chart */}
              <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '18px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <p className="font-sans" style={{ fontSize: '11px', color: '#A8A099', marginBottom: '3px' }}>
                      {lang === 'es' ? 'Preguntas este mes' : 'Guest questions this month'}
                    </p>
                    <p className="font-serif" style={{ fontSize: '26px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1 }}>{visible ? total.toLocaleString() : '0'}</p>
                  </div>
                  <span className="font-sans" style={{ fontSize: '10px', color: '#2D9E6B', background: '#242019', padding: '2px 8px', borderRadius: '999px' }}>
                    {lang === 'es' ? 'Últimos 30 días' : 'Last 30 days'}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={days} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                    <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis tick={{ fontSize: 9, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', fontSize: '11px', color: '#FAF9F5', fontFamily: 'var(--font-sans)' }} labelStyle={{ color: '#A8A099' }} cursor={{ stroke: 'rgba(232,227,220,0.06)' }} />
                    <Line type="monotone" dataKey="questions" stroke="#C96A3A" strokeWidth={visible ? 2 : 0} dot={false} activeDot={{ r: 3, fill: '#C96A3A', stroke: '#0F0D0B', strokeWidth: 2 }} style={{ transition: 'stroke-width 1s ease 0.8s' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Bar chart */}
              <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '18px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s' }}>
                <p className="font-sans" style={{ fontSize: '11px', color: '#A8A099', marginBottom: '14px' }}>
                  {lang === 'es' ? 'Lo que preguntan los huéspedes' : 'What guests are asking about'}
                </p>
                <ResponsiveContainer width="100%" height={130}>
                  <BarChart data={categories} layout="vertical" margin={{ top: 0, right: 28, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6B6560', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} width={90} />
                    <Tooltip contentStyle={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', fontSize: '11px', color: '#FAF9F5', fontFamily: 'var(--font-sans)' }} formatter={(value) => [`${value}%`, lang === 'es' ? 'Participación' : 'Share'] as [string, string]} cursor={{ fill: 'rgba(232,227,220,0.02)' }} />
                    <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                      {categories.map((_, index) => (
                        <Cell key={index} fill={index === 0 ? '#C96A3A' : `rgba(201,106,58,${0.6 - index * 0.07})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Resolution ring */}
            <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '18px', display: 'flex', alignItems: 'center', gap: '24px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease 0.85s, transform 0.7s ease 0.85s' }}>
              <div style={{ flexShrink: 0, width: '80px', height: '80px' }}>
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(232,227,220,0.06)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#2D9E6B" strokeWidth="8" strokeLinecap="round" transform="rotate(-90 40 40)" style={{ strokeDasharray: visible ? `${2 * Math.PI * 32 * 0.91} ${2 * Math.PI * 32 * 0.09}` : `0 ${2 * Math.PI * 32}`, strokeDashoffset: 2 * Math.PI * 32 * 0.25, transition: 'stroke-dasharray 1.2s ease 1s' }} />
                  <text x="40" y="36" textAnchor="middle" style={{ fontSize: '14px', fontWeight: 600, fill: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>91%</text>
                  <text x="40" y="50" textAnchor="middle" style={{ fontSize: '8px', fill: '#6B6560', fontFamily: 'var(--font-sans)' }}>resolved</text>
                </svg>
              </div>
              <div>
                <p className="font-sans" style={{ fontSize: '11px', color: '#A8A099', marginBottom: '4px' }}>
                  {lang === 'es' ? 'Tasa de resolución por IA' : 'AI resolution rate'}
                </p>
                <p className="font-serif" style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1, marginBottom: '4px' }}>
                  {lang === 'es' ? '91% resuelto por IA' : '91% resolved by AI'}
                </p>
                <p className="font-sans" style={{ fontSize: '12px', color: '#6B6560', lineHeight: 1.5 }}>
                  {lang === 'es' ? '9% escalado a tu equipo — solo lo que realmente necesita un humano.' : '9% escalated to your team — only what genuinely needs a human.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard shell — mobile */}
        <div className="md:hidden" style={{ background: '#0F0D0B', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { name: 'MarAzul', active: true, issues: 2 },
              { name: 'Casa Sol', active: false, issues: 0 },
              { name: 'Villa del Mar', active: false, issues: 1 },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span className="font-sans" style={{ fontSize: '11px', color: p.active ? '#FAF9F5' : '#6B6560', background: p.active ? '#2C1810' : '#1A1715', border: `1px solid ${p.active ? '#C96A3A' : 'rgba(232,227,220,0.08)'}`, borderRadius: '999px', padding: '4px 10px', whiteSpace: 'nowrap' }}>
                  {p.name}
                </span>
                {p.issues > 0 && (
                  <span style={{ background: '#C96A3A', color: '#FFFFFF', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '1px 5px' }}>{p.issues}</span>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '10px', padding: '14px' }}>
              <p className="font-sans" style={{ fontSize: '10px', color: '#A8A099', marginBottom: '4px' }}>{lang === 'es' ? 'Preguntas este mes' : 'Questions this month'}</p>
              <p className="font-serif" style={{ fontSize: '22px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1 }}>{total.toLocaleString()}</p>
            </div>
            <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '10px', padding: '14px' }}>
              <p className="font-sans" style={{ fontSize: '10px', color: '#A8A099', marginBottom: '4px' }}>{lang === 'es' ? 'Resuelto por IA' : 'Resolved by AI'}</p>
              <p className="font-serif" style={{ fontSize: '22px', color: '#2D9E6B', fontWeight: 600, lineHeight: 1 }}>91%</p>
            </div>
          </div>
          <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '10px', padding: '14px' }}>
            <p className="font-sans" style={{ fontSize: '10px', color: '#A8A099', marginBottom: '10px' }}>{lang === 'es' ? 'Actividad de huéspedes — 30 días' : 'Guest activity — 30 days'}</p>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={days} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} interval={9} />
                <YAxis tick={{ fontSize: 8, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} />
                <Line type="monotone" dataKey="questions" stroke="#C96A3A" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {caption && (
        <p className="font-sans mt-6 text-center" style={{ fontSize: '13px', color: 'var(--text-faint)', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 1s' }}>
          {caption}
        </p>
      )}
    </div>
  )
}
