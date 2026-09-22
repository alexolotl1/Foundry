import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "foundry_club_session";

// Falls back to a fixed dev secret so local testing works without extra
// setup — set SESSION_SECRET in .env.local before this ever goes anywhere
// real, since anyone who can read that fallback can forge a session cookie.
const SECRET = process.env.SESSION_SECRET || "foundry-dev-secret-change-me";

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

/** Builds a signed `<clubId>.<signature>` cookie value. */
export function createSessionToken(clubId: string): string {
  return `${clubId}.${sign(clubId)}`;
}

/** Verifies a session cookie value and returns the club id, or null. */
export function readSessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;

  const clubId = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(clubId);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return clubId;
}
