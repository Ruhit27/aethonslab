/**
 * Types for the digital products marketplace.
 *
 * Preview content is intentionally modelled as structured data rather than
 * rendered files. Swapping the mock data in `data.ts` for text extracted from
 * real uploads (or for rendered page images) requires no component changes.
 */

export const CATEGORIES = [
  "Education & Study Materials",
  "Business & Marketing",
  "Productivity & Planning",
  "Finance & Budgeting",
  "Templates",
  "Health & Fitness",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const FILE_FORMATS = ["PDF", "CSV", "DOCX"] as const;

export type FileFormat = (typeof FILE_FORMATS)[number];

/** A block of document content, rendered onto a page by `DocumentPage`. */
export type DocBlock =
  | { type: "heading"; text: string; level?: 1 | 2 | 3 }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; label: string; text: string }
  | { type: "fields"; items: { label: string; value?: string }[] };

/** One previewable page (PDF) or section (DOCX) of a document. */
export type DocumentPageContent = {
  /** 1-based number as it appears in the source file. */
  number: number;
  /** Short caption shown above the page, e.g. "Task 1 — Structure". */
  label: string;
  blocks: DocBlock[];
};

export type CsvPreviewData = {
  headers: string[];
  rows: string[][];
  /** Row/column totals of the complete file, so the UI can say what is withheld. */
  totalRows: number;
  totalColumns: number;
};

/**
 * PDF and DOCX share the paged viewer; CSV renders as a table. Adding a new
 * previewable format means adding a variant here and a branch in
 * `ProductPreview`.
 */
export type ProductPreviewContent =
  | { kind: "paged"; pages: DocumentPageContent[]; totalPages: number }
  | { kind: "csv"; data: CsvPreviewData };

export type DigitalProduct = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: Category;
  format: FileFormat;
  /** Demo pricing, in whole USD. */
  price: number;
  thumbnail: string;
  /** Present for PDF and DOCX. */
  pageCount?: number;
  /** Present for CSV, in place of a page count. */
  csvStructure?: string;
  fileSize: string;
  updatedAt: string;
  /** Extra search terms beyond the title and description. */
  keywords: string[];
  preview: ProductPreviewContent;
};
