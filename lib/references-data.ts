/**
 * Partners (material / tool suppliers EnterijerStil works with) and references
 * (clients EnterijerStil has delivered projects for), as listed on the
 * legacy reference page (http://www.enterijerstil.rs/reference/).
 *
 * `logo` holds a Cloudinary public_id (rooted under `enterijerstil/`).
 * Use `cloudinaryImageUrl(item.logo, "logo")` from `lib/cloudinary-url.ts`
 * to resolve a full delivery URL. Empty string falls back to the brand-color
 * dot mark in `ReferencesSection`.
 *
 * Source logos were migrated from `public/partners/` and `public/references/`
 * via `npm run migrate:logos`.
 */
export type ReferenceItem = {
  name: string;
  /** Cloudinary public_id, or empty string to fall back to the dot mark. */
  logo: string;
};

/** Material / equipment suppliers and trade partners (26). */
export const REFERENCE_PARTNERS: readonly ReferenceItem[] = [
  { name: "B+M Ritam", logo: "enterijerstil/partners/b-m-ritam" },
  { name: "Rigips · Saint-Gobain", logo: "enterijerstil/partners/rigips-saint-gobain" },
  { name: "Knauf", logo: "enterijerstil/partners/knauf" },
  { name: "Intraprofil", logo: "enterijerstil/partners/intraprofil" },
  { name: "R-Inženjering", logo: "enterijerstil/partners/r-inzenjering" },
  { name: "Bohor", logo: "enterijerstil/partners/bohor" },
  { name: "Izgradnja R", logo: "enterijerstil/partners/izgradnja-r" },
  { name: "Mitel Mont", logo: "enterijerstil/partners/mitel-mont" },
  { name: "Bomax", logo: "enterijerstil/partners/bomax" },
  { name: "Nip Spasić", logo: "enterijerstil/partners/nip-spasic" },
  { name: "Profi-world", logo: "enterijerstil/partners/profi-world" },
  { name: "Hilti", logo: "enterijerstil/partners/hilti" },
  { name: "Gleter Max", logo: "enterijerstil/partners/gleter-max" },
  { name: "DSF", logo: "enterijerstil/partners/dsf" },
  { name: "Krug", logo: "enterijerstil/partners/krug" },
  { name: "Profi tools", logo: "enterijerstil/partners/profi-tools" },
  { name: "Printex Design", logo: "enterijerstil/partners/printex-design" },
  { name: "Dux Dekor", logo: "enterijerstil/partners/dux-dekor" },
  { name: "GZR Popović", logo: "enterijerstil/partners/gzr-popovic" },
  { name: "SZTR Jova", logo: "enterijerstil/partners/sztr-jova" },
  { name: "Tipo Servis", logo: "enterijerstil/partners/tipo-servis" },
  { name: "Boje i lakovi Dam", logo: "enterijerstil/partners/boje-i-lakovi-dam" },
  { name: "Mark Professional", logo: "enterijerstil/partners/mark-professional" },
  { name: "ČAR", logo: "enterijerstil/partners/car" },
  { name: "Refill M", logo: "enterijerstil/partners/refill-m" },
  { name: "Štamparija Idea", logo: "enterijerstil/partners/stamparija-idea" },
];

/**
 * Clients / projects EnterijerStil has delivered (63 entries from the
 * legacy "Reference" tab; ordered to match the source composite).
 */
