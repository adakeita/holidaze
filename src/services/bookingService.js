import { fetchAPI } from "./apiService";

// Create a new booking
export const createBooking = async (bookingData, accessToken, apiKey) => {
  try {
    const data = await fetchAPI(
      "holidaze/bookings",
      "POST",
      bookingData,
      accessToken,
      apiKey
    );

    return data;
  } catch (error) {
    console.error("Failed to create booking:", error.message);
    throw error;
  }
};

// Fetch all bookings made by a profile
export const fetchBookingsByProfile = async (
  profileName,
  accessToken,
  apiKey
) => {
  try {
    return await fetchAPI(
      `holidaze/profiles/${profileName}/bookings?_customer=true&_venue=true`,
      "GET",
      null,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(
      `Failed to fetch bookings for profile ${profileName}:`,
      error.message
    );
    throw new Error(`Failed to fetch bookings for profile ${profileName}`);
  }
};

// Retrieve a single booking by its ID
export const fetchBookingById = async (bookingId, accessToken, apiKey) => {
  try {
    return await fetchAPI(
      `holidaze/bookings/${bookingId}`,
      "GET",
      null,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(
      `Failed to fetch booking with ID ${bookingId}:`,
      error.message
    );
    throw new Error(`Failed to fetch booking with ID ${bookingId}`);
  }
};

// Update a booking
export const updateBooking = async (
  bookingId,
  bookingData,
  accessToken,
  apiKey
) => {
  try {
    return await fetchAPI(
      `holidaze/bookings/${bookingId}`,
      "PUT",
      bookingData,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(
      `Failed to update booking with ID ${bookingId}:`,
      error.message
    );
    throw new Error(`Failed to update booking with ID ${bookingId}`);
  }
};

// Delete a booking
export const deleteBooking = async (bookingId, accessToken, apiKey) => {
  try {
    const response = await fetchAPI(
      `holidaze/bookings/${bookingId}`,
      "DELETE",
      null,
      accessToken,
      apiKey
    );
    if (response.status === 204) {
      return { success: true };
    }
    throw new Error("Unexpected response status");
  } catch (error) {
    console.error(
      `Failed to delete booking with ID ${bookingId}:`,
      error.message
    );
    throw new Error(`Failed to delete booking with ID ${bookingId}`);
  }
};

//bookings by venueId
export const fetchBookingsByVenue = async (venueId, accessToken, apiKey) => {
  try {
    const endpoint = `holidaze/bookings?venueId=${venueId}`;
    return await fetchAPI(endpoint, "GET", null, accessToken, apiKey);
  } catch (error) {
    console.error(
      `Failed to fetch bookings for venue ${venueId}:`,
      error.message
    );
    throw new Error(`Failed to fetch bookings for venue ${venueId}`);
  }
};
