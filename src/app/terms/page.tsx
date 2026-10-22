import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { getInfoPage } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";

const page = getInfoPage("terms");

export const metadata = pageMetadata(page);

export default function TermsPage() {
  return (
    <InfoPage page={page}>
      <p>
        You may use Commissionly calculators for personal or internal business planning. You may not scrape the site in a way that degrades it, present a result as if Commissionly prepared a closing statement, or use the pages to mislead a client about a fee.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Estimates</h2>
      <p>
        Results are arithmetic from the numbers you enter. They can be wrong for your contract if a cap, a tax, a concession, or a payroll rule works differently. You are responsible for checking the result against the agreement and for how you use it.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">No warranty</h2>
      <p>
        The site is provided as is. Commissionly disclaims warranties of accuracy, fitness for a particular purpose, and non-infringement to the extent the law allows. Liability for using the site is limited to the amount you paid to use it, which for the calculators is zero.
      </p>
      <p>
        Read the <Link href="/disclaimer/" className="font-semibold text-accent">disclaimer</Link> with these terms. Questions can go through the contact page.
      </p>
    </InfoPage>
  );
}
