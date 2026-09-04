import { NextRequest, NextResponse } from "next/server";
import { addEnquiry, getEnquiries } from "../../../lib/cms/store";
import { verifyAdminSession } from "../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, destination, travelType, travelDate, travellersCount, budget, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are strictly required." },
        { status: 400 }
      );
    }

    const newEnquiry = await addEnquiry({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      destination: String(destination || "Unspecified").trim(),
      travelType: travelType || "Domestic",
      travelDate: travelDate || "Flexible",
      travellersCount: travellersCount || "2 Adults",
      budget: budget || "",
      message: message || "",
    });

    return NextResponse.json({ success: true, enquiry: newEnquiry }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const list = await getEnquiries();
  return NextResponse.json({ enquiries: list });
}
