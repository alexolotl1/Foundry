import "server-only";
import { supabaseAdmin } from "./supabaseAdmin";

export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  if (!username || !password) return false;

  const { data, error } = await supabaseAdmin
    .from("admin_accounts")
    .select("password")
    .eq("username", username)
    .maybeSingle();

  if (error || !data) return false;
  return data.password === password;
}
