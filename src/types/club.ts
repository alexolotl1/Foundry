export type CommitmentLevel = "low" | "medium" | "high";

export type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type Tag =
  | "Arts & Crafts"
  | "Academic"
  | "Club Sports"
  | "Community Service"
  | "Cultural & Religious"
  | "STEM"
  | "Hobby & Special Interest"
  | "Competition & Team";

export interface ClubLinks {
  instagram?: string;
  discord?: string;
  website?: string;
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  tags: Tag[];
  meetingDays: Weekday[];
  commitmentLevel: CommitmentLevel;
  room: string;
  advisor: string;
  keywords?: string[];
  /** Real uploaded club logo — falls back to a generated monogram when absent. */
  logoUrl?: string;
  links?: ClubLinks;
}
