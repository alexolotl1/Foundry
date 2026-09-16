import type { Weekday } from "@/types/club";
import { WEEKDAYS } from "@/data/weekdays";

const SIZES = {
  sm: { box: 18, font: "0.625rem" },
  md: { box: 22, font: "0.6875rem" },
  lg: { box: 28, font: "0.75rem" },
};

export default function MeetingDaysRow({
  days,
  size = "sm",
}: {
  days: Weekday[];
  size?: keyof typeof SIZES;
}) {
  const { box, font } = SIZES[size];

  return (
    <div className="flex items-center gap-[3px]" aria-label={`Meets ${days.join(", ")}`}>
      {WEEKDAYS.map((day) => {
        const active = days.includes(day);
        return (
          <span
            key={day}
            aria-hidden="true"
            className="flex items-center justify-center rounded-[2px] font-semibold"
            style={{
              width: box,
              height: box,
              fontSize: font,
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
