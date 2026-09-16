import type { CommitmentLevel } from "@/types/club";

const LEVELS: Record<CommitmentLevel, { filled: number; label: string; color: string }> = {
  low: { filled: 1, label: "Low commitment", color: "var(--status-low)" },
  medium: { filled: 2, label: "Medium commitment", color: "var(--status-medium)" },
  high: { filled: 3, label: "High commitment", color: "var(--status-high)" },
};

const SIZES = {
  sm: { width: 5, gap: 3, base: 8, step: 5, font: "0.75rem" },
  md: { width: 6, gap: 3, base: 10, step: 6, font: "0.8125rem" },
  lg: { width: 7, gap: 4, base: 13, step: 8, font: "0.9375rem" },
};

export default function CommitmentIndicator({
  level,
  showLabel = true,
  size = "sm",
}: {
  level: CommitmentLevel;
  showLabel?: boolean;
  size?: keyof typeof SIZES;
}) {
  const { filled, label, color } = LEVELS[level];
  const { width, gap, base, step, font } = SIZES[size];

  return (
    <div className="flex items-center" style={{ gap: gap + 3 }} title={label}>
      <div className="flex items-end" style={{ gap }} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block rounded-[1px]"
            style={{
              width,
              height: base + i * step,
              background: i < filled ? color : "var(--border-strong)",
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span style={{ fontSize: font, color: "var(--text-muted)" }}>{label}</span>
      )}
    </div>
  );
}
