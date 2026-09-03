import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const typingTexts = [
  "Haircut & Styling",
  "Color & Highlights",
  "Facial & Skincare",
  "Spa & Massage",
  "Bridal Makeover",
];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % typingTexts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Luxurious%20modern%20hair%20salon%20interior%20with%20warm%20golden%20ambient%20lighting%2C%20elegant%20cream%20walls%20with%20gold%20accents%2C%20marble%20flooring%2C%20stylish%20hair%20styling%20stations%2C%20large%20ornate%20mirrors%2C%20chandeliers%2C%20fresh%20flowers%2C%20professional%20atmosphere%2C%20empty%20and%20clean%2C%20upscale%20interior%20design&width=1920&height=1080&seq=hero-bg-salon-01&orientation=landscape"
          alt="Luxury salon interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/50 to-dark-950/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse-gold"></span>
              Premium Salon Experience
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight mb-6">
              Your Beauty
              <br />
              <span className="gold-text">Appointment,</span>
              <br />
              Booked in Minutes.
            </h1>

            <div className="h-12 mb-6">
              <span className="text-xl md:text-2xl text-cream-200 font-light">
                {displayText}
                <span className="inline-block w-0.5 h-6 bg-gold-500 ml-1 animate-pulse align-middle"></span>
              </span>
            </div>

            <p className="text-cream-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed animate-fade-in-up animate-delay-200">
              No more waiting in queues. Book your salon appointment online anytime, anywhere. Experience luxury beauty services with our expert stylists.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
              <Link
                to="/booking"
                className="gold-btn px-8 py-3.5 text-sm whitespace-nowrap text-center cursor-pointer inline-flex items-center justify-center gap-2 ripple"
              >
                <i className="ri-calendar-check-line text-lg"></i>
                Book Appointment
              </Link>
              <a
                href="#services"
                className="px-8 py-3.5 rounded-full border-2 border-cream-300/50 text-cream-100 text-sm font-medium hover:bg-cream-100/10 hover:border-cream-100 transition-all duration-300 text-center whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <i className="ri-arrow-down-line"></i>
                Explore Services
              </a>
            </div>

            <div className="flex items-center gap-8 mt-12 animate-fade-in-up animate-delay-400">
              {[
                { value: "15K+", label: "Happy Clients" },
                { value: "50+", label: "Expert Stylists" },
                { value: "4.9", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-display font-bold gold-text">
                    {stat.value}
                  </div>
                  <div className="text-cream-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center animate-float">
            <div className="relative">
              <div className="w-80 h-96 rounded-3xl overflow-hidden glass-card shadow-gold-lg">
                <img
                  src="https://readdy.ai/api/search-image?query=Beautiful%20woman%20with%20perfect%20blowout%20hairstyle%2C%20radiant%20skin%2C%20confident%20smile%2C%20wearing%20elegant%20cream%20silk%20robe%2C%20sitting%20in%20luxury%20salon%20chair%2C%20warm%20golden%20lighting%2C%20editorial%20beauty%20portrait%2C%20high-end%20fashion%20photography%20style&width=640&height=800&seq=hero-portrait-salon-01&orientation=portrait"
                  alt="Happy salon client"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl shadow-gold animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
                    <i className="ri-star-fill text-dark-950 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-dark-950 font-semibold text-sm">Top Rated</div>
                    <div className="text-dark-600 text-xs">4.9 / 5.0</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 glass-card p-4 rounded-2xl animate-float animate-delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cream-100 flex items-center justify-center">
                    <i className="ri-time-line text-gold-500 text-lg"></i>
                  </div>
                  <div>
                    <div className="text-dark-950 font-semibold text-sm">Quick Booking</div>
                    <div className="text-dark-600 text-xs">Under 2 Minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <a
          href="#services"
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-cream-300/50 text-cream-200 hover:bg-cream-100/10 hover:border-cream-100 transition-all duration-300 cursor-pointer"
          aria-label="Scroll to services"
        >
          <i className="ri-arrow-down-s-line text-xl"></i>
        </a>
      </div>
    </section>
  );
}