import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "rucksack_admin_token";
export const ADMIN_CREDENTIALS = {
  username: "admin@rucksackadventures.com",
  password: "Rucksack@2026#Himalayas",
};

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    return token === "session_rucksack_admin_verified_2026";
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "session_rucksack_admin_verified_2026", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
