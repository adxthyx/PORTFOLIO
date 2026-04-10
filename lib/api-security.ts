import type { NextRequest } from "next/server"

type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitOptions = {
  key: string
  limit: number
  windowMs: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key)
    }
  }
}

export function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip") || "unknown"
}

export function applyRateLimit(request: NextRequest, options: RateLimitOptions) {
  const now = Date.now()
  cleanupExpiredEntries(now)

  const ip = getClientIp(request)
  const storeKey = `${options.key}:${ip}`
  const existing = rateLimitStore.get(storeKey)

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt: now + options.windowMs,
    })

    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: now + options.windowMs,
    }
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    }
  }

  existing.count += 1
  rateLimitStore.set(storeKey, existing)

  return {
    allowed: true,
    remaining: options.limit - existing.count,
    resetAt: existing.resetAt,
  }
}

export function sanitizeText(value: string) {
  return value.trim().replace(/\s+/g, " ")
}
