import { useState } from "react";
import { useBooking } from "@/hooks/useBooking";
import { services } from "@/mocks/services";
import { stylists } from "@/mocks/stylists";

const statusColors = {
  confirmed: { bg: "bg-green-100", text: "text-green-700", icon: "ri-checkbox-circle-fill" },
  pending: { bg: "bg-amber-100", text: "text-amber-700", icon: "ri-time-line" },
  rescheduled: { bg: "bg-blue-100", text: "text-blue-700", icon: "ri-refresh-line" },
  completed: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "ri-check-double-fill" },
  cancelled: { bg: "bg-red-100", text: "text-red-700", icon: "ri-close-circle-fill" },
};

const notifIcons = {
  info: "ri-information-line",
  success: "ri-checkbox-circle-fill",
  warning: "ri-alert-line",
  error: "ri-error-warning-line",
};

const notifColors = {
  info: "text-gold-600 bg-gold-50",
  success: "text-green-600 bg-green-50",
  warning: "text-amber-600 bg-amber-50",
  error: "text-red-600 bg-red-50",
};

export default function BookingPage() {
  const {
    bookings,
    notifications,
    unreadCount,
    createBooking,
    checkAvailability,
    findBooking,
    deleteBooking,
    markAllNotifsRead,
  } = useBooking();

  const [activeTab, setActiveTab] = useState("book");

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    service: "",
    stylist: "",
    date: "",
    time: "",
    notes: "",
  });

  const [bookingState, setBookingState] = useState("idle");
  const [lastBooking, setLastBooking] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [pendingTime, setPendingTime] = useState("");
  const [pendingData, setPendingData] = useState(null);

  const [statusInput, setStatusInput] = useState("");
  const [statusResult, setStatusResult] = useState(null);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customerName || !form.email || !form.service || !form.date || !form.time) return;

    setBookingState("checking");
    setPendingTime(form.time);
    setPendingData({ ...form });

    setTimeout(() => {
      const { available, alternatives: alts } = checkAvailability();

      if (available) {
        const booking = createBooking({
          customerName: form.customerName,
          phone: form.phone,
          email: form.email,
          service: form.service,
          stylist: form.stylist,
          date: form.date,
          time: form.time,
          notes: form.notes,
        });
        setLastBooking({ appointmentNumber: booking.appointmentNumber });
        setBookingState("success");
        setForm({ customerName: "", phone: "", email: "", service: "", stylist: "", date: "", time: "", notes: "" });
      } else {
        setAlternatives(alts);
        setBookingState("unavailable");
      }
    }, 2000);
  };

  const handleAlternativeSelect = (newTime) => {
    if (!pendingData) return;
    setBookingState("checking");

    setTimeout(() => {
      const booking = createBooking({
        ...pendingData,
        time: newTime,
      });
      setLastBooking({ appointmentNumber: booking.appointmentNumber });
      setBookingState("rescheduled");
    }, 1000);
  };

  const handleStatusCheck = () => {
    if (!statusInput.trim()) return;
    const result = findBooking(statusInput.trim().toUpperCase());
    setStatusResult({ booking: result, found: !!result });
  };

  const tabs = [
    { key: "book", label: "Book Now", icon: "ri-calendar-check-line" },
    { key: "status", label: "Check Status", icon: "ri-search-line" },
    { key: "notifications", label: "Notifications", icon: "ri-notification-3-line", badge: unreadCount },
    { key: "history", label: "History", icon: "ri-history-line" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Appointments
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            Manage Your Bookings
          </h1>
          <p className="text-dark-500 text-sm md:text-base max-w-xl mx-auto">
            Book, check, and manage your salon appointments all in one place.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (tab.key === "notifications") markAllNotifsRead();
              }}
              className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-gold-500 text-dark-950 shadow-gold"
                  : "bg-cream-100 text-dark-600 hover:bg-cream-200"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
              {tab.badge && tab.badge > 0 && activeTab !== "notifications" && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Booking Form Tab */}
        {activeTab === "book" && (
          <div className="glass-card p-8 max-w-2xl mx-auto animate-fade-in-up">
            {bookingState === "success" && (
              <div className="mb-6 p-6 rounded-2xl bg-green-50 border border-green-200 text-center animate-scale-in">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-xl font-display font-bold text-green-700 mb-2">
                  Appointment Successfully Booked!
                </h3>
                <p className="text-green-600 text-sm mb-3">
                  Your appointment number is:
                </p>
                <div className="inline-block px-6 py-2 rounded-full bg-green-100 border border-green-300 text-green-800 font-mono font-bold text-lg">
                  {lastBooking?.appointmentNumber}
                </div>
                <p className="text-green-600 text-xs mt-3">
                  Please save this number to check your appointment status.
                </p>
                <button
                  onClick={() => setBookingState("idle")}
                  className="mt-4 gold-btn px-6 py-2 text-xs cursor-pointer"
                >
                  Book Another
                </button>
              </div>
            )}

            {bookingState === "rescheduled" && (
              <div className="mb-6 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center animate-scale-in">
                <div className="text-5xl mb-3">📋</div>
                <h3 className="text-xl font-display font-bold text-amber-700 mb-2">
                  Appointment Rescheduled Successfully!
                </h3>
                <p className="text-amber-600 text-sm mb-3">Your new appointment number:</p>
                <div className="inline-block px-6 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-800 font-mono font-bold text-lg">
                  {lastBooking?.appointmentNumber}
                </div>
                <button
                  onClick={() => setBookingState("idle")}
                  className="mt-4 gold-btn px-6 py-2 text-xs cursor-pointer"
                >
                  Book Another
                </button>
              </div>
            )}

            {bookingState === "unavailable" && (
              <div className="mb-6 p-6 rounded-2xl bg-red-50 border border-red-200 text-center animate-scale-in">
                <h3 className="text-xl font-display font-bold text-red-700 mb-2">
                  Sorry! Time Unavailable
                </h3>
                <p className="text-red-600 text-sm mb-4">
                  The selected time ({pendingTime}) has already been booked. Please choose an alternative:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {alternatives.map((alt) => (
                    <button
                      key={alt}
                      onClick={() => handleAlternativeSelect(alt)}
                      className="px-5 py-2.5 rounded-full bg-white border-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-dark-950 transition-all duration-300 text-sm font-medium cursor-pointer"
                    >
                      <i className="ri-time-line mr-2"></i>
                      {alt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setBookingState("idle")}
                  className="mt-4 text-red-600 text-xs underline cursor-pointer"
                >
                  Choose different time manually
                </button>
              </div>
            )}

            {bookingState === "checking" && (
              <div className="mb-6 p-8 rounded-2xl bg-cream-100 text-center animate-fade-in">
                <div className="w-12 h-12 mx-auto mb-4 border-4 border-cream-300 border-t-gold-500 rounded-full animate-spin"></div>
                <p className="text-dark-600 text-sm font-medium">Checking Availability...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-display font-bold text-dark-950 mb-6">
                Book Your Appointment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="customerName" className="block text-dark-700 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-dark-700 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="your@email.com"
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
                    value={form.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-dark-700 text-sm font-medium mb-2">
                    Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} - ${s.price} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="stylist" className="block text-dark-700 text-sm font-medium mb-2">
                    Preferred Stylist
                  </label>
                  <select
                    id="stylist"
                    name="stylist"
                    value={form.stylist}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                  >
                    <option value="">No preference</option>
                    {stylists.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} - {s.role} (⭐{s.rating})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-dark-700 text-sm font-medium mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-dark-700 text-sm font-medium mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-dark-700 text-sm font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300 resize-none"
                  placeholder="Any special requests or allergies..."
                ></textarea>
                <p className="text-dark-400 text-xs mt-1">{form.notes.length}/500</p>
              </div>

              <button
                type="submit"
                disabled={bookingState === "checking"}
                className="gold-btn w-full py-3.5 text-sm cursor-pointer inline-flex items-center justify-center gap-2 ripple disabled:opacity-60"
              >
                {bookingState === "checking" ? (
                  <>Processing...</>
                ) : (
                  <>
                    <i className="ri-calendar-check-line"></i>
                    Submit Booking
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Status Check Tab */}
        {activeTab === "status" && (
          <div className="max-w-lg mx-auto animate-fade-in-up">
            <div className="glass-card p-8 mb-6">
              <h3 className="text-lg font-display font-bold text-dark-950 mb-6">
                Check Appointment Status
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStatusCheck()}
                  placeholder="Enter appointment number (e.g., SAL-2026-00125)"
                  className="flex-1 px-4 py-3 rounded-xl bg-cream-50 border border-cream-200 text-dark-950 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300 uppercase"
                />
                <button
                  onClick={handleStatusCheck}
                  className="gold-btn px-6 py-3 text-sm cursor-pointer whitespace-nowrap"
                >
                  Check
                </button>
              </div>
            </div>

            {statusResult && !statusResult.found && (
              <div className="glass-card p-6 text-center animate-scale-in">
                <div className="text-4xl mb-3">🔍</div>
                <h4 className="text-dark-950 font-display font-bold mb-2">Not Found</h4>
                <p className="text-dark-500 text-sm">
                  No appointment found with number <strong>{statusInput.toUpperCase()}</strong>. Please double-check and try again.
                </p>
              </div>
            )}

            {statusResult?.booking && (
              <div className={`glass-card p-6 animate-scale-in ${statusColors[statusResult.booking.status].bg} border`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${statusColors[statusResult.booking.status].bg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${statusColors[statusResult.booking.status].icon} ${statusColors[statusResult.booking.status].text} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-dark-950 font-display font-bold text-lg">
                      {statusResult.booking.appointmentNumber}
                    </h4>
                    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[statusResult.booking.status].bg} ${statusColors[statusResult.booking.status].text}`}>
                      <i className={`${statusColors[statusResult.booking.status].icon} mr-1`}></i>
                      {statusResult.booking.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-dark-400">Service:</span>
                    <p className="text-dark-950 font-medium">{statusResult.booking.service}</p>
                  </div>
                  <div>
                    <span className="text-dark-400">Stylist:</span>
                    <p className="text-dark-950 font-medium">{statusResult.booking.stylist || "Any Available"}</p>
                  </div>
                  <div>
                    <span className="text-dark-400">Date:</span>
                    <p className="text-dark-950 font-medium">{statusResult.booking.date}</p>
                  </div>
                  <div>
                    <span className="text-dark-400">Time:</span>
                    <p className="text-dark-950 font-medium">{statusResult.booking.time}</p>
                  </div>
                </div>
                {statusResult.booking.notes && (
                  <div className="mt-4 pt-4 border-t border-cream-200">
                    <span className="text-dark-400 text-sm">Notes:</span>
                    <p className="text-dark-600 text-sm mt-1">{statusResult.booking.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="max-w-lg mx-auto animate-fade-in-up">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-dark-950">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotifsRead}
                    className="text-gold-600 text-xs font-medium cursor-pointer hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-notification-off-line text-4xl text-dark-300 mb-3 block"></i>
                  <p className="text-dark-400 text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 ${
                        !n.read ? notifColors[n.type] : "bg-cream-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notifColors[n.type]
                        }`}
                      >
                        <i className={notifIcons[n.type]}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-dark-800 text-sm">{n.message}</p>
                        <p className="text-dark-400 text-xs mt-1">{n.time}</p>
                      </div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="animate-fade-in-up">
            <div className="glass-card p-6">
              <h3 className="text-lg font-display font-bold text-dark-950 mb-6">
                Booking History
              </h3>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-history-line text-4xl text-dark-300 mb-3 block"></i>
                  <p className="text-dark-400 text-sm">No bookings yet</p>
                  <button
                    onClick={() => setActiveTab("book")}
                    className="mt-4 gold-btn px-6 py-2 text-xs cursor-pointer"
                  >
                    Book Your First Appointment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-cream-50 border border-cream-200"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${statusColors[b.status].bg}`}>
                          <i className={`${statusColors[b.status].icon} ${statusColors[b.status].text}`}></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-dark-950 font-medium text-sm">{b.service}</p>
                          <p className="text-dark-500 text-xs">
                            {b.stylist || "Any stylist"} &middot; {b.date} &middot; {b.time}
                          </p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[b.status].bg} ${statusColors[b.status].text}`}>
                            {b.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-dark-400 text-xs font-mono">{b.appointmentNumber}</span>
                        <button
                          onClick={() => setStatusInput(b.appointmentNumber)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-cream-200 hover:bg-cream-300 text-dark-600 transition-colors cursor-pointer"
                          title="View"
                        >
                          <i className="ri-eye-line text-sm"></i>
                        </button>
                        <button
                          onClick={() => deleteBooking(b.appointmentNumber)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}