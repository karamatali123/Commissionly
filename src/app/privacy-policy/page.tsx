import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { getInfoPage } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const page = getInfoPage("privacy");

export const metadata = pageMetadata(page);

export default function PrivacyPage() {
  return (
    <InfoPage page={page}>
      <p>
        Commissionly stores as little as it can. The calculators run in your browser. Typing a sale price does not create an account, and the numbers in the address bar stay on the link you copy.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Cookies and analytics</h2>
      <p>
        A choice saved in local storage remembers whether you accepted or rejected optional cookies. If you accept, and analytics is configured, the site may load Plausible, which counts page views without using advertising cookies. If you reject, that script is not added. The calculators do not need the choice.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Advertising</h2>
      <p>
        Ad slots are reserved only when ads are turned on. They are not placed above a calculator. If Google AdSense is configured, its script loads after you accept and after the browser is idle. Ad networks can use cookies to measure and, in some cases, to personalize ads. Rejecting optional cookies keeps that script off.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">Messages you send</h2>
      <p>
        If you email {CONTACT_EMAIL} or use the contact form, the message includes whatever you type, plus the technical details the form service records, such as the time it arrived. Do not send account numbers or other secrets.
      </p>
      <h2 className="pt-4 text-2xl font-semibold">California privacy rights</h2>
      <p>
        Commissionly does not sell personal information. Under the CCPA and CPRA you can ask what personal information a business collected, ask for deletion, and opt out of sale or sharing. The opt-out here is the Reject button on the cookie notice. To ask a question about information you sent by email, write to {CONTACT_EMAIL}. We will not discriminate against you for exercising these rights.
      </p>
      <p>
        The <Link href="/disclaimer/" className="font-semibold text-accent">disclaimer</Link> explains what the calculator results are, and are not.
      </p>
    </InfoPage>
  );
}
