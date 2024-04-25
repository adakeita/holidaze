import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../contexts/AuthContext";
import { fetchBookingsByVenue } from "../../services/bookingService";

const CustomerBookingForm = ({ venueId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const { accessToken, apiKey } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const loadBookedDates = async () => {
      try {
        const bookings = await fetchBookingsByVenue(
          venueId,
          accessToken,
          apiKey
        );
        const bookedRanges = bookings.data.map((booking) => {
          return {
            start: new Date(booking.dateFrom),
            end: new Date(booking.dateTo),
          };
        });
        setBookedDates(bookedRanges);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    loadBookedDates();
  }, [venueId, accessToken, apiKey]);

  const isDateSelectable = (date) => {
    return !bookedDates.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  const handleBooking = async () => {
    setLoading(true);
    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: parseInt(guests, 10),
      venueId,
    };

    console.log("Sending booking data:", bookingData);

    try {
      const response = await createBooking(bookingData, accessToken, apiKey);
      console.log("Booking response:", response); 
      setMessage("Booking successful!");
    } catch (error) {
      console.error("Booking error:", error);
      setMessage(`Failed to create booking: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg my-6">
      <form action="submit" className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Book your stay</h2>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="date-input">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Check-in date
            </label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={isDateSelectable}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="date-input">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              Checkout date
            </label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              filterDate={isDateSelectable}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </section>
        <div className="guests-input">
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
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleBooking}
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CustomerBookingForm;