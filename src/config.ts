import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Config } from "./types.js";

let cachedConfig: Config | null = null;

export function loadConfig(path = "config.json"): Config {
  if (cachedConfig) return cachedConfig;
  const resolved = resolve(process.cwd(), path);
  const raw = readFileSync(resolved, "utf8");
  const parsed = JSON.parse(raw) as Config;
  cachedConfig = parsed;
  return parsed;
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function loadEnvFile(path = ".env"): void {
  try {
    const raw = readFileSync(resolve(process.cwd(), path), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env is optional; missing is fine if env vars are set externally
  }
}
