import { CalculatorPage } from "@/components/CalculatorPage";
import { LifeInsuranceCalculator } from "@/components/calculators/LifeInsuranceCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("life-insurance");

export const metadata = pageMetadata(page);

export default function LifeInsurancePage() {
  return (
    <CalculatorPage page={page} copy={getCopy("life-insurance")}>
      <LifeInsuranceCalculator />
    </CalculatorPage>
  );
}
