import { Globe, MousePointerClick, ScanSearch, Workflow } from "lucide-react";

export type Service = {
  id: string;
  /** The pipeline stage this service covers, from search to booked job. */
  stage: string;
  title: string;
  description: string;
  deliverables: string[];
  /** What the service is judged on. */
  measure: string;
  icon: React.ReactNode;
  flagship?: boolean;
};

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

export const SERVICES: Service[] = [
  {
    id: "01",
    stage: "Get found",
    title: "SEO & AEO",
    description:
      "Rank on Google, and get named when customers ask ChatGPT, Gemini or Perplexity who to hire.",
    deliverables: [
      "Technical and local SEO",
      "Content that answers real questions",
      "Structured answers AI assistants cite",
    ],
    measure: "Rankings, AI mentions, inquiries",
    icon: <ScanSearch className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "02",
    stage: "Get clicked",
    title: "Google Ads",
    description:
      "Search campaigns aimed at people ready to buy, tuned every week against booked jobs, not clicks.",
    deliverables: [
      "Keyword and competitor research",
      "Ads matched to their landing page",
      "Tracking all the way to the booking",
    ],
    measure: "Cost per booked job",
    icon: <MousePointerClick className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "03",
    stage: "Convert",
    title: "Websites",
    description:
      "Fast, clear sites that turn visitors into inquiries, with Lead Autopilot wired in from day one.",
    deliverables: [
      "Design and build in Next.js",
      "Speed and SEO foundations",
      "Lead Autopilot on every form",
    ],
    measure: "Visitor-to-inquiry rate",
    icon: <Globe className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "04",
    stage: "Book",
    title: "Automations",
    description:
      "Lead Autopilot answers every inquiry in under a minute, qualifies it and books it. Custom workflows take the rest.",
    deliverables: [
      "Lead Autopilot on site, WhatsApp, email",
      "Booking, invoicing and reporting flows",
      "Built with Claude and n8n",
    ],
    measure: "Reply time, booked jobs",
    icon: <Workflow className="h-6 w-6" aria-hidden="true" />,
    flagship: true,
  },
];

export const WORK: WorkItem[] = [
  {
    id: "W.01",
    title: "ModOutfit",
    category: "E-Commerce - Custom Apparel Platform",
    year: "2025",
    label: "HOMEPAGE - ABOVE THE FOLD",
    ratio: "20 / 9",
    image: "/work/01-modoutfit.png",
    wordmarkClass: "font-display text-2xl font-semibold uppercase tracking-[-0.03em]",
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
    wordmarkClass: "font-display text-2xl font-semibold tracking-tight",
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

export const PRODUCTS = [
  {
    id: "P.01",
    name: "Forge Kit",
    description:
      "An internal Next.js and design-token starter that gets a team moving in an afternoon.",
    tag: "One-time",
    featured: true,
  },
  {
    id: "P.02",
    name: "Signal",
    description:
      "An AI inbox that drafts replies in your founder voice and keeps your desk clear.",
    tag: "Subscription",
    featured: false,
  },
  {
    id: "P.03",
    name: "Runway",
    description:
      "Finance operations automation for early-stage teams that need more signal and less drift.",
    tag: "Private beta",
    featured: false,
  },
  {
    id: "P.04",
    name: "Studio OS",
    description:
      "The Notion and Linear setup we run the studio on, packaged with onboarding support.",
    tag: "Template",
    featured: false,
  },
];

export const STEPS = [
  {
    id: "01",
    title: "Think",
    description:
      "Week one is strategy, not pixels. We pressure-test the idea before the first screen lands.",
  },
  {
    id: "02",
    title: "Forge",
    description:
      "Design and engineering move together in the same sprint so decisions stay connected.",
  },
  {
    id: "03",
    title: "Launch",
    description:
      "We ship, measure, and iterate. You get the keys plus the team that knows the system.",
  },
];

export const ABOUT_LINES = [
  "We are a four-person studio, on purpose.",
  "Every project has a partner involved every day.",
  "We take two clients at a time. Never three.",
  "If we say yes, we already know how it ends.",
];

/** International format, digits only (Bangladesh +880). Used for wa.me links. */
export const WHATSAPP_NUMBER = "8801743001963";
export const WHATSAPP_GREETING =
  "Hi Aethon Lab! I'd like to know more about Lead Autopilot.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;
