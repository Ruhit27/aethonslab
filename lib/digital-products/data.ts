import type {
  Category,
  DigitalProduct,
  FileFormat,
} from "./types";

/**
 * Demo catalogue. Replace with a database query when products become real —
 * the helpers below are the only things components import.
 */
export const PRODUCTS: DigitalProduct[] = [
  {
    slug: "ielts-academic-writing-practice-guide",
    title: "IELTS Academic Writing Practice Guide",
    shortDescription:
      "Band-9 model answers, task breakdowns and examiner criteria for Writing Tasks 1 and 2.",
    description:
      "A complete preparation guide for the IELTS Academic Writing paper. Covers both tasks in depth, with annotated band-9 model answers, the four official assessment criteria explained in plain English, and 24 practice prompts with planning frameworks. Written for candidates targeting band 7.0 and above.",
    category: "Education & Study Materials",
    format: "PDF",
    price: 12,
    thumbnail: "/product-thumbnails/ielts-academic-writing-practice-guide.svg",
    pageCount: 86,
    fileSize: "4.2 MB",
    updatedAt: "2026-07-14",
    keywords: ["ielts", "writing", "exam", "english", "academic", "band 9", "essay"],
    preview: {
      kind: "paged",
      totalPages: 86,
      pages: [
        {
          number: 4,
          label: "Task 2 — Essay Structure",
          blocks: [
            { type: "heading", text: "The Four-Paragraph Frame", level: 1 },
            {
              type: "paragraph",
              text: "Almost every Task 2 prompt can be answered inside a four-paragraph frame. The frame is not a template to copy word for word — it is a structure that guarantees you address every assessment criterion in the 40 minutes available.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Introduction — paraphrase the prompt, then state your position in one sentence.",
                "Body one — your strongest argument, developed with a specific example.",
                "Body two — your second argument, or the counter-argument you then rebut.",
                "Conclusion — restate the position; add no new ideas.",
              ],
            },
            {
              type: "callout",
              label: "Examiner note",
              text: "A clear position stated in the introduction and held consistently to the conclusion is the single biggest lever on your Task Response score.",
            },
            {
              type: "paragraph",
              text: "Spend five minutes planning before you write. Candidates who plan score consistently higher on Coherence and Cohesion because their paragraphing is decided before the clock pressure begins.",
            },
          ],
        },
        {
          number: 5,
          label: "Task 2 — Assessment Criteria",
          blocks: [
            { type: "heading", text: "How Task 2 Is Marked", level: 1 },
            {
              type: "paragraph",
              text: "Your Task 2 score is the average of four equally weighted criteria. Understanding what each one rewards tells you where to spend your revision time.",
            },
            {
              type: "table",
              headers: ["Criterion", "Weight", "What raises the band"],
              rows: [
                ["Task Response", "25%", "A clear position, fully developed ideas"],
                ["Coherence & Cohesion", "25%", "Logical paragraphing, varied linking"],
                ["Lexical Resource", "25%", "Precise, less common vocabulary"],
                ["Grammatical Range", "25%", "Complex structures used accurately"],
              ],
            },
            {
              type: "paragraph",
              text: "Note that range and accuracy are weighted together. A candidate who attempts complex sentences and makes occasional errors will usually outscore one who writes only simple sentences correctly.",
            },
          ],
        },
        {
          number: 12,
          label: "Task 1 — Describing Trends",
          blocks: [
            { type: "heading", text: "Language for Change Over Time", level: 1 },
            {
              type: "paragraph",
              text: "Task 1 rewards precise, varied description of movement. Build an active vocabulary of verb and adverb pairs so you are not repeating “increased significantly” six times.",
            },
            {
              type: "table",
              headers: ["Direction", "Verbs", "Adverbs"],
              rows: [
                ["Upward", "rose, climbed, surged", "sharply, steadily, marginally"],
                ["Downward", "fell, declined, plummeted", "gradually, dramatically, slightly"],
                ["No change", "levelled off, plateaued", "broadly, largely"],
              ],
            },
            {
              type: "callout",
              label: "Common error",
              text: "Do not give reasons for the data in Task 1. You are describing what the figure shows, not explaining why.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "weekly-productivity-planner",
    title: "Weekly Productivity Planner",
    shortDescription:
      "A printable weekly system with time-blocking grids, priority triage and a Friday review.",
    description:
      "A one-week-per-spread planner built around time blocking and weekly review. Each spread pairs a 7-day hourly grid with a priority triage panel and a reflection page. Print at A4 or US Letter, or annotate on a tablet. Includes twelve undated weeks plus quarterly goal pages.",
    category: "Productivity & Planning",
    format: "PDF",
    price: 8,
    thumbnail: "/product-thumbnails/weekly-productivity-planner.svg",
    pageCount: 32,
    fileSize: "2.8 MB",
    updatedAt: "2026-08-02",
    keywords: ["planner", "productivity", "time blocking", "weekly", "printable", "review"],
    preview: {
      kind: "paged",
      totalPages: 32,
      pages: [
        {
          number: 2,
          label: "Weekly Spread — Priorities",
          blocks: [
            { type: "heading", text: "Week At A Glance", level: 1 },
            {
              type: "paragraph",
              text: "Start the week here. Name three outcomes that would make the week a success, then everything else is negotiable.",
            },
            {
              type: "fields",
              items: [
                { label: "Priority one", value: "" },
                { label: "Priority two", value: "" },
                { label: "Priority three", value: "" },
              ],
            },
            {
              type: "table",
              headers: ["Day", "Deep work block", "Admin block"],
              rows: [
                ["Monday", "09:00 – 11:30", "15:00 – 16:00"],
                ["Tuesday", "09:00 – 11:30", "15:00 – 16:00"],
                ["Wednesday", "09:00 – 11:30", "15:00 – 16:00"],
                ["Thursday", "09:00 – 11:30", "15:00 – 16:00"],
                ["Friday", "09:00 – 11:00", "14:00 – 16:00"],
              ],
            },
          ],
        },
        {
          number: 3,
          label: "Weekly Spread — Review",
          blocks: [
            { type: "heading", text: "Friday Review", level: 1 },
            {
              type: "paragraph",
              text: "Fifteen minutes on Friday afternoon. The review is what turns a planner into a system — without it you are only making lists.",
            },
            {
              type: "list",
              items: [
                "What actually moved forward this week?",
                "What did I commit to that I should not have?",
                "What is carrying over, and is it still worth doing?",
                "What is the one thing next week depends on?",
              ],
            },
            {
              type: "callout",
              label: "Tip",
              text: "Anything that carries over three weeks in a row is not a task. Either schedule it properly or delete it.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "30-day-home-workout-plan",
    title: "30-Day Home Workout & Nutrition Plan",
    shortDescription:
      "Equipment-free progressive training with a matching meal framework and progress log.",
    description:
      "Thirty days of progressive bodyweight training that needs no equipment and no gym. Four sessions a week across three difficulty tiers, each with warm-up, working sets and mobility work. Paired with a flexible nutrition framework — portion guidance rather than calorie counting — and a printable progress log.",
    category: "Health & Fitness",
    format: "PDF",
    price: 10,
    thumbnail: "/product-thumbnails/30-day-home-workout-plan.svg",
    pageCount: 54,
    fileSize: "6.1 MB",
    updatedAt: "2026-06-28",
    keywords: ["workout", "fitness", "bodyweight", "nutrition", "home", "training", "health"],
    preview: {
      kind: "paged",
      totalPages: 54,
      pages: [
        {
          number: 8,
          label: "Week 1 — Session A",
          blocks: [
            { type: "heading", text: "Session A — Lower Body", level: 1 },
            {
              type: "paragraph",
              text: "Move through the warm-up without resting. Then complete the working sets with 60–90 seconds between them. If a set feels easier than a 7 out of 10, take the harder progression next time.",
            },
            {
              type: "table",
              headers: ["Exercise", "Sets", "Reps", "Rest"],
              rows: [
                ["Bodyweight squat", "4", "12–15", "60s"],
                ["Reverse lunge", "3", "10 each side", "60s"],
                ["Glute bridge", "3", "15", "45s"],
                ["Wall sit", "3", "30–45s", "45s"],
                ["Calf raise", "2", "20", "30s"],
              ],
            },
            {
              type: "callout",
              label: "Form check",
              text: "Knees track over the middle toes on every squat and lunge. If they collapse inward, reduce depth before adding reps.",
            },
          ],
        },
        {
          number: 31,
          label: "Nutrition — Plate Framework",
          blocks: [
            { type: "heading", text: "Building A Plate", level: 1 },
            {
              type: "paragraph",
              text: "No weighing, no apps. Use your hand as the measure — it scales with your body, so the portions stay appropriate as you change.",
            },
            {
              type: "list",
              items: [
                "Protein: one palm-sized portion per meal, two if training that day.",
                "Vegetables: one fist minimum, and more is genuinely better.",
                "Carbohydrate: one cupped handful, timed around training.",
                "Fat: one thumb-sized portion.",
              ],
            },
            {
              type: "paragraph",
              text: "Adjust after two weeks, not two days. Weight fluctuates daily with hydration and salt; the trend line is the only thing worth reading.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "monthly-personal-budget-tracker",
    title: "Monthly Personal Budget Tracker",
    shortDescription:
      "A zero-based budgeting sheet with category rollups, variance columns and a 12-month view.",
    description:
      "A spreadsheet-ready budget tracker for people who want the numbers without the subscription. Log transactions against categories and the monthly rollups, variance against plan and running balance all update. Opens in Excel, Google Sheets, Numbers, or anything that reads CSV.",
    category: "Finance & Budgeting",
    format: "CSV",
    price: 6,
    thumbnail: "/product-thumbnails/monthly-personal-budget-tracker.svg",
    csvStructure:
      "9 columns covering date, merchant, category, subcategory, planned amount, actual amount, variance, payment method and notes. One row per transaction, with a summary block keyed by category.",
    fileSize: "184 KB",
    updatedAt: "2026-08-19",
    keywords: ["budget", "finance", "money", "spending", "tracker", "spreadsheet", "expenses"],
    preview: {
      kind: "csv",
      data: {
        headers: [
          "Date",
          "Merchant",
          "Category",
          "Planned",
          "Actual",
          "Variance",
          "Method",
        ],
        rows: [
          ["2026-08-01", "Northgate Rentals", "Housing", "1450.00", "1450.00", "0.00", "Transfer"],
          ["2026-08-02", "Fresh Market", "Groceries", "120.00", "137.45", "-17.45", "Debit"],
          ["2026-08-03", "City Transit", "Transport", "60.00", "60.00", "0.00", "Card"],
          ["2026-08-05", "Lumen Energy", "Utilities", "95.00", "88.20", "+6.80", "Direct debit"],
          ["2026-08-07", "Corner Pharmacy", "Health", "40.00", "23.10", "+16.90", "Debit"],
          ["2026-08-09", "Fresh Market", "Groceries", "120.00", "104.80", "+15.20", "Debit"],
          ["2026-08-11", "Volt Mobile", "Utilities", "35.00", "35.00", "0.00", "Direct debit"],
          ["2026-08-14", "Rivera Coffee", "Dining", "45.00", "62.30", "-17.30", "Card"],
        ],
        totalRows: 412,
        totalColumns: 9,
      },
    },
  },
  {
    slug: "business-expense-tracker",
    title: "Business Expense Tracker",
    shortDescription:
      "Deductible-ready expense logging with tax categories, receipt references and quarterly totals.",
    description:
      "Built for sole traders and small teams who want clean books at tax time. Each row captures the tax category, deductible percentage, receipt reference and supplier, so quarterly totals and the year-end summary come straight out of the sheet. Includes a category reference tab as a second CSV.",
    category: "Finance & Budgeting",
    format: "CSV",
    price: 7,
    thumbnail: "/product-thumbnails/business-expense-tracker.svg",
    csvStructure:
      "11 columns covering date, supplier, description, tax category, net, tax, gross, deductible percentage, receipt reference, payment method and reconciliation flag. Quarterly subtotal rows separate each period.",
    fileSize: "236 KB",
    updatedAt: "2026-07-30",
    keywords: ["expenses", "business", "tax", "accounting", "deductible", "invoice", "bookkeeping"],
    preview: {
      kind: "csv",
      data: {
        headers: [
          "Date",
          "Supplier",
          "Tax category",
          "Net",
          "Tax",
          "Gross",
          "Deductible",
        ],
        rows: [
          ["2026-07-02", "Helix Hosting", "Software & IT", "84.00", "8.40", "92.40", "100%"],
          ["2026-07-04", "Redgate Stationery", "Office supplies", "41.20", "4.12", "45.32", "100%"],
          ["2026-07-08", "Metro Rail", "Travel", "128.00", "12.80", "140.80", "100%"],
          ["2026-07-11", "Bayside Coworking", "Rent & utilities", "320.00", "32.00", "352.00", "100%"],
          ["2026-07-15", "Anvil Design Co.", "Contractors", "900.00", "90.00", "990.00", "100%"],
          ["2026-07-19", "Harbour Bistro", "Client entertainment", "96.50", "9.65", "106.15", "50%"],
          ["2026-07-23", "Volt Mobile", "Telecoms", "45.00", "4.50", "49.50", "80%"],
          ["2026-07-28", "Stack Analytics", "Software & IT", "150.00", "15.00", "165.00", "100%"],
        ],
        totalRows: 268,
        totalColumns: 11,
      },
    },
  },
  {
    slug: "meal-prep-grocery-tracker",
    title: "Meal Prep & Grocery Tracker",
    shortDescription:
      "Weekly meal planning with an auto-grouped shopping list and per-serving cost tracking.",
    description:
      "Plan a week of meals and get the shopping list as a by-product. Ingredients are grouped by aisle, quantities aggregate across recipes, and per-serving cost is calculated so you can see what a meal actually costs. Includes a 40-recipe starter library as a second sheet.",
    category: "Health & Fitness",
    format: "CSV",
    price: 5,
    thumbnail: "/product-thumbnails/meal-prep-grocery-tracker.svg",
    csvStructure:
      "8 columns covering day, meal slot, recipe, ingredient, quantity, unit, aisle and unit cost. Rows repeat per ingredient; the aisle column drives the grouped shopping list.",
    fileSize: "148 KB",
    updatedAt: "2026-08-11",
    keywords: ["meal prep", "grocery", "shopping list", "recipes", "nutrition", "cooking", "health"],
    preview: {
      kind: "csv",
      data: {
        headers: ["Day", "Meal", "Recipe", "Ingredient", "Qty", "Unit", "Aisle"],
        rows: [
          ["Monday", "Lunch", "Chickpea bowl", "Chickpeas", "400", "g", "Canned goods"],
          ["Monday", "Lunch", "Chickpea bowl", "Baby spinach", "120", "g", "Produce"],
          ["Monday", "Dinner", "Lemon chicken", "Chicken thigh", "600", "g", "Butcher"],
          ["Tuesday", "Lunch", "Chickpea bowl", "Chickpeas", "400", "g", "Canned goods"],
          ["Tuesday", "Dinner", "Miso salmon", "Salmon fillet", "2", "fillet", "Seafood"],
          ["Wednesday", "Breakfast", "Overnight oats", "Rolled oats", "180", "g", "Dry goods"],
          ["Wednesday", "Dinner", "Lentil ragu", "Red lentils", "250", "g", "Dry goods"],
          ["Thursday", "Lunch", "Miso salmon", "Brown rice", "200", "g", "Dry goods"],
        ],
        totalRows: 196,
        totalColumns: 8,
      },
    },
  },
  {
    slug: "social-media-content-planning-template",
    title: "Social Media Content Planning Template",
    shortDescription:
      "A 90-day content calendar with pillar planning, hook frameworks and a repurposing workflow.",
    description:
      "A working document for planning a quarter of social content in one sitting. Define content pillars, map them to a 90-day calendar, and draft against proven hook frameworks. Includes a repurposing workflow that turns one long-form piece into eleven posts, plus a monthly performance review section.",
    category: "Business & Marketing",
    format: "DOCX",
    price: 9,
    thumbnail: "/product-thumbnails/social-media-content-planning-template.svg",
    pageCount: 24,
    fileSize: "780 KB",
    updatedAt: "2026-08-05",
    keywords: ["social media", "content", "calendar", "marketing", "instagram", "planning", "strategy"],
    preview: {
      kind: "paged",
      totalPages: 24,
      pages: [
        {
          number: 2,
          label: "Section 1 — Content Pillars",
          blocks: [
            { type: "heading", text: "Defining Your Content Pillars", level: 1 },
            {
              type: "paragraph",
              text: "Pillars are the three to five themes you return to every week. They stop you staring at a blank calendar and they train the audience to know what you are for.",
            },
            {
              type: "fields",
              items: [
                { label: "Pillar 1", value: "Behind the build" },
                { label: "Pillar 2", value: "Client outcomes" },
                { label: "Pillar 3", value: "Industry commentary" },
                { label: "Pillar 4", value: "" },
              ],
            },
            {
              type: "callout",
              label: "Rule of thumb",
              text: "If a post idea does not map to a pillar, it is probably a distraction — or you have found a pillar you have not named yet.",
            },
          ],
        },
        {
          number: 6,
          label: "Section 2 — Hook Frameworks",
          blocks: [
            { type: "heading", text: "Seven Hooks That Reliably Work", level: 1 },
            {
              type: "paragraph",
              text: "The first line decides whether the rest is read. Draft three hooks per post and pick the one that would stop you scrolling.",
            },
            {
              type: "table",
              headers: ["Framework", "Opening line"],
              rows: [
                ["Contrarian", "Everyone says X. They are wrong, and here is why."],
                ["Result-first", "We cut onboarding from 14 days to 3. Here is how."],
                ["Mistake", "The mistake that cost us our first enterprise deal."],
                ["Listicle", "Five things I wish I knew before…"],
                ["Question", "Why do most X fail within 18 months?"],
              ],
            },
          ],
        },
        {
          number: 14,
          label: "Section 4 — Repurposing Workflow",
          blocks: [
            { type: "heading", text: "One Piece Into Eleven", level: 1 },
            {
              type: "paragraph",
              text: "Write once at length, then break it down. This is the difference between posting daily and burning out in three weeks.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Publish the long-form piece — newsletter, article or video.",
                "Pull the three strongest arguments into standalone text posts.",
                "Turn the central statistic into a single-image graphic.",
                "Cut two short-form video clips from the recording.",
                "Convert the summary into a carousel.",
                "Reuse the best sentence verbatim as a quote post.",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "freelance-invoice-proposal-pack",
    title: "Freelance Invoice & Proposal Template Pack",
    shortDescription:
      "Eight editable client documents — proposals, invoices, contracts and scope-change notices.",
    description:
      "The paperwork side of freelancing, handled. Eight editable documents covering the full client lifecycle: proposal, statement of work, contract, deposit invoice, final invoice, payment reminder, scope-change notice and project close-out. Plain-English clauses with guidance notes on what to change and what to leave alone.",
    category: "Templates",
    format: "DOCX",
    price: 11,
    thumbnail: "/product-thumbnails/freelance-invoice-proposal-pack.svg",
    pageCount: 38,
    fileSize: "1.1 MB",
    updatedAt: "2026-07-22",
    keywords: ["invoice", "proposal", "contract", "freelance", "template", "client", "scope"],
    preview: {
      kind: "paged",
      totalPages: 38,
      pages: [
        {
          number: 3,
          label: "Document 1 — Project Proposal",
          blocks: [
            { type: "heading", text: "Project Proposal", level: 1 },
            {
              type: "fields",
              items: [
                { label: "Prepared for", value: "[Client name]" },
                { label: "Prepared by", value: "[Your name / studio]" },
                { label: "Date", value: "[Date]" },
                { label: "Valid until", value: "[Date + 30 days]" },
              ],
            },
            { type: "heading", text: "Understanding the brief", level: 2 },
            {
              type: "paragraph",
              text: "Restate the problem in the client's own words before proposing anything. A proposal that opens by proving you listened converts far better than one that opens with your credentials.",
            },
            {
              type: "callout",
              label: "Guidance note",
              text: "Keep this section to one paragraph. If you cannot state the problem in one paragraph, you do not yet understand it well enough to quote.",
            },
          ],
        },
        {
          number: 17,
          label: "Document 4 — Deposit Invoice",
          blocks: [
            { type: "heading", text: "Invoice", level: 1 },
            {
              type: "fields",
              items: [
                { label: "Invoice number", value: "[YYYY-001]" },
                { label: "Issue date", value: "[Date]" },
                { label: "Due date", value: "[Issue date + 14 days]" },
              ],
            },
            {
              type: "table",
              headers: ["Description", "Qty", "Rate", "Amount"],
              rows: [
                ["Project deposit — 40% of agreed fee", "1", "[Amount]", "[Amount]"],
                ["", "", "Subtotal", "[Amount]"],
                ["", "", "Tax", "[Amount]"],
                ["", "", "Total due", "[Amount]"],
              ],
            },
            {
              type: "callout",
              label: "Guidance note",
              text: "Take the deposit before any work begins, without exception. The clause in Document 3 makes this contractual rather than a favour you are asking for.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "study-notes-flashcard-organizer",
    title: "Study Notes & Flashcard Organizer",
    shortDescription:
      "Cornell note templates, spaced-repetition schedules and exam-week revision planning.",
    description:
      "A structured note-taking and revision system for students. Cornell-method note pages, a flashcard bank with built-in spaced-repetition intervals, topic confidence tracking, and an exam-week planner that works backwards from your dates. Editable so you can adapt the templates to your subjects.",
    category: "Education & Study Materials",
    format: "DOCX",
    price: 7,
    thumbnail: "/product-thumbnails/study-notes-flashcard-organizer.svg",
    pageCount: 42,
    fileSize: "920 KB",
    updatedAt: "2026-08-16",
    keywords: ["study", "notes", "flashcards", "revision", "cornell", "spaced repetition", "exam"],
    preview: {
      kind: "paged",
      totalPages: 42,
      pages: [
        {
          number: 2,
          label: "Section 1 — Cornell Note Page",
          blocks: [
            { type: "heading", text: "Cornell Note Template", level: 1 },
            {
              type: "fields",
              items: [
                { label: "Subject", value: "" },
                { label: "Lecture / chapter", value: "" },
                { label: "Date", value: "" },
              ],
            },
            {
              type: "paragraph",
              text: "Take notes in the right-hand column during the lecture. Leave the narrow left column empty — you will fill it with cue questions afterwards, and that act of writing the questions is what moves the material into memory.",
            },
            {
              type: "table",
              headers: ["Cue questions", "Notes"],
              rows: [
                ["What defines…?", "Key definition and its two conditions"],
                ["Why does… occur?", "Mechanism, with the worked example"],
                ["How does X differ from Y?", "Comparison table drawn in lecture"],
              ],
            },
            {
              type: "callout",
              label: "Summary box",
              text: "Write a two-sentence summary at the bottom of every page within 24 hours. Pages without summaries are rarely revisited.",
            },
          ],
        },
        {
          number: 19,
          label: "Section 3 — Spaced Repetition",
          blocks: [
            { type: "heading", text: "Review Intervals", level: 1 },
            {
              type: "paragraph",
              text: "Review just before you would otherwise forget. Each successful recall pushes the next review further out, so the workload shrinks as the term goes on.",
            },
            {
              type: "table",
              headers: ["Review", "Interval", "Cumulative"],
              rows: [
                ["First", "1 day after learning", "Day 1"],
                ["Second", "3 days later", "Day 4"],
                ["Third", "7 days later", "Day 11"],
                ["Fourth", "16 days later", "Day 27"],
                ["Fifth", "35 days later", "Day 62"],
              ],
            },
            {
              type: "paragraph",
              text: "If you fail a recall, reset that card to the first interval. Failing is information, not a setback — it tells you exactly where revision time belongs.",
            },
          ],
        },
      ],
    },
  },
];

/** Lookup used by the product detail route. */
export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getAllSlugs(): string[] {
  return PRODUCTS.map((product) => product.slug);
}

export type ProductFilters = {
  search: string;
  category: Category | "All";
  format: FileFormat | "All";
};

/**
 * Single source of truth for filtering, so the listing page and any future
 * server-rendered variant stay consistent.
 */
export function filterProducts(
  products: DigitalProduct[],
  { search, category, format }: ProductFilters,
): DigitalProduct[] {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    if (category !== "All" && product.category !== category) {
      return false;
    }

    if (format !== "All" && product.format !== format) {
      return false;
    }

    if (query.length === 0) {
      return true;
    }

    const haystack = [
      product.title,
      product.shortDescription,
      product.category,
      product.format,
      ...product.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
