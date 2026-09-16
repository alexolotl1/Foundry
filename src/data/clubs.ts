import type { Club } from "@/types/club";

export const CLUBS: Club[] = [
  {
    id: "1",
    slug: "robotics-team",
    name: "Robotics Team",
    shortDescription:
      "Design, build, and program competition robots for the FIRST Robotics regional circuit.",
    description:
      "The Robotics Team designs and builds a competition robot from scratch every build season, then travels to regional FIRST events each spring. Subteams cover mechanical design, CAD, programming, electrical, and business/outreach, so there's a seat for students who like to weld as much as students who like to write sponsorship letters.",
    tags: ["STEM", "Competition & Team"],
    meetingDays: ["Mon", "Wed", "Fri"],
    commitmentLevel: "high",
    room: "Eng Lab 2",
    advisor: "Ms. Okafor",
    keywords: ["FIRST", "engineering", "CAD", "programming"],
    links: { instagram: "@district.robotics", website: "https://district-robotics.org" },
  },
  {
    id: "2",
    slug: "model-united-nations",
    name: "Model United Nations",
    shortDescription:
      "Research global issues and debate them in committee at conferences across the region.",
    description:
      "Model UN delegates research a country's foreign policy positions and represent them in fast-paced committee debate at weekend conferences. New members start on smaller committees before moving up to crisis and advanced committees junior and senior year.",
    tags: ["Academic", "Competition & Team"],
    meetingDays: ["Tue", "Thu"],
    commitmentLevel: "medium",
    room: "Room 214",
    advisor: "Mr. Danziger",
    keywords: ["debate", "diplomacy", "conference", "MUN"],
    links: { instagram: "@school.mun" },
  },
  {
    id: "3",
    slug: "key-club",
    name: "Key Club",
    shortDescription:
      "Organize school-wide service projects and log volunteer hours through Kiwanis International.",
    description:
      "Key Club is the school's largest community service organization, running food drives, park cleanups, and fundraisers for local shelters throughout the year. Officers track member hours and help place students with ongoing volunteer placements that fit their schedule.",
    tags: ["Community Service"],
    meetingDays: ["Wed"],
    commitmentLevel: "medium",
    room: "Cafeteria",
    advisor: "Mrs. Patel",
    keywords: ["kiwanis", "community service", "hours"],
  },
  {
    id: "4",
    slug: "environmental-action-coalition",
    name: "Environmental Action Coalition",
    shortDescription:
      "Run the campus recycling program and push for sustainability changes to school policy.",
    description:
      "EAC maintains the school's composting and recycling bins, organizes an annual campus clean-up day, and drafts proposals for the district's sustainability committee. Past projects include a single-use plastics reduction policy and a native-plant garden behind the science wing.",
    tags: ["Community Service", "STEM"],
    meetingDays: ["Tue"],
    commitmentLevel: "low",
    room: "Room 118",
    advisor: "Dr. Whitfield",
    keywords: ["sustainability", "recycling", "climate", "garden"],
    links: { instagram: "@eac.green" },
  },
  {
    id: "5",
    slug: "studio-art-collective",
    name: "Studio Art Collective",
    shortDescription:
      "An open studio space for painting, printmaking, and ceramics outside of class time.",
    description:
      "Studio Art Collective is a low-pressure open studio where members work on independent projects with access to supplies the art room doesn't loan out for regular classes, including a small press and a kiln. The club hosts a spring show in the main hallway display cases.",
    tags: ["Arts & Crafts", "Hobby & Special Interest"],
    meetingDays: ["Thu"],
    commitmentLevel: "low",
    room: "Art Room B",
    advisor: "Ms. Reyes",
    keywords: ["painting", "ceramics", "printmaking", "gallery"],
    links: { instagram: "@studioartcollective" },
  },
  {
    id: "6",
    slug: "chess-club",
    name: "Chess Club",
    shortDescription:
      "Casual and rated play, with a team that travels to a handful of scholastic tournaments.",
    description:
      "Most meetings are open casual play and short tactics puzzles, but a smaller travel team competes in scholastic tournaments a few times a year. All skill levels are welcome, including students who've never played a rated game.",
    tags: ["Hobby & Special Interest", "Competition & Team"],
    meetingDays: ["Fri"],
    commitmentLevel: "low",
    room: "Room 106",
    advisor: "Mr. Sokol",
    keywords: ["tournament", "USCF", "puzzles"],
    links: { discord: "discord.gg/school-chess" },
  },
  {
    id: "7",
    slug: "debate-team",
    name: "Debate Team",
    shortDescription:
      "Competitive policy and Lincoln-Douglas debate with weekend tournaments most months.",
    description:
      "Debate Team members choose a policy or Lincoln-Douglas track and build case files over the season, with heavy research and practice rounds during the week. Tournament weekends run roughly twice a month during the competitive season, so the time commitment is significant.",
    tags: ["Academic", "Competition & Team"],
    meetingDays: ["Mon", "Wed", "Fri"],
    commitmentLevel: "high",
    room: "Room 214",
    advisor: "Mr. Danziger",
    keywords: ["policy debate", "Lincoln-Douglas", "tournament", "research"],
    links: { instagram: "@school.debate", discord: "discord.gg/school-debate" },
  },
  {
    id: "8",
    slug: "habitat-for-humanity-club",
    name: "Habitat for Humanity Club",
    shortDescription:
      "Occasional weekend build days with the local Habitat chapter, no experience required.",
    description:
      "This club partners directly with the local Habitat for Humanity chapter for a handful of Saturday build days each semester. No construction experience is needed — the chapter provides on-site training and all tools.",
    tags: ["Community Service"],
    meetingDays: ["Sat"],
    commitmentLevel: "low",
    room: "Room 118",
    advisor: "Dr. Whitfield",
    keywords: ["build day", "construction", "habitat"],
  },
  {
    id: "9",
    slug: "jazz-ensemble",
    name: "Jazz Ensemble",
    shortDescription:
      "Auditioned combo and big band rehearsing standards and student arrangements.",
    description:
      "Jazz Ensemble is an auditioned group split into a big band and a smaller combo, rehearsing before school most weekdays. The group plays several school concerts a year plus a couple of off-campus gigs, including the winter arts festival downtown.",
    tags: ["Arts & Crafts"],
    meetingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    commitmentLevel: "high",
    room: "Band Room",
    advisor: "Mr. Castellano",
    keywords: ["band", "music", "audition", "concert"],
    links: { instagram: "@school.jazz" },
  },
  {
    id: "10",
    slug: "asian-student-union",
    name: "Asian Student Union",
    shortDescription:
      "A space to celebrate Asian and Asian-American cultures through events and discussion.",
    description:
      "ASU hosts discussion meetings on culture and identity alongside larger events like the Lunar New Year celebration and a spring culture fair with food, performances, and student art. Membership is open to anyone interested, not just students of Asian descent.",
    tags: ["Cultural & Religious"],
    meetingDays: ["Thu"],
    commitmentLevel: "low",
    room: "Room 220",
    advisor: "Ms. Lin",
    keywords: ["identity", "lunar new year", "culture fair"],
    links: { instagram: "@asu.school" },
  },
  {
    id: "11",
    slug: "investment-and-finance-club",
    name: "Investment & Finance Club",
    shortDescription:
      "Manage a paper trading portfolio and compete in regional stock market challenges.",
    description:
      "Members research companies and manage a simulated portfolio together, with weekly discussion of market news and a few members' picks. The club fields a team each year for a regional stock market game against other area high schools.",
    tags: ["Academic", "Competition & Team"],
    meetingDays: ["Tue"],
    commitmentLevel: "medium",
    room: "Room 301",
    advisor: "Mrs. Alvarado",
    keywords: ["stock market", "trading", "economics", "finance"],
  },
  {
    id: "12",
    slug: "girls-who-code",
    name: "Girls Who Code",
    shortDescription:
      "Weekly coding projects and mentorship for girls and nonbinary students new to programming.",
    description:
      "This chapter runs through the national Girls Who Code curriculum, building small web and Python projects together with an emphasis on peer mentorship — no prior coding experience is expected or required to join.",
    tags: ["STEM", "Hobby & Special Interest"],
    meetingDays: ["Wed"],
    commitmentLevel: "medium",
    room: "Computer Lab 1",
    advisor: "Ms. Okafor",
    keywords: ["coding", "python", "web development", "mentorship"],
    links: { instagram: "@gwc.school", discord: "discord.gg/gwc-school" },
  },
  {
    id: "13",
    slug: "ultimate-frisbee-club",
    name: "Ultimate Frisbee Club",
    shortDescription:
      "A non-varsity club team that scrimmages weekly and plays a handful of spring tournaments.",
    description:
      "Ultimate is a club-level team (not a varsity sport at this school) that practices fundamentals and scrimmages twice a week, with a small spring tournament schedule against neighboring schools' club teams. Open to all grades and experience levels.",
    tags: ["Club Sports", "Competition & Team"],
    meetingDays: ["Tue", "Thu"],
    commitmentLevel: "medium",
    room: "Turf Field",
    advisor: "Coach Bremmer",
    keywords: ["ultimate", "frisbee", "scrimmage", "tournament"],
    links: { instagram: "@school.ultimate" },
  },
  {
    id: "14",
    slug: "culinary-arts-club",
    name: "Culinary Arts Club",
    shortDescription:
      "Cook and bake as a group, then donate most of what's made to a local community fridge.",
    description:
      "Members plan and cook a themed menu together every meeting using the home-ec kitchen, then package most of the food for the community fridge a few blocks from campus. A fun, low-key club that also occasionally caters small school events.",
    tags: ["Arts & Crafts", "Hobby & Special Interest"],
    meetingDays: ["Fri"],
    commitmentLevel: "low",
    room: "Home-Ec Kitchen",
    advisor: "Mrs. Ferro",
    keywords: ["cooking", "baking", "community fridge"],
    links: { instagram: "@culinary.club" },
  },
  {
    id: "15",
    slug: "science-olympiad",
    name: "Science Olympiad",
    shortDescription:
      "Prepare event-specific projects and exams for regional and state Science Olympiad meets.",
    description:
      "Each member specializes in two or three Science Olympiad events, ranging from build events like bridge and robot arm to written tests like anatomy and astronomy. The team practices intensively in the weeks leading up to the regional and, if qualified, state tournaments.",
    tags: ["STEM", "Competition & Team"],
    meetingDays: ["Mon", "Tue", "Wed", "Thu"],
    commitmentLevel: "high",
    room: "Science Wing 4",
    advisor: "Dr. Whitfield",
    keywords: ["science bowl", "regional", "state", "build event"],
  },
  {
    id: "16",
    slug: "peer-tutoring-network",
    name: "Peer Tutoring Network",
    shortDescription:
      "Free drop-in tutoring run by students, matched by subject during lunch and after school.",
    description:
      "PTN matches student tutors with peers who sign up for help in a specific subject, and runs drop-in tutoring tables during lunch most days. Tutors log hours toward service requirements while helping keep the sign-up matching running smoothly.",
    tags: ["Academic", "Community Service"],
    meetingDays: ["Mon", "Wed"],
    commitmentLevel: "medium",
    room: "Library",
    advisor: "Mrs. Patel",
    keywords: ["tutoring", "homework help", "mentorship"],
    links: { website: "https://school.edu/tutoring" },
  },
  {
    id: "17",
    slug: "film-production-club",
    name: "Film Production Club",
    shortDescription:
      "Write, shoot, and edit short films together, from scripts to the spring screening night.",
    description:
      "Members rotate through roles — writing, directing, camera, and editing — across a few short film projects a year, building toward a screening night in the school theater each spring. The club has its own small kit of cameras and lighting gear.",
    tags: ["Arts & Crafts", "Hobby & Special Interest"],
    meetingDays: ["Thu"],
    commitmentLevel: "low",
    room: "Media Lab",
    advisor: "Mr. Castellano",
    keywords: ["filmmaking", "video editing", "screening"],
    links: { instagram: "@film.club", discord: "discord.gg/film-club" },
  },
  {
    id: "18",
    slug: "student-government",
    name: "Student Government",
    shortDescription:
      "Elected student body representing the school, running major events and the activity budget.",
    description:
      "Student Government plans school-wide events like homecoming and spirit week, allocates the student activity budget across clubs, and meets regularly with administration to represent student concerns. Most seats are filled by grade-level election each spring.",
    tags: ["Academic", "Community Service"],
    meetingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    commitmentLevel: "high",
    room: "Room 101",
    advisor: "Mrs. Alvarado",
    keywords: ["student council", "election", "homecoming", "budget"],
    links: { instagram: "@student.gov", website: "https://school.edu/stugov" },
  },
];

export function getClubBySlug(slug: string): Club | undefined {
  return CLUBS.find((club) => club.slug === slug);
}
