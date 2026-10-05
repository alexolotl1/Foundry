import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { claimAccount } from "@/lib/clubAccounts";
import { readSessionToken, SESSION_COOKIE } from "@/lib/session";

const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,32}$/;

export async function POST(request: Request) {
  const store = await cookies();
  const clubId = readSessionToken(store.get(SESSION_COOKIE)?.value);
  if (!clubId) {
    return NextResponse.json({ error: "Your session expired — log in again." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!USERNAME_PATTERN.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3-32 characters: letters, numbers, - or _ only." },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const result = await claimAccount(clubId, username, password);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
