import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { rejectSubmission } from "@/lib/submissions";
import { readAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  const store = await cookies();
  if (!readAdminSessionToken(store.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const clubId = typeof body?.clubId === "string" ? body.clubId : "";
  if (!clubId) {
    return NextResponse.json({ error: "Missing club id." }, { status: 400 });
  }

  try {
    await rejectSubmission(clubId);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to reject.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
