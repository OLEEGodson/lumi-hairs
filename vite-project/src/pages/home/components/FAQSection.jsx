import { useState } from "react";
import { faqItems } from "@/mocks/faq";

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-dark-500 text-sm md:text-base">
            Everything you need to know about booking and our services.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, idx) => (
            <div
              key={faq.id}
              className="glass-card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                aria-expanded={openId === faq.id}
              >
                <span className="text-dark-950 font-medium text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 ${
                    openId === faq.id
                      ? "bg-gold-500 text-dark-950 rotate-45"
                      : "bg-cream-200 text-dark-500"
                  }`}
                >
                  <i className="ri-add-line text-lg"></i>
                </span>
              </button>
              <div
                className={`transition-all duration-400 overflow-hidden ${
                  openId === faq.id ? "max-h-96 pb-5 px-5" : "max-h-0"
                }`}
              >
                <p className="text-dark-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}