import { CalculatorPage } from "@/components/CalculatorPage";
import { TieredCalculator } from "@/components/calculators/TieredCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("tiered");

export const metadata = pageMetadata(page);

export default function TieredPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("tiered")}>
      <TieredCalculator />
    </CalculatorPage>
  );
}
