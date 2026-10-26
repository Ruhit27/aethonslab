export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  readTime: string;
  image: string;
  body: string[];
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "get-the-most-out-of-a-spreadsheet-template",
    title: "How to get the most out of a spreadsheet template",
    summary:
      "Trackers and planners only work when you make them yours. Here is how to adapt a template to your own workflow in under ten minutes.",
    label: "Guides",
    author: "Aethon Team",
    published: "12 Sep 2026",
    readTime: "4 min read",
    image: img("photo-1460925895917-afdab827c52f"),
    body: [
      "A good template gives you a head start, not a finished system. The first thing to do after downloading one is to open it and delete what you will not use.",
      "Start by renaming the columns and categories so they match the words you already use. If a tracker says 'Client' and you say 'Customer', change it. The closer the sheet is to your own language, the more likely you are to keep it updated.",
      "Next, add one row of real data before anything else. It shows you straight away whether the formulas, dropdowns and formats behave the way you expect.",
      "Finally, set a fixed time each week to update it. Five minutes on a Friday beats an hour of catching up at the end of the month.",
    ],
  },
  {
    slug: "study-guides-that-actually-stick",
    title: "Study guides that actually stick",
    summary:
      "A short look at the structure behind our study guides, and how to build a revision routine around them.",
    label: "Study",
    author: "Aethon Team",
    published: "5 Sep 2026",
    readTime: "5 min read",
    image: img("photo-1498050108023-c5249f4df085"),
    body: [
      "Reading a guide once is rarely enough. The guides we build are split into short sections so you can return to one idea at a time.",
      "Try a simple loop: read a section, close the guide, and write down what you remember. Then open it again and check what you missed. The gaps are where your next session should start.",
      "Spread the sessions out. Three short visits across a week will do more than one long evening the night before.",
      "Keep a running list of the questions you got wrong. Reviewing that list is often the most valuable ten minutes of your revision.",
    ],
  },
  {
    slug: "five-habits-for-a-tidy-small-business",
    title: "Five habits for running a tidy small business",
    summary:
      "From invoicing to weekly reviews, simple systems that keep your admin light and your numbers clear.",
    label: "Business",
    author: "Aethon Team",
    published: "28 Aug 2026",
    readTime: "6 min read",
    image: img("photo-1454165804606-c3d57bc86b40"),
    body: [
      "Most admin problems come from small things left for later. These five habits keep them from piling up.",
      "1. Invoice on the day the work is finished. 2. Record expenses as they happen, not in a batch. 3. Review your numbers once a week. 4. Keep one place for contracts and receipts. 5. Write down how you do repeat tasks, so they can be handed off.",
      "None of these need special software. A spreadsheet and a calendar reminder are enough to start.",
    ],
  },
];

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
