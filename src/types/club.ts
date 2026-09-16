export type CommitmentLevel = "low" | "medium" | "high";

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

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
  room: string;
  advisor: string;
  keywords?: string[];
  /** Raw URLs, shown as-is on the club page. Empty/absent means no links yet. */
  links?: string[];
}
