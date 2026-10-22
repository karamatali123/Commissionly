export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function countWords(text: string): number {
  const plain = plainText(text).trim();
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}
