import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../contexts/AuthContext";
import "./customerbookingform.css";

const CustomerBookingForm = ({ venue, onClose }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage("Booking successful!");
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      setMessage(`Failed to create booking: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h4 className="text-xl font-semibold text-gray-800">Book this venue</h4>
      <div className="guests-input mt-4">
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Number of guests
        </label>
        <input
          id="guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          max={venue.maxGuests}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="button"
        onClick={handleBooking}
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:bg-yellow-300"
      >
        {loading ? "Booking..." : "Book now"}
      </button>
      {message && <p className="text-center text-sm text-red-500">{message}</p>}
    </div>
  );
};

CustomerBookingForm.propTypes = {
  venue: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomerBookingForm;
