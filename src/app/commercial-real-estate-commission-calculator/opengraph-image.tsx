import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Commercial Real Estate Commission Calculator";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Commercial Real Estate Commission Calculator");
}
