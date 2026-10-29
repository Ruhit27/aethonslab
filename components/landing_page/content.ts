/**
 * Every piece of homepage copy and data, in page order. Edit text here, not in
 * the section components.
 *
 * Entries marked `placeholder: true` are slots for real proof (testimonials,
 * team, stats). Sections render them visibly as placeholders until they are
 * replaced, so nothing made-up ships as if it were real.
 */
import {
  Bot,
  Code2,
  Compass,
  Database,
  FileText,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Layers,
  MessageSquareText,
  Monitor,
  PlayCircle,
  Rocket,
  ShieldCheck,
  UserPlus,
  Users,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const BOOK_HREF = "#consultation";
export const CONTACT_EMAIL = "hello@aethonlab.studio";

/* ---------- Tool logos (SVGs in /public/logos from simple-icons@13.21.0) ---------- */

export const TOOLS = {
  airtable: { title: "Airtable", hex: "#18BFFF" },
  anthropic: { title: "Anthropic", hex: "#191919" },
  asana: { title: "Asana", hex: "#F06A6A" },
  calendly: { title: "Calendly", hex: "#006BFF" },
  claude: { title: "Claude", hex: "#D97757" },
  clickup: { title: "ClickUp", hex: "#7B68EE" },
  discord: { title: "Discord", hex: "#5865F2" },
  figma: { title: "Figma", hex: "#F24E1E" },
  github: { title: "GitHub", hex: "#181717" },
  gmail: { title: "Gmail", hex: "#EA4335" },
  googlecalendar: { title: "Google Calendar", hex: "#4285F4" },
  googledrive: { title: "Google Drive", hex: "#4285F4" },
  googlesheets: { title: "Google Sheets", hex: "#34A853" },
  hubspot: { title: "HubSpot", hex: "#FF7A59" },
  intercom: { title: "Intercom", hex: "#1F8DED" },
  linear: { title: "Linear", hex: "#5E6AD2" },
  mailchimp: { title: "Mailchimp", hex: "#E8B500" },
  make: { title: "Make", hex: "#6D00CC" },
  n8n: { title: "n8n", hex: "#EA4B71" },
  nextdotjs: { title: "Next.js", hex: "#000000" },
  notion: { title: "Notion", hex: "#000000" },
  openai: { title: "OpenAI", hex: "#412991" },
  postgresql: { title: "PostgreSQL", hex: "#4169E1" },
  shopify: { title: "Shopify", hex: "#7AB55C" },
  slack: { title: "Slack", hex: "#4A154B" },
  stripe: { title: "Stripe", hex: "#635BFF" },
  supabase: { title: "Supabase", hex: "#3FCF8E" },
  telegram: { title: "Telegram", hex: "#26A5E4" },
  trello: { title: "Trello", hex: "#0052CC" },
  typeform: { title: "Typeform", hex: "#262627" },
  vercel: { title: "Vercel", hex: "#000000" },
  webflow: { title: "Webflow", hex: "#146EF5" },
  whatsapp: { title: "WhatsApp", hex: "#25D366" },
  wordpress: { title: "WordPress", hex: "#21759B" },
  zapier: { title: "Zapier", hex: "#FF4F00" },
  zendesk: { title: "Zendesk", hex: "#03363D" },
  zoom: { title: "Zoom", hex: "#0B5CFF" },
} as const;

export type ToolSlug = keyof typeof TOOLS;

/* ---------- Services catalog (header mega-menu, footer) ---------- */

export type ServiceLink = {
  slug: string;
  title: string;
  blurb: string;
  icon?: LucideIcon;
};

export type ServiceGroup = {
  name: "Automate" | "Build" | "Grow";
  tagline: string;
  services: ServiceLink[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    name: "Automate",
    tagline: "Take repetitive work off your team",
    services: [
      { slug: "ai-agents", icon: Bot, title: "AI Agent Development", blurb: "Agents that read, decide and act inside your tools." },
      { slug: "workflow-automation", icon: Workflow, title: "Workflow Automation", blurb: "n8n and Make flows that connect every app you use." },
      { slug: "lead-autopilot", icon: Zap, title: "Lead Autopilot", blurb: "Every inquiry answered, qualified and booked in under a minute." },
      { slug: "knowledge-assistants", icon: Database, title: "RAG & Knowledge Assistants", blurb: "Answers grounded in your own documents and data." },
      { slug: "automation-care", icon: Wrench, title: "Automation Care", blurb: "Monitoring, fixes and upgrades for what's already running." },
    ],
  },
  {
    name: "Build",
    tagline: "Ship the product, not the slide deck",
    services: [
      { slug: "mvp", icon: Rocket, title: "MVP & SaaS Builds", blurb: "From idea to paying users in weeks." },
      { slug: "internal-tools", icon: LayoutDashboard, title: "Internal Tools & Dashboards", blurb: "The admin panel your ops team keeps asking for." },
      { slug: "ai-websites", icon: Monitor, title: "AI-ready Websites", blurb: "Fast Next.js sites with automation wired in from day one." },
    ],
  },
  {
    name: "Grow",
    tagline: "Make your team AI-native",
    services: [
      { slug: "ai-strategy", icon: Compass, title: "Fractional AI Strategy", blurb: "A senior AI lead in your leadership meetings, part-time." },
      { slug: "workshops", icon: GraduationCap, title: "AI Workshops & Training", blurb: "Hands-on sessions your team uses the next morning." },
      { slug: "team-augmentation", icon: UserPlus, title: "Team Augmentation", blurb: "Vetted AI engineers embedded in your team." },
    ],
  },
];

export const RESOURCE_GROUPS = [
  {
    name: "Learn",
    items: [
      { href: "/demo", title: "Live agent demo", blurb: "Talk to Lead Autopilot right now.", icon: PlayCircle },
    ],
  },
  {
    name: "Explore",
    items: [
      { href: "#work", title: "Our builds", blurb: "Live systems we've shipped.", icon: Code2 },
      { href: "#team", title: "Team", blurb: "The people behind the agents.", icon: Users },
      { href: "#faq", title: "FAQ", blurb: "Pricing, security, timelines.", icon: MessageSquareText },
    ],
  },
];

/** The card on the right of the mega-menus. */
export const NAV_FEATURED = {
  kicker: "Featured",
  title: "Free automation audit",
  body: "We map your top 3 processes to automate, with an ROI estimate. Free, 30 minutes.",
  cta: "Claim your audit",
  icon: FileText,
};

export const FLAGSHIP_OFFER = {
  label: "Free automation audit",
  detail: "We map your top 3 processes to automate",
};

/* ---------- 1. Hero ---------- */

export const HERO = {
  lineOne: "Give your team",
  big: "40 hours",
  lineThree: "back every week",
  summary:
    "We embed an AI engineer in your business who learns how the work really gets done, then builds the agents and automations that take the repetitive parts off your team's plate.",
  primaryCta: "Book a free automation audit",
  secondaryCta: "Explore services",
  micro: "Free · 30 minutes · No commitment",
  teardownsLink: "Not ready to talk? Get the automation teardowns →",
};

/** Generated by `npm run art:hero` (scripts/generate-hero-art.mjs). */
export const HERO_ART = {
  light: "/art/hero-landscape.webp",
  dark: "/art/hero-landscape-dark.webp",
};

/* ---------- 2. Start here ---------- */

export const START_HERE_LABEL = "Start here";

export const START_HERE = [
  { href: "/demo", kicker: "Try it", title: "Watch an agent work live", body: "Chat with the same Lead Autopilot our clients run." },
  { href: "#work", kicker: "Proof", title: "See what we've shipped", body: "Live builds, not concept shots." },
  { href: "#services", kicker: "Explore", title: "See what we automate", body: "Five ways we take work off your team's plate." },
];

/* ---------- 3. Teardowns signup ---------- */

export const TEARDOWNS = {
  title: "Get the automations we actually ship.",
  body: "One teardown every two weeks: the problem, the workflow, the prompts and what it saved. No fluff, unsubscribe anytime.",
  cta: "Send me the teardowns",
  tools: ["n8n", "Claude", "Make", "OpenAI", "Zapier"],
};

/* ---------- 4. Terminal banner ---------- */

export const TERMINAL = {
  lines: [
    { key: "workflow.status", value: "manual", tone: "warn" },
    { key: "hours_lost_weekly", value: "unknown", tone: "warn" },
    { key: "recommended_action", value: "automate", tone: "ok" },
  ],
  title: "Deploy automation",
  primaryCta: "Start the audit",
  secondaryCta: "Book a call",
} as const;

/* ---------- 5. Proof: stats (logos come from WORK in components/constants.tsx) ---------- */

/* Past projects, shown as the logo wall. */

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  label: string;
  ratio: string;
  image: string;
  /** Live site. Logos without one aren't links. */
  href?: string;
  /** Logo image in /public. Without one, the title is shown as a wordmark. */
  logo?: string;
  /** Type styling for the wordmark, so each brand reads differently. */
  wordmarkClass: string;
};

export const WORK: WorkItem[] = [
  {
    id: "W.01",
    title: "ModOutfit",
    category: "E-Commerce - Custom Apparel Platform",
    year: "2025",
    label: "HOMEPAGE - ABOVE THE FOLD",
    ratio: "20 / 9",
    image: "/work/01-modoutfit.png",
    wordmarkClass: "font-sans text-2xl font-semibold uppercase tracking-[-0.03em]",
    href: "https://modoutfit.com/",
  },
  {
    id: "W.02",
    title: "Shikhi AI",
    category: "EdTech - AI Tutor Mobile App",
    year: "2025",
    label: "MOBILE - READING PRACTICE",
    ratio: "3 / 4",
    image: "/work/02-shikhi-ai.svg",
    wordmarkClass: "font-sans text-2xl font-semibold tracking-tight",
  },
  {
    id: "W.03",
    title: "Woodtech",
    category: "Manufacturing - Plywood & Wood Craft",
    year: "2025",
    label: "HOMEPAGE - ABOVE THE FOLD",
    ratio: "16 / 10",
    image: "/work/03-woodtech.svg",
    wordmarkClass: "font-serif text-3xl italic",
  },
  {
    id: "W.04",
    title: "MySolusy",
    category: "SaaS - Business Management Suite",
    year: "2025",
    label: "HOMEPAGE - HERO + MODULES",
    ratio: "5 / 2",
    image: "/work/04-mysolusy.png",
    wordmarkClass: "font-sans text-2xl font-bold lowercase tracking-tight",
    href: "https://www.mysolusy.com/",
  },
  {
    id: "W.05",
    title: "Voice for Voiceless 24",
    category: "Media - Publishing Platform",
    year: "2025",
    label: "EDITORIAL - ABOVE THE FOLD",
    ratio: "16 / 9",
    image: "/work/05-voiceforvoiceless.svg",
    wordmarkClass: "font-serif text-2xl font-medium",
    href: "https://voiceforvoiceless24.com/",
  },
  {
    id: "W.06",
    title: "English Vocabulary",
    category: "EdTech - Arabic-Speaking Learners",
    year: "2025",
    label: "MOBILE - VOCABULARY CARD",
    ratio: "3 / 4",
    image: "/work/06-english-vocab.svg",
    wordmarkClass: "font-mono text-base uppercase tracking-[0.2em]",
  },
  {
    id: "W.07",
    title: "Toponimia Andalûh",
    category: "Culture - Community Mobile App",
    year: "2025",
    label: "MOBILE - COMMUNITY ARCHIVE",
    ratio: "3 / 4",
    image: "/work/07-toponimia.svg",
    wordmarkClass: "font-serif text-2xl italic",
  },
];

export const PARTNERS = {
  eyebrow: "Trusted partners",
  title: "Teams that",
  accent: "build with us",
  nextTile: "Your company next",
};

export const STATS = [
  { value: "[00]+", label: "Projects shipped", placeholder: true },
  { value: "[00]+", label: "Automations running", placeholder: true },
];

/* ---------- 6. Client reviews (coverflow) ---------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Portrait image in /public. Without one the card shows the quote. */
  photo?: string;
  /** Video testimonial URL; adds a play button. */
  video?: string;
  placeholder?: boolean;
};

export const REVIEWS_HEADER = {
  eyebrow: "Client reviews",
  title: "Real work,",
  accent: "real results",
  summary: "Hear it from the teams whose week we gave back.",
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: "[Real client quote: what changed after the automation went live.]", name: "[Client name]", role: "[Role]", company: "[Company]", placeholder: true },
  { quote: "[Real client quote: the problem before, the result after.]", name: "[Client name]", role: "[Role]", company: "[Company]", placeholder: true },
  { quote: "[Real client quote: what working with the team was like.]", name: "[Client name]", role: "[Role]", company: "[Company]", placeholder: true },
  { quote: "[Real client quote: how many hours it saved.]", name: "[Client name]", role: "[Role]", company: "[Company]", placeholder: true },
  { quote: "[Real client quote: why they'd recommend us.]", name: "[Client name]", role: "[Role]", company: "[Company]", placeholder: true },
];

