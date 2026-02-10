export function logError(context: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[WinterReady] ${context}: ${message}`);

  if (process.env.NODE_ENV === "production" && process.env.ERROR_WEBHOOK_URL) {
    fetch(process.env.ERROR_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context,
        message,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {}); // Fire and forget
  }
}
