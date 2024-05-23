import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetchBookingsByProfile } from "../../services/bookingService";
import BookingCard from "../BookingCard/BookingCard";
import "../../styles/dashboard.css";

const CustomerBookingOverview = () => {
  const { authState } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      if (authState.isAuthenticated) {
        try {
          const bookingResponse = await fetchBookingsByProfile(
            authState.user.name,
            authState.accessToken,
            authState.apiKey
          );

          const now = new Date();
          const upcoming = [];
          const previous = [];

          // Categorize bookings as upcoming or previous
          bookingResponse.data.forEach((booking) => {
            if (new Date(booking.dateFrom) > now) {
              upcoming.push(booking);
            } else {
              previous.push(booking);
            }
          });

          //Bookings by nearest upcoming date
          upcoming.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

          //Bookings by most recent past date
          previous.sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));

          setUpcomingBookings(upcoming);
          setPreviousBookings(previous);

          console.log("Upcoming bookings:", upcoming);
          console.log("Previous bookings:", previous);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    loadBookings();
  }, [authState]);

  return (
    <section className="booking-overview">
      <h2>Your Upcoming Bookings</h2>
      <div className="BOOKING-CONTAINER">
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No upcoming bookings found.</p>
        )}
      </div>
      <h2>Previous Stays</h2>
      <div className="BOOKING-CONTAINER">
        {previousBookings.length > 0 ? (
          previousBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No previous stays found.</p>
        )}
      </div>
    </section>
  );
};

export default CustomerBookingOverview;
