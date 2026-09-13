/**
 * data.js
 * ---------------------------------------------------
 * DEMO DATASET for PlotWise AI.
 *
 * All figures below (scores, price ranges, project completion dates) are
 * illustrative demo data built for this hackathon/portfolio project. Real
 * infrastructure authorities named here (BMRCL, NHAI, AAI, MMRDA, HMDA,
 * PMRDA, DMRC, NHSRCL, etc.) are real organizations, but the specific
 * project statuses/dates attached to them in this seed file are NOT pulled
 * live and must be treated as "Demo Dataset", not as confirmed
 * announcements. Every record is tagged dataMode: "demo" and every project
 * carries a `source` label that starts with "Demo Dataset —" for exactly
 * this reason. Swap this file (or point the same models at a live import
 * job) to plug in verified data later — no other backend code needs to
 * change.
 * ---------------------------------------------------
 */

const DEMO = "demo";
const demoSource = (org) => `Demo Dataset — illustrative, modeled on ${org}`;

export const citiesData = [
  {
    name: "Bengaluru",
    slug: "bengaluru",
    state: "Karnataka",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
    description:
      "India's leading technology hub, driven by IT/ITES employment corridors, an expanding metro network, and continued Outer Ring Road and airport-linked development.",
    population: 13200000,
    economicProfile: "IT services, electronics manufacturing, biotechnology, startups",
    dataMode: DEMO,
    areas: [
      area("Whitefield", 12.9698, 77.7500, "IT corridor, East Bengaluru", "₹7,500 - ₹10,500 / sq.ft", 88, 86, 87, 82, 85, 30),
      area("Electronic City", 12.8452, 77.6602, "IT/industrial hub, South Bengaluru", "₹6,200 - ₹8,800 / sq.ft", 84, 80, 89, 78, 80, 32),
      area("Sarjapur Road", 12.9008, 77.6870, "Emerging IT-adjacent corridor, South-East Bengaluru", "₹5,800 - ₹8,200 / sq.ft", 78, 82, 74, 80, 78, 42),
      area("Devanahalli", 13.2432, 77.7128, "Airport-adjacent growth corridor, North Bengaluru", "₹3,800 - ₹5,600 / sq.ft", 70, 88, 62, 74, 68, 55),
      area("Hebbal / North Bengaluru", 13.0450, 77.5950, "Airport-linked corridor, North Bengaluru", "₹6,800 - ₹9,200 / sq.ft", 82, 84, 76, 79, 79, 38),
    ],
    infra: [
      infra("Purple Line Metro Extension (Whitefield)", "metro", "Extension of the Bengaluru Metro Purple Line connecting Whitefield to the core city network.", "under_construction", "2026", "Whitefield", 12.9698, 77.7500, "high", "BMRCL"),
      infra("Outer Ring Road Widening & Signal-Free Corridor", "highway", "Capacity expansion and signal-free upgrades along the ORR IT corridor.", "under_construction", "2027", "Outer Ring Road, Whitefield-Sarjapur stretch", 12.9200, 77.6800, "high", "BBMP / NHAI"),
      infra("Electronics City Elevated Expressway", "highway", "Elevated expressway easing connectivity between Electronic City and Central Bengaluru.", "completed", "2024", "Electronic City to Central Silk Board", 12.9100, 77.6250, "high", "NHAI"),
      infra("Bengaluru Suburban Rail Project", "railway", "Commuter rail corridors linking peripheral growth nodes to the city core.", "approved", "2028", "Multiple corridors, including North & East Bengaluru", 13.0500, 77.6500, "medium", "K-RIDE"),
      infra("Kempegowda International Airport Terminal 2 & Aerocity", "airport", "Expansion of the airport and adjoining Aerocity township/commercial development.", "under_construction", "2027", "Devanahalli", 13.1986, 77.7066, "high", "Bengaluru International Airport Ltd (BIAL)"),
      infra("Devanahalli Business Park / Aerospace SEZ", "it_park_sez", "Planned business park and aerospace SEZ near the airport corridor.", "proposed", "2029", "Devanahalli", 13.2500, 77.7200, "medium", "KIADB"),
      infra("Peripheral Ring Road (PRR)", "highway", "Proposed 74 km ring road connecting Tumkur Road to Hosur Road via the eastern periphery.", "proposed", "2030", "Eastern & Northern periphery", 13.0800, 77.7100, "medium", "BDA"),
      infra("Sarjapur IT & Innovation Park", "it_park_sez", "Planned IT/innovation park along the Sarjapur growth corridor.", "approved", "2028", "Sarjapur Road", 12.8900, 77.7000, "medium", "Karnataka IT Dept"),
    ],
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    state: "Maharashtra",
    country: "India",
    latitude: 19.0760,
    longitude: 72.8777,
    description:
      "India's financial capital, undergoing a major metro-rail expansion, a new international airport, and a trans-harbour link reshaping growth corridors.",
    population: 20700000,
    economicProfile: "Financial services, media & entertainment, trade, manufacturing",
    dataMode: DEMO,
    areas: [
      area("Thane West", 19.2183, 72.9781, "Metro & rail-linked suburb, extended Mumbai", "₹11,000 - ₹15,500 / sq.ft", 84, 82, 76, 80, 82, 35),
      area("Navi Mumbai (Kharghar–Panvel belt)", 19.0330, 73.0700, "Planned satellite city, airport-linked corridor", "₹8,500 - ₹12,000 / sq.ft", 80, 90, 78, 85, 80, 38),
      area("Mulund–Bhandup", 19.1720, 72.9560, "Central Mumbai suburb, LBS Marg corridor", "₹14,500 - ₹19,000 / sq.ft", 79, 76, 72, 68, 76, 34),
      area("Virar–Vasai", 19.4550, 72.8110, "Western Railway peripheral growth belt", "₹5,800 - ₹8,200 / sq.ft", 66, 72, 58, 70, 64, 52),
    ],
    infra: [
      infra("Navi Mumbai International Airport (NMIA)", "airport", "New greenfield international airport for the Mumbai Metropolitan Region.", "under_construction", "2026", "Panvel, Navi Mumbai", 18.9900, 73.0980, "high", "CIDCO"),
      infra("Mumbai Trans Harbour Link (Atal Setu)", "highway", "Sea link connecting South Mumbai to Navi Mumbai, cutting travel time significantly.", "completed", "2024", "Sewri to Chirle, Navi Mumbai", 19.0000, 72.9300, "high", "MMRDA"),
      infra("Metro Line 4 & 4A (Wadala–Kasarvadavali–Gaimukh)", "metro", "New metro corridor connecting Thane to Central Mumbai suburbs.", "under_construction", "2026", "Thane–Wadala corridor", 19.1900, 72.9700, "high", "MMRDA"),
      infra("Virar–Alibaug Multi-Modal Corridor", "highway", "Planned expressway connecting the northern and southern peripheries of MMR.", "proposed", "2029", "Virar to Alibaug", 19.3000, 73.0500, "medium", "MSRDC"),
      infra("Navi Mumbai IT & Logistics SEZ Cluster", "it_park_sez", "Planned IT and logistics parks near the new airport corridor.", "approved", "2028", "Kharghar–Panvel belt", 19.0400, 73.0800, "medium", "CIDCO"),
    ],
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    state: "Telangana",
    country: "India",
    latitude: 17.3850,
    longitude: 78.4867,
    description:
      "A major IT/pharma hub anchored by HITEC City, with metro rail expansion and the Outer Ring Road driving peripheral growth.",
    population: 10500000,
    economicProfile: "IT services, pharmaceuticals & life sciences, biotechnology",
    dataMode: DEMO,
    areas: [
      area("Gachibowli / HITEC City", 17.4483, 78.3915, "Primary IT corridor, West Hyderabad", "₹8,200 - ₹11,500 / sq.ft", 90, 85, 91, 84, 87, 28),
      area("Kokapet / Financial District", 17.4100, 78.3300, "Emerging financial & IT hub, West Hyderabad", "₹7,000 - ₹9,800 / sq.ft", 83, 84, 82, 88, 83, 35),
      area("Shamshabad (Airport corridor)", 17.2403, 78.4294, "Airport-linked growth corridor, South Hyderabad", "₹3,600 - ₹5,400 / sq.ft", 68, 86, 60, 72, 66, 54),
      area("Kompally / North Hyderabad", 17.5400, 78.4900, "Peripheral residential growth belt, North Hyderabad", "₹4,200 - ₹6,100 / sq.ft", 65, 68, 58, 66, 64, 48),
    ],
    infra: [
      infra("Hyderabad Metro Rail Phase II", "metro", "Metro extension connecting the Financial District and Airport corridor to the core network.", "approved", "2028", "Gachibowli to Shamshabad", 17.3800, 78.3800, "high", "HMRL"),
      infra("Regional Ring Road (RRR)", "highway", "Outer expressway ring encircling the wider metropolitan region.", "under_construction", "2027", "Outer periphery of Hyderabad", 17.5000, 78.6000, "high", "NHAI / HMDA"),
      infra("Genome Valley Expansion", "it_park_sez", "Expansion of the biotech/pharma cluster in North-East Hyderabad.", "under_construction", "2026", "Shameerpet", 17.5700, 78.6300, "medium", "HMDA"),
      infra("Outer Ring Road (ORR) Service Road Upgrades", "highway", "Widening and service-road improvements along the existing ORR.", "completed", "2023", "Outer Ring Road", 17.4200, 78.4500, "medium", "HGCL"),
    ],
  },
  {
    name: "Pune",
    slug: "pune",
    state: "Maharashtra",
    country: "India",
    latitude: 18.5204,
    longitude: 73.8567,
    description:
      "A fast-growing IT and automotive manufacturing hub with an expanding metro network and new ring-road infrastructure.",
    population: 7400000,
    economicProfile: "IT services, automotive & manufacturing, education",
    dataMode: DEMO,
    areas: [
      area("Hinjewadi", 18.5913, 73.7389, "Primary IT Park corridor, West Pune", "₹6,800 - ₹9,200 / sq.ft", 85, 78, 88, 80, 84, 36),
      area("Wagholi", 18.5793, 73.9860, "Peripheral residential growth belt, East Pune", "₹4,800 - ₹6,600 / sq.ft", 68, 70, 62, 72, 70, 46),
      area("Kharadi", 18.5510, 73.9430, "IT/commercial corridor, East Pune", "₹7,200 - ₹9,800 / sq.ft", 80, 76, 84, 78, 80, 34),
    ],
    infra: [
      infra("Pune Metro Purple & Aqua Line Extensions", "metro", "Extensions bringing metro connectivity closer to the Hinjewadi IT corridor.", "under_construction", "2026", "Hinjewadi to Shivajinagar", 18.5600, 73.8000, "high", "PMRDA / Maha-Metro"),
      infra("Pune Ring Road", "highway", "New ring road easing peripheral connectivity around the city.", "under_construction", "2027", "Outer periphery of Pune", 18.6000, 73.9500, "high", "MSRDC"),
      infra("Kharadi–Hadapsar IT Corridor Upgrade", "it_park_sez", "Continued commercial/office development along the Kharadi corridor.", "approved", "2027", "Kharadi", 18.5500, 73.9400, "medium", "PMC"),
    ],
  },
  {
    name: "Delhi",
    slug: "delhi",
    state: "Delhi (NCT)",
    country: "India",
    latitude: 28.7041,
    longitude: 77.1025,
    description:
      "India's capital region, with continued metro-network densification and peripheral growth into satellite cities such as Gurugram and Noida.",
    population: 32900000,
    economicProfile: "Government & public sector, financial services, retail, real estate",
    dataMode: DEMO,
    areas: [
      area("Dwarka Expressway Belt", 28.5525, 77.0588, "Highway-linked growth corridor, South-West Delhi/Gurugram border", "₹9,500 - ₹13,000 / sq.ft", 82, 88, 80, 86, 82, 34),
      area("Rohini / North-West Delhi", 28.7350, 77.1100, "Established residential corridor, North-West Delhi", "₹8,000 - ₹11,000 / sq.ft", 76, 72, 68, 62, 74, 32),
      area("New Ashok Nagar / East Delhi", 28.5950, 77.3150, "Metro-linked corridor, East Delhi near Noida border", "₹6,200 - ₹8,600 / sq.ft", 74, 70, 66, 64, 72, 40),
    ],
    infra: [
      infra("Dwarka Expressway", "highway", "Access-controlled expressway connecting Delhi to Gurugram, reducing NH-48 congestion.", "completed", "2024", "South-West Delhi to Gurugram", 28.5200, 77.0500, "high", "NHAI"),
      infra("Delhi Metro Phase IV", "metro", "Multiple new metro corridors extending network coverage across the NCR periphery.", "under_construction", "2026", "Multiple corridors", 28.6500, 77.1500, "high", "DMRC"),
      infra("Delhi–Meerut RRTS (Namo Bharat)", "railway", "Regional rapid transit connecting Delhi to Meerut via Ghaziabad.", "under_construction", "2025", "Delhi to Meerut corridor", 28.6700, 77.4500, "medium", "NCRTC"),
    ],
  },
  {
    name: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    country: "India",
    latitude: 13.0827,
    longitude: 80.2707,
    description:
      "A key automotive, IT, and port city with metro expansion and IT-corridor growth along OMR and GST Road.",
    population: 11500000,
    economicProfile: "Automotive manufacturing, IT services, ports & logistics",
    dataMode: DEMO,
    areas: [
      area("OMR (Old Mahabalipuram Road)", 12.8996, 80.2209, "IT corridor, South Chennai", "₹6,500 - ₹9,000 / sq.ft", 84, 80, 86, 79, 82, 36),
      area("GST Road (Tambaram–Vandalur)", 12.9200, 80.1200, "Industrial/highway corridor, South-West Chennai", "₹4,600 - ₹6,400 / sq.ft", 70, 78, 65, 72, 68, 46),
    ],
    infra: [
      infra("Chennai Metro Phase II", "metro", "New metro corridors extending coverage to OMR and outer suburbs.", "under_construction", "2027", "OMR & Poonamallee corridors", 12.9500, 80.1800, "high", "CMRL"),
      infra("Chennai–Bengaluru Industrial Corridor", "industrial", "Planned industrial corridor development along the Chennai periphery.", "proposed", "2030", "North-West Chennai periphery", 13.1500, 80.0500, "medium", "TNIDCO"),
    ],
  },
  {
    name: "Kolkata",
    slug: "kolkata",
    state: "West Bengal",
    country: "India",
    latitude: 22.5726,
    longitude: 88.3639,
    description:
      "Eastern India's largest metropolitan hub, with metro network expansion and New Town Rajarhat driving peripheral growth.",
    population: 14900000,
    economicProfile: "Trade & commerce, IT/ITES, manufacturing, ports",
    dataMode: DEMO,
    areas: [
      area("New Town (Rajarhat)", 22.5958, 88.4800, "Planned IT/residential township, East Kolkata", "₹4,800 - ₹6,800 / sq.ft", 78, 82, 74, 80, 76, 40),
      area("Salt Lake (Bidhannagar)", 22.5800, 88.4200, "Established IT & commercial hub, East Kolkata", "₹6,200 - ₹8,400 / sq.ft", 76, 74, 78, 68, 74, 36),
    ],
    infra: [
      infra("Kolkata Metro East-West Corridor", "metro", "Under-river metro corridor connecting Howrah to Salt Lake/New Town.", "under_construction", "2026", "Howrah to Salt Lake", 22.5850, 88.3600, "high", "KMRC"),
      infra("New Town IT & Financial Hub Expansion", "it_park_sez", "Continued office/IT space development in New Town Rajarhat.", "approved", "2027", "New Town", 22.6000, 88.4700, "medium", "HIDCO"),
    ],
  },
  {
    name: "Ahmedabad",
    slug: "ahmedabad",
    state: "Gujarat",
    country: "India",
    latitude: 23.0225,
    longitude: 72.5714,
    description:
      "A major textile, chemicals, and financial-services hub anchored by GIFT City and an expanding metro network.",
    population: 8400000,
    economicProfile: "Textiles & chemicals, financial services (GIFT City), pharmaceuticals",
    dataMode: DEMO,
    areas: [
      area("GIFT City (Gandhinagar)", 23.1610, 72.6850, "International financial services centre, Gandhinagar-Ahmedabad corridor", "₹5,600 - ₹7,800 / sq.ft", 82, 84, 80, 86, 80, 38),
      area("SG Highway", 23.0400, 72.5100, "Commercial/residential growth corridor, West Ahmedabad", "₹6,000 - ₹8,200 / sq.ft", 78, 76, 74, 76, 76, 36),
    ],
    infra: [
      infra("Ahmedabad Metro Phase II", "metro", "Metro extension connecting GIFT City/Gandhinagar to the core Ahmedabad network.", "under_construction", "2026", "Ahmedabad to Gandhinagar", 23.0800, 72.6000, "high", "Gujarat Metro Rail Corp"),
      infra("Mumbai–Ahmedabad High Speed Rail (Bullet Train)", "railway", "High-speed rail corridor connecting Ahmedabad to Mumbai.", "under_construction", "2028", "Ahmedabad to Mumbai corridor", 22.9000, 72.8000, "high", "NHSRCL"),
    ],
  },
  {
    name: "Noida",
    slug: "noida",
    state: "Uttar Pradesh",
    country: "India",
    latitude: 28.5355,
    longitude: 77.3910,
    description:
      "A planned NCR satellite city benefiting from metro connectivity, the upcoming Jewar airport, and IT/electronics manufacturing growth.",
    population: 700000,
    economicProfile: "IT/ITES, electronics manufacturing, media",
    dataMode: DEMO,
    areas: [
      area("Sector 62 / Noida Expressway", 28.6270, 77.3720, "IT corridor, Noida", "₹6,800 - ₹9,200 / sq.ft", 80, 82, 82, 78, 80, 36),
      area("Greater Noida (Yamuna Expressway belt)", 28.4740, 77.5000, "Airport-linked growth corridor, Greater Noida", "₹3,400 - ₹5,000 / sq.ft", 66, 84, 58, 76, 66, 52),
    ],
    infra: [
      infra("Noida International Airport (Jewar)", "airport", "New greenfield international airport serving the NCR region.", "under_construction", "2026", "Jewar, Gautam Buddh Nagar", 27.9700, 77.6700, "high", "Noida International Airport Ltd"),
      infra("Aqua Line Metro Extension", "metro", "Metro extension linking Greater Noida to the Jewar airport corridor.", "proposed", "2029", "Greater Noida to Jewar", 28.2000, 77.5800, "medium", "NMRC"),
    ],
  },
  {
    name: "Indore",
    slug: "indore",
    state: "Madhya Pradesh",
    country: "India",
    latitude: 22.7196,
    longitude: 75.8577,
    description:
      "Central India's largest commercial hub, with a growing IT/ITES sector, a new metro line, and Super Corridor development.",
    population: 3300000,
    economicProfile: "Trade & commerce, IT/ITES, textiles, pharmaceuticals",
    dataMode: DEMO,
    areas: [
      area("Super Corridor (AB Road)", 22.7350, 75.8100, "Planned IT/commercial corridor, West Indore", "₹4,200 - ₹6,000 / sq.ft", 76, 82, 72, 84, 74, 42),
      area("Vijay Nagar", 22.7530, 75.8930, "Established commercial hub, Central Indore", "₹5,600 - ₹7,400 / sq.ft", 74, 70, 76, 66, 76, 34),
    ],
    infra: [
      infra("Indore Metro Rail (Yellow Line)", "metro", "First metro corridor for Indore, connecting the Super Corridor to the city core.", "under_construction", "2027", "Super Corridor to Vijay Nagar", 22.7400, 75.8500, "high", "MPMRCL"),
      infra("Indore Super Corridor IT Park Cluster", "it_park_sez", "Continued development of IT/ITES parks along the Super Corridor.", "approved", "2027", "Super Corridor (AB Road)", 22.7350, 75.8100, "medium", "IDA"),
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function area(
  name,
  latitude,
  longitude,
  locality,
  currentPriceRange,
  connectivityScore,
  infrastructureScore,
  employmentScore,
  developmentScore,
  demandScore,
  riskScore
) {
  return {
    name,
    latitude,
    longitude,
    locality,
    currentPriceRange,
    connectivityScore,
    infrastructureScore,
    employmentScore,
    developmentScore,
    demandScore,
    riskScore,
    dataMode: DEMO,
  };
}

function infra(name, type, description, status, estimatedCompletion, location, latitude, longitude, impactLevel, org) {
  return {
    name,
    type,
    description,
    status,
    estimatedCompletion,
    location,
    latitude,
    longitude,
    impactLevel,
    source: demoSource(org),
    sourceUrl: orgUrl(org),
    dataMode: DEMO,
  };
}

function orgUrl(org) {
  const map = {
    "BMRCL": "https://english.bmrc.co.in/",
    "BBMP / NHAI": "https://nhai.gov.in/",
    "NHAI": "https://nhai.gov.in/",
    "K-RIDE": "https://k-ride.karnataka.gov.in/",
    "Bengaluru International Airport Ltd (BIAL)": "https://www.bengaluruairport.com/",
    "KIADB": "https://kiadb.in/",
    "BDA": "https://bda.karnataka.gov.in/",
    "Karnataka IT Dept": "https://itbt.karnataka.gov.in/",
    "CIDCO": "https://cidco.maharashtra.gov.in/",
    "MMRDA": "https://mmrda.maharashtra.gov.in/",
    "MSRDC": "https://msrdc.co.in/",
    "HMRL": "https://hmrl.co.in/",
    "NHAI / HMDA": "https://hmda.gov.in/",
    "HGCL": "https://www.hgcl.telangana.gov.in/",
    "PMRDA / Maha-Metro": "https://punemetrorail.org/",
    "PMC": "https://pmc.gov.in/",
    "DMRC": "https://www.delhimetrorail.com/",
    "NCRTC": "https://ncrtc.in/",
    "CMRL": "https://chennaimetrorail.org/",
    "TNIDCO": "https://tnidco.org/",
    "KMRC": "https://kmrc.in/",
    "HIDCO": "https://www.wbhidco.in/",
    "Gujarat Metro Rail Corp": "https://gujaratmetrorailcorporation.com/",
    "NHSRCL": "https://nhsrcl.in/",
    "Noida International Airport Ltd": "https://nial.co.in/",
    "NMRC": "https://www.nmrcnoida.com/",
    "MPMRCL": "https://mpmetrorail.com/",
    "IDA": "https://ida.mp.gov.in/",
  };
  return map[org] || "https://www.india.gov.in/";
}
