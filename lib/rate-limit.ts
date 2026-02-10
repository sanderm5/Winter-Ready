const tokenBuckets = new Map<string, { tokens: number; lastRefill: number }>();

export function rateLimit(
  key: string,
  limit: number = 30,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = tokenBuckets.get(key) || { tokens: limit, lastRefill: now };

  const elapsed = now - bucket.lastRefill;
  const refillRate = limit / windowMs;
  bucket.tokens = Math.min(limit, bucket.tokens + elapsed * refillRate);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    tokenBuckets.set(key, bucket);
    return { allowed: true, remaining: Math.floor(bucket.tokens) };
  }

  tokenBuckets.set(key, bucket);
  return { allowed: false, remaining: 0 };
}
