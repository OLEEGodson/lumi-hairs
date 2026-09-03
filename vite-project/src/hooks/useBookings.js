import { useState, useCallback } from "react";

const STORAGE_KEY = "lumina-bookings";
const NOTIF_KEY = "lumina-notifications";

function generateAppointmentNumber() {
  const num = Math.floor(10000 + Math.random() * 90000);

  return `SAL-2026-${String(num).padStart(5, "0")}`;
}

function generateId() {
  return `apt-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
}

export function useBooking() {

  // Load bookings directly from localStorage
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load notifications directly from localStorage
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(NOTIF_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const loaded = true;


  // Persist bookings
  const persist = useCallback(
    (updater) => {
      setBookings((current) => {
        const updated = updater(current);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );

        return updated;
      });
    },
    []
  );


  // Persist notifications
  const persistNotifs = useCallback(
    (updater) => {
      setNotifications((current) => {
        const updated = updater(current);

        localStorage.setItem(
          NOTIF_KEY,
          JSON.stringify(updated)
        );

        return updated;
      });
    },
    []
  );


  // Add notification
  const addNotification = useCallback(
    (message, type = "info") => {

      const notif = {
        id: generateId(),
        message,
        type,
        time: new Date().toLocaleString(),
        read: false,
      };

      persistNotifs((current) =>
        [notif, ...current].slice(0, 20)
      );
    },
    [persistNotifs]
  );


  // Create booking
  const createBooking = useCallback(
    (data) => {

      const booking = {
        ...data,
        id: generateId(),
        appointmentNumber: generateAppointmentNumber(),
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      persist((current) => [
        booking,
        ...current,
      ]);

      addNotification(
        `Appointment ${booking.appointmentNumber} confirmed for ${data.service}`,
        "success"
      );

      return booking;
    },
    [persist, addNotification]
  );


  // Reschedule booking
  const rescheduleBooking = useCallback(
    (appointmentNumber, newTime) => {

      persist((current) =>
        current.map((booking) =>
          booking.appointmentNumber === appointmentNumber
            ? {
                ...booking,
                time: newTime,
                status: "rescheduled",
              }
            : booking
        )
      );

      addNotification(
        `Appointment ${appointmentNumber} rescheduled to ${newTime}`,
        "warning"
      );
    },
    [persist, addNotification]
  );


  // Check availability
  const checkAvailability = useCallback(() => {

    const alternatives = [
      "10:00 AM",
      "12:30 PM",
      "2:00 PM",
      "5:30 PM",
    ];

    const isAvailable = Math.random() > 0.4;

    const filtered = isAvailable
      ? []
      : alternatives.filter(() => Math.random() > 0.3);

    return {
      available: isAvailable,

      alternatives:
        filtered.length > 0
          ? filtered
          : alternatives.slice(0, 2),
    };

  }, []);


  // Find booking
  const findBooking = useCallback(
    (appointmentNumber) => {

      return (
        bookings.find(
          (booking) =>
            booking.appointmentNumber === appointmentNumber
        ) || null
      );

    },
    [bookings]
  );


  // Delete booking
  const deleteBooking = useCallback(
    (appointmentNumber) => {

      persist((current) =>
        current.filter(
          (booking) =>
            booking.appointmentNumber !== appointmentNumber
        )
      );

      addNotification(
        `Booking ${appointmentNumber} has been removed`,
        "info"
      );

    },
    [persist, addNotification]
  );


  // Mark notifications as read
  const markAllNotifsRead = useCallback(() => {

    persistNotifs((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

  }, [persistNotifs]);


  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;


  return {
    bookings,
    notifications,
    unreadCount,
    loaded,
    createBooking,
    rescheduleBooking,
    checkAvailability,
    findBooking,
    deleteBooking,
    addNotification,
    markAllNotifsRead,
  };
}
