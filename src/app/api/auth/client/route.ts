import { NextResponse } from "next/server";
import { authenticateClientUser, createClientUser, getClientUsers } from "@/lib/db";

// GET /api/auth/client - Verify current session or list client users (admin)
export async function GET() {
  try {
    const users = getClientUsers().map(({ passwordHash: _, ...u }) => u);
    return NextResponse.json({ success: true, count: users.length, users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

// POST /api/auth/client - Handle client Sign-in or Sign-up
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body; // "login" | "register"

    if (action === "login") {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required" },
          { status: 400 }
        );
      }

      const auth = authenticateClientUser(email, password);
      if (!auth.success) {
        return NextResponse.json(
          { success: false, error: auth.error },
          { status: 401 }
        );
      }

      const response = NextResponse.json({
        success: true,
        message: `Welcome back, ${auth.user?.fullName}!`,
        user: auth.user,
      });

      // Set client session cookie
      response.cookies.set({
        name: "raycom_client_session",
        value: JSON.stringify({
          id: auth.user?.id,
          name: auth.user?.fullName,
          email: auth.user?.email,
          phone: auth.user?.phone,
          state: auth.user?.state,
          lga: auth.user?.lga,
          preferredService: auth.user?.preferredService || "Deep House Cleaning",
        }),
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
      });

      return response;
    }

    if (action === "register") {
      const { fullName, email, phone, password, country, state, lga, address, preferredService } = body;

      if (!fullName || !email || !phone || !password) {
        return NextResponse.json(
          { success: false, error: "Full Name, Email, Phone, and Password are required" },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { success: false, error: "Password must be at least 6 characters long" },
          { status: 400 }
        );
      }

      const result = createClientUser({
        fullName,
        email,
        phone,
        password,
        country: country || "Nigeria",
        state: state || "Lagos",
        lga: lga || "Ikeja",
        address: address || "",
        preferredService: preferredService || "Deep House Cleaning",
      });

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }

      const response = NextResponse.json({
        success: true,
        message: `Account created successfully! Welcome, ${result.user?.fullName}.`,
        user: result.user,
      });

      // Set client session cookie
      response.cookies.set({
        name: "raycom_client_session",
        value: JSON.stringify({
          id: result.user?.id,
          name: result.user?.fullName,
          email: result.user?.email,
          phone: result.user?.phone,
          state: result.user?.state,
          lga: result.user?.lga,
          preferredService: result.user?.preferredService || "Deep House Cleaning",
        }),
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Expected 'login' or 'register'" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error processing client authentication" },
      { status: 500 }
    );
  }
}

