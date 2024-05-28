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

        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    };

    loadBookings();
  }, [authState]);

  return (
    <section className="OVERVIEW-CONTAINER_BOOKING">
      <h3 className="OVERVIEW_HEADER">Bookings || Adventurer</h3>
      <div className="BOOKING-CONTAINER tw-venues-grid tw-grid tw-grid-cols-1 tw-gap-9 tw-gap-row-9 md:tw-grid-cols-2 sm:tw-gap-row-2 sm:tw-gap-8 lg:tw-gap-6 lg:tw-grid-cols-3">
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p>No upcoming bookings found.</p>
        )}
      </div>
      <h3 className="OVERVIEW_HEADER">Previous Stays || Adventurer</h3>
      <div className="BOOKING-CONTAINER tw-venues-grid tw-grid tw-grid-cols-1 tw-gap-9 tw-gap-row-9 md:tw-grid-cols-2 sm:tw-gap-row-2 sm:tw-gap-8 lg:tw-gap-6 lg:tw-grid-cols-3">
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
