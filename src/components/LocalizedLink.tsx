'use client'

import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { useLang } from '@/lib/i18n/LanguageContext'
import { localizeHref } from '@/lib/i18n/paths'

type Props = ComponentProps<typeof NextLink>

/** Next Link with the active public language encoded in the URL. */
export function LocalizedLink({ href, ...props }: Props) {
  const { lang } = useLang()
  const localized = typeof href === 'string' ? localizeHref(href, lang) : href
  return <NextLink href={localized} {...props} />
}
