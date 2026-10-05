"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import type { Club, CommitmentLevel, Tag, Weekday } from "@/types/club";
import { ALL_TAGS } from "@/data/tags";
import { WEEKDAYS } from "@/data/weekdays";
import TagChip from "@/components/TagChip";
import FilterChip from "@/components/FilterChip";
import ClubHeader from "@/components/ClubHeader";
import ClubOverview from "@/components/ClubOverview";
import ClubAbout from "@/components/ClubAbout";
import ClubLogo from "@/components/ClubLogo";
import SubmitSuccessModal from "@/components/admin/SubmitSuccessModal";

const MAX_LOGO_BYTES = 4 * 1024 * 1024;
const ALLOWED_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

const COMMITMENT_LEVELS: { value: CommitmentLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const STEPS = ["Overview details", "Answer a few questions", "Preview & submit"] as const;

interface FormState {
  logoUrl: string;
  description: string;
  tags: Tag[];
  meetingDays: Weekday[];
  commitmentLevel: CommitmentLevel;
  roomsText: string;
  advisor: string;
  link1: string;
  link2: string;
  link3: string;
  joinLink: string;
  meetingsLookLike: string;
  whatMakesUnique: string;
}

function initialState(club: Club): FormState {
  const [link1 = "", link2 = "", link3 = ""] = club.links ?? [];
  return {
    logoUrl: club.logoUrl ?? "",
    description: club.description,
    tags: club.tags,
    meetingDays: club.meetingDays,
    commitmentLevel: club.commitmentLevel,
    roomsText: club.rooms.join(", "),
    advisor: club.advisor,
    link1,
    link2,
    link3,
    joinLink: club.joinLink ?? "",
    meetingsLookLike: club.meetingsLookLike ?? "",
    whatMakesUnique: club.whatMakesUnique ?? "",
  };
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.875rem] font-semibold" style={{ color: "var(--text)" }}>
        {label}
      </span>
      {hint && (
        <span className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
          {hint}
        </span>
      )}
      {children}
    </label>
  );
}

const inputStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text)",
} as const;

export default function AdminWizard({ club }: { club: Club }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(() => initialState(club));
  const [previewTab, setPreviewTab] = useState<"overview" | "about">("overview");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setLogoError(null);

    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      setLogoError("That doesn't look like an image. Use PNG, JPG, WEBP, or GIF.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("That image is too big — keep it under 4MB.");
      return;
    }

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload-logo", { method: "POST", body: formData });
      const body = await res.json();

      if (!res.ok) {
        setLogoError(body.error ?? "Upload failed.");
        return;
      }

      set("logoUrl", body.url);
    } catch {
      setLogoError("Couldn't reach the server. Try again.");
    } finally {
      setUploadingLogo(false);
    }
  }

  function toggleTag(tag: Tag) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  }

  function toggleDay(day: Weekday) {
    setForm((f) => ({
      ...f,
      meetingDays: f.meetingDays.includes(day)
        ? f.meetingDays.filter((d) => d !== day)
        : [...f.meetingDays, day],
    }));
  }

  const previewClub: Club = {
    ...club,
    logoUrl: form.logoUrl || club.logoUrl,
    description: form.description,
    tags: form.tags,
    meetingDays: form.meetingDays,
    commitmentLevel: form.commitmentLevel,
    rooms: form.roomsText
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean),
    advisor: form.advisor,
    links: [form.link1, form.link2, form.link3].filter(Boolean),
    joinLink: form.joinLink || undefined,
    meetingsLookLike: form.meetingsLookLike || undefined,
    whatMakesUnique: form.whatMakesUnique || undefined,
  };

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logoUrl: form.logoUrl || null,
          description: form.description,
          tags: form.tags,
          meetingDays: form.meetingDays,
          commitmentLevel: form.commitmentLevel,
          rooms: previewClub.rooms,
          advisor: form.advisor,
          links: previewClub.links,
          joinLink: form.joinLink,
          meetingsLookLike: form.meetingsLookLike,
          whatMakesUnique: form.whatMakesUnique,
        }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body.error ?? "Couldn't save your changes.");
        setSubmitting(false);
        return;
      }

      setSaved(true);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  async function handleBackToLogin() {
    setSaved(false);
    await handleLogout();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
            Editing
          </p>
          <h1 className="text-[1.75rem] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            {club.name}
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

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold"
                style={{
                  background: i <= step ? "var(--gold)" : "var(--surface-2)",
                  color: i <= step ? "var(--gold-contrast)" : "var(--text-faint)",
                }}
              >
                {i + 1}
              </span>
              <span
                className="hidden text-[0.875rem] font-medium sm:inline"
                style={{ color: i === step ? "var(--text)" : "var(--text-faint)" }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-px flex-1" style={{ background: i < step ? "var(--gold)" : "var(--border)" }} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {step === 0 && (
          <div className="flex flex-col gap-7">
            <Field label="Club logo" hint="PNG, JPG, WEBP, or GIF — up to 4MB.">
              <div className="flex items-center gap-4">
                <div
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-[4px]"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <ClubLogo club={{ ...club, logoUrl: form.logoUrl || undefined }} />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-[3px] px-4 py-2 text-[0.875rem] font-medium"
                    style={{
                      border: "1px solid var(--border-strong)",
                      color: "var(--text)",
                      opacity: uploadingLogo ? 0.6 : 1,
                    }}
                  >
                    <CloudUploadOutlinedIcon sx={{ fontSize: 18 }} />
                    {uploadingLogo ? "Uploading…" : form.logoUrl ? "Replace image" : "Upload image"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={handleLogoChange}
                      disabled={uploadingLogo}
                    />
                  </label>
                  {logoError && (
                    <span className="text-[0.8125rem]" style={{ color: "var(--status-high)" }}>
                      {logoError}
                    </span>
                  )}
                </div>
              </div>
            </Field>

            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={4}
                className="w-full resize-y rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                style={inputStyle}
              />
            </Field>

            <Field label="Tags" hint="Pick whatever categories describe your club.">
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="cursor-pointer border-none bg-transparent p-0"
                    aria-pressed={form.tags.includes(tag)}
                  >
                    <TagChip tag={tag} active={form.tags.includes(tag)} size="md" />
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Meeting days" hint="Click each day your club meets.">
              <div className="flex flex-wrap gap-2">
                {WEEKDAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className="cursor-pointer border-none bg-transparent p-0"
                    aria-pressed={form.meetingDays.includes(day)}
                  >
                    <FilterChip label={day} active={form.meetingDays.includes(day)} size="md" />
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Commitment level">
              <div className="flex flex-wrap gap-2">
                {COMMITMENT_LEVELS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set("commitmentLevel", value)}
                    className="cursor-pointer border-none bg-transparent p-0"
                    aria-pressed={form.commitmentLevel === value}
                  >
                    <FilterChip label={label} active={form.commitmentLevel === value} size="md" />
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Room(s)" hint="Separate multiple rooms with commas.">
                <input
                  type="text"
                  value={form.roomsText}
                  onChange={(e) => set("roomsText", e.target.value)}
                  placeholder="e.g. 2W7, 3E4"
                  className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                  style={inputStyle}
                />
              </Field>

              <Field label="Faculty advisor">
                <input
                  type="text"
                  value={form.advisor}
                  onChange={(e) => set("advisor", e.target.value)}
                  className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>

            <Field label="Links" hint="Up to three — a website, Instagram, Discord, etc.">
              <div className="flex flex-col gap-2.5">
                {(["link1", "link2", "link3"] as const).map((key, i) => (
                  <input
                    key={key}
                    type="url"
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={`Link ${i + 1}`}
                    className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                    style={inputStyle}
                  />
                ))}
              </div>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-7">
            <Field label="What do your meetings look like?" hint="Shown on your club's About tab.">
              <textarea
                value={form.meetingsLookLike}
                onChange={(e) => set("meetingsLookLike", e.target.value)}
                rows={5}
                placeholder="Walk a new member through a typical meeting…"
                className="w-full resize-y rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                style={inputStyle}
              />
            </Field>

            <Field label="What makes this activity unique?" hint="Shown on your club's About tab.">
              <textarea
                value={form.whatMakesUnique}
                onChange={(e) => set("whatMakesUnique", e.target.value)}
                rows={5}
                placeholder="What would you tell someone who's on the fence about joining?"
                className="w-full resize-y rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                style={inputStyle}
              />
            </Field>

            <Field label="Sign-up link" hint="A Google Form or similar — optional. Powers the “How to join” button.">
              <input
                type="url"
                value={form.joinLink}
                onChange={(e) => set("joinLink", e.target.value)}
                placeholder="https://forms.gle/…"
                className="w-full rounded-[3px] px-4 py-3 text-[0.9375rem] outline-none"
                style={inputStyle}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div
              className="flex items-center gap-3 rounded-[4px] px-4 py-3"
              style={{
                background: "color-mix(in srgb, var(--gold) 14%, var(--surface))",
                border: "1px solid color-mix(in srgb, var(--gold) 45%, var(--border))",
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 20, color: "var(--gold)" }} />
              <p className="text-[0.875rem]" style={{ color: "var(--text)" }}>
                This is a demo of what your page would look like. Submitting sends it for admin
                review — it won't go live until approved.
              </p>
            </div>

            <div className="flex gap-2">
              {(["overview", "about"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPreviewTab(tab)}
                  className="cursor-pointer rounded-[3px] px-4 py-2 text-[0.875rem] font-medium"
                  style={{
                    background: previewTab === tab ? "var(--surface-2)" : "transparent",
                    border: `1px solid ${previewTab === tab ? "var(--gold)" : "var(--border)"}`,
                    color: previewTab === tab ? "var(--gold)" : "var(--text-muted)",
                  }}
                >
                  {tab === "overview" ? "Overview" : "About"}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-8 rounded-[6px] p-6" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
              <ClubHeader club={previewClub} />
              <div className="border-t" style={{ borderColor: "var(--border)" }} />
              {previewTab === "overview" ? <ClubOverview club={previewClub} /> : <ClubAbout club={previewClub} />}
            </div>
          </div>
        )}
      </motion.div>

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

      <SubmitSuccessModal open={saved} onClose={() => setSaved(false)} onBackToLogin={handleBackToLogin} />

      <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--border)" }}>
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-[3px] px-5 py-2.5 text-[0.9375rem] font-medium disabled:cursor-not-allowed disabled:opacity-40"
          style={{ border: "1px solid var(--border-strong)", color: "var(--text)", background: "transparent" }}
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            className="rounded-[3px] px-5 py-2.5 text-[0.9375rem] font-semibold transition-opacity duration-150 hover:opacity-85"
            style={{ background: "var(--gold)", color: "var(--gold-contrast)" }}
          >
            {step === STEPS.length - 2 ? "Preview" : "Next"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-[3px] px-5 py-2.5 text-[0.9375rem] font-semibold transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--gold)", color: "var(--gold-contrast)" }}
          >
            {submitting ? "Submitting…" : "Submit for review"}
          </button>
        )}
      </div>
    </div>
  );
}
