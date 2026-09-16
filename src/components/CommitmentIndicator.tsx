import type { CommitmentLevel } from "@/types/club";

const LEVELS: Record<CommitmentLevel, { filled: number; label: string }> = {
  low: { filled: 1, label: "Low commitment" },
  medium: { filled: 2, label: "Medium commitment" },
  high: { filled: 3, label: "High commitment" },
};

export default function CommitmentIndicator({
  level,
  showLabel = true,
}: {
  level: CommitmentLevel;
  showLabel?: boolean;
}) {
  const { filled, label } = LEVELS[level];

  return (
    <div className="flex items-center gap-2" title={label}>
      <div className="flex items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-[5px] rounded-[1px]"
            style={{
              height: `${8 + i * 5}px`,
              background: i < filled ? "var(--gold)" : "var(--border-strong)",
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-[0.75rem] text-[var(--text-muted)]">{label}</span>
      )}
    </div>
  );
}
