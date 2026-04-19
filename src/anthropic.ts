import Anthropic from "@anthropic-ai/sdk";
import { requireEnv } from "./config.js";

let cachedClient: Anthropic | null = null;

export function getClient(): Anthropic {
  if (cachedClient) return cachedClient;
  const apiKey = requireEnv("ANTHROPIC_API_KEY");
  cachedClient = new Anthropic({ apiKey });
  return cachedClient;
}

export interface CompleteOptions {
  model: string;
  system: string;
  user: string;
  max_tokens?: number;
  temperature?: number;
}

function isRetryable(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { status?: number; name?: string; code?: string };
  if (typeof e.status === "number") {
    if (e.status === 429) return true;
    if (e.status >= 500 && e.status < 600) return true;
  }
  if (e.name === "APIConnectionError" || e.name === "APIConnectionTimeoutError") {
    return true;
  }
  if (e.code === "ECONNRESET" || e.code === "ETIMEDOUT" || e.code === "ENOTFOUND") {
    return true;
  }
  return false;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function complete(opts: CompleteOptions): Promise<string> {
  const client = getClient();
  const maxTokens = opts.max_tokens ?? 8192;
  const temperature = opts.temperature ?? 0;
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await client.messages.create({
        model: opts.model,
        max_tokens: maxTokens,
        temperature,
        system: opts.system,
        messages: [{ role: "user", content: opts.user }],
      });
      const text = response.content
        .filter((block) => block.type === "text")
        .map((block) => (block as { type: "text"; text: string }).text)
        .join("");
      return text;
    } catch (err) {
      lastErr = err;
      if (!isRetryable(err) || attempt === 2) break;
      const backoff = 1000 * Math.pow(2, attempt);
      console.warn(
        `Anthropic call failed (attempt ${attempt + 1}/3), retrying in ${backoff}ms: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      await sleep(backoff);
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error(`Anthropic call failed: ${String(lastErr)}`);
}

export function extractJsonArray(raw: string): unknown[] {
  const trimmed = raw.trim();
  // Strip code fences if present
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced ? fenced[1]!.trim() : trimmed;
  // Find the first [ and last ] to tolerate preamble/epilogue
  const start = body.indexOf("[");
  const end = body.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Model did not return a JSON array. Got: ${raw.slice(0, 400)}`);
  }
  const slice = body.slice(start, end + 1);
  const parsed = JSON.parse(slice);
  if (!Array.isArray(parsed)) {
    throw new Error("Parsed JSON is not an array");
  }
  return parsed;
}

export function extractJsonObject(raw: string): Record<string, unknown> {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced ? fenced[1]!.trim() : trimmed;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Model did not return a JSON object. Got: ${raw.slice(0, 400)}`);
  }
  const slice = body.slice(start, end + 1);
  const parsed = JSON.parse(slice);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Parsed JSON is not an object");
  }
  return parsed as Record<string, unknown>;
}
