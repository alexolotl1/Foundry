"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

export default function ClaimAccountForm({ clubName }: { clubName: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/claim", {
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

      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-h))] items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "color-mix(in srgb, var(--gold) 16%, var(--surface-2))" }}
          >
            <KeyOutlinedIcon sx={{ fontSize: 22, color: "var(--gold)" }} />
          </span>
          <h1
            className="text-[1.75rem] font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Set up {clubName}&apos;s login
          </h1>
          <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            You're in with your temporary credentials — now choose a real username and password
            for your whole exec team to share. These replace the temporary ones.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
              Choose a username
            </span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="3-32 characters, letters/numbers/-/_"
              required
              autoFocus
              className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
              Choose a password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium" style={{ color: "var(--text-faint)" }}>
              Confirm password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </label>

          <p className="text-[0.8125rem] leading-relaxed" style={{ color: "var(--text-faint)" }}>
            Write this down and share it with the rest of your club&apos;s officers — you&apos;ll
            need it every time you come back to edit your page. Picked wrong? You&apos;ll need to
            email the site admin to change your username later.
          </p>

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
            className="mt-2 w-full rounded-[3px] px-5 py-3 text-[0.9375rem] font-semibold transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--gold)", color: "var(--gold-contrast)" }}
          >
            {submitting ? "Saving…" : "Set up account & continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
