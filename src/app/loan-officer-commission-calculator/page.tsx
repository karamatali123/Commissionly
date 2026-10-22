import { CalculatorPage } from "@/components/CalculatorPage";
import { LoanOfficerCalculator } from "@/components/calculators/LoanOfficerCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("loan-officer");

export const metadata = pageMetadata(page);

export default function LoanOfficerPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("loan-officer")}>
      <LoanOfficerCalculator />
    </CalculatorPage>
  );
}
