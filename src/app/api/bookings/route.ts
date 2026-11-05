import { NextResponse } from "next/server";
import { getBookings, createBooking } from "@/lib/db";

// GET /api/bookings - fetch all quotes & bookings
export async function GET() {
  try {
    const data = getBookings();
    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST /api/bookings - submit new quote/booking request
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.customerName && !body.name) {
      return NextResponse.json(
        { success: false, error: "Customer name is required" },
        { status: 400 }
      );
    }

    if (!body.phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const newRecord = createBooking({
      customerName: body.customerName || body.name,
      phone: body.phone,
      service: body.service || "House Cleaning",
      country: body.country || "Nigeria",
      state: body.state || "Lagos",
      lga: body.lga || "Ikeja",
      street: body.street || "",
      houseAddress: body.houseAddress || "",
      latitude: body.latitude || 6.6018,
      longitude: body.longitude || 3.3515,
      preferredDate: body.preferredDate,
      urgency: body.urgency || "Standard",
      notes: body.notes || body.message || "",
    });

    return NextResponse.json({ success: true, data: newRecord }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save booking" },
      { status: 500 }
    );
  }
}

