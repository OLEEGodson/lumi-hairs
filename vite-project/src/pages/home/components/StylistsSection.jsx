import { Link } from "react-router-dom";
import { stylists } from "@/mocks/stylists";

export default function StylistsSection() {
  return (
    <section id="stylists" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Meet Our Expert Stylists
          </h2>
          <p className="text-dark-500 max-w-2xl mx-auto text-sm md:text-base">
            Our handpicked team of award-winning stylists, colorists, and beauty specialists are passionate about making you look and feel your absolute best.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylists.map((stylist, idx) => (
            <div
              key={stylist.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-5">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <p className="text-cream-100 text-sm leading-relaxed mb-3">
                    {stylist.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stylist.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-full bg-cream-100/20 text-cream-100 text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-display font-semibold text-dark-950">
                  {stylist.name}
                </h3>
                <p className="text-gold-600 text-sm font-medium mb-2">{stylist.role}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(stylist.rating)
                          ? "ri-star-fill text-gold-500"
                          : "ri-star-line text-dark-300"
                      }`}
                    ></i>
                  ))}
                  <span className="text-dark-500 text-xs ml-1">
                    ({stylist.reviewCount})
                  </span>
                </div>
                <p className="text-dark-400 text-xs mb-4">
                  {stylist.experience} years experience
                </p>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 gold-btn px-6 py-2.5 text-xs whitespace-nowrap cursor-pointer ripple"
                >
                  <i className="ri-calendar-check-line"></i>
                  Book This Stylist
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}