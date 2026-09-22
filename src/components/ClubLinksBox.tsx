import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import SectionBox from "./SectionBox";

export default function ClubLinksBox({ links }: { links?: string[] }) {
  const validLinks = (links ?? []).filter(Boolean);

  return (
    <SectionBox icon={<LinkOutlinedIcon sx={{ fontSize: 22 }} />} title="Links" tone="violet">
      {validLinks.length === 0 ? (
        <p className="text-[0.9375rem]" style={{ color: "var(--text-muted)" }}>
          This club has no links right now.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Find this club online — each link opens in a new tab.
          </p>
          <ul className="flex flex-col gap-2.5">
            {validLinks.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-[3px] px-3.5 py-3 text-[0.9375rem] no-underline transition-colors duration-150 hover:border-[var(--tone-violet)] hover:text-[var(--tone-violet)]"
                  style={{ border: "1px solid var(--border)", color: "var(--text)" }}
                >
                  <OpenInNewOutlinedIcon sx={{ fontSize: 18, marginTop: "3px", color: "var(--tone-violet)" }} />
                  <span className="break-all">{link}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionBox>
  );
}
