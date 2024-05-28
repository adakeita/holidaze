import { useState } from "react";
import PropTypes from "prop-types";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../contexts/AuthContext";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import "./customerbookingform.css";
import "../../styles/react-calendar.css";

const CustomerBookingForm = ({ venue, onClose, onBookingSuccess }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const bookedDates = venue.bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  const setDateRange = (value) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      setMessage("Please select a check-in and check-out date.");
      return;
    }
    setLoading(true);
    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: parseInt(guests, 10),
      venueId: venue.id,
    };

    try {
      const response = await createBooking(
        bookingData,
        authState.accessToken,
        authState.apiKey
      );
      setMessage("Booking successful! Redirecting to your dashboard...");
      setLoading(false);
      setTimeout(() => {
        onBookingSuccess(); // Call the success handler
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage(`Failed to create booking: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="BOOKINGFORM-CONTAINER">
      <div className="CALENDAR-SECTION_BOOKINGFORM">
        <BookingCalendar
          bookedDates={bookedDates}
          onDateChange={setDateRange}
        />
      </div>
      <div className="GUESTS-INPUT tw-mt-4">
        <label htmlFor="guests" className="tw-block tw-font-medium">
          Number of guests
        </label>
        <input
          id="guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          max={venue.maxGuests}
          className="QT_BOOKINGFORM tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-md tw-focus:outline-none tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
        />
      </div>
      <button
        type="button"
        onClick={handleBooking}
        disabled={loading}
        className="BOOKING-BTN_BOOKINGFORM"
      >
        {loading ? "Booking..." : "Book now"}
      </button>
      {message && <p className="tw-text-center tw-my-4">{message}</p>}
    </div>
  );
};

CustomerBookingForm.propTypes = {
  venue: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onBookingSuccess: PropTypes.func.isRequired,
};

export default CustomerBookingForm;
