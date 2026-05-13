/**
 * Uploads legacy enterijerstil.rs gallery images (HTTPS URLs) into Cloudinary
 * at `enterijerstil/gallery/legacy-001` … `legacy-NNN` to match `lib/gallery-data.ts`.
 *
 * Usage:
 *   npm run import:legacy-gallery
 *
 * Requires in `.env.local`:
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

const sourcesPath = resolve(process.cwd(), "lib/legacy-gallery-source-urls.json");
if (!existsSync(sourcesPath)) {
  console.error("Missing lib/legacy-gallery-source-urls.json");
  process.exit(1);
}

const { sources } = JSON.parse(readFileSync(sourcesPath, "utf8"));
if (!Array.isArray(sources) || sources.length === 0) {
  console.error("legacy-gallery-source-urls.json: expected non-empty sources[]");
  process.exit(1);
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

/** Keep in sync with `lib/legacy-gallery-public-id.ts`. */
function publicIdForIndex(i) {
  return `enterijerstil/gallery/legacy-${String(i + 1).padStart(3, "0")}`;
}

let failed = false;
for (let i = 0; i < sources.length; i++) {
  const sourceUrl = typeof sources[i] === "string" ? sources[i].trim() : "";
  if (!sourceUrl) continue;
  const publicId = publicIdForIndex(i);
  process.stdout.write(`[${i + 1}/${sources.length}] ${publicId} ... `);
  try {
    await cloudinary.uploader.upload(sourceUrl, {
      public_id: publicId,
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