/* ---------- 7. Why us: built to ship ---------- */

export const BUILDS = {
  kicker: "Built to ship",
  title: "We measure progress in",
  accent: "weeks, not slide decks.",
  summary: "Real engineers, real agents, real systems shipped into production. Here are three running right now.",
  items: [
    { title: "Lead Autopilot answering inquiries in under a minute", url: "aethonlab.studio/demo", href: "/demo", image: null },
    { title: "MySolusy business suite, live for daily operations", url: "mysolusy.com", href: "https://www.mysolusy.com/", image: "/work/04-mysolusy.png" },
    { title: "ModOutfit storefront with automated order flow", url: "modoutfit.com", href: "https://modoutfit.com/", image: "/work/01-modoutfit.png" },
  ],
};

/* ---------- 8. Why us: the moat (sticky typing block) ---------- */

export const MOAT = {
  kicker: "From enterprise teams to solo operators",
  title: "The new moat is",
  accent: "speed of execution",
  steps: [
    {
      before: "Leads wait hours for a reply, and half go cold before anyone answers.",
      after: "An agent replies in under a minute, qualifies the lead and books the call.",
    },
    {
      before: "Someone spends every Monday morning copying numbers into a spreadsheet.",
      after: "The report builds itself overnight and lands in Slack at 8am.",
    },
    {
      before: "Every new client means the same fourteen emails, forms and folders by hand.",
      after: "One signed contract triggers the whole onboarding flow.",
    },
    {
      before: "Invoices go out late, and chasing payments is nobody's job.",
      after: "Invoices send on completion, and reminders chase themselves.",
    },
    {
      before: "The same twenty questions eat your support team's day.",
      after: "A knowledge assistant answers them from your docs and escalates the rest.",
    },
  ],
};

/* ---------- 9. Why us: inside the stack ---------- */

export type StackTool = { slug: ToolSlug; note: string };

export const STACK_HEADER = {
  kicker: "Inside the stack · 15 tools, zero lock-in",
  title: "Every tool your engineer brings, and",
  accent: "who pays for what",
  summary: "No surprise software bills. Most of the stack runs in accounts you already own, and the agent runtime is included.",
};

