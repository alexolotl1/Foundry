"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import type { Club } from "@/types/club";
import type { SubmissionDetail } from "@/lib/submissions";
import ClubHeader from "@/components/ClubHeader";
import ClubOverview from "@/components/ClubOverview";
import ClubAbout from "@/components/ClubAbout";

export interface SubmissionEntry {
  clubName: string;
  submittedAt: string;
  submission: SubmissionDetail;
  baseClub: Club;
}

function buildPreviewClub(baseClub: Club, submission: SubmissionDetail): Club {
  return {
    ...baseClub,
    description: submission.description,
    tags: submission.tags,
    meetingDays: submission.meetingDays,
    commitmentLevel: submission.commitmentLevel,
    rooms: submission.rooms,
    advisor: submission.advisor,
    links: submission.links,
    joinLink: submission.joinLink || undefined,
    meetingsLookLike: submission.meetingsLookLike || undefined,
    whatMakesUnique: submission.whatMakesUnique || undefined,
    logoUrl: submission.logoUrl || baseClub.logoUrl,
  };
}

export default function AdminReviewDashboard({ entries: initialEntries }: { entries: SubmissionEntry[] }) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [selected, setSelected] = useState<string | null>(initialEntries[0]?.submission.clubId ?? null);
  const [tab, setTab] = useState<"overview" | "about">("overview");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = entries.find((e) => e.submission.clubId === selected);

  async function handleLogout() {
    await fetch("/api/admin-review/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function act(action: "approve" | "reject") {
    if (!current) return;
    setBusy(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin-review/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId: current.submission.clubId }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Something went wrong.");
        setBusy(false);
        return;
      }

      const remaining = entries.filter((e) => e.submission.clubId !== current.submission.clubId);
      setEntries(remaining);
      setSelected(remaining[0]?.submission.clubId ?? null);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
            Admin
          </p>
          <h1 className="text-[1.75rem] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Pending submissions
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-[3px] px-4 py-2.5 text-[0.875rem] font-medium"
          style={{ border: "1px solid var(--border-strong)", color: "var(--text-muted)", background: "transparent" }}
        >
          <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
          Log out
        </button>
      </div>

      {entries.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 rounded-[6px] px-6 py-16 text-center"
          style={{ border: "1px dashed var(--border)", color: "var(--text-muted)" }}
        >
          <InboxOutlinedIcon sx={{ fontSize: 28, color: "var(--text-faint)" }} />
          Nothing waiting on review right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col gap-2">
            {entries.map((e) => {
              const isActive = e.submission.clubId === selected;
              return (
                <button
                  key={e.submission.clubId}
                  type="button"
                  onClick={() => setSelected(e.submission.clubId)}
                  className="flex flex-col gap-0.5 rounded-[4px] px-4 py-3 text-left"
                  style={{
                    background: isActive ? "var(--surface-2)" : "transparent",
                    border: `1px solid ${isActive ? "var(--gold)" : "var(--border)"}`,
                  }}
                >
                  <span className="text-[0.9375rem] font-semibold" style={{ color: isActive ? "var(--gold)" : "var(--text)" }}>
                    {e.clubName}
                  </span>
                  <span className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                    Submitted {new Date(e.submittedAt).toLocaleDateString()}
                  </span>
                </button>
              );
            })}
          </div>

          {current && (
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                {(["overview", "about"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className="cursor-pointer rounded-[3px] px-4 py-2 text-[0.875rem] font-medium"
                    style={{
                      background: tab === t ? "var(--surface-2)" : "transparent",
                      border: `1px solid ${tab === t ? "var(--gold)" : "var(--border)"}`,
                      color: tab === t ? "var(--gold)" : "var(--text-muted)",
                    }}
                  >
                    {t === "overview" ? "Overview" : "About"}
                  </button>
                ))}
              </div>

              <div
                className="flex flex-col gap-8 rounded-[6px] p-6"
                style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
              >
                {(() => {
                  const previewClub = buildPreviewClub(current.baseClub, current.submission);
                  return (
                    <>
                      <ClubHeader club={previewClub} />
                      <div className="border-t" style={{ borderColor: "var(--border)" }} />
                      {tab === "overview" ? <ClubOverview club={previewClub} /> : <ClubAbout club={previewClub} />}
                    </>
                  );
                })()}
              </div>

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

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => act("reject")}
                  disabled={busy}
                  className="flex items-center gap-2 rounded-[3px] px-5 py-2.5 text-[0.9375rem] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    border: "1px solid color-mix(in srgb, var(--status-high) 50%, var(--border))",
                    color: "var(--status-high)",
                    background: "transparent",
                  }}
                >
                  <HighlightOffIcon sx={{ fontSize: 18 }} />
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => act("approve")}
                  disabled={busy}
                  className="flex items-center gap-2 rounded-[3px] px-5 py-2.5 text-[0.9375rem] font-semibold transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: "var(--status-low)", color: "var(--bg)" }}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                  Approve
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
