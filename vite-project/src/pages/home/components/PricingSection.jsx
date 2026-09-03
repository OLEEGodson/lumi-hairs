import { Link } from "react-router-dom";
import { pricingPlans } from "@/mocks/pricing";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Membership Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-dark-500 max-w-2xl mx-auto text-sm md:text-base">
            Unlock exclusive perks and savings with our membership plans. The more you visit, the more you save.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all duration-500 animate-fade-in-up ${
                plan.highlighted
                  ? "bg-dark-950 text-white scale-105 shadow-gold-lg z-10"
                  : "bg-cream-50 border border-cream-200 hover:shadow-soft-lg"
              }`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-dark-950 text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`text-xl font-display font-bold mb-2 ${
                    plan.highlighted ? "text-gold-500" : "text-dark-950"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-4xl font-display font-bold ${
                      plan.highlighted ? "text-white" : "gold-text"
                    }`}
                  >
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-cream-300" : "text-dark-400"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm ${
                      plan.highlighted ? "text-cream-200" : "text-dark-600"
                    }`}
                  >
                    <i
                      className={`ri-checkbox-circle-fill mt-0.5 ${
                        plan.highlighted ? "text-gold-500" : "text-gold-600"
                      }`}
                    ></i>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/booking"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  plan.highlighted
                    ? "gold-btn"
                    : "border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-dark-950"
                }`}
              >
                {plan.price === 0 ? "Get Started Free" : "Join Now"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}