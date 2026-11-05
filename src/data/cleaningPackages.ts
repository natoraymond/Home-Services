export interface CleaningPackage {
  id: string;
  name: string;
  propertyType: string;
  enuguPrice: string;
  originalPrice?: string;
  duration: string;
  crewSize: string;
  image: string;
  description: string;
  highlights: string[];
  popular?: boolean;
}

export const ENUGU_CLEANING_PACKAGES: CleaningPackage[] = [
  {
    id: "flat-2bed",
    name: "2-Bedroom Standard Flat",
    propertyType: "Flat / Apartment",
    enuguPrice: "₦35,000 - ₦45,000",
    originalPrice: "₦50,000",
    duration: "3 - 4 Hours",
    crewSize: "2 - 3 Verified Cleaners",
    // Premium bright, spotless modern apartment interior living space
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
    description: "Thorough deep cleaning for standard 2-bedroom flats across Independence Layout, New Haven, and Achara Layout, Enugu.",
    highlights: [
      "2 Bedrooms & Living room vacuuming/mopping",
      "Kitchen degreasing & cabinet wipe-down",
      "2 Bathrooms descaling, tile scrubbing & disinfection",
      "Interior window panes and balcony washing",
    ],
  },
  {
    id: "flat-3bed",
    name: "3-Bedroom Standard / Luxury Flat",
    propertyType: "Flat / Apartment",
    enuguPrice: "₦45,000 - ₦60,000",
    originalPrice: "₦70,000",
    duration: "4 - 5 Hours",
    crewSize: "3 - 4 Verified Cleaners",
    // Stunning spacious luxury contemporary flat with polished floors & warm lighting
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    description: "Full deep sanitization for 3-bedroom family flats and luxury condos in GRA, Trans-Ekulu, and Coal Camp, Enugu.",
    highlights: [
      "Master bedroom en-suite deep sanitization",
      "Full kitchen cooker & extractor degreasing",
      "3 Bathrooms tile grout scrubbing & lime removal",
      "All baseboards, switches, doors & handles polished",
    ],
    popular: true,
  },
  {
    id: "duplex-4bed",
    name: "4-Bedroom Semi-Detached Duplex",
    propertyType: "Duplex",
    enuguPrice: "₦70,000 - ₦95,000",
    originalPrice: "₦110,000",
    duration: "5 - 7 Hours",
    crewSize: "4 - 6 Verified Cleaners",
    // Architectural modern two-story duplex living area with staircase, high ceilings & marble finish
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description: "Comprehensive multi-level deep cleaning for 4-bedroom duplexes in GRA, Golf Estate, and Independence Layout, Enugu.",
    highlights: [
      "Ground floor + upper floor deep sanitization",
      "Staircase balustrades & handrail detailing",
      "High ceiling cobweb removal & chandelier dusting",
      "Kitchen pantry, store & laundry room detailing",
      "All 4 bedrooms & guest toilet disinfection",
    ],
    popular: true,
  },
  {
    id: "duplex-5bed",
    name: "5-Bedroom Fully Detached Duplex / Mansion",
    propertyType: "Duplex / Mansion",
    enuguPrice: "₦100,000 - ₦140,000",
    originalPrice: "₦165,000",
    duration: "6 - 8 Hours",
    crewSize: "5 - 8 Verified Cleaners",
    // Ultra-luxury grand detached villa / duplex interior
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
    description: "Executive premium deep overhaul for large detached mansions and duplexes in Enugu with BQ and multiple living rooms.",
    highlights: [
      "Ante-room, main salon, and private family lounges",
      "Heavy kitchen grease removal, oven & fridge deep clean",
      "5 En-suite luxury bathrooms steam sanitization",
      "BQ (Boys Quarters) & security post deep cleaning",
      "Balconies, porch washing & exterior doorway buffing",
    ],
  },
  {
    id: "move-in-post-construction",
    name: "Post-Construction / Move-In Deep Overhaul",
    propertyType: "Flats & Duplexes",
    enuguPrice: "₦55,000 (Flat) | ₦115,000 (Duplex)",
    originalPrice: "₦140,000",
    duration: "Full Day Care",
    crewSize: "4 - 8 Verified Cleaners",
    // Professional post-renovation spotless glass & reflective tile finish
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85",
    description: "Intense paint splatter removal, cement residue scraping, sawdust extraction, and hospital-grade sanitization before moving in.",
    highlights: [
      "Paint droplet scraping from glass & tiles without scratching",
      "Industrial vacuuming of gypsum & cement dust",
      "Sanitizing cupboards, wardrobe interiors & drawers",
      "Turnkey move-in readiness with fresh aroma",
    ],
  },
];
