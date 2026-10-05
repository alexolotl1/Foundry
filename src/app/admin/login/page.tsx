"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin-review/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Something went wrong.");
        setSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-h))] items-center justify-center px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "color-mix(in srgb, var(--tone-violet) 18%, var(--surface-2))" }}
          >
            <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 22, color: "var(--tone-violet)" }} />
          </span>
          <h1
            className="text-[1.75rem] font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Review dashboard
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
              Username
            </span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </label>

          {error && (
            <p
              className="rounded-[3px] px-3.5 py-2.5 text-[0.875rem]"
              style={{
                background: "color-mix(in srgb, var(--status-high) 14%, var(--surface))",
                border: "1px solid color-mix(in srgb, var(--status-high) 45%, var(--border))",
                color: "var(--text)",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[3px] px-5 py-3 text-[0.9375rem] font-semibold transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--tone-violet)", color: "var(--bg)" }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
