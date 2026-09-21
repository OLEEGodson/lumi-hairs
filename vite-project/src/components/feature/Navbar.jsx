import lumiHairsLogo from "../../assets/lumi-hairs-logo.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/#services" },
  { label: "Stylists", path: "/#stylists" },
  { label: "Booking", path: "/booking" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/#testimonials" },
  { label: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Read the stored preference during the first render so there is no
  // light-mode flash before the effect below syncs the DOM class.
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("lumina-dark-mode") === "true",
  );
  const location = useLocation();

  // Mirror the preference onto <html> — an external system, so an effect is
  // the right tool here.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("lumina-dark-mode", String(next));
  };

  const handleNavClick = (path) => {
    setMobileOpen(false);
    if (path.startsWith("/#")) {
      if (location.pathname === "/") {
        const id = path.substring(2);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark-950/95 backdrop-blur-xl py-3 shadow-soft-lg border-b border-white/5"
            : "bg-dark-950 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <img
            src={lumiHairsLogo}
            alt="Lumi-Hairs Salon & Spa"
            className="w-14 h-12 flex items-center justify-center rounded-full bg-black-500"
          />
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-2xl font-display font-bold gold-text"
          >
            
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith("/#")) {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }
                  }
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                  location.pathname === link.path ||
                  (link.path.startsWith("/#") && location.pathname === "/")
                    ? "text-gold-400"
                    : "text-white/75 hover:text-gold-400"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <i className="ri-sun-line text-gold-400 text-lg"></i>
              ) : (
                <i className="ri-moon-line text-gold-400 text-lg"></i>
              )}
            </button>
            <Link
              to="/booking"
              className="gold-btn px-6 py-2.5 text-sm whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ripple"
            >
              <i className="ri-calendar-check-line"></i>
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300 cursor-pointer"
            aria-label="Toggle menu"
          >
            <i
              className={`text-white text-xl transition-transform duration-300 ${
                mobileOpen ? "ri-close-line rotate-90" : "ri-menu-3-line"
              }`}
            ></i>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-dark-950/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        ></div>
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-cream-50 shadow-soft-lg transition-transform duration-500 pt-24 px-6 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith("/#")) {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick(link.path);
                    } else {
                      setMobileOpen(false);
                    }
                  } else {
                    setMobileOpen(false);
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-800 hover:bg-cream-200 hover:text-dark-950 transition-all duration-300 font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-cream-300 my-4"></div>
            <button
              onClick={() => {
                toggleDarkMode();
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-800 hover:bg-cream-200 transition-all duration-300 font-medium text-sm cursor-pointer"
            >
              <i className={darkMode ? "ri-sun-line" : "ri-moon-line"}></i>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <Link
              to="/booking"
              onClick={() => setMobileOpen(false)}
              className="gold-btn px-6 py-3 text-sm text-center cursor-pointer mt-2"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
