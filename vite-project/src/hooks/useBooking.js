import { useState, useCallback } from "react";

const STORAGE_KEY = "lumina-bookings";
const NOTIF_KEY = "lumina-notifications";

function generateAppointmentNumber() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `SAL-2026-${String(num).padStart(5, "0")}`;
}

function generateId() {
  return `apt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function readStored(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function useBooking() {
  // Hydrated lazily on first render so the stored state is available
  // immediately, without a second render pass.
  const [bookings, setBookings] = useState(() => readStored(STORAGE_KEY, []));
  const [notifications, setNotifications] = useState(() =>
    readStored(NOTIF_KEY, []),
  );

  const persist = useCallback((newBookings) => {
    setBookings(newBookings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookings));
  }, []);

  const persistNotifs = useCallback((newNotifs) => {
    setNotifications(newNotifs);
    localStorage.setItem(NOTIF_KEY, JSON.stringify(newNotifs));
  }, []);

  const addNotification = useCallback(
    (message, type = "info") => {
      const notif = {
        id: generateId(),
        message,
        type,
        time: new Date().toLocaleString(),
        read: false,
      };
      const updated = [notif, ...notifications].slice(0, 20);
      persistNotifs(updated);
    },
    [notifications, persistNotifs]
  );

  const createBooking = useCallback(
    (data) => {
      const booking = {
        ...data,
        id: generateId(),
        appointmentNumber: generateAppointmentNumber(),
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      persist([booking, ...bookings]);
      addNotification(`Appointment ${booking.appointmentNumber} confirmed for ${data.service}`, "success");
      return booking;
    },
    [bookings, persist, addNotification]
  );

  const rescheduleBooking = useCallback(
    (appointmentNumber, newTime) => {
      const updated = bookings.map((b) =>
        b.appointmentNumber === appointmentNumber
          ? { ...b, time: newTime, status: "rescheduled" }
          : b
      );
      persist(updated);
      addNotification(
        `Appointment ${appointmentNumber} rescheduled to ${newTime}`,
        "warning"
      );
    },
    [bookings, persist, addNotification]
  );

  const checkAvailability = useCallback(() => {
    const alternatives = ["10:00 AM", "12:30 PM", "2:00 PM", "5:30 PM"];
    const isAvailable = Math.random() > 0.4;
    const filtered = isAvailable ? [] : alternatives.filter(() => Math.random() > 0.3);
    return { available: isAvailable, alternatives: filtered.length > 0 ? filtered : alternatives.slice(0, 2) };
  }, []);

  const findBooking = useCallback(
    (appointmentNumber) => {
      return bookings.find((b) => b.appointmentNumber === appointmentNumber) || null;
    },
    [bookings]
  );

  const deleteBooking = useCallback(
    (appointmentNumber) => {
      persist(bookings.filter((b) => b.appointmentNumber !== appointmentNumber));
      addNotification(`Booking ${appointmentNumber} has been removed`, "info");
    },
    [bookings, persist, addNotification]
  );

  const markAllNotifsRead = useCallback(() => {
    persistNotifs(notifications.map((n) => ({ ...n, read: true })));
  }, [notifications, persistNotifs]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    bookings,
    notifications,
    unreadCount,
    createBooking,
    rescheduleBooking,
    checkAvailability,
    findBooking,
    deleteBooking,
    addNotification,
    markAllNotifsRead,
  };
}
