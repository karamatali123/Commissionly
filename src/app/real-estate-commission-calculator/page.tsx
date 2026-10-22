import { CalculatorPage } from "@/components/CalculatorPage";
import { RealEstateCalculator } from "@/components/calculators/RealEstateCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("real-estate");

export const metadata = pageMetadata(page);

export default function RealEstatePage() {
  return (
    <CalculatorPage page={page} copy={getCopy("real-estate")}>
      <RealEstateCalculator variant="standard" />
    </CalculatorPage>
  );
}
