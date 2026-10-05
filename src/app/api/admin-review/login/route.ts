import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminLogin } from "@/lib/adminAccounts";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!(await verifyAdminLogin(username, password))) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}
