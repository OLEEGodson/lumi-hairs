import { useState } from "react";
import { Link } from "react-router-dom";
import { services, serviceCategories } from "@/mocks/services";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="services" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Premium Beauty Services
          </h2>
          <p className="text-dark-500 max-w-2xl mx-auto text-sm md:text-base">
            From precision haircuts to rejuvenating spa treatments, our expert team delivers exceptional results tailored to you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? "bg-gold-500 text-dark-950 shadow-gold"
                  : "bg-cream-100 text-dark-600 hover:bg-cream-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((service, idx) => (
            <div
              key={service.id}
              className="group glass-card overflow-hidden hover-glow animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent"></div>
                {service.popular && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold-500 text-dark-950 text-xs font-semibold">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gold-600 font-medium uppercase tracking-wide">
                    {service.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-dark-400">
                    <i className="ri-time-line"></i>
                    {service.duration}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-dark-950 mb-2">
                  {service.name}
                </h3>
                <p className="text-dark-500 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold gold-text font-display">
                    ${service.price}
                  </span>
                  <Link
                    to="/booking"
                    className="gold-btn px-5 py-2 text-xs whitespace-nowrap cursor-pointer ripple"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full border-2 border-cream-300 text-dark-600 text-sm font-medium hover:border-gold-500 hover:text-gold-600 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {showAll ? "Show Less" : `View All ${filtered.length} Services`}
              <i className={showAll ? "ml-2 ri-arrow-up-s-line" : "ml-2 ri-arrow-down-s-line"}></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}