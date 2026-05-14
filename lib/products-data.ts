/**
 * Product seed data — typed module that mirrors the row shape a real
 * database would store. Today the repository (`lib/products-repository.ts`)
 * reads from this module; when a real database is wired in (Neon Postgres
 * + Drizzle is the Next.js-on-Vercel default), only the repository changes.
 *
 * Conventions:
 *   - `slug`              kebab-case ASCII; primary URL key.
 *   - `name / description` localized (en + sr); UI always pulls the active
 *     locale's variant.
 *   - `type / material / color`  reference slugs in
 *     `lib/products-taxonomies.ts`. Keep those two files in sync.
 *   - `dimensions`         millimetres; `depth` optional (sheets/panels).
 *   - `thumbnail / images` live under /public/products/<slug>/ when present.
 *     Falls back to the shared local placeholder at
 *     `public/product-placeholder.jpg` (see `lib/products-thumbnail.ts`) so
 *     newly-seeded SKUs render a real preview before each product's real
 *     photo lands. Once per-product images are uploaded to Cloudinary, set
 *     `thumbnail` to the resolved Cloudinary URL upstream.
 */

export type LocalizedText = {
  en: string;
  sr: string;
};

export type ProductDimensions = {
  width: number;
  height: number;
  depth?: number;
  unit: "mm" | "cm" | "m";
};

