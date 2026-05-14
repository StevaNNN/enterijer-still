/**
 * Partners (material / tool suppliers EnterijerStil works with) and references
 * (clients EnterijerStil has delivered projects for), as listed on the
 * legacy reference page (http://www.enterijerstil.rs/reference/).
 *
 * Locations are intentionally omitted — the on-site presentation uses
 * brand name only, per current marketing direction.
 *
 * Logos were sliced out of the two composite source images
 * (ES-Partneri-i-poslovni-prijatelji.jpg and ES-Reference.jpg) and stored
 * under public/partners/ and public/references/. The partner crops align
 * 1:1 with their labels; a small subset of reference crops may bleed in
 * the neighboring row's logo because the source is a low-resolution 2015
 * scan — drop or rename individual files in public/references/ and update
 * the corresponding `logo` field below to refine.
 *
 * If a `logo` field is empty, the chip in `ReferencesSection` falls back
 * to the brand-color dot mark — same visual vocabulary as `SectionEyebrow`.
 */
export type ReferenceItem = {
  name: string;
  /** Path under /public, or empty string to fall back to the dot mark. */
  logo: string;
};

/** Material / equipment suppliers and trade partners (26). */
export const REFERENCE_PARTNERS: readonly ReferenceItem[] = [
  { name: "B+M Ritam", logo: "/partners/b-m-ritam.png" },
  { name: "Rigips · Saint-Gobain", logo: "/partners/rigips-saint-gobain.png" },
  { name: "Knauf", logo: "/partners/knauf.png" },
  { name: "Intraprofil", logo: "/partners/intraprofil.png" },
  { name: "R-Inženjering", logo: "/partners/r-inzenjering.png" },
  { name: "Bohor", logo: "/partners/bohor.png" },
  { name: "Izgradnja R", logo: "/partners/izgradnja-r.png" },
  { name: "Mitel Mont", logo: "/partners/mitel-mont.png" },
  { name: "Bomax", logo: "/partners/bomax.png" },
  { name: "Nip Spasić", logo: "/partners/nip-spasic.png" },
  { name: "Profi-world", logo: "/partners/profi-world.png" },
  { name: "Hilti", logo: "/partners/hilti.png" },
  { name: "Gleter Max", logo: "/partners/gleter-max.png" },
  { name: "DSF", logo: "/partners/dsf.png" },
  { name: "Krug", logo: "/partners/krug.png" },
  { name: "Profi tools", logo: "/partners/profi-tools.png" },
  { name: "Printex Design", logo: "/partners/printex-design.png" },
  { name: "Dux Dekor", logo: "/partners/dux-dekor.png" },
  { name: "GZR Popović", logo: "/partners/gzr-popovic.png" },
  { name: "SZTR Jova", logo: "/partners/sztr-jova.png" },
  { name: "Tipo Servis", logo: "/partners/tipo-servis.png" },
  { name: "Boje i lakovi Dam", logo: "/partners/boje-i-lakovi-dam.png" },
  { name: "Mark Professional", logo: "/partners/mark-professional.png" },
  { name: "ČAR", logo: "/partners/car.png" },
  { name: "Refill M", logo: "/partners/refill-m.png" },
  { name: "Štamparija Idea", logo: "/partners/stamparija-idea.png" },
];

/**
 * Clients / projects EnterijerStil has delivered (63 entries from the
 * legacy "Reference" tab; ordered to match the source composite).
 */
export const REFERENCE_CLIENTS: readonly ReferenceItem[] = [
  { name: "Keramika Jovanović", logo: "/references/keramika-jovanovic.png" },
  { name: "Old Mill Hotel Beograd", logo: "/references/old-mill-hotel-beograd.png" },
  { name: "Mitanović Inženjering", logo: "/references/mitanovic-inzenjering.png" },
  { name: "Agromarket", logo: "/references/agromarket.png" },
  { name: "Sanex Markokovi", logo: "/references/sanex-markokovi.png" },
  { name: "Vinarija Despotika", logo: "/references/vinarija-despotika.png" },
  { name: "Hotel Voždovac", logo: "/references/hotel-vozdovac.png" },
  { name: "Drafterff", logo: "/references/drafterff.png" },
  { name: "DIS Market", logo: "/references/dis-market.png" },
  { name: "Johnson Controls", logo: "/references/johnson-controls.png" },
  { name: "Messer Tehnogas", logo: "/references/messer-tehnogas.png" },
  { name: "Vinarija Aleksandrović", logo: "/references/vinarija-aleksandrovic.png" },
  { name: "Vinarija Coltera", logo: "/references/vinarija-coltera.png" },
  { name: "Banja Salars", logo: "/references/banja-salars.png" },
  { name: "Vinarija Vladulović", logo: "/references/vinarija-vladulovic.png" },
  { name: "Vinarija Despot", logo: "/references/vinarija-despot.png" },
  { name: "Cubo", logo: "/references/cubo.png" },
  { name: "Vinarija Lika", logo: "/references/vinarija-lika.png" },
  { name: "Alcomerc Systems", logo: "/references/alcomerc-systems.png" },
  { name: "Stadtville", logo: "/references/stadtville.png" },
  { name: "Šumar Prom", logo: "/references/sumar-prom.png" },
  { name: "Više od 5 vode", logo: "/references/vise-od-5-vode.png" },
  { name: "Vinarija Tičić", logo: "/references/vinarija-ticic.png" },
  { name: "Iri", logo: "/references/iri.png" },
  { name: "Auto Plastika", logo: "/references/auto-plastika.png" },
  { name: "SPV Đakovo", logo: "/references/spv-akovo.png" },
  { name: "Elektromehaničarska Industrija", logo: "/references/elektromehanicarska-industrija.png" },
  { name: "Memoraška", logo: "/references/memoraska.png" },
  { name: "Minera", logo: "/references/minera.png" },
  { name: "SZTR Geda", logo: "/references/sztr-geda.png" },
  { name: "Davy SPC", logo: "/references/davy-spc.png" },
  { name: "Elektroruja", logo: "/references/elektroruja.png" },
  { name: "Surniadijo", logo: "/references/surniadijo.png" },
  { name: "Termika Floch", logo: "/references/termika-floch.png" },
  { name: "Hotel Kragujevac", logo: "/references/hotel-kragujevac.png" },
  { name: "Hotel Kompare", logo: "/references/hotel-kompare.png" },
  { name: "Hotel Šumarice", logo: "/references/hotel-sumarice.png" },
  { name: "Hotel Zelengora", logo: "/references/hotel-zelengora.png" },
  { name: "Vila Lokrumski", logo: "/references/vila-lokrumski.png" },
  { name: "Salon Mariage", logo: "/references/salon-mariage.png" },
  { name: "Frizerski salon Brigade", logo: "/references/frizerski-salon-brigade.png" },
  { name: "Frizerski salon Fashion", logo: "/references/frizerski-salon-fashion.png" },
  { name: "Frizerski salon Anelo", logo: "/references/frizerski-salon-anelo.png" },
  { name: "Frizerski salon Vivor", logo: "/references/frizerski-salon-vivor.png" },
  { name: "Frizerski salon Vivin", logo: "/references/frizerski-salon-vivin.png" },
  { name: "Caffe Coffe", logo: "/references/caffe-coffe.png" },
  { name: "Caffe Escon Star", logo: "/references/caffe-escon-star.png" },
  { name: "Caffe Makonderni", logo: "/references/caffe-makonderni.png" },
  { name: "Caffe Cherry", logo: "/references/caffe-cherry.png" },
  { name: "Caffe Bartoneon", logo: "/references/caffe-bartoneon.png" },
  { name: "Caffe Suite Gourm", logo: "/references/caffe-suite-gourm.png" },
  { name: "Caffe Pasona Mir", logo: "/references/caffe-pasona-mir.png" },
  { name: "Caffe B", logo: "/references/caffe-b.png" },
  { name: "Butik Decimar", logo: "/references/butik-decimar.png" },
  { name: "Butik Vodov", logo: "/references/butik-vodov.png" },
  { name: "Butik Daniel", logo: "/references/butik-daniel.png" },
  { name: "Butik Valentina", logo: "/references/butik-valentina.png" },
  { name: "Pekara Stop", logo: "/references/pekara-stop.png" },
  { name: "Konzarska Polish", logo: "/references/konzarska-polish.png" },
  { name: "Auto Servis Borović", logo: "/references/auto-servis-borovic.png" },
  { name: "Pogonska oprema Vedra", logo: "/references/pogonska-oprema-vedra.png" },
  { name: "Mašinski Pošarad", logo: "/references/masinski-posarad.png" },
  { name: "Montažna kuća Gradiacima", logo: "/references/montazna-kuca-gradiacima.png" },
];
