import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import type { Club } from "@/types/club";
import SectionBox from "./SectionBox";

function Answer({ text }: { text?: string }) {
  if (!text) {
    return (
      <p className="text-[0.9375rem]" style={{ color: "var(--text-faint)" }}>
        This club hasn&apos;t answered this yet.
      </p>
    );
  }
  return (
    <p
      className="max-w-[90ch] whitespace-pre-line text-[1rem] leading-relaxed"
      style={{ color: "var(--text-muted)" }}
    >
      {text}
    </p>
  );
}

export default function ClubAbout({ club }: { club: Club }) {
  return (
    <div className="flex flex-col gap-8">
      <SectionBox
        icon={<InfoOutlinedIcon sx={{ fontSize: 22 }} />}
        title="What is this activity?"
        tone="gold"
      >
        <Answer text={club.description} />
      </SectionBox>

      <SectionBox
        icon={<ForumOutlinedIcon sx={{ fontSize: 22 }} />}
        title="What do your meetings look like?"
        tone="sky"
      >
        <Answer text={club.meetingsLookLike} />
      </SectionBox>

      <SectionBox
        icon={<LightbulbOutlinedIcon sx={{ fontSize: 22 }} />}
        title="What makes this activity unique?"
        tone="mint"
      >
        <Answer text={club.whatMakesUnique} />
      </SectionBox>
    </div>
  );
}
