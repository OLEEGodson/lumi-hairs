import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    phone_alt: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone_alt.trim() !== "") {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", phone_alt: "" });
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("subject", formData.subject);
      payload.append("message", formData.message);

      const res = await fetch("https://readdy.ai/api/form/d9bongpi54tn7t02t3e0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString(),
      });

      const responseText = await res.text();
      let parsed;
      try { parsed = JSON.parse(responseText); } catch { parsed = null; }

      if (res.ok && parsed?.code === "OK") {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", phone_alt: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        const serverMsg = parsed?.meta?.message || parsed?.message || responseText;
        setErrorMsg(serverMsg || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Get in Touch
          </h2>
          <p className="text-dark-500 max-w-2xl mx-auto text-sm md:text-base">
            Have questions or want to book over the phone? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <form
              data-readdy-form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="honeypot-wrap">
                <input
                  type="text"
                  name="phone_alt"
                  value={formData.phone_alt}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly={false}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-dark-700 text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-dark-700 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-dark-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-dark-700 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="General Inquiry"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-dark-700 text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                <p className="text-dark-400 text-xs mt-1">{formData.message.length}/500</p>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="gold-btn px-8 py-3.5 text-sm whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ripple disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line"></i>
                    Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-600 text-sm animate-fade-in">
                  <i className="ri-checkbox-circle-fill text-lg"></i>
                  Message sent successfully! We will get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                  <i className="ri-error-warning-line text-lg"></i>
                  {errorMsg}
                </div>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-lg font-display font-semibold text-dark-950 mb-6">
                Visit Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 flex-shrink-0">
                    <i className="ri-map-pin-line text-gold-600"></i>
                  </div>
                  <div>
                    <p className="text-dark-950 font-medium text-sm">Address</p>
                    <p className="text-dark-500 text-sm">742 Fifth Avenue, New York, NY 10019</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 flex-shrink-0">
                    <i className="ri-phone-line text-gold-600"></i>
                  </div>
                  <div>
                    <p className="text-dark-950 font-medium text-sm">Phone</p>
                    <p className="text-dark-500 text-sm">+1 (212) 555-0192</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 flex-shrink-0">
                    <i className="ri-mail-line text-gold-600"></i>
                  </div>
                  <div>
                    <p className="text-dark-950 font-medium text-sm">Email</p>
                    <p className="text-dark-500 text-sm">hello@luminasalon.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold-500/10 flex-shrink-0">
                    <i className="ri-time-line text-gold-600"></i>
                  </div>
                  <div>
                    <p className="text-dark-950 font-medium text-sm">Opening Hours</p>
                    <div className="text-dark-500 text-sm space-y-0.5">
                      <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1837598388286!2d-73.97548092357344!3d40.76128377138933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258fbe3e0e0b7%3A0xdfe8a558e3a5c3be!2sFifth%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1712345678901"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LuminaSalon Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}