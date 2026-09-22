import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import SectionBox from "./SectionBox";

export default function ClubLinksBox({ links }: { links?: string[] }) {
  const validLinks = (links ?? []).filter(Boolean);

  return (
    <SectionBox icon={<LinkOutlinedIcon sx={{ fontSize: 18 }} />} title="Links" shade="surface" compact>
      {validLinks.length === 0 ? (
        <p className="text-[0.875rem]" style={{ color: "var(--text-muted)" }}>
          This club has no links right now.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {validLinks.map((link) => (
            <li key={link}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[0.875rem] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors duration-150 hover:decoration-[var(--gold)] hover:text-[var(--gold)]"
                style={{ color: "var(--text)" }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </SectionBox>
  );
}