export const STACK: { category: string; badge: string; tools: StackTool[] }[] = [
  {
    category: "Agent runtime",
    badge: "🎁 Included in every retainer",
    tools: [
      { slug: "claude", note: "The reasoning engine behind our agents." },
      { slug: "anthropic", note: "Managed models with enterprise terms." },
      { slug: "openai", note: "For speech, vision and embeddings." },
    ],
  },
  {
    category: "Orchestration",
    badge: "🔓 Self-hosted or your plan",
    tools: [
      { slug: "n8n", note: "Workflows, webhooks and schedules." },
      { slug: "make", note: "Visual scenarios your team can edit." },
      { slug: "zapier", note: "Quick triggers when n8n is overkill." },
    ],
  },
  {
    category: "Data & infra",
    badge: "💰 Pay per use · your account",
    tools: [
      { slug: "supabase", note: "Postgres, auth and storage in one." },
      { slug: "vercel", note: "Fast deploys for apps and agents." },
      { slug: "postgresql", note: "Your data, in a database you own." },
    ],
  },
  {
    category: "CRM & channels",
    badge: "🔌 Plugs into your accounts",
    tools: [
      { slug: "hubspot", note: "Clean pipelines, updated automatically." },
      { slug: "whatsapp", note: "Where your customers already message." },
      { slug: "gmail", note: "Triage, drafts and follow-ups." },
    ],
  },
  {
    category: "Where work happens",
    badge: "🤝 Your team's already there",
    tools: [
      { slug: "slack", note: "Alerts, approvals and daily digests." },
      { slug: "notion", note: "Docs and SOPs the agents can read." },
      { slug: "github", note: "Every line we ship is yours." },
    ],
  },
];

/* ---------- 10. Why us: the model ---------- */

export const MODEL_KICKER = "The model · no exceptions";

export const MODEL = [
  {
    id: "01",
    title: "Ship a working system",
    body: "Not a feature, not a demo. Something running in your business by month-end, and you own every line.",
    icon: Rocket,
  },
  {
    id: "02",
    title: "Month one fully refundable",
    body: "If the first month doesn't deliver what we scoped together, you get it back. No awkward conversation.",
    icon: ShieldCheck,
  },
  {
    id: "03",
    title: "One engineer, many agents",
    body: "A dedicated AI engineer runs a fleet of agents for you. A team's output, without a team's payroll.",
    icon: Bot,
  },
];

export const MID_CTA = {
  title: "Fix what's slowing you down.",
  body: "Tell us the task everyone hates. In 15 minutes we'll tell you whether it can be automated and roughly what it would save.",
  cta: "Book a 15-min call",
};

/* ---------- 11. Capabilities bento ---------- */

export const CAPABILITIES_HEADER = {
  eyebrow: "Our capabilities",
  title: "5 ways we automate your",
  accent: "business growth",
  summary: "Turn repetitive tasks into workflows that run themselves, and spend the time on what actually grows the business.",
};

export const CAPABILITIES = {
  tasks: {
    title: "Automate repetitive tasks",
    body: "Clear the busywork: data entry, follow-ups, reminders and hand-offs run on their own.",
    rows: [
      { label: "Follow-up emails", state: "done" },
      { label: "Lead qualification", state: "running" },
      { label: "Invoice reminders", state: "queued" },
      { label: "Weekly report", state: "queued" },
    ],
  },
  workflows: {
    title: "Connected workflows",
    body: "Connect 100+ tools so data moves between them on its own, around the clock.",
    tools: [
      "notion", "slack", "googlesheets", "hubspot", "gmail", "zapier", "trello", "airtable", "stripe",
      "asana", "shopify", "mailchimp", "discord", "figma", "github", "zendesk", "zoom", "whatsapp",
      "telegram", "calendly", "googledrive", "linear", "clickup", "typeform", "webflow", "wordpress", "intercom",
    ] as ToolSlug[],
  },
  agents: {
    title: "Custom AI agent development",
    body: "Agents that answer customers, qualify leads and close the loop, day and night.",
    file: "agent.ts",
  },
  intelligence: {
    title: "Real-time intelligence",
    body: "Research and reporting agents that surface what changed before you have to ask.",
    placeholder: "Research anything...",
    rows: ["Competitor pricing changes", "New leads this week", "Support trends"],
  },
  strategy: {
    title: "AI strategy consulting",
    body: "A ranked, scoped roadmap of what to automate first, not a slide deck of trends.",
  },
};

export const AGENT_SNIPPET = `const agent = new Agent({
  model: "claude",
  tools: [crm, calendar, whatsapp],
});

agent.on("new_lead", async (lead) => {
  const fit = await agent.qualify(lead);
  if (fit.hot) await agent.book(lead);
});`;

/* ---------- 12. Tools marquee ---------- */

export const TOOLS_HEADER = {
  title: "Powerful tools,",
  accent: "expert implementation",
  summary: "We build on the platforms that already run modern businesses, and wire them into the stack you have.",
};

export const TOOL_CARDS: { slug: ToolSlug; title: string; body: string; from: string; to: string }[] = [
  { slug: "claude", title: "Claude", body: "Reasoning agents that read, decide and act inside your tools.", from: "#f6d6c8", to: "#d97757" },
  { slug: "n8n", title: "n8n automation", body: "Self-hostable workflows connecting 400+ apps, with full control.", from: "#2a1730", to: "#ea4b71" },
  { slug: "make", title: "Make scenarios", body: "Visual automations your team can read and adjust themselves.", from: "#2b0a4a", to: "#6d00cc" },
  { slug: "openai", title: "OpenAI", body: "Speech, vision and embeddings where they fit the job best.", from: "#e8e5f5", to: "#412991" },
  { slug: "supabase", title: "Supabase", body: "Postgres, auth and storage for the apps behind your agents.", from: "#123326", to: "#3fcf8e" },
  { slug: "nextdotjs", title: "Next.js apps", body: "Fast internal tools, portals and dashboards on modern web tech.", from: "#f2f0f4", to: "#201d25" },
];

/* ---------- 13. Solutions ---------- */

export const SOLUTIONS_HEADER = {
  eyebrow: "Our solutions",
  lineOne: "Innovation level:",
  lineOneAccent: "High",
  lineTwo: "Implementation:",
  struck: "Stuck",
  fixed: "Seamless",
  summary: "Most teams already know what AI could do for them. We make it work in the real world.",
  cta: "Make your AI rollout seamless",
};

export const SOLUTIONS = [
  {
    title: "AI Consulting",
    body: "Expert guidance on where to start and what's worth automating first.",
    icon: Gauge,
    points: ["Process audit", "Automation ROI roadmap", "Build-vs-buy advice", "Fractional AI lead"],
  },
  {
    title: "AI Implementation",
    body: "Custom agents and workflows, from broken process to production-ready.",
    icon: Layers,
    points: ["End-to-end builds", "Integrations with your stack", "Testing and monitoring", "Ongoing care"],
  },
  {
    title: "AI Training & Team",
    body: "Hands-on training and embedded engineers so the know-how stays in-house.",
    icon: GraduationCap,
    points: ["Team workshops", "Internal AI playbooks", "Embedded AI engineers", "Hiring support"],
  },
];

/* ---------- 14. How we work ---------- */

export const PROCESS = [
  {
    id: "01",
    name: "Discovery",
    when: "Week 1",
    summary: "A free audit of how work moves through your business today.",
    deliverable: "Automation audit with the top 3 opportunities",
    involvement: "Two 45-minute calls",
    activities: ["Map current workflows", "Find the hours being lost", "Estimate savings per process"],
    next: "You decide whether to go ahead. No commitment.",
  },
  {
    id: "02",
    name: "Strategy",
    when: "Week 2",
    summary: "We turn the audit into a scoped, priced roadmap.",
    deliverable: "Roadmap with scope, timeline and success metrics",
    involvement: "One review session",
    activities: ["Prioritise by ROI", "Choose the stack", "Agree what 'working' means"],
    next: "Sign off, and the build starts the next week.",
  },
  {
    id: "03",
    name: "Implementation",
    when: "Weeks 3–8",
    summary: "We build, test and launch in weekly increments.",
    deliverable: "Automations running in production",
    involvement: "A 30-minute weekly check-in",
    activities: ["Weekly demos", "Testing with real data", "Team handover and docs"],
    next: "Go live, with monitoring on from day one.",
  },
  {
    id: "04",
    name: "Optimisation",
    when: "Ongoing",
    summary: "We watch the numbers and keep improving what's live.",
    deliverable: "Monthly performance report",
    involvement: "As much or as little as you like",
    activities: ["Monitoring and fixes", "Prompt and flow tuning", "New automations as you grow"],
    next: "Scale what works to the next team.",
  },
];

