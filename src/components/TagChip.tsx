import type { Tag } from "@/types/club";

export default function TagChip({
  tag,
  active = false,
  size = "sm",
}: {
  tag: Tag;
  active?: boolean;
  size?: "sm" | "md";
}) {
  const padding = size === "sm" ? "px-2 py-[3px] text-[0.75rem]" : "px-3 py-[5px] text-[0.8125rem]";

  return (
    <span
      className={`inline-flex items-center rounded-[3px] font-medium leading-none ${padding}`}
      style={{
        border: `1px solid ${active ? "var(--gold)" : "var(--border)"}`,
        color: active ? "var(--gold)" : "var(--text-muted)",
        background: active ? "color-mix(in srgb, var(--gold) 12%, transparent)" : "transparent",
      }}
    >
      {tag}
    </span>
  );
}
