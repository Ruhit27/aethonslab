import { Bot, Globe, Workflow } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
};

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  label: string;
  ratio: string;
  image: string;
  /** Live site. Cards without one fall back to the contact anchor. */
  href?: string;
};

export const SERVICES: Service[] = [
  {
    id: "01",
    title: "Lead Autopilot",
    description:
      "Every inquiry from your site, WhatsApp, or email gets an instant reply in your tone, is qualified, logged, and followed up. Live in 7 days.",
    tags: ["Instant reply", "Qualify", "Follow-up", "Weekly report"],
    icon: <Bot className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "02",
    title: "Websites",
    description:
      "Fast, clean sites built to turn visitors into inquiries, with Lead Autopilot wired in from day one.",
    tags: ["Next.js", "SEO", "Autopilot-ready"],
    icon: <Globe className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "03",
    title: "Custom Automation",
    description:
      "Booking, invoicing, reporting, and other repetitive work handed to AI workflows that run without you.",
    tags: ["Claude", "n8n", "Integrations"],
    icon: <Workflow className="h-6 w-6" aria-hidden="true" />,
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
  },
  {
    id: "W.03",
    title: "Woodtech",
    category: "Manufacturing - Plywood & Wood Craft",
    year: "2025",
    label: "HOMEPAGE - ABOVE THE FOLD",
    ratio: "16 / 10",
    image: "/work/03-woodtech.svg",
  },
  {
    id: "W.04",
    title: "MySolusy",
    category: "SaaS - Business Management Suite",
    year: "2025",
    label: "HOMEPAGE - HERO + MODULES",
    ratio: "5 / 2",
    image: "/work/04-mysolusy.png",
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
  },
  {
    id: "W.07",
    title: "Toponimia Andalûh",
    category: "Culture - Community Mobile App",
    year: "2025",
    label: "MOBILE - COMMUNITY ARCHIVE",
    ratio: "3 / 4",
    image: "/work/07-toponimia.svg",
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
