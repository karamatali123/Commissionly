import Image from "next/image";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { getInfoPage } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const page = getInfoPage("about");

export const metadata = pageMetadata(page);

export default function AboutPage() {
  return (
    <InfoPage page={page}>
      <figure className="overflow-hidden rounded-2xl border border-line">
        <Image
          src="/images/desk.jpg"
          alt="A cream desk with a blank worksheet, a green pen, coins, and a house key."
          width={1200}
          height={675}
          className="h-56 w-full object-cover"
        />
      </figure>
      <p>
        Commissionly is an independent calculator site for people who get paid a percent of a sale, a premium, or a fee. The first pages are built for US real estate agents and salespeople who want the arithmetic without a login.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">How the math is tested</h2>
      <p>
        Each calculator calls a pure function. Those functions do not read the page. Vitest checks ordinary cases, zeros, very large numbers, and the edges that change a result, such as a commission cap with only a little room left. The sentence under a result is built from the same numbers.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">What the site will not do</h2>
      <p>
        It will not invent a standard commission rate. Real estate fees are negotiated, and a comp plan means whatever the document says. It will not call an estimate a closing statement, a pay stub, or legal advice. When a fact needs a human to check it against a statute or a fee schedule, the page source keeps a review note.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Corrections</h2>
      <p>
        If a result disagrees with a worked example you trust, send the inputs and the page address to {CONTACT_EMAIL}. The <Link href="/contact/" className="font-semibold text-accent">contact page</Link> has the same address.
      </p>
    </InfoPage>
  );
}
