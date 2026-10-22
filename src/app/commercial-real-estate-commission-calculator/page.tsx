import { CalculatorPage } from "@/components/CalculatorPage";
import { CommercialCalculator } from "@/components/calculators/CommercialCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("commercial");

export const metadata = pageMetadata(page);

export default function CommercialPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("commercial")}>
      <CommercialCalculator />
    </CalculatorPage>
  );
}
