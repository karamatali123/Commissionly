import { CalculatorPage } from "@/components/CalculatorPage";
import { TravelCalculator } from "@/components/calculators/TravelCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("travel");

export const metadata = pageMetadata(page);

export default function TravelPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("travel")}>
      <TravelCalculator />
    </CalculatorPage>
  );
}
