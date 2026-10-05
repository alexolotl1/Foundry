import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readSessionToken, SESSION_COOKIE } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  const store = await cookies();
  const clubId = readSessionToken(store.get(SESSION_COOKIE)?.value);
  if (!clubId) {
    return NextResponse.json({ error: "Your session expired — log in again." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "That doesn't look like an image. Use PNG, JPG, WEBP, or GIF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "That image is too big — keep it under 4MB." }, { status: 400 });
  }

  const path = `${clubId}/${Date.now()}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabaseAdmin.storage
    .from("club-logos")
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from("club-logos").getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl });
}
