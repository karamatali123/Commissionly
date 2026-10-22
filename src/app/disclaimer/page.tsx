import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { getInfoPage } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getInfoPage("disclaimer");

export const metadata = pageMetadata(page);

export default function DisclaimerPage() {
  return (
    <InfoPage page={page}>
      <p>
        Commissionly results are estimates. They are not financial advice, tax advice, legal advice, or a brokerage opinion. They are not a closing disclosure, a commission statement, or a pay stub.
      </p>
      <p>
        Real estate fees depend on the listing agreement, the buyer-broker agreement, and the contract with the brokerage. Sales pay depends on the comp plan. A calculator that multiplies the numbers you type cannot see a concession, a holdback, or a clawback that the document describes.
      </p>
      <p>
        Confirm figures with the written agreement and, when the question is about tax, law, or a closing, with a qualified professional. The <Link href="/terms/" className="font-semibold text-accent">terms of use</Link> apply to every page.
      </p>
    </InfoPage>
  );
}
