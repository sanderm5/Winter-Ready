function optionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

export const env = {
  NODE_ENV: optionalEnv("NODE_ENV", "development"),
  ERROR_WEBHOOK_URL: process.env.ERROR_WEBHOOK_URL || "",
} as const;
