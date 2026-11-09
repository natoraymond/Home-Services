export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: "broom" | "tank" | "wrench" | "bolt" | "sparkles" | "paint" | "shield" | "bug" | "tree";
  badge?: string;
  popular?: boolean;
  pricingStarting: string;
  durationEstimate: string;
  features: string[];
  inclusions: string[];
  processSteps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "house-cleaning",
    slug: "house-cleaning",
    title: "Deep House Cleaning",
    category: "Cleaning & Sanitation",
    badge: "Popular Everyday Care",
    popular: true,
    shortDesc: "Comprehensive deep cleaning, disinfection, vacuuming, dusting, kitchen scrubbing, and bathroom sanitization by trusted professionals.",
    fullDesc:
      "Transform your living space with Raycom's thorough Deep House Cleaning service. From kitchens and grease-laden cooktops to tile grout, bathrooms, living rooms, and bedrooms, our trained, background-checked cleaners use eco-friendly, hospital-grade cleaning agents and high-powered HEPA vacuums to leave your home sparkling clean and allergen-free.",
    iconName: "broom",
    pricingStarting: "₦35,000",
    durationEstimate: "2 - 4 Hours",
    features: [
      "All Rooms Dusting & Polishing",
      "Kitchen Degreasing & Appliance Wipe-down",
      "Bathroom Descaling & Germ Disinfection",
      "Eco-friendly & Pet-safe Detergents",
      "HEPA Filtration Deep Vacuuming",
      "Floor Mopping & Tile Grout Care",
    ],
    inclusions: [
      "Dusting all ceiling corners, light fittings, and blinds",
      "Deep scrub of sinks, tubs, shower glass, and toilet bowls",
      "Cabinet exteriors, counters, and backsplash sanitization",
      "Interior door frames, switches, baseboards, and sill wipe-down",
      "Carpet vacuuming and hard floor washing",
      "Trash removal and bag replacement",
    ],
    processSteps: [
      {
        title: "1. Area Assessment",
        desc: "Walkthrough inspection to identify high-traffic zones, stubborn stains, and your custom focus spots.",
      },
      {
        title: "2. Deep Dusting & HEPA Prep",
        desc: "High-to-low dusting removing airborne allergens, followed by thorough vacuuming of all floors and upholstery.",
      },
      {
        title: "3. Kitchen & Bath Scrub",
        desc: "Heavy degreasing, lime scale removal, and multi-point sanitized wipe of all touch surfaces.",
      },
      {
        title: "4. Floor Buff & Final Inspection",
        desc: "Mopping with pleasant organic fresheners and client walkthrough to guarantee 100% satisfaction.",
      },
    ],
    faqs: [
      {
        q: "What is the price of cleaning a duplex and flat in Enugu State?",
        a: "In Enugu State (covering Enugu North, Enugu South, Enugu East, Nsukka, and surrounding areas like Independence Layout, GRA, New Haven, and Trans-Ekulu), standard 2-bedroom flats range from ₦35,000 to ₦45,000, 3-bedroom flats range from ₦45,000 to ₦60,000, 4-bedroom duplexes range from ₦70,000 to ₦95,000, and 5-bedroom luxury duplexes/mansions range from ₦100,000 to ₦140,000. Post-construction or move-in deep cleans are quoted based on square footage.",
      },
      {
        q: "Do I need to supply cleaning materials or equipment?",
        a: "No, our Raycom team arrives fully equipped with commercial-grade HEPA vacuum cleaners, microfiber cloths, steam mops, and certified eco-friendly solutions.",
      },
      {
        q: "Are your cleaners background-checked and vetted?",
        a: "Yes, every member of our cleaning crew undergoes thorough identity checks, police background clearance, and extensive in-house training.",
      },
      {
        q: "Can I book recurring weekly or bi-weekly cleaning?",
        a: "Yes! We offer discounted rates for weekly, bi-weekly, and monthly recurring house cleaning maintenance plans in Enugu, Lagos, Abuja, and nationwide.",
      },
    ],
  },
  {
    id: "washing-gp-tanks",
    slug: "washing-gp-tanks",
    title: "Washing of GP Tanks",
    category: "Water & Tank Sanitation",
    badge: "Specialized Water Care",
    popular: true,
    shortDesc: "Complete industrial & residential GP (overhead & underground) water storage tank desludging, scrub cleaning, and chlorine disinfection.",
    fullDesc:
      "Stagnant water tanks accumulate toxic sludge, bio-films, algae, rust, and harmful bacteria over time. Raycom's GP Tank Washing service utilizes specialized dewatering submersibles, high-pressure rotary jet washers, manual wall scouring, vacuum sludge extractors, and safe anti-bacterial chlorine sterilization to restore crystal-clean, safe water for your family or commercial building.",
    iconName: "tank",
    pricingStarting: "₦15,000",
    durationEstimate: "1 - 5 Hours",
    features: [
      "Overhead & Underground GP Tanks",
      "Mechanical High-Pressure Jet Washing",
      "Deep Sludge & Sediment Extraction",
      "Anti-Bacterial UV & Chlorine Sterilization",
      "Ball-Valve & Float Mechanism Inspection",
      "Water Clarity & Cleanliness Testing",
    ],
    inclusions: [
      "Complete dewatering with high-volume submersible pumps",
      "Safe interior access & ventilation by trained technicians",
      "Rotary pressure jetting of tank ceilings, ribs, and corners",
      "Sediment vacuum suction pump desludging",
      "Food-grade disinfectant spray and scrub treatment",
      "Clean freshwater rinse and drainage before refill",
    ],
    processSteps: [
      {
        title: "1. Emptying & Sludge Removal",
        desc: "Draining residual water and extracting thick sludge and mud from the tank base with industrial suction pumps.",
      },
      {
        title: "2. High-Pressure Rotary Jetting",
        desc: "Scrubbing internal walls, ceiling, and joints with high-pressure water jets to dislodge stubborn bio-algae and mineral deposits.",
      },
      {
        title: "3. Disinfection & Sterilization",
        desc: "Spraying and wiping food-grade antibacterial chlorine disinfectant across all internal surfaces to eradicate pathogens.",
      },
      {
        title: "4. Rinsing & Hardware Check",
        desc: "Final clean flush, checking floats, inflow valves, and sealing tank lids tightly to prevent contamination.",
      },
    ],
    faqs: [
      {
        q: "What are your tag prices for washing different sizes of GP tanks?",
        a: "We provide upfront tag prices for all GP tank capacities: 200 Gallons (₦15,000), 300 Gallons (₦20,000), 500 Gallons (₦28,000), 800 Gallons High Stanchion Tower (₦75,000), 1,000 Gallons Multi-Tank Raised Steel Tower (₦110,000), and 1,200 Gallons Industrial Elevated Scaffold Reservoir (₦165,000). Every wash includes certified safety rigging, complete dewatering, rotary pressure jet scouring, sediment vacuum extraction, and food-grade chlorine disinfection.",
      },
      {
        q: "How often should GP water tanks be washed?",
        a: "Health authorities and water safety guidelines recommend washing and sterilizing residential and commercial storage tanks at least once every 6 months.",
      },
      {
        q: "Will my water supply be safe to use immediately after washing?",
        a: "Yes. Once the disinfection and flush cycle is complete, the tank is refilled with clean water and ready for immediate domestic use.",
      },
      {
        q: "Do you handle both plastic overhead GP tanks and concrete sumps?",
        a: "Yes, we service all varieties: poly tanks (Sintex/GP type), stainless steel tanks, underground concrete sumps, and overhead rooftop tanks of all capacities.",
      },
    ],
  },
  {
    id: "plumbing-services",
    slug: "plumbing-services",
    title: "Plumbing & Drainage",
    category: "Plumbing Systems",
    popular: true,
    badge: "24/7 Emergency",
    shortDesc: "Emergency burst pipe repair, sewer line snaking, water heater installation, faucet fixes, and bathroom fixture overhauls.",
    fullDesc:
      "Our licensed master plumbers handle everything from stubborn sink blockages and leaky pipes to complete water line replacements, boiler tuning, and commercial drainage. We use fiber-optic drain cameras and hydrostatic testing to fix problems accurately without damaging your walls or floors.",
    iconName: "wrench",
    pricingStarting: "₦15,000",
    durationEstimate: "1 - 3 Hours",
    features: [
      "24/7 Emergency Leak Detection",
      "Hydro-jetting & Sewer Snaking",
      "Water Heater Repair & Installation",
      "Bathroom Fixture Installations",
      "Pipe Relining & Re-piping",
      "Water Pressure Diagnostics",
    ],
    inclusions: [
      "Detailed diagnostic and written quotation before work starts",
      "All master plumbing tools, sealants, and replacement fittings",
      "Complete post-installation pressure testing",
      "Clean work area with floor protection and clean-up",
    ],
    processSteps: [
      {
        title: "1. Rapid Diagnosis",
        desc: "Checking leak lines or pipe clogs using non-invasive acoustic or camera diagnostic gear.",
      },
      {
        title: "2. Precision Repair",
        desc: "Replacing faulty valves, joints, pipes, or heaters with manufacturer-warranted parts.",
      },
      {
        title: "3. Pressure & Flow Testing",
        desc: "Testing water pressure, drainage speed, and seal integrity to prevent repeat issues.",
      },
      {
        title: "4. Raycom Guarantee",
        desc: "Issuing formal work warranty paperwork and preventative maintenance tips.",
      },
    ],
    faqs: [
      {
        q: "How quickly do your emergency plumbers arrive?",
        a: "Our mobile plumbing response vans arrive on-site within 45 to 60 minutes for urgent leak or sewage emergencies.",
      },
      {
        q: "Do you supply the replacement parts?",
        a: "Yes, our service trucks carry standard valves, pipes, faucets, gaskets, and fixtures. We also install client-supplied specialized fixtures if preferred.",
      },
    ],
  },
  {
    id: "electrical-services",
    slug: "electrical-services",
    title: "Electrical & Lighting",
    category: "Electrical Engineering",
    shortDesc: "Certified diagnostics, breaker panel upgrades, short-circuit fixes, EV charger installation, smart switch wiring, and architectural lighting.",
    fullDesc:
      "Electrical work requires precision, safety compliance, and deep technical know-how. Raycom's certified electricians troubleshoot electrical trips, upgrade breaker boxes, install energy-efficient LED configurations, and ensure your home is protected with modern surge suppressors and fire-safe breakers.",
    iconName: "bolt",
    pricingStarting: "₦20,000",
    durationEstimate: "1 - 4 Hours",
    features: [
      "Breaker Panel Modernization",
      "Short Circuit & Fault Finding",
      "Level 2 EV Charger Stations",
      "Indoor & Landscape Lighting",
      "Ceiling Fan & Chandelier Mounts",
      "Safety Grounding & Surge Protectors",
    ],
    inclusions: [
      "Full circuit voltage and load balance analysis",
      "Code-compliant heavy-gauge cabling and breakers",
      "Wall switch and outlet replacements",
      "Written electrical safety certification",
    ],
    processSteps: [
      {
        title: "1. Load & Safety Audit",
        desc: "Analyzing the electrical subpanel, load distribution, and earthing grounding.",
      },
      {
        title: "2. Circuit Isolation & Rewiring",
        desc: "Safe circuit cut-off, wire replacement, socket installations, or luminaire mounting.",
      },
      {
        title: "3. Voltage Verification",
        desc: "Testing load tolerance, circuit breakers, and residual current devices.",
      },
      {
        title: "4. Handover & Certificate",
        desc: "Confirming full compliance with local building codes.",
      },
    ],
    faqs: [
      {
        q: "Are your electricians certified and licensed?",
        a: "Yes, every technician is a state-certified wireman or licensed master electrician.",
      },
      {
        q: "Can you install Tesla or universal EV chargers?",
        a: "Yes, we specialize in high-voltage 240V Level 2 EV charging stations with dedicated breakers.",
      },
    ],
  },
  {
    id: "hvac-services",
    slug: "hvac-services",
    title: "HVAC & Climate Control",
    category: "Air & Heating",
    shortDesc: "AC repair, gas furnace tune-ups, heat pump installations, air duct decontamination, and smart thermostat integration.",
    fullDesc:
      "Keep your home comfortable year-round with our full-service heating, ventilation, and air conditioning solutions. From emergency refrigerant leak recharge and compressor diagnostics to seasonal maintenance and duct sanitization, our HVAC technicians optimize your airflow and lower energy bills.",
    iconName: "sparkles",
    pricingStarting: "₦25,000",
    durationEstimate: "2 - 5 Hours",
    features: [
      "AC Compressor & Coolant Tuning",
      "Gas Furnace & Heat Pump Repair",
      "Air Duct Deep Decontamination",
      "Smart Thermostat Installation",
      "Seasonal Preventative Tune-Ups",
      "Indoor Air Quality (IAQ) Testing",
    ],
    inclusions: [
      "Evaporator & condenser coil washing",
      "Refrigerant pressure checks and leak test",
      "Blower motor cleaning and capacitor verification",
      "Air filter replacements and thermostat calibration",
    ],
    processSteps: [
      {
        title: "1. Diagnostic Check",
        desc: "Measuring airflow temperature deltas, power draw, and refrigerant pressures.",
      },
      {
        title: "2. Deep Coil & Filter Clean",
        desc: "Dislodging dust, mould, and grease from coils to restore peak heat exchange efficiency.",
      },
      {
        title: "3. Part Tuning or Replacement",
        desc: "Calibrating expansion valves, thermostat sensors, and blower fans.",
      },
      {
        title: "4. Efficiency Run Test",
        desc: "Operating full cooling/heating cycles to verify optimal CFM airflow and low decibel output.",
      },
    ],
    faqs: [
      {
        q: "How frequently should my AC system be serviced?",
        a: "We suggest twice a year: once in spring prior to heavy summer cooling, and once in autumn ahead of winter heating.",
      },
      {
        q: "Why is my AC blowing room-temperature air?",
        a: "Common causes include low refrigerant, a failed run capacitor, dirty outdoor coils, or a faulty thermostat. Our techs troubleshoot this within 30 minutes.",
      },
    ],
  },
  {
    id: "remodeling-handyman",
    slug: "remodeling-handyman",
    title: "Remodeling & Handyman",
    category: "Home Improvement",
    shortDesc: "Kitchen and bathroom remodeling, drywall repair, interior/exterior painting, custom cabinetry, tiling, and carpentry.",
    fullDesc:
      "Transform your home’s aesthetic and market value with Raycom's skilled carpenters and craftsmen. We take on single-room makeovers, bathroom tile retiling, accent wall painting, drywall patchworks, door fittings, and general punch-list repairs with surgical precision.",
    iconName: "paint",
    pricingStarting: "₦30,000",
    durationEstimate: "Custom Project Basis",
    features: [
      "Kitchen & Bathroom Refurbishments",
      "Drywall Patching & Texture Matching",
      "Interior & Exterior Premium Painting",
      "Custom Shelving & Finish Carpentry",
      "Tile & Laminate Flooring Installs",
      "Door, Lock & Window Hardware Tuning",
    ],
    inclusions: [
      "Drop cloth floor and furniture masking protection",
      "Premium primers, paints, and fasteners",
      "Precision measurement and leveling",
      "Complete site clean-up and debris haul-away",
    ],
    processSteps: [
      {
        title: "1. Consultation & Design Review",
        desc: "Reviewing materials, layout plans, paint swatches, and timeline expectations.",
      },
      {
        title: "2. Surface Preparation",
        desc: "Sanding, patching, waterproofing, and priming substrates for long-lasting adherence.",
      },
      {
        title: "3. Craftsmanship Execution",
        desc: "Applying skilled tiling, cabinetry, painting coats, and trim installations.",
      },
      {
        title: "4. Walkthrough & Touch-ups",
        desc: "Final detailed inspection with client to guarantee crisp lines and flawless finishes.",
      },
    ],
    faqs: [
      {
        q: "Can you help with small handyman jobs or just full remodels?",
        a: "Both! We have hourly handyman services for quick fixes as well as dedicated project crews for full renovations.",
      },
      {
        q: "Do you provide complimentary design estimates?",
        a: "Yes, we provide free in-home assessments and clear itemized proposals.",
      },
    ],
  },
];

