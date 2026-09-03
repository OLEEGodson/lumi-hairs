import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/mocks/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-dark-500 max-w-2xl mx-auto text-sm md:text-base">
            Real reviews from real clients who trust us with their beauty and wellness.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 px-4">
                  <div className="glass-card p-8 md:p-10 text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-4 border-cream-100">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`text-sm ${
                            i < t.rating
                              ? "ri-star-fill text-gold-500"
                              : "ri-star-line text-dark-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-dark-600 text-base md:text-lg leading-relaxed italic mb-6 max-w-2xl mx-auto">
                      &ldquo;{t.review}&rdquo;
                    </p>
                    <h4 className="text-dark-950 font-display font-semibold text-lg">
                      {t.name}
                    </h4>
                    <p className="text-gold-600 text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full glass-card flex items-center justify-center text-dark-600 hover:text-gold-500 transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full glass-card flex items-center justify-center text-dark-600 hover:text-gold-500 transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === current ? "bg-gold-500 w-8" : "bg-cream-300 hover:bg-cream-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}