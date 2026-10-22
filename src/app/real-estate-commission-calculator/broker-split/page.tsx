import { CalculatorPage } from "@/components/CalculatorPage";
import { RealEstateCalculator } from "@/components/calculators/RealEstateCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("broker-split");

export const metadata = pageMetadata(page);

export default function BrokerSplitPage() {
  return (
    <CalculatorPage page={page} copy={getCopy("broker-split")}>
      <RealEstateCalculator variant="broker" />
    </CalculatorPage>
  );
}
