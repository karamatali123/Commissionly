import Link from "next/link";

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const href = match[2].endsWith("/") ? match[2] : `${match[2]}/`;
    nodes.push(
      <Link key={`${match.index}-${href}`} href={href} className="font-semibold text-accent underline decoration-accent/40 underline-offset-2">
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
