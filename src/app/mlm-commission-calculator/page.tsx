import { CalculatorPage } from "@/components/CalculatorPage";
import { MlmCalculator } from "@/components/calculators/MlmCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("mlm");

export const metadata = pageMetadata(page);

export default function MlmPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("mlm")}>
      <MlmCalculator />
    </CalculatorPage>
  );
}
