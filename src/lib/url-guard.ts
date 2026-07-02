import { lookup } from 'node:dns/promises'

const BLOCKED_HOSTNAME = /^(localhost|.+\.local|.+\.internal)$/i

export function ipIsPrivate(ip: string): boolean {
  const v4 = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
  if (v4) {
    const a = Number(v4[1])
    const b = Number(v4[2])
    return (
      a === 0 || a === 10 || a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 169 && b === 254)
    )
  }
  const v6 = ip.toLowerCase().replace(/^\[|\]$/g, '')
  return (
    v6 === '::' || v6 === '::1' ||
    v6.startsWith('fc') || v6.startsWith('fd') ||
    v6.startsWith('fe8') || v6.startsWith('fe9') ||
    v6.startsWith('fea') || v6.startsWith('feb') ||
    v6.startsWith('::ffff:')
  )
}

export function parsePublicHttpUrl(raw: string): URL | null {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
  const hostname = url.hostname
  if (BLOCKED_HOSTNAME.test(hostname)) return null
  if (hostname.includes(':') || /^[\d.]+$/.test(hostname)) {
    if (ipIsPrivate(hostname)) return null
  }
  return url
}

// Resolves the hostname and rejects URLs whose DNS points at private address
// space. TOCTOU rebinding is still theoretically possible; acceptable residual
// risk for a rate-limited endpoint.
export async function assertResolvesPublic(url: URL): Promise<boolean> {
  if (/^[\d.]+$/.test(url.hostname) || url.hostname.includes(':')) {
    return !ipIsPrivate(url.hostname)
  }
  try {
    const addrs = await lookup(url.hostname, { all: true })
    return addrs.length > 0 && addrs.every((a) => !ipIsPrivate(a.address))
  } catch {
    return false
  }
}
