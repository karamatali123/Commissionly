import { CalculatorPage } from "@/components/CalculatorPage";
import { SalaryCalculator } from "@/components/calculators/SalaryCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("salary");

export const metadata = pageMetadata(page);

export default function SalaryPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("salary")}>
      <SalaryCalculator />
    </CalculatorPage>
  );
}
