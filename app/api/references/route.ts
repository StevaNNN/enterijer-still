/**
 * References API — read-only endpoint that returns partners and clients
 * with their Cloudinary logo URLs pre-resolved.
 *
 * Data is sourced from `lib/references-data.ts`. When that module moves to
 * a real database, only the import needs to change — the response shape stays
 * the same.
 *
 * GET /api/references
 *
 * Optional query params:
 *   ?type=partners   → return only partners array (clients will be empty)
 *   ?type=clients    → return only clients array (partners will be empty)
 *   (omit)           → return both
 *
 * Response shape:
 *   {
 *     partners:      ResolvedItem[],
 *     clients:       ResolvedItem[],
 *     totalPartners: number,
 *     totalClients:  number,
 *   }
 *
 * where ResolvedItem = { name: string; logo: string }
 * and `logo` is the full Cloudinary delivery URL (or "" for fallback entries).
 */
import { NextResponse } from "next/server";
import { REFERENCE_CLIENTS, REFERENCE_PARTNERS } from "@/lib/references-data";
import { cloudinaryImageUrl } from "@/lib/cloudinary-url";
import type { ReferenceItem } from "@/lib/references-data";

export const runtime = "nodejs";

type ResolvedItem = {
  name: string;
  logo: string;
};

function resolveLogoUrl(item: ReferenceItem): ResolvedItem {
  return {
    name: item.name,
    logo: item.logo ? cloudinaryImageUrl(item.logo, "logo") : "",
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const includePartners = !type || type === "partners";
  const includeClients = !type || type === "clients";

  const partners = includePartners
    ? REFERENCE_PARTNERS.map(resolveLogoUrl)
    : [];
  const clients = includeClients
    ? REFERENCE_CLIENTS.map(resolveLogoUrl)
    : [];

  return NextResponse.json(
    {
      partners,
      clients,
      totalPartners: REFERENCE_PARTNERS.length,
      totalClients: REFERENCE_CLIENTS.length,
    },
    {
      headers: {
        // Logo data is effectively static — long edge cache with background revalidation.
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
