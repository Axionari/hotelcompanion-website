'use client'

import { useState } from 'react'
import { useCopy } from '@/lib/i18n/useCopy'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputStyle = {
  background: 'var(--surface-3)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  minHeight: '48px',
  color: 'var(--text)',
  padding: '0 16px',
  fontSize: '15px',
  width: '100%',
} as const

/**
 * Book-a-Demo form (#demo-form): client + server validation, inline errors,
 * real success/failure states, posts to /api/demo-request (Resend).
 */
export function DemoForm() {
  const copy = useCopy(demoFormCopy)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [values, setValues] = useState<Record<string, string>>({})

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => {
      if (!e[name]) return e
      const next = { ...e }
      delete next[name]
      return next
    })
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    for (const key of ['name', 'hotel', 'role', 'email', 'country', 'propertyType', 'properties', 'interest']) {
      if (!values[key]?.trim()) next[key] = copy.errors.required
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = copy.errors.email
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-8 md:p-10 text-center max-w-xl mx-auto"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        role="status"
      >
        <p className="font-serif heading-card mb-3" style={{ color: 'var(--text)' }}>
          {copy.success.title}
        </p>
        <p className="font-sans text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {copy.success.body}
        </p>
      </div>
    )
  }

  const field = (
    name: string,
    label: string,
    props: { type?: string; optional?: boolean; textarea?: boolean; options?: ReadonlyArray<string> } = {}
  ) => (
    <div className={props.textarea ? 'md:col-span-2' : ''}>
      <label className="font-sans block text-sm mb-2" style={{ color: 'var(--text-secondary)' }} htmlFor={`demo-${name}`}>
        {label}
      </label>
      {props.options ? (
        <select
          id={`demo-${name}`}
          value={values[name] ?? ''}
          onChange={(e) => set(name, e.target.value)}
          style={{ ...inputStyle, appearance: 'auto' }}
          aria-invalid={!!errors[name]}
        >
          <option value="">{copy.select}</option>
          {props.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : props.textarea ? (
        <textarea
          id={`demo-${name}`}
          value={values[name] ?? ''}
          onChange={(e) => set(name, e.target.value)}
          rows={4}
          style={{ ...inputStyle, padding: '12px 16px' }}
          aria-invalid={!!errors[name]}
        />
      ) : (
        <input
          id={`demo-${name}`}
          type={props.type ?? 'text'}
          value={values[name] ?? ''}
          onChange={(e) => set(name, e.target.value)}
          style={inputStyle}
          aria-invalid={!!errors[name]}
        />
      )}
      {errors[name] && (
        <p className="font-sans text-sm mt-1.5" style={{ color: '#E0705A' }} role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl mx-auto text-left">
      <div className="grid md:grid-cols-2 gap-5">
        {field('name', copy.fields.name)}
        {field('hotel', copy.fields.hotel)}
        {field('role', copy.fields.role)}
        {field('email', copy.fields.email, { type: 'email' })}
        {field('phone', copy.fields.phone, { type: 'tel', optional: true })}
        {field('country', copy.fields.country)}
        {field('propertyType', copy.fields.propertyType, { options: copy.propertyTypes })}
        {field('properties', copy.fields.properties)}
        {field('interest', copy.fields.interest, { options: copy.interests })}
        {field('message', copy.fields.message, { textarea: true })}
      </div>
      {status === 'error' && (
        <p className="font-sans text-sm mt-5" style={{ color: '#E0705A' }} role="alert">
          {copy.errors.submit}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="font-sans mt-8 w-full md:w-auto text-white transition-colors hover:bg-[#D4784A] disabled:opacity-60"
        style={{
          background: 'var(--accent)',
          borderRadius: '8px',
          height: '52px',
          padding: '0 32px',
          fontSize: '15px',
          fontWeight: 600,
        }}
      >
        {status === 'submitting' ? copy.submitting : copy.submit}
      </button>
    </form>
  )
}
