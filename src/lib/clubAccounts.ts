import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";

export interface LoginResult {
  clubId: string;
  checkedIn: boolean;
}

export async function verifyLogin(username: string, password: string): Promise<LoginResult | null> {
  if (!username || !password) return null;

  const { data, error } = await supabaseAdmin
    .from("club_accounts")
    .select("club_id, password, checked_in")
    .eq("username", username)
    .maybeSingle();

  if (error || !data || data.password !== password) return null;

  return { clubId: data.club_id, checkedIn: data.checked_in };
}

export async function isCheckedIn(clubId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("club_accounts")
    .select("checked_in")
    .eq("club_id", clubId)
    .maybeSingle();

  return Boolean(data && !error && data.checked_in);
}

export async function claimAccount(
  clubId: string,
  username: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { data: usernameTaken } = await supabaseAdmin
    .from("club_accounts")
    .select("club_id")
    .eq("username", username)
    .neq("club_id", clubId)
    .maybeSingle();

  if (usernameTaken) {
    return { ok: false, error: "That username is already taken — try another." };
  }

  const { error } = await supabaseAdmin
    .from("club_accounts")
    .update({
      username,
      password,
      checked_in: true,
      checked_in_at: new Date().toISOString(),
    })
    .eq("club_id", clubId);

  if (error) {
    return { ok: false, error: "Something went wrong saving your account. Try again." };
  }

  return { ok: true };
}
