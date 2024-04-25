import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetchBookingsByProfile } from "../../services/bookingService";
import BookingCard from "../BookingCard/BookingCard";

const CustomerBookingOverview = () => {
  const { authState } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      if (authState.isAuthenticated) {
        try {
          const bookingResponse = await fetchBookingsByProfile(
            authState.user.name,
            authState.accessToken,
            authState.apiKey
          );
          setBookings(bookingResponse.data);
          console.log("Booking data:", bookingResponse.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    loadBookings();
  }, [authState]);

  return (
    <section className="CUSTOMER-BOOKINGS mx-auto w-11/12">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </section>
  );
};

export default CustomerBookingOverview;
