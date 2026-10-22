import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Terms of Use";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Terms of Use");
}
