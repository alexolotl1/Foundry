export type CommitmentLevel = "low" | "medium" | "high";

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type Tag =
  | "Arts & Crafts"
  | "Academic"
  | "Club Sports"
  | "Community Service"
  | "Cultural & Religious"
  | "STEM"
  | "Hobby & Special Interest"
  | "Competition & Team";

export interface Club {
  /** Slug-shaped identifier (e.g. "robotics-team") — also the URL segment and the logo filename. */
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  meetingDays: Weekday[];
  commitmentLevel: CommitmentLevel;
  /** One or more rooms (a `;`-separated list in the `room` column). */
  rooms: string[];
  advisor: string;
  keywords?: string[];
  /** Raw URLs, shown as-is on the club page. Empty/absent means no links yet. */
  links?: string[];
  /** Sign-up form (e.g. a Google Form) for the club's email list. */
  joinLink?: string;
  /** About-page answers — blank until the club fills them in. */
  meetingsLookLike?: string;
  whatMakesUnique?: string;
}
