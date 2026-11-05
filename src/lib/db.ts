import fs from "fs";
import path from "path";
import { BookingRequest, INITIAL_BOOKINGS, INITIAL_TECHNICIANS, Technician } from "@/data/adminData";

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const TECHNICIANS_FILE = path.join(DATA_DIR, "technicians.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");
const CONSENTS_FILE = path.join(DATA_DIR, "cookie_consents.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

export interface ClientUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string; // In production use bcrypt
  country: string;
  state: string;
  lga: string;
  address?: string;
  preferredService?: string; // Deep house cleaning, washing of GP tanks, plumbing, etc.
  createdAt: string;
  lastLoginAt: string;
}

export interface CookieConsentRecord {
  sessionId: string;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionRecord {
  sessionId: string;
  customerName?: string;
  phone?: string;
  lastCountry?: string;
  lastState?: string;
  lastLga?: string;
  lastService?: string;
  createdAt: string;
  updatedAt: string;
}

// Ensure data folder and json tables exist
function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(INITIAL_BOOKINGS, null, 2), "utf-8");
  }

  if (!fs.existsSync(TECHNICIANS_FILE)) {
    fs.writeFileSync(TECHNICIANS_FILE, JSON.stringify(INITIAL_TECHNICIANS, null, 2), "utf-8");
  }

  if (!fs.existsSync(SESSIONS_FILE)) {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify([], null, 2), "utf-8");
  }

  if (!fs.existsSync(CONSENTS_FILE)) {
    fs.writeFileSync(CONSENTS_FILE, JSON.stringify([], null, 2), "utf-8");
  }

  if (!fs.existsSync(USERS_FILE)) {
    // Initial sample client for immediate demo testing
    const defaultUsers: ClientUser[] = [
      {
        id: "USR-1001",
        fullName: "Amaka Okafor",
        email: "client@raycom.ng",
        phone: "+234 803 123 4567",
        passwordHash: "password123",
        country: "Nigeria",
        state: "Enugu",
        lga: "Enugu North",
        address: "Plot 12 Independence Layout",
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), "utf-8");
  }
}

// Get all bookings
export function getBookings(): BookingRequest[] {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return INITIAL_BOOKINGS;
  }
}

// Save a new booking
export function createBooking(data: Partial<BookingRequest>): BookingRequest {
  ensureDatabase();
  const current = getBookings();
  const newId = `RC-${Math.floor(7200 + Math.random() * 800)}`;

  const newBooking: BookingRequest = {
    id: data.id || newId,
    customerName: data.customerName || "Customer",
    phone: data.phone || "",
    service: data.service || "House Cleaning",
    country: data.country || "Nigeria",
    state: data.state || "Lagos",
    lga: data.lga || "Ikeja",
    street: data.street || "",
    houseAddress: data.houseAddress || "",
    latitude: data.latitude || 6.6018,
    longitude: data.longitude || 3.3515,
    preferredDate: data.preferredDate || new Date().toISOString().split("T")[0],
    urgency: data.urgency || "Standard",
    status: data.status || "Pending",
    quotedAmount: data.quotedAmount || "Estimated on Inspection",
    createdAt: "Just now",
    notes: data.notes || "",
    assignedTechnician: data.assignedTechnician,
  };

  const updated = [newBooking, ...current];
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return newBooking;
}

// Update an existing booking (e.g. status or assigned technician)
export function updateBooking(id: string, updates: Partial<BookingRequest>): BookingRequest | null {
  ensureDatabase();
  const current = getBookings();
  let updatedBooking: BookingRequest | null = null;

  const nextList = current.map((b) => {
    if (b.id === id) {
      updatedBooking = { ...b, ...updates };
      return updatedBooking;
    }
    return b;
  });

  if (updatedBooking) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(nextList, null, 2), "utf-8");
  }

  return updatedBooking;
}

// Get all technicians
export function getTechnicians(): Technician[] {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(TECHNICIANS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return INITIAL_TECHNICIANS;
  }
}

// Update technician status
export function updateTechnicianStatus(id: string, status: Technician["status"]): Technician | null {
  ensureDatabase();
  const current = getTechnicians();
  let updatedTech: Technician | null = null;

  const nextList = current.map((t) => {
    if (t.id === id) {
      updatedTech = { ...t, status };
      return updatedTech;
    }
    return t;
  });

  if (updatedTech) {
    fs.writeFileSync(TECHNICIANS_FILE, JSON.stringify(nextList, null, 2), "utf-8");
  }

  return updatedTech;
}

// --- DATABASE COOKIE CONSENT & SESSION MANAGEMENT ---

export function getCookieConsents(): CookieConsentRecord[] {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(CONSENTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCookieConsent(record: CookieConsentRecord): CookieConsentRecord {
  ensureDatabase();
  const consents = getCookieConsents();
  const existingIndex = consents.findIndex((c) => c.sessionId === record.sessionId);

  if (existingIndex >= 0) {
    consents[existingIndex] = { ...consents[existingIndex], ...record, updatedAt: new Date().toISOString() };
  } else {
    consents.push(record);
  }

  fs.writeFileSync(CONSENTS_FILE, JSON.stringify(consents, null, 2), "utf-8");
  return record;
}

export function getSessions(): SessionRecord[] {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(SESSIONS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSession(session: SessionRecord): SessionRecord {
  ensureDatabase();
  const sessions = getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === session.sessionId);

  if (idx >= 0) {
    sessions[idx] = { ...sessions[idx], ...session, updatedAt: new Date().toISOString() };
  } else {
    sessions.push(session);
  }

  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
  return session;
}

export function getSessionById(sessionId: string): SessionRecord | null {
  ensureDatabase();
  const sessions = getSessions();
  return sessions.find((s) => s.sessionId === sessionId) || null;
}

// --- CLIENT AUTHENTICATION & USER MANAGEMENT ---

export function getClientUsers(): ClientUser[] {
  ensureDatabase();
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function findClientByEmail(email: string): ClientUser | null {
  const users = getClientUsers();
  return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
}

export function createClientUser(data: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  country?: string;
  state?: string;
  lga?: string;
  address?: string;
  preferredService?: string;
}): { success: boolean; user?: Omit<ClientUser, "passwordHash">; error?: string } {
  ensureDatabase();
  const users = getClientUsers();

  const existing = users.find(
    (u) => u.email.toLowerCase() === data.email.trim().toLowerCase()
  );
  if (existing) {
    return { success: false, error: "An account with this email address already exists. Please sign in instead." };
  }

  const newUser: ClientUser = {
    id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    passwordHash: data.password, // Simple stored credential for project scope
    country: data.country || "Nigeria",
    state: data.state || "Lagos",
    lga: data.lga || "Ikeja",
    address: data.address || "",
    preferredService: data.preferredService || "Deep House Cleaning",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");

  const { passwordHash: _, ...userSafe } = newUser;
  return { success: true, user: userSafe };
}

export function authenticateClientUser(
  email: string,
  password: string
): { success: boolean; user?: Omit<ClientUser, "passwordHash">; error?: string } {
  ensureDatabase();
  const user = findClientByEmail(email);

  if (!user) {
    return { success: false, error: "No client account found with this email. Please sign up." };
  }

  if (user.passwordHash !== password) {
    return { success: false, error: "Incorrect password. Please verify and try again." };
  }

  // Update last login
  const users = getClientUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx].lastLoginAt = new Date().toISOString();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  }

  const { passwordHash: _, ...userSafe } = user;
  return { success: true, user: userSafe };
}
