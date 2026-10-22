export interface CopyTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface CalculatorCopy {
  id: string;
  intro: string;
  howTo: { heading: string; paragraphs: string[] };
  example: { heading: string; paragraphs: string[] };
  industry: { heading: string; paragraphs: string[]; table?: CopyTable };
  faqs: { question: string; answer: string }[];
  about: string;
  reviewNotes: string[];
  template?: boolean;
  affiliate?: boolean;
}

export function copyWordSource(copy: CalculatorCopy): string {
  const table = copy.industry.table;
  const tableText = table
    ? [table.caption, ...table.headers, ...table.rows.flat()].join(" ")
    : "";
  return [
    ...copy.howTo.paragraphs,
    ...copy.example.paragraphs,
    ...copy.industry.paragraphs,
    tableText,
    ...copy.faqs.flatMap((faq) => [faq.question, faq.answer]),
    copy.about,
  ].join(" ");
}
