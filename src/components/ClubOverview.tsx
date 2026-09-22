"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import type { Club } from "@/types/club";
import CommitmentIndicator from "./CommitmentIndicator";
import MeetingDaysRow from "./MeetingDaysRow";
import SectionBox from "./SectionBox";

const COMMITMENT_COPY: Record<Club["commitmentLevel"], string> = {
  low: "Drop in when you can — attendance isn't tracked closely.",
  medium: "Expect a regular weekly meeting most weeks of the term.",
  high: "This club expects consistent attendance and outside-meeting work.",
};

function StatItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: "color-mix(in srgb, var(--gold) 16%, var(--surface-2))" }}>
        {icon}
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="text-[0.8125rem]" style={{ color: "var(--text-faint)" }}>
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

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

export default function ClubOverview({ club }: { club: Club }) {
  const rooms = club.rooms.length > 0 ? club.rooms.join(", ") : "Not listed yet";

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-wrap items-center gap-x-12 gap-y-5 rounded-[6px] px-6 py-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <StatItem icon={<CalendarMonthOutlinedIcon sx={{ fontSize: 22, color: "var(--gold)" }} />} label="Meets">
          <MeetingDaysRow days={club.meetingDays} size="lg" />
        </StatItem>
        <StatItem icon={<SpeedOutlinedIcon sx={{ fontSize: 22, color: "var(--gold)" }} />} label="Commitment">
          <CommitmentIndicator level={club.commitmentLevel} size="lg" />
        </StatItem>
        <StatItem icon={<PlaceOutlinedIcon sx={{ fontSize: 22, color: "var(--gold)" }} />} label={club.rooms.length > 1 ? "Rooms" : "Room"}>
          <span className="text-[1.0625rem]" style={{ color: "var(--text)" }}>
            {rooms}
          </span>
        </StatItem>
      </motion.div>

      <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <SectionHeading icon={<NotesOutlinedIcon sx={{ fontSize: 20 }} />}>Description</SectionHeading>
            <p className="max-w-[70ch] text-[1rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {club.description}
            </p>
          </section>

          <SectionBox icon={<EventOutlinedIcon sx={{ fontSize: 18 }} />} title="Meeting details" tone="sky">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                  Days
                </dt>
                <dd className="mt-1 text-[0.9375rem]" style={{ color: "var(--text)" }}>
                  {club.meetingDays.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-[0.75rem]" style={{ color: "var(--text-faint)" }}>
                  Location
                </dt>
                <dd className="mt-1 text-[0.9375rem]" style={{ color: "var(--text)" }}>
                  {rooms}
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
          </SectionBox>

          <SectionBox icon={<GroupsOutlinedIcon sx={{ fontSize: 18 }} />} title="Leadership" tone="silver">
            <p className="text-[0.9375rem]" style={{ color: "var(--text)" }}>
              Faculty advisor: {club.advisor}
            </p>
            <p className="mt-3 text-[0.875rem]" style={{ color: "var(--text-faint)" }}>
              Student officer listings and a full roster aren&apos;t published here yet — this
              section will show up once club-leader accounts are wired up.
            </p>
          </SectionBox>
        </div>

        <aside>
          <div className="lg:sticky lg:top-24">
            <SectionBox icon={<HowToRegOutlinedIcon sx={{ fontSize: 18 }} />} title="How to join" tone="mint">
              {club.joinLink ? (
                <div className="flex flex-col gap-4">
                  <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Sign up using the form below to join this club&apos;s email list, or
                    email their advisor, {club.advisor}.
                  </p>
                  <a
                    href={club.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit rounded-[3px] px-5 py-2.5 text-[0.9375rem] font-semibold no-underline transition-opacity duration-150 hover:opacity-85"
                    style={{ background: "var(--gold)", color: "var(--gold-contrast)" }}
                  >
                    Open the sign-up form
                  </a>
                </div>
              ) : (
                <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  This club hasn&apos;t added a sign-up link yet. Email their advisor,{" "}
                  {club.advisor}, or stop by during a meeting to ask how to join.
                </p>
              )}
            </SectionBox>
          </div>
        </aside>
      </div>
    </div>
  );
}