/* ---------- 15. Team ---------- */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  placeholder?: boolean;
};

export const TEAM: TeamMember[] = [
  { name: "[Founder name]", role: "Founder & AI Engineer", bio: "[One line on background and what they build.]", placeholder: true },
  { name: "[Team member]", role: "[Role]", bio: "[One line on background.]", placeholder: true },
  { name: "[Team member]", role: "[Role]", bio: "[One line on background.]", placeholder: true },
];

export const TEAM_EXTRA = {
  value: "[00]+",
  label: "Vetted engineers on call",
  placeholder: true,
};

/* ---------- 16. Book a call ---------- */

export const BOOKING = {
  title: "Book your free automation audit",
  body: "Tell us about your business. You'll get an instant reply from our own AI agent, and a human follows up within one business day.",
  checklist: [
    "Free 30-minute call",
    "Your top 3 automation opportunities",
    "Same-day response",
  ],
  host: { name: "[Founder name]", role: "Founder, Aethon Lab", placeholder: true },
};

/* ---------- 17. FAQ ---------- */

export const FAQ = [
  {
    q: "What kinds of processes can you automate?",
    a: "Anything rule-based or repetitive that runs through software: lead handling, follow-ups, reporting, onboarding, invoicing, support triage and data entry. If a person copies information between tools, it's usually a strong candidate.",
  },
  {
    q: "Do I need a technical team?",
    a: "No. We design, build and run everything. Your team only needs to tell us how the work is done today and test what we build.",
  },
  {
    q: "Which tools can you integrate with?",
    a: "Anything with an API or webhook, which covers most CRMs, email, WhatsApp, Google Workspace, Slack, Notion, accounting and e-commerce platforms. If a tool has no API, we'll tell you upfront.",
  },
  {
    q: "How long until something is live?",
    a: "The first automation usually goes live within two to three weeks of sign-off. Larger builds ship in weekly increments, so you see progress every week.",
  },
  {
    q: "Can it run on our own servers?",
    a: "Yes. We can self-host n8n and the agent runtime in your cloud account, so your data never leaves your infrastructure.",
  },
  {
    q: "How is pricing structured?",
    a: "There are no fixed packages. After the free audit, we quote a fixed scope for the build and an optional monthly retainer for care and new automations. Month one is fully refundable.",
  },
  {
    q: "What about security and data privacy?",
    a: "We follow least-privilege access, keep credentials in your accounts, log every agent action and keep a human approval step on anything sensitive. We're happy to sign an NDA before the audit.",
  },
];

/* ---------- 18. Footer ---------- */

export const FOOTER = {
  blurb: "AI agents and automations that give your team its week back.",
  location: "Seri Kembangan, Kuala Lumpur, Malaysia",
  company: [
    { href: "#process", label: "How we work" },
    { href: "#team", label: "Team" },
    { href: "#faq", label: "FAQ" },
    { href: BOOK_HREF, label: "Book a call" },
  ],
};

/* ---------- Contact ---------- */

/** International format, digits only (Bangladesh +880). Used for wa.me links. */
export const WHATSAPP_NUMBER = "8801743001963";
export const WHATSAPP_GREETING =
  "Hi Aethon Lab! I'd like to know more about Lead Autopilot.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;