export type Product = {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  thumbnail?: string;
  images?: readonly string[];
  /** Taxonomy slug — see `PRODUCT_TYPES` in `lib/products-taxonomies.ts`. */
  type: string;
  /** Taxonomy slug — see `PRODUCT_MATERIALS`. */
  material: string;
  /** Taxonomy slug — see `PRODUCT_COLORS`. */
  color: string;
  /** Optional brand / manufacturer (e.g. "Knauf"). */
  brand?: string;
  dimensions?: ProductDimensions;
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "rigips-standard-12-5",
    slug: "rigips-standard-12-5",
    name: {
      en: "Rigips Standard Drywall 12.5 mm",
      sr: "Rigips ploča standardna 12,5 mm",
    },
    shortDescription: {
      en: "Standard gypsum board for dry walls and partitions.",
      sr: "Standardna gipskartonska ploča za suvomontažne zidove i pregrade.",
    },
    description: {
      en: "Universal A-type gypsum board, 12.5 mm thick, suited to dry partitions, wall linings and ceilings in dry interior rooms. Easy to score, snap and finish.",
      sr: "Univerzalna A tipa gipskartonska ploča debljine 12,5 mm, namenjena suvim pregradnim zidovima, oblogama i plafonima u suvim prostorijama. Lako se zaseca, prelama i obrađuje.",
    },
    type: "rigips-ploca",
    material: "gips",
    color: "bela",
    brand: "Rigips · Saint-Gobain",
    dimensions: { width: 1200, height: 2000, depth: 12.5, unit: "mm" },
  },
  {
    id: "rigips-vodootporna",
    slug: "rigips-vodootporna-12-5",
    name: {
      en: "Rigips Moisture-Resistant Drywall 12.5 mm",
      sr: "Rigips vodootporna ploča 12,5 mm",
    },
    shortDescription: {
      en: "Impregnated gypsum board for bathrooms and kitchens.",
      sr: "Impregnirana gipskartonska ploča za kupatila i kuhinje.",
    },
    description: {
      en: "H2-type impregnated gypsum board with reduced water absorption — recommended for bathrooms, kitchens, laundry rooms and other humid interiors.",
      sr: "Impregnirana ploča H2 tipa sa smanjenom apsorpcijom vlage — preporučena za kupatila, kuhinje, perionice i druge prostorije sa povišenom vlažnošću.",
    },
    type: "rigips-ploca",
    material: "gips",
    color: "bela",
    brand: "Rigips · Saint-Gobain",
    dimensions: { width: 1200, height: 2000, depth: 12.5, unit: "mm" },
  },
  {
    id: "knauf-vatrootporna",
    slug: "knauf-vatrootporna-15",
    name: {
      en: "Knauf Fire-Resistant Drywall 15 mm",
      sr: "Knauf vatrootporna ploča 15 mm",
    },
    shortDescription: {
      en: "Fire-resistant gypsum board with reinforced core.",
      sr: "Vatrootporna gipskartonska ploča sa ojačanim jezgrom.",
    },
    description: {
      en: "F-type fire-resistant gypsum board, 15 mm thick, used in fire-protective wall and ceiling assemblies (staircases, technical rooms, escape routes).",
      sr: "Vatrootporna ploča F tipa, debljine 15 mm, namenjena vatrootpornim sklopovima zidova i plafona (stepenišni prostori, tehničke prostorije, evakuacioni putevi).",
    },
    type: "rigips-ploca",
    material: "gips",
    color: "bela",
    brand: "Knauf",
    dimensions: { width: 1250, height: 2000, depth: 15, unit: "mm" },
  },
  {
    id: "knauf-mineralna-vuna-50",
    slug: "knauf-mineralna-vuna-50",
    name: {
      en: "Knauf Mineral Wool Insulation 50 mm",
      sr: "Knauf mineralna vuna 50 mm",
    },
    shortDescription: {
      en: "Acoustic and thermal mineral-wool insulation.",
      sr: "Akustička i termička izolacija od mineralne vune.",
    },
    description: {
      en: "Mineral wool insulation slabs used in partition walls and ceiling cavities to improve thermal performance and acoustic comfort.",
      sr: "Ploče od mineralne vune za pregradne zidove i plafonske šupljine, koje poboljšavaju termičke karakteristike i akustički komfor prostora.",
    },
    type: "izolacija",
    material: "mineralna-vuna",
    color: "siva",
    brand: "Knauf",
    dimensions: { width: 1000, height: 600, depth: 50, unit: "mm" },
  },
  {
    id: "amf-spusteni-plafon",
    slug: "amf-spusteni-plafon-60x60",
    name: {
      en: "AMF Suspended Ceiling 60×60 cm",
      sr: "AMF spušteni plafon 60×60 cm",
    },
    shortDescription: {
      en: "Modular mineral ceiling tiles on T-bar grid.",
      sr: "Modularne mineralne plafonske ploče na T-rasteru.",
    },
    description: {
      en: "Lay-in mineral fibre ceiling tiles, 600×600 mm, on a visible T-bar grid — fast to install and easy to access services above the ceiling.",
      sr: "Spuštajuće mineralne ploče dimenzija 600×600 mm na vidljivom T-rasteru — brzo se montiraju i omogućavaju pristup instalacijama iznad plafona.",
    },
    type: "spusteni-plafon",
    material: "gips",
    color: "bela",
    dimensions: { width: 600, height: 600, depth: 15, unit: "mm" },
  },
  {
    id: "cd-profil-50",
    slug: "cd-profil-50",
    name: {
      en: "CD Drywall Profile 50 mm",
      sr: "CD profil za suvomontažu 50 mm",
    },
    shortDescription: {
      en: "Galvanised steel profile for drywall sub-construction.",
      sr: "Pocinkovani čelični profil za potkonstrukciju u suvomontaži.",
    },
    description: {
      en: "Cold-formed galvanised steel CD profile, 50 mm web, used as the main supporting member in drywall partitions and suspended ceilings.",
      sr: "Hladno oblikovan pocinkovani čelični CD profil sa 50 mm rebrom, koristi se kao nosivi element u suvomontažnim pregradama i spuštenim plafonima.",
    },
    type: "profil",
    material: "metal",
    color: "boja-aluminijuma",
    dimensions: { width: 50, height: 3000, depth: 27, unit: "mm" },
  },
  {
    id: "parket-hrast",
    slug: "parket-hrast-rustik",
    name: {
      en: "Oak Engineered Parquet — Rustic",
      sr: "Hrastov slojeviti parket — rustik",
    },
    shortDescription: {
      en: "Three-layer engineered oak floor with matte oil finish.",
      sr: "Trolaminirani hrastov parket sa mat uljnom završnom obradom.",
    },
    description: {
      en: "European oak top layer, 4 mm wear surface, on a multi-ply backing. Pre-finished with a natural matte oil — installs floating or glued.",
      sr: "Površinski sloj evropskog hrasta od 4 mm na višeslojnoj podlozi. Tvornička obrada prirodnim mat uljem — montira se plivajuće ili lepljenjem.",
    },
    type: "podna-obloga",
    material: "drvo",
    color: "hrast",
    dimensions: { width: 1200, height: 190, depth: 14, unit: "mm" },
  },
  {
    id: "laminat-ac4",
    slug: "laminat-ac4-orah",
    name: {
      en: "AC4 Laminate Flooring — Walnut",
      sr: "Laminat AC4 — orah",
    },
    shortDescription: {
      en: "Click-system laminate for medium-traffic residential floors.",
      sr: "Klik laminat za stambene podove sa srednjim opterećenjem.",
    },
    description: {
      en: "AC4 class HDF-core laminate with a synchronised wood-decor surface. Suitable for living rooms, bedrooms and home offices.",
      sr: "Laminat klase AC4 sa HDF jezgrom i sinhronizovanim dekorom drveta. Pogodan za dnevne sobe, spavaće sobe i kućne radne prostore.",
    },
    type: "podna-obloga",
    material: "laminat",
    color: "orah",
    dimensions: { width: 1380, height: 190, depth: 8, unit: "mm" },
  },
  {
    id: "led-panel-60x60",
    slug: "led-panel-60x60",
    name: {
      en: "LED Ceiling Panel 60×60 cm",
      sr: "LED plafonski panel 60×60 cm",
    },
    shortDescription: {
      en: "Slim 40 W LED panel for grid ceilings and offices.",
      sr: "Tanak LED panel 40 W za rasterske plafone i kancelarije.",
    },
    description: {
      en: "Edge-lit 40 W LED panel, 4000 K neutral white, designed to drop into a 600×600 T-bar grid or be surface-mounted with a frame kit.",
      sr: "LED panel sa bočnim osvetljenjem, 40 W, neutralno bela boja (4000 K), za ugradnju u T-raster 600×600 ili nadgradnu montažu uz okvirni komplet.",
    },
    type: "rasveta",
    material: "aluminijum",
    color: "bela",
    dimensions: { width: 600, height: 600, depth: 9, unit: "mm" },
  },
  {
    id: "kvaka-aluminijum",
    slug: "kvaka-aluminijum-mat",
    name: {
      en: "Aluminium Door Handle — Matte",
      sr: "Aluminijumska kvaka — mat",
    },
    shortDescription: {
      en: "Modern matte-finish lever handle on round rosette.",
      sr: "Moderna kvaka u mat završnoj obradi sa okruglom rozetom.",
    },
    description: {
      en: "Solid aluminium lever handle with a matte powder-coated finish. Round rosette, 8 mm spindle, suits standard interior doors.",
      sr: "Masivna aluminijumska kvaka sa mat plastificiranom obradom. Okrugla rozeta, kvadratna osovina 8 mm, za standardna unutrašnja vrata.",
    },
    type: "kvake-i-okovi",
    material: "aluminijum",
    color: "antracit",
    dimensions: { width: 130, height: 50, depth: 60, unit: "mm" },
  },
  {
    id: "boja-zidna-mat",
    slug: "boja-zidna-mat-bela",
    name: {
      en: "Interior Matt Wall Paint — White",
      sr: "Unutrašnja mat zidna boja — bela",
    },
    shortDescription: {
      en: "Water-based matte emulsion with high coverage.",
      sr: "Vodena mat emulzija sa visokom moći pokrivanja.",
    },
    description: {
      en: "Premium water-based matte wall paint with high opacity and excellent washability. Low-odour, certified for interior use in living spaces.",
      sr: "Premium vodena mat zidna boja visoke pokrivnosti i odlične perivosti. Sa niskom emisijom mirisa, sertifikovana za primenu u stambenim prostorima.",
    },
    type: "boje-i-lakovi",
    material: "gips",
    color: "bela",
  },
  {
    id: "kvaka-staklena",
    slug: "kvaka-staklena-crna",
    name: {
      en: "Glass Door Handle — Black",
      sr: "Staklena kvaka — crna",
    },
    shortDescription: {
      en: "Tempered-glass lever handle with brass core.",
      sr: "Kvaka od kaljenog stakla sa mesinganim jezgrom.",
    },
    description: {
      en: "Tempered glass lever with a hidden brass core for stiffness. Pairs well with minimal interiors and dark interior doors.",
      sr: "Kvaka od kaljenog stakla sa skrivenim mesinganim jezgrom radi krutosti. Idealna uz minimalistički enterijer i tamna unutrašnja vrata.",
    },
    type: "kvake-i-okovi",
    material: "staklo",
    color: "crna",
    dimensions: { width: 135, height: 55, depth: 65, unit: "mm" },
  },
];
