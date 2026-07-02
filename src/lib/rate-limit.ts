type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

// In-memory fixed window. Per serverless instance, so the effective global
// limit is (limit × warm instances) — coarse abuse protection, not billing.
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) {
      if (now >= b.resetAt) buckets.delete(k)
    }
  }
  const bucket = buckets.get(key)
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  bucket.count += 1
  return bucket.count <= limit
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export function rateLimitResponse(): Response {
  return Response.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
}
