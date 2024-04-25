import { createContext, useContext, useState } from "react";
import * as BookingService from "../services/bookingService";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const { accessToken, apiKey } = useAuth();

  const fetchBookingsForUser = async (profileName) => {
    try {
      const response = await BookingService.fetchBookingsByProfile(
        profileName,
        accessToken,
        apiKey
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Fetching bookings failed:", error.message);
    }
  };


  return (
    <BookingContext.Provider
      value={{
        bookings,
        fetchBookingsForUser,
        createBooking: BookingService.createBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
