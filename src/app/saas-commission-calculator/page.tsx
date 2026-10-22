import { CalculatorPage } from "@/components/CalculatorPage";
import { SaasCalculator } from "@/components/calculators/SaasCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("saas");

export const metadata = pageMetadata(page);

export default function SaasPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("saas")}>
      <SaasCalculator />
    </CalculatorPage>
  );
}
