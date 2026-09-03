import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-dark-950 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-display font-bold text-gold-500 mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500">
                <i className="ri-scissors-cut-line text-dark-950 text-lg"></i>
              </span>
              Lumina
            </Link>
            <p className="text-cream-300 text-sm leading-relaxed mb-6">
              Your premium destination for beauty and wellness. Book your appointment online anytime, anywhere.
            </p>
            <div className="flex items-center gap-3">
              {["ri-facebook-fill", "ri-instagram-line", "ri-twitter-x-line", "ri-tiktok-line"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-cream-700 text-cream-300 hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 transition-all duration-300 cursor-pointer"
                  aria-label={`Social media ${icon}`}
                >
                  <i className={`${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold-500 font-display text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/#services" },
                { label: "Stylists", path: "/#stylists" },
                { label: "Book Appointment", path: "/booking" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact Us", path: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-cream-300 hover:text-gold-500 transition-colors duration-300 text-sm cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500 font-display text-lg font-semibold mb-6">
              Working Hours
            </h4>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-cream-100">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-cream-100">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-cream-100">10:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500 font-display text-lg font-semibold mb-6">
              Newsletter
            </h4>
            <p className="text-cream-300 text-sm mb-4">
              Subscribe for exclusive offers, beauty tips, and early access to promotions.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-gold-500 text-sm animate-fade-in">
                <i className="ri-checkbox-circle-fill text-lg"></i>
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2.5 rounded-full bg-dark-800 border border-dark-700 text-cream-100 text-sm placeholder:text-cream-500 focus:outline-none focus:border-gold-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="gold-btn px-5 py-2.5 text-sm whitespace-nowrap cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
            <div className="mt-6 space-y-2 text-sm text-cream-300">
              <p className="flex items-center gap-2">
                <i className="ri-map-pin-line text-gold-500"></i>
                742 Fifth Avenue, New York, NY 10019
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-phone-line text-gold-500"></i>
                +1 (212) 555-0192
              </p>
              <p className="flex items-center gap-2">
                <i className="ri-mail-line text-gold-500"></i>
                hello@luminasalon.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream-500">
          <p>&copy; {new Date().getFullYear()} LuminaSalon. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold-500 transition-colors duration-300 cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors duration-300 cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-gold-500 transition-colors duration-300 cursor-pointer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}