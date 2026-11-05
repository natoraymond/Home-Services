export interface TankPackage {
  id: string;
  sizeGallons: number;
  sizeLiters: number;
  title: string;
  category: "Small Residential" | "Medium Residential" | "Large Residential" | "Commercial & Estate" | "Industrial Tower & Scaffolding";
  priceNgn: string;
  originalPriceNgn?: string;
  duration: string;
  description: string;
  popular?: boolean;
  nigeriaStandard: string; // Popular Nigerian tank brands & uses
  idealFor: string;
  image: string;
  keyIncludes: string[];
}

export const GP_TANK_PACKAGES: TankPackage[] = [
  {
    id: "gp-tank-200-gal",
    sizeGallons: 200,
    sizeLiters: 900,
    title: "200 Gallons GP Tank",
    category: "Small Residential",
    priceNgn: "₦15,000",
    originalPriceNgn: "₦20,000",
    duration: "1 - 1.5 Hours",
    nigeriaStandard: "GeePee / Storex 900L - 1,000L Overhead Tank",
    description: "Compact cylindrical black/blue GP tank common in Nigerian mini-flats, boys' quarters (BQ), and single-room self-contain apartments.",
    idealFor: "Self-contain, 1-room self-con, and BQs across Nigerian cities.",
    image: "/tank-200gal.svg",
    keyIncludes: [
      "Complete dewatering & drainage",
      "Manual wall & bottom silt scouring",
      "Anti-bacterial chlorine sterilization",
      "Float ball-valve check & secure lid clamp",
    ],
  },
  {
    id: "gp-tank-300-gal",
    sizeGallons: 300,
    sizeLiters: 1350,
    title: "300 Gallons GP Tank",
    category: "Small Residential",
    priceNgn: "₦20,000",
    originalPriceNgn: "₦25,000",
    duration: "1.5 - 2 Hours",
    nigeriaStandard: "GeePee / Hart / Poly 1,350L - 1,500L Tank",
    description: "Widely used 1,350-liter cylindrical polymer overhead tank for 2-bedroom flats, removing brown pipe rust, algae, and red mud sediments.",
    idealFor: "2-bedroom flats, rooftop stanchions, and mini-compounds.",
    image: "/tank-300gal.svg",
    keyIncludes: [
      "Submersible pump draining",
      "Algae bio-film wall scrub",
      "Chlorine sterilization & odor neutralizer",
      "Sediment vacuum suction",
    ],
  },
  {
    id: "gp-tank-500-gal",
    sizeGallons: 500,
    sizeLiters: 2270,
    title: "500 Gallons GP Tank",
    category: "Medium Residential",
    priceNgn: "₦28,000",
    originalPriceNgn: "₦35,000",
    duration: "2 - 2.5 Hours",
    popular: true,
    nigeriaStandard: "GeePee / Coleman / Storex 2,000L - 2,500L Tank",
    description: "Nigeria's #1 most popular residential black GeePee tank. Thorough sludge vacuuming, mechanical pressure jet scouring, and complete disinfection.",
    idealFor: "3-bedroom flats, bungalows, and private residences nationwide.",
    image: "/tank-500gal.svg",
    keyIncludes: [
      "High-pressure mechanical rotary jetting",
      "Heavy mud & borehole sediment extraction",
      "Certified food-grade chlorine disinfection",
      "Inlet mesh filter and overflow pipe servicing",
    ],
  },
  {
    id: "gp-tank-800-gal",
    sizeGallons: 800,
    sizeLiters: 3600,
    title: "800 Gallons GP Tank (High Stanchion Tower)",
    category: "Large Residential",
    priceNgn: "₦75,000",
    originalPriceNgn: "₦95,000",
    duration: "3 - 4 Hours",
    popular: true,
    nigeriaStandard: "Overhead Steel Stanchion Mounted GeePee Tank (3,600L)",
    description: "High-elevation overhead steel stanchion scaffold tank. Specialized high-altitude climbing equipment, pressure-jet scouring, heavy red clay sludge extraction, and chlorine purification.",
    idealFor: "4 & 5-bedroom duplexes, block of flats, and residential towers.",
    image: "/tank-stanchion-800.jpg",
    keyIncludes: [
      "Certified high-altitude scaffold rigging & harness access",
      "Heavy-duty borehole mud extraction pump",
      "Rotary turbo pressure wash for internal ribs & floor",
      "Double anti-bacterial chlorine sterilizing flush",
    ],
  },
  {
    id: "gp-tank-1000-gal",
    sizeGallons: 1000,
    sizeLiters: 4500,
    title: "1,000 Gallons Multi-Tank Battery on Raised Steel Tower",
    category: "Industrial Tower & Scaffolding",
    priceNgn: "₦110,000",
    originalPriceNgn: "₦140,000",
    duration: "4 - 5.5 Hours",
    popular: true,
    nigeriaStandard: "Multi-Cylinder Battery GeePee Raised Tower (4,500L - 5,000L)",
    description: "Multi-tank overhead steel tower platform as pictured. Dual/triple tank synchronization, manifold pipe descaling, heavy silt vacuum extraction, and pressurized food-grade sterilization.",
    idealFor: "Luxury duplex compounds, private estates, student hostels, and guest houses.",
    image: "/tank-tower-1000.jpg",
    keyIncludes: [
      "Multi-tank platform synchronization & interconnecting pipe cleaning",
      "High-pressure jet wash for all individual tank chambers",
      "Deep sludge de-silting & pump desludging",
      "Safety railing check, lid seals & float valve servicing",
    ],
  },
  {
    id: "gp-tank-1200-gal",
    sizeGallons: 1200,
    sizeLiters: 5500,
    title: "1,200 Gallons Braithwaite / Industrial Elevated Tower Tank",
    category: "Industrial Tower & Scaffolding",
    priceNgn: "₦165,000",
    originalPriceNgn: "₦210,000",
    duration: "5 - 7 Hours",
    popular: true,
    nigeriaStandard: "Industrial Elevated Steel Tower / Sectional Panel Reservoir (5,500L+)",
    description: "Mega industrial elevated scaffold tower reservoir as pictured. Confined-space certified technician entry with breathing apparatus, mechanical panel scouring, chemical sludge neutralization, and high-pressure system flush.",
    idealFor: "Factories, commercial plazas, hotels, hospitals, and water distribution plants.",
    image: "/tank-scaffold-1200.jpg",
    keyIncludes: [
      "Confined-space certified technician team & fall-arrest harness",
      "High-power submersible dewatering & sludge vacuum extraction",
      "Panel-by-panel mechanical scour & chemical sterilization",
      "Full plumbing line backwash & pressure integrity testing",
    ],
  },
];

