'use client'

import { useRef, useState } from 'react'
import { LocalizedLink as Link } from '@/components/LocalizedLink'
import { useCopy } from '@/lib/i18n/useCopy'
import { demoFormCopy } from '@/lib/i18n/marketing/demoForm'
import { CalendlyInline } from './CalendlyInline'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Field = 'name' | 'email' | 'hotel' | 'goal'
const REQUIRED_FIELDS: Field[] = ['name', 'email', 'hotel']

/** Client and server validate the same inquiry fields; only an accepted
 * response produces confirmation. Calendar booking remains a separate step. */
export function DemoForm() {
  const copy = useCopy(demoFormCopy)
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', hotel: '', goal: '' })

  function set(name: Field, value: string) {
    setValues(current => ({ ...current, [name]: value }))
    setErrors(current => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (status === 'submitting') return
    const next: Partial<Record<Field, string>> = {}
    for (const name of REQUIRED_FIELDS) {
      if (!values[name].trim()) next[name] = copy.errors.required
    }
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = copy.errors.email
    }
    setErrors(next)
    const firstError = REQUIRED_FIELDS.find(name => next[name])
    if (firstError) {
      form.current?.querySelector<HTMLInputElement>(`#demo-${firstError}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="hc-demo-success" role="status">
        <h2>{copy.success.title}</h2>
        <p>{copy.success.body}</p>
        <p>{copy.success.bookLead}</p>
        <CalendlyInline
          prefill={{ name: values.name, email: values.email, company: values.hotel, title: '' }}
          fallbackLabel={copy.success.bookFallback}
          blockedLabel={copy.success.bookBlocked}
        />
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="hc-demo-form" aria-busy={status === 'submitting'}>
      {REQUIRED_FIELDS.map(name => (
        <div className="hc-demo-field" key={name}>
          <label htmlFor={`demo-${name}`}>{copy.fields[name]}</label>
          <input
            id={`demo-${name}`}
            name={name}
            type={name === 'email' ? 'email' : 'text'}
            autoComplete={name === 'hotel' ? 'organization' : name}
            value={values[name]}
            onChange={event => set(name, event.target.value)}
            required
            maxLength={2000}
            aria-invalid={Boolean(errors[name])}
            aria-describedby={errors[name] ? `demo-${name}-error` : undefined}
          />
          {errors[name] && <p id={`demo-${name}-error`} className="hc-demo-error" role="alert">{errors[name]}</p>}
        </div>
      ))}
      <div className="hc-demo-field">
        <label htmlFor="demo-goal">{copy.fields.goal}</label>
        <textarea id="demo-goal" name="goal" value={values.goal} onChange={event => set('goal', event.target.value)} rows={3} maxLength={2000} />
      </div>
      {status === 'error' && <p className="hc-demo-error" role="alert">{copy.errors.submit}</p>}
      <button type="submit" disabled={status === 'submitting'} className="hc-site-demo">
        {status === 'submitting' ? copy.submitting : copy.submit}
      </button>
      <p className="hc-demo-privacy">{copy.privacy} <Link href="/privacy">{copy.privacyLink}</Link>.</p>
    </form>
  )
}
