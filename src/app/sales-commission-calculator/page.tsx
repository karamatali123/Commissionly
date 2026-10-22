import { CalculatorPage } from "@/components/CalculatorPage";
import { SalesCalculator } from "@/components/calculators/SalesCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("sales");

export const metadata = pageMetadata(page);

export default function SalesPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("sales")}>
      <SalesCalculator />
    </CalculatorPage>
  );
}
