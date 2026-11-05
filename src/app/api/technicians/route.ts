import { NextResponse } from "next/server";
import { getTechnicians, updateTechnicianStatus } from "@/lib/db";

export async function GET() {
  try {
    const data = getTechnicians();
    return NextResponse.json({ success: true, count: data.length, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch technicians" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required" },
        { status: 400 }
      );
    }

    const updated = updateTechnicianStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Technician not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update technician" },
      { status: 500 }
    );
  }
}

