import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "rucksack_admin_token";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const USERNAME = process.env.ADMIN_USERNAME || "admin@rucksackadventures.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "Rucksack@2026#Himalayas";
const SECRET = process.env.ADMIN_SESSION_SECRET || "rucksack-admin-session-secret-2026";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const b64 = typeof btoa === "function" ? btoa(binary) : Buffer.from(bytes).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createAdminToken(): Promise<string> {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

/** Verifies a raw token value. Usable from middleware (no next/headers needed). */
export async function verifyToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (!/^\d{10,}$/.test(expiresAt)) return false;
  if (Number(expiresAt) < Date.now()) return false;
  const expected = await sign(expiresAt);
  return constantTimeEqual(expected, signature);
}

export async function checkCredentials(username: string, password: string): Promise<boolean> {
  const userOk = constantTimeEqual(USERNAME, username.trim());
  const passOk = constantTimeEqual(PASSWORD, password);
  return userOk && passOk;
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return await verifyToken(token);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, await createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
