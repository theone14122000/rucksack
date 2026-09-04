import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, setAdminSession, clearAdminSession, verifyAdminSession } from "../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    return NextResponse.json(
      { error: "Invalid administrator credentials" },
      { status: 401 }
    );
  } catch (err) {
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
