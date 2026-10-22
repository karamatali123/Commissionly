import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Real Estate Commission Calculator with Broker Split";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Real Estate Commission Calculator with Broker Split");
}
