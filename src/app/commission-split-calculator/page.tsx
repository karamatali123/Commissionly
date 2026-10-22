import { CalculatorPage } from "@/components/CalculatorPage";
import { SplitCalculator } from "@/components/calculators/SplitCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("split");

export const metadata = pageMetadata(page);

export default function SplitPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("split")}>
      <SplitCalculator />
    </CalculatorPage>
  );
}
