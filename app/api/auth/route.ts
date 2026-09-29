import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, setAdminSession, clearAdminSession, verifyAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (typeof username === "string" && typeof password === "string" && (await checkCredentials(username, password))) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    return NextResponse.json(
      { error: "Invalid administrator credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: "Logged out" });
}

export async function GET() {
  const authenticated = await verifyAdminSession();
  return NextResponse.json({ authenticated });
}
