import type { Weekday } from "@/types/club";

const WEEK: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MeetingDaysRow({ days }: { days: Weekday[] }) {
  return (
    <div className="flex items-center gap-[3px]" aria-label={`Meets ${days.join(", ")}`}>
      {WEEK.map((day) => {
        const active = days.includes(day);
        return (
          <span
            key={day}
            aria-hidden="true"
            className="flex items-center justify-center w-[18px] h-[18px] rounded-[2px] text-[0.625rem] font-semibold"
            style={{
              background: active ? "var(--gold)" : "transparent",
              color: active ? "#14100a" : "var(--text-faint)",
              border: active ? "none" : "1px solid var(--border)",
            }}
          >
            {day[0]}
          </span>
        );
      })}
    </div>
  );
}