export const REFERENCE_CLIENTS: readonly ReferenceItem[] = [
  { name: "Keramika Jovanović", logo: "enterijerstil/references/keramika-jovanovic" },
  { name: "Old Mill Hotel Beograd", logo: "enterijerstil/references/old-mill-hotel-beograd" },
  { name: "Mitanović Inženjering", logo: "enterijerstil/references/mitanovic-inzenjering" },
  { name: "Agromarket", logo: "enterijerstil/references/agromarket" },
  { name: "Sanex Markokovi", logo: "enterijerstil/references/sanex-markokovi" },
  { name: "Vinarija Despotika", logo: "enterijerstil/references/vinarija-despotika" },
  { name: "Hotel Voždovac", logo: "enterijerstil/references/hotel-vozdovac" },
  { name: "Drafterff", logo: "enterijerstil/references/drafterff" },
  { name: "DIS Market", logo: "enterijerstil/references/dis-market" },
  { name: "Johnson Controls", logo: "enterijerstil/references/johnson-controls" },
  { name: "Messer Tehnogas", logo: "enterijerstil/references/messer-tehnogas" },
  { name: "Vinarija Aleksandrović", logo: "enterijerstil/references/vinarija-aleksandrovic" },
  { name: "Vinarija Coltera", logo: "enterijerstil/references/vinarija-coltera" },
  { name: "Banja Salars", logo: "enterijerstil/references/banja-salars" },
  { name: "Vinarija Vladulović", logo: "enterijerstil/references/vinarija-vladulovic" },
  { name: "Vinarija Despot", logo: "enterijerstil/references/vinarija-despot" },
  { name: "Cubo", logo: "enterijerstil/references/cubo" },
  { name: "Vinarija Lika", logo: "enterijerstil/references/vinarija-lika" },
  { name: "Alcomerc Systems", logo: "enterijerstil/references/alcomerc-systems" },
  { name: "Stadtville", logo: "enterijerstil/references/stadtville" },
  { name: "Šumar Prom", logo: "enterijerstil/references/sumar-prom" },
  { name: "Više od 5 vode", logo: "enterijerstil/references/vise-od-5-vode" },
  { name: "Vinarija Tičić", logo: "enterijerstil/references/vinarija-ticic" },
  { name: "Iri", logo: "enterijerstil/references/iri" },
  { name: "Auto Plastika", logo: "enterijerstil/references/auto-plastika" },
  { name: "SPV Đakovo", logo: "enterijerstil/references/spv-akovo" },
  { name: "Elektromehaničarska Industrija", logo: "enterijerstil/references/elektromehanicarska-industrija" },
  { name: "Memoraška", logo: "enterijerstil/references/memoraska" },
  { name: "Minera", logo: "enterijerstil/references/minera" },
  { name: "SZTR Geda", logo: "enterijerstil/references/sztr-geda" },
  { name: "Davy SPC", logo: "enterijerstil/references/davy-spc" },
  { name: "Elektroruja", logo: "enterijerstil/references/elektroruja" },
  { name: "Surniadijo", logo: "enterijerstil/references/surniadijo" },
  { name: "Termika Floch", logo: "enterijerstil/references/termika-floch" },
  { name: "Hotel Kragujevac", logo: "enterijerstil/references/hotel-kragujevac" },
  { name: "Hotel Kompare", logo: "enterijerstil/references/hotel-kompare" },
  { name: "Hotel Šumarice", logo: "enterijerstil/references/hotel-sumarice" },
  { name: "Hotel Zelengora", logo: "enterijerstil/references/hotel-zelengora" },
  { name: "Vila Lokrumski", logo: "enterijerstil/references/vila-lokrumski" },
  { name: "Salon Mariage", logo: "enterijerstil/references/salon-mariage" },
  { name: "Frizerski salon Brigade", logo: "enterijerstil/references/frizerski-salon-brigade" },
  { name: "Frizerski salon Fashion", logo: "enterijerstil/references/frizerski-salon-fashion" },
  { name: "Frizerski salon Anelo", logo: "enterijerstil/references/frizerski-salon-anelo" },
  { name: "Frizerski salon Vivor", logo: "enterijerstil/references/frizerski-salon-vivor" },
  { name: "Frizerski salon Vivin", logo: "enterijerstil/references/frizerski-salon-vivin" },
  { name: "Caffe Coffe", logo: "enterijerstil/references/caffe-coffe" },
  { name: "Caffe Escon Star", logo: "enterijerstil/references/caffe-escon-star" },
  { name: "Caffe Makonderni", logo: "enterijerstil/references/caffe-makonderni" },
  { name: "Caffe Cherry", logo: "enterijerstil/references/caffe-cherry" },
  { name: "Caffe Bartoneon", logo: "enterijerstil/references/caffe-bartoneon" },
  { name: "Caffe Suite Gourm", logo: "enterijerstil/references/caffe-suite-gourm" },
  { name: "Caffe Pasona Mir", logo: "enterijerstil/references/caffe-pasona-mir" },
  { name: "Caffe B", logo: "enterijerstil/references/caffe-b" },
  { name: "Butik Decimar", logo: "enterijerstil/references/butik-decimar" },
  { name: "Butik Vodov", logo: "enterijerstil/references/butik-vodov" },
  { name: "Butik Daniel", logo: "enterijerstil/references/butik-daniel" },
  { name: "Butik Valentina", logo: "enterijerstil/references/butik-valentina" },
  { name: "Pekara Stop", logo: "enterijerstil/references/pekara-stop" },
  { name: "Konzarska Polish", logo: "enterijerstil/references/konzarska-polish" },
  { name: "Auto Servis Borović", logo: "enterijerstil/references/auto-servis-borovic" },
  { name: "Pogonska oprema Vedra", logo: "enterijerstil/references/pogonska-oprema-vedra" },
  { name: "Mašinski Pošarad", logo: "enterijerstil/references/masinski-posarad" },
  { name: "Montažna kuća Gradiacima", logo: "enterijerstil/references/montazna-kuca-gradiacima" },
];
