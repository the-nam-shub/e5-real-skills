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

export interface PerModelUsage {
  input_tokens: number;
  output_tokens: number;
  call_count: number;
}

const usageByModel = new Map<string, PerModelUsage>();

function recordUsage(
  model: string,
  input: number,
  output: number
): void {
  const prev = usageByModel.get(model) ?? {
    input_tokens: 0,
    output_tokens: 0,
    call_count: 0,
  };
  usageByModel.set(model, {
    input_tokens: prev.input_tokens + input,
    output_tokens: prev.output_tokens + output,
    call_count: prev.call_count + 1,
  });
}

export function getUsage(): Record<string, PerModelUsage> {
  const out: Record<string, PerModelUsage> = {};
  for (const [model, usage] of usageByModel.entries()) out[model] = { ...usage };
  return out;
}

export function resetUsage(): void {
  usageByModel.clear();
}

// Published Anthropic list prices per million tokens (USD).
// Used for ballpark cost reporting only — Anthropic is source of truth.
const PRICE_PER_M_TOKENS: Record<string, { input: number; output: number }> = {
  "claude-haiku-4-5-20251001": { input: 1, output: 5 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
};

export function estimateCost(usage: Record<string, PerModelUsage>): {
  per_model: Record<string, { input_usd: number; output_usd: number; total_usd: number }>;
  total_usd: number;
} {
  const per_model: Record<string, { input_usd: number; output_usd: number; total_usd: number }> = {};
  let total = 0;
  for (const [model, u] of Object.entries(usage)) {
    const price = PRICE_PER_M_TOKENS[model];
    if (!price) {
      per_model[model] = { input_usd: 0, output_usd: 0, total_usd: 0 };
      continue;
    }
    const inUsd = (u.input_tokens / 1_000_000) * price.input;
    const outUsd = (u.output_tokens / 1_000_000) * price.output;
    per_model[model] = {
      input_usd: inUsd,
      output_usd: outUsd,
      total_usd: inUsd + outUsd,
    };
    total += inUsd + outUsd;
  }
  return { per_model, total_usd: total };
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
      recordUsage(
        opts.model,
        response.usage?.input_tokens ?? 0,
        response.usage?.output_tokens ?? 0
      );
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
