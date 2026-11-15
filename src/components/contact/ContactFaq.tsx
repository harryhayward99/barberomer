import { contactFaqs } from "@/lib/config/seo";
import { cn, eyebrowClass, sectionPadY } from "@/lib/utils";

export function ContactFaq() {
  return (
    <section
      aria-labelledby="contact-faq-heading"
      className={cn("mx-auto max-w-7xl px-5 sm:px-8", sectionPadY)}
    >
      <p className={eyebrowClass}>Questions</p>
      <h2 id="contact-faq-heading" className="section-title mt-4 max-w-xl">
        Before you visit.
      </h2>
      <dl className="mt-10 grid gap-6 border-t border-ink/10 pt-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
        {contactFaqs.map((item) => (
          <div key={item.question} className="border-b border-ink/10 pb-6">
            <dt className="text-lg leading-snug text-ink">{item.question}</dt>
            <dd className="mt-3 text-base leading-7 text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
