import { CalculatorPage } from "@/components/CalculatorPage";
import { HomeCalculator } from "@/components/calculators/HomeCalculator";
import { getCopy } from "@/content/calculators";
import { getKeyword } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getKeyword("home");

export const metadata = pageMetadata(page);

export default function HomePage() {
  return (
    <CalculatorPage page={page} copy={getCopy("home")}>
      <HomeCalculator />
    </CalculatorPage>
  );
}
