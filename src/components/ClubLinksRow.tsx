export default function ClubLinksRow({ links }: { links?: string[] }) {
  const validLinks = (links ?? []).filter(Boolean);

  return (
    <div className="flex w-full flex-col gap-2 sm:w-[280px]">
      <span className="text-[0.875rem] font-medium" style={{ color: "var(--text-faint)" }}>
        Links
      </span>
      {validLinks.length === 0 ? (
        <p className="text-[0.9375rem]" style={{ color: "var(--text-muted)" }}>
          This club has no links right now.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {validLinks.map((link) => (
            <li key={link}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[0.9375rem] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors duration-150 hover:decoration-[var(--gold)] hover:text-[var(--gold)]"
                style={{ color: "var(--text)" }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
