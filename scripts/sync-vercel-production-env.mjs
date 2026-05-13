#!/usr/bin/env node
/**
 * Pushes variables from a local env file to the linked Vercel project's
 * Production environment (stdin-based add, same as `cat file | vercel env add`).
 *
 * Prerequisites:
 *   npx vercel login
 *   npx vercel link   (or: npx vercel link --yes --team <slug> --project <name>)
 *
 * Usage:
 *   node scripts/sync-vercel-production-env.mjs
 *   node scripts/sync-vercel-production-env.mjs /path/to/.env.production.local
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = process.argv[2] ?? join(root, ".env.local");

if (!existsSync(envPath)) {
  console.error(`File not found: ${envPath}`);
  process.exit(1);
}

/** @type {Array<[string, string]>} */
const entries = [];
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = line.indexOf("=");
  if (eq === -1) continue;
  const key = line.slice(0, eq).trim();
  if (!key) continue;
  let value = line.slice(eq + 1);
  if (value.startsWith('"') && value.endsWith('"') && value.length >= 2) {
    value = value.slice(1, -1);
  }
  entries.push([key, value]);
}

for (const [key, value] of entries) {
  if (value === "") {
    console.log(`skip (empty value): ${key}`);
    continue;
  }

  const result = spawnSync(
    "npx",
    ["vercel", "env", "add", key, "production", "--yes", "--force"],
    {
      cwd: root,
      input: value,
      encoding: "utf-8",
      stdio: ["pipe", "inherit", "inherit"],
    },
  );

  if (result.status !== 0) {
    console.error(`Failed to set ${key} (exit ${result.status ?? "unknown"})`);
    process.exit(result.status ?? 1);
  }
  console.log(`ok: ${key}`);
}

console.log("Done. Verify with: npx vercel env list production");
