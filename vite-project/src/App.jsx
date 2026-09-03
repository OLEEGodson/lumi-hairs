import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Navbar from "./components/feature/Navbar";
import Footer from "./components/feature/Footer";
import { useState, useEffect } from "react";

function App() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
      setShowBackTop(scrollTop > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <div className="scroll-progress" style={{ width: `${scrollPercent}%` }}></div>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>

        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-gold-500 text-dark-950 shadow-gold-lg hover:scale-110 transition-all duration-300 cursor-pointer ${
            showBackTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Back to top"
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </button>

        <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-3">
          <a
            href="https://wa.me/12125550192"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer animate-float"
            aria-label="Chat on WhatsApp"
          >
            <i className="ri-whatsapp-line text-xl"></i>
          </a>
          <a
            href="tel:+12125550192"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-500 text-dark-950 shadow-gold-lg hover:scale-110 transition-all duration-300 cursor-pointer animate-float animate-delay-200"
            aria-label="Call us"
          >
            <i className="ri-phone-line text-xl"></i>
          </a>
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;