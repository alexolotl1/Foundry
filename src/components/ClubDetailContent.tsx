"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import type { Club, Weekday } from "@/types/club";
import ClubLogo from "./ClubLogo";
import TagChip from "./TagChip";
import CommitmentIndicator from "./CommitmentIndicator";
import MeetingDaysRow from "./MeetingDaysRow";
import ClubLinksRow from "./ClubLinksRow";

const DAY_NAMES: Record<Weekday, string> = {
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const COMMITMENT_COPY: Record<Club["commitmentLevel"], string> = {
  low: "Drop in when you can — attendance isn't tracked closely.",
  medium: "Expect a regular weekly meeting most weeks of the term.",
  high: "This club expects consistent attendance and outside-meeting work.",
};

function SectionHeading({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h2
      className="flex items-center gap-2 text-[1.25rem] font-semibold"
      style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
    >
      <span className="flex" style={{ color: "var(--gold)" }}>
        {icon}
      </span>
      {children}
    </h2>
  );
}

export default function ClubDetailContent({ club }: { club: Club }) {
  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-8 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="h-24 w-24 shrink-0 overflow-hidden rounded-[6px] sm:h-28 sm:w-28"
              style={{ border: "1px solid var(--border-strong)" }}
            >
              <ClubLogo club={club} />
            </motion.div>
            <div>
              <h1
                className="text-[2.25rem] font-semibold leading-tight sm:text-[2.5rem]"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                {club.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {club.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} size="md" />
                ))}
              </div>
            </div>
          </div>

          <ClubLinksRow links={club.links} />
        </div>

        <div
          className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 border-y py-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <CalendarMonthOutlinedIcon sx={{ fontSize: 19, color: "var(--gold)" }} />
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                Meets
              </span>
              <MeetingDaysRow days={club.meetingDays} />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <SpeedOutlinedIcon sx={{ fontSize: 19, color: "var(--gold)" }} />
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                Commitment
              </span>
              <CommitmentIndicator level={club.commitmentLevel} />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <PlaceOutlinedIcon sx={{ fontSize: 19, color: "var(--gold)" }} />
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                Room
              </span>
              <span className="text-[0.9375rem]" style={{ color: "var(--text)" }}>
                {club.room}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-x-14 gap-y-10 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <SectionHeading icon={<InfoOutlinedIcon sx={{ fontSize: 20 }} />}>About</SectionHeading>
            <p className="max-w-[68ch] text-[1rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {club.description}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <SectionHeading icon={<EventOutlinedIcon sx={{ fontSize: 20 }} />}>
              Meeting details
            </SectionHeading>
            <div className="rounded-[4px] p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                    Days
                  </dt>
                  <dd className="mt-1 text-[0.9375rem]" style={{ color: "var(--text)" }}>
                    {club.meetingDays.map((d) => DAY_NAMES[d]).join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                    Location
                  </dt>
                  <dd className="mt-1 text-[0.9375rem]" style={{ color: "var(--text)" }}>
                    {club.room}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                    What to expect
                  </dt>
                  <dd className="mt-1 text-[0.9375rem]" style={{ color: "var(--text)" }}>
                    {COMMITMENT_COPY[club.commitmentLevel]}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <SectionHeading icon={<GroupsOutlinedIcon sx={{ fontSize: 20 }} />}>
              Leadership
            </SectionHeading>
            <div className="rounded-[4px] p-5" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <p className="text-[0.9375rem]" style={{ color: "var(--text)" }}>
                Faculty advisor: {club.advisor}
              </p>
              <p className="mt-3 text-[0.875rem]" style={{ color: "var(--text-faint)" }}>
                Student officer listings and a full roster aren&apos;t published
                here yet — this section will show up once club-leader accounts
                are wired up.
              </p>
            </div>
          </section>
        </div>

        <aside>
          <div className="flex flex-col gap-3 lg:sticky lg:top-24">
            <SectionHeading icon={<HowToRegOutlinedIcon sx={{ fontSize: 20 }} />}>
              How to join
            </SectionHeading>
            <div
              className="flex flex-col gap-4 rounded-[4px] p-5"
              style={{ border: "1px dashed var(--border-strong)" }}
            >
              <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                The in-site join flow isn&apos;t built yet. For now, show up to
                a meeting in {club.room}, or ask {club.advisor} how to get on
                the list.
              </p>
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-[3px] px-4 py-2.5 text-[0.875rem] font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text-faint)" }}
              >
                Request to join — coming soon
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
