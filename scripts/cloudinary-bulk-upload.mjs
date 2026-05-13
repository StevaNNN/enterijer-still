/**
 * Uploads images from HTTPS URLs into Cloudinary at fixed `public_id`s (bulk import / restore).
 *
 * Usage:
 *   npm run upload:cloudinary
 *
 * Copy `scripts/cloudinary-upload-manifest.example.json` to
 * `scripts/cloudinary-upload-manifest.json`, set each `sourceUrl` to a direct image URL,
 * then run the command. Rows with an empty `sourceUrl` are skipped.
 *
 * Requires (e.g. in `.env.local`):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { v2 as cloudinary } from "cloudinary";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const manifestPath = resolve(process.cwd(), "scripts/cloudinary-upload-manifest.json");

if (!existsSync(manifestPath)) {
  console.error(
    "Missing scripts/cloudinary-upload-manifest.json.\n" +
      "Copy scripts/cloudinary-upload-manifest.example.json to that path and fill in sourceUrl values.",
  );
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch (e) {
  console.error("Invalid JSON in cloudinary-upload-manifest.json:", e?.message || e);
  process.exit(1);
}

const uploads = Array.isArray(manifest.uploads) ? manifest.uploads : [];
const pending = uploads.filter(
  (row) =>
    row &&
    typeof row.publicId === "string" &&
    row.publicId.trim() &&
    typeof row.sourceUrl === "string" &&
    row.sourceUrl.trim(),
);

if (pending.length === 0) {
  console.log("No uploads: every row has an empty sourceUrl, or uploads[] is empty. Nothing to do.");
  process.exit(0);
}

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    "Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET (e.g. in .env.local).",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

let failed = false;
for (const { publicId, sourceUrl } of pending) {
  process.stdout.write(`Uploading ${publicId} ... `);
  try {
    await cloudinary.uploader.upload(sourceUrl.trim(), {
      public_id: publicId.trim(),
      overwrite: true,
      resource_type: "image",
    });
    console.log("ok");
  } catch (err) {
    failed = true;
    console.log("failed");
    console.error(err?.message || err);
  }
}

if (failed) process.exit(1);
