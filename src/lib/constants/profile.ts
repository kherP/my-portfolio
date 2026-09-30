// Copy for the terminal intro on the home page.
export const intro = {
  role: "lead frontend engineer · AI products",
  // the middle part glows
  headline: ["I build calm interfaces for ", "complicated", " systems."],
  wake: "wake up, visitor... follow the white rabbit ↓",
  location: "Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  utcOffset: "GMT+8",
  beliefs: [
    "Keep learning, every day.",
    "Build it with the designers, not after them.",
    "Review your team's work with care.",
  ],
};

export const aiIntro =
  "What I work on now: AI products where every output has to be traceable and checked, and the AI setup my team builds with.";

// Items with `art` show as screens; the rest as short notes.
export const aiWork: SkillItem[] = [
  {
    name: "AI paperwork for the front line",
    description:
      "An AI platform that turns what's said into notes, forms and letters for police and mental health teams, where every word has to stand up to an audit. As lead frontend engineer, I wrote its offline transcriber, then built and fixed the UI until the whole flow worked end to end.",
    art: "draft",
    highlights: ["Offline transcriber", "End-to-end flow UI"],
  },
  {
    name: "Engineering calculations, checked by AI",
    description:
      "A platform where engineers build, run and review calculations, while AI checks new work against existing templates. I built what engineers touch every day: the calculation editor, print-ready output, and much of the UI around them.",
    art: "calc",
    highlights: ["Calculation editor", "Printing", "Product UI"],
  },
  {
    name: "AI in how I build",
    description:
      "I helped set up the AI skills my team builds with: shared instructions that give AI coding tools our conventions and workflows, so their output fits the codebase from the start.",
    highlights: ["Team AI skills"],
  },
  {
    name: "AI-made prints",
    description:
      "Now and then, I use AI to create graphics and turn them into prints for people I meet: small, personal gifts made with new tools.",
    highlights: ["AI graphics", "Prints"],
  },
];

export const capabilities: SkillItem[] = [
  {
    name: "Rules-driven UI",
    description:
      "Forms and screens driven by backend rules, so the business can change them without a frontend release. The same pattern lets AI assemble UI safely from approved components.",
    caseStudy: "Private pension portal",
  },
  {
    name: "Permission-aware products",
    description:
      "Interfaces that show each person only what they're allowed to see, with the backend enforcing it too. AI agents need the same guardrails.",
    caseStudy: "User roles and management portal",
  },
  {
    name: "Design systems",
    description: "Component libraries that product teams, and AI coding tools, can build on consistently.",
    caseStudy: "React components library",
  },
  {
    name: "Sensitive, regulated domains",
    description:
      "Pensions, insurance, engineering and policing. Products where the data is sensitive and mistakes are expensive.",
    caseStudy: "Occupational pension portal",
  },
  {
    name: "Accessibility",
    description: "Accessibility built into shared components, so every product that uses them inherits it.",
    caseStudy: "React components library",
  },
  {
    name: "Performance with large data",
    description: "A custom virtual list that stays fast with large datasets, at any browser zoom level.",
    caseStudy: "Occupational pension portal",
  },
  {
    name: "Modernizing old systems",
    description: "Replacing legacy systems feature by feature, including micro-frontends inside a shared shell.",
    caseStudy: "Customer service platform",
  },
];

// Generated artwork for each project, keyed by the project name in the gist.
export const projectArt: Record<string, string> = {
  "Occupational pension portal": "occupational",
  "Private pension portal": "private",
  "User roles and management portal": "roles",
  "Customer service platform": "service",
  "React components library": "library",
  "Class management and enrolment portal": "classes",
};

export const aboutPhotos = [
  { art: "me", caption: "that's me", label: "The initials KP drawn in code characters" },
  { art: "sing", caption: "probably singing", label: "A microphone drawn in code characters, with sound waves and music notes" },
  { art: "desk", caption: "where the code happens", label: "Line drawing of a desk with a monitor, keyboard and a cup of kopi" },
  { art: "kl", caption: "home, Malaysia", label: "The Kuala Lumpur skyline at night, drawn in code characters" },
];
