import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "foundry_club_session";
export const ADMIN_SESSION_COOKIE = "foundry_admin_session";

const SECRET = process.env.SESSION_SECRET || "foundry-dev-secret-change-me";

function sign(purpose: string, value: string): string {
  return createHmac("sha256", SECRET).update(`${purpose}:${value}`).digest("hex");
}

function createToken(purpose: string, value: string): string {
  return `${value}.${sign(purpose, value)}`;
}

function readToken(purpose: string, token: string | undefined | null): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;

  const value = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(purpose, value);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return value;
}

export function createSessionToken(clubId: string): string {
  return createToken("club", clubId);
}

export function readSessionToken(token: string | undefined | null): string | null {
  return readToken("club", token);
}

export function createAdminSessionToken(): string {
  return createToken("admin", "admin");
}

export function readAdminSessionToken(token: string | undefined | null): boolean {
  return readToken("admin", token) === "admin";
}
