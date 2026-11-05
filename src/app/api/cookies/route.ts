import { NextRequest, NextResponse } from "next/server";
import { saveCookieConsent, saveSession, getSessionById, getCookieConsents } from "@/lib/db";
import crypto from "crypto";

// GET /api/cookies - get cookie preferences & session from DB
export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("raycom_session_id")?.value;

    if (!sessionId) {
      return NextResponse.json({
        hasConsent: false,
        session: null,
      });
    }

    const session = getSessionById(sessionId);
    const consents = getCookieConsents();
    const userConsent = consents.find((c) => c.sessionId === sessionId);

    return NextResponse.json({
      hasConsent: !!userConsent,
      consent: userConsent || null,
      session: session || null,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read cookies" }, { status: 500 });
  }
}

// POST /api/cookies - save cookie consent & initialize database session cookie
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let sessionId = req.cookies.get("raycom_session_id")?.value;

    if (!sessionId) {
      sessionId = `rc_${crypto.randomBytes(16).toString("hex")}`;
    }

    const now = new Date().toISOString();

    // Store consent record in DB
    const consentRecord = saveCookieConsent({
      sessionId,
      analytics: body.analytics ?? true,
      marketing: body.marketing ?? true,
      preferences: body.preferences ?? true,
      userAgent: req.headers.get("user-agent") || undefined,
      createdAt: now,
      updatedAt: now,
    });

    // Store user session state in DB
    const sessionRecord = saveSession({
      sessionId,
      customerName: body.customerName,
      phone: body.phone,
      lastCountry: body.lastCountry,
      lastState: body.lastState,
      lastLga: body.lastLga,
      lastService: body.lastService,
      createdAt: now,
      updatedAt: now,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        consent: consentRecord,
        session: sessionRecord,
      },
    });

    // Set secure HTTP-only cookie on response
    response.cookies.set({
      name: "raycom_session_id",
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    // Set client-accessible preference cookie
    response.cookies.set({
      name: "raycom_cookie_consent",
      value: "accepted",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save cookie consent" }, { status: 500 });
  }
}

