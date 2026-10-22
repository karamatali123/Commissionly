export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight">
        FAQ
      </h2>
      <div className="mt-4 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <h3 className="text-lg font-semibold">{item.question}</h3>
            <p className="mt-2 leading-7">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
