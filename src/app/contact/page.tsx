import { InfoPage } from "@/components/InfoPage";
import { getInfoPage } from "@/data/keywords";
import { pageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, FORMSPREE_ID } from "@/lib/site";

const page = getInfoPage("contact");

export const metadata = pageMetadata(page);

export default function ContactPage() {
  return (
    <InfoPage page={page}>
      <p>
        Email {CONTACT_EMAIL} about a wrong result, a broken page, or a rate that needs a source. Include the calculator link with your inputs still in the address bar.
      </p>
      {FORMSPREE_ID ? (
        <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" className="grid max-w-lg gap-4">
          <label className="block text-sm font-medium" htmlFor="name">
            Name
            <input id="name" name="name" required className="mt-1 h-11 w-full rounded-lg border border-line bg-bg px-3" />
          </label>
          <label className="block text-sm font-medium" htmlFor="email">
            Email
            <input id="email" name="email" type="email" required className="mt-1 h-11 w-full rounded-lg border border-line bg-bg px-3" />
          </label>
          <label className="block text-sm font-medium" htmlFor="message">
            Message
            <textarea id="message" name="message" required rows={5} className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2" />
          </label>
          <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 font-semibold text-accent-ink">
            Send
          </button>
        </form>
      ) : (
        <p>The form is off until a form service is configured. Email is the way to reach the site.</p>
      )}
    </InfoPage>
  );
}
