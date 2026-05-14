/**
 * Uploads partner and reference logo PNGs from the local `public/` folder
 * directly into Cloudinary, giving each a stable public_id under the
 * `enterijerstil/partners/` and `enterijerstil/references/` prefixes.
 *
 * Usage:
 *   npm run migrate:logos
 *
 * By default the script skips assets that already exist in Cloudinary
 * (overwrite: false). Pass --overwrite to force re-upload.
 *
 * Requires in `.env.local` (or as real env vars):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, join, basename, extname } from "node:path";
import { v2 as cloudinary } from "cloudinary";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

/** Collect all PNG files from a directory, returning { localPath, publicId }. */
function collectLogos(dir, cloudinaryPrefix) {
  if (!existsSync(dir)) {
    console.warn(`Directory not found, skipping: ${dir}`);
    return [];
  }
  return readdirSync(dir)
    .filter((f) => extname(f).toLowerCase() === ".png")
    .map((f) => ({
      localPath: join(dir, f),
      publicId: `${cloudinaryPrefix}/${basename(f, extname(f))}`,
    }));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

loadEnvLocal();

const overwrite = process.argv.includes("--overwrite");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    "Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET.\n" +
      "Add them to .env.local or set them as environment variables.",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const publicRoot = resolve(process.cwd(), "public");

const allLogos = [
  ...collectLogos(
    join(publicRoot, "partners"),
    "enterijerstil/partners",
  ),
  ...collectLogos(
    join(publicRoot, "references"),
    "enterijerstil/references",
  ),
];

if (allLogos.length === 0) {
  console.log("No PNG files found in public/partners/ or public/references/. Nothing to do.");
  process.exit(0);
}

console.log(
  `Found ${allLogos.length} logo(s). Uploading to Cloudinary (overwrite=${overwrite})…\n`,
);

let ok = 0;
let skipped = 0;
let failed = 0;

for (const { localPath, publicId } of allLogos) {
  process.stdout.write(`  ${publicId} … `);
  try {
    await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      overwrite,
      resource_type: "image",
      // Preserve transparency for PNG logos
      format: "png",
    });
    console.log("✓");
    ok++;
  } catch (err) {
    // Cloudinary returns HTTP 400 "already exists" when overwrite is false
    const msg = err?.message ?? String(err);
    if (!overwrite && msg.includes("already exists")) {
      console.log("skipped (already exists)");
      skipped++;
    } else {
      console.log("✗ FAILED");
      console.error(`    ${msg}`);
      failed++;
    }
  }
}

console.log(
  `\nDone — uploaded: ${ok}, skipped: ${skipped}, failed: ${failed}`,
);

if (failed > 0) process.exit(1);
