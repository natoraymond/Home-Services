export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  country: string;
  state: string;
  lga: string;
  street: string;
  houseAddress: string;
  latitude: number;
  longitude: number;
  preferredDate: string;
  urgency: "Emergency" | "Standard" | "Scheduled";
  status: "Pending" | "Assigned" | "In-Progress" | "Completed" | "Cancelled";
  assignedTechnician?: string;
  quotedAmount: string;
  createdAt: string;
  notes?: string;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  state: string;
  lga: string;
  status: "Available" | "On-Job" | "Off-Duty";
  rating: number;
  completedJobs: number;
}

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: "RC-7091",
    customerName: "Chief Femi Adekunle",
    phone: "+234 803 219 8840",
    service: "Washing of GP Tanks",
    country: "Nigeria",
    state: "Lagos",
    lga: "Eti-Osa (Lekki / Victoria Island)",
    street: "Admiralty Way, Lekki Phase 1",
    houseAddress: "Plot 12, Block 4B",
    latitude: 6.4584,
    longitude: 3.6015,
    preferredDate: "2026-11-02",
    urgency: "Emergency",
    status: "Pending",
    quotedAmount: "₦85,000",
    createdAt: "10 mins ago",
    notes: "3 x 2,500L overhead poly tanks. Brown residue noticed in showers.",
  },
  {
    id: "RC-7090",
    customerName: "Dr. Ngozi Eze",
    phone: "+234 812 555 4321",
    service: "Deep House Cleaning",
    country: "Nigeria",
    state: "Federal Capital Territory (Abuja)",
    lga: "Abuja Municipal (AMAC)",
    street: "Aguiyi Ironsi Street, Maitama",
    houseAddress: "Villa 8",
    latitude: 9.0765,
    longitude: 7.4951,
    preferredDate: "2026-11-03",
    urgency: "Scheduled",
    status: "Assigned",
    assignedTechnician: "Tunde Bakare",
    quotedAmount: "₦120,000",
    createdAt: "45 mins ago",
    notes: "5-bedroom duplex full sanitization and floor scrubbing before move-in.",
  },
  {
    id: "RC-7089",
    customerName: "Engr. Babatunde Lawal",
    phone: "+234 809 888 1234",
    service: "Plumbing & Drainage",
    country: "Nigeria",
    state: "Lagos",
    lga: "Ikeja",
    street: "Isaac John Street, GRA",
    houseAddress: "House 24A",
    latitude: 6.6018,
    longitude: 3.3515,
    preferredDate: "2026-11-01",
    urgency: "Emergency",
    status: "In-Progress",
    assignedTechnician: "Chukwudi Okafor",
    quotedAmount: "₦45,000",
    createdAt: "2 hours ago",
    notes: "Main pressure booster pump burst pipe and flooding back garden.",
  },
  {
    id: "RC-7088",
    customerName: "Mrs. Amaka Johnson",
    phone: "+234 802 333 9988",
    service: "Electrical & Lighting",
    country: "Nigeria",
    state: "Rivers",
    lga: "Port Harcourt",
    street: "Peter Odili Road",
    houseAddress: "Flat 3, Royale Estate",
    latitude: 4.8156,
    longitude: 7.0498,
    preferredDate: "2026-11-04",
    urgency: "Standard",
    status: "Completed",
    assignedTechnician: "Emeka Stanley",
    quotedAmount: "₦65,000",
    createdAt: "1 day ago",
    notes: "Breaker panel replacement and solar inverter load balance inspection.",
  },
  {
    id: "RC-7087",
    customerName: "David Mensah",
    phone: "+233 24 123 4567",
    service: "HVAC & Climate Control",
    country: "Ghana",
    state: "Greater Accra",
    lga: "Ayawaso West (East Legon)",
    street: "Lagos Avenue",
    houseAddress: "Suite 401",
    latitude: 5.6333,
    longitude: -0.1667,
    preferredDate: "2026-11-05",
    urgency: "Standard",
    status: "Pending",
    quotedAmount: "GH₵ 1,400",
    createdAt: "3 hours ago",
    notes: "3 split inverter AC units seasonal coil washing and gas pressure check.",
  },
  {
    id: "RC-7086",
    customerName: "Senator Aliyu Bello",
    phone: "+234 803 777 6655",
    service: "Washing of GP Tanks",
    country: "Nigeria",
    state: "Kano",
    lga: "Nasarawa",
    street: "Bompai Road",
    houseAddress: "Compound 10",
    latitude: 11.9833,
    longitude: 8.55,
    preferredDate: "2026-11-02",
    urgency: "Scheduled",
    status: "Assigned",
    assignedTechnician: "Ibrahim Sani",
    quotedAmount: "₦110,000",
    createdAt: "5 hours ago",
    notes: "Underground concrete reservoir 10,000L and 2 rooftop GP tanks.",
  },
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: "TECH-01",
    name: "Tunde Bakare",
    phone: "+234 802 111 0001",
    specialty: "Deep House Cleaning & Sanitation",
    state: "Lagos",
    lga: "Ikeja",
    status: "On-Job",
    rating: 4.9,
    completedJobs: 142,
  },
  {
    id: "TECH-02",
    name: "Chukwudi Okafor",
    phone: "+234 803 222 0002",
    specialty: "Master Plumber & Tank Washing",
    state: "Lagos",
    lga: "Eti-Osa (Lekki / Victoria Island)",
    status: "On-Job",
    rating: 4.95,
    completedJobs: 210,
  },
  {
    id: "TECH-03",
    name: "Emeka Stanley",
    phone: "+234 805 333 0003",
    specialty: "Certified Electrical Engineer",
    state: "Rivers",
    lga: "Port Harcourt",
    status: "Available",
    rating: 4.88,
    completedJobs: 98,
  },
  {
    id: "TECH-04",
    name: "Ibrahim Sani",
    phone: "+234 816 444 0004",
    specialty: "Water Treatment & Tank Desludging",
    state: "Kano",
    lga: "Nasarawa",
    status: "Available",
    rating: 4.92,
    completedJobs: 115,
  },
  {
    id: "TECH-05",
    name: "Kofi Boateng",
    phone: "+233 24 555 0005",
    specialty: "HVAC & Commercial Air Systems",
    state: "Greater Accra",
    lga: "Ayawaso West (East Legon)",
    status: "Available",
    rating: 4.85,
    completedJobs: 84,
  },
];

