import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "SaaS Commission Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("SaaS Commission Calculator");
}