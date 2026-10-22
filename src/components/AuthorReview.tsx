export function AuthorReview({ notes }: { notes: string[] }) {
  if (notes.length === 0) return null;
  const html = notes.map((note) => `<!-- TODO: author review: ${note.replace(/--/g, "")} -->`).join("");
  return <span className="hidden" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
