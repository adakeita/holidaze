import { fetchAPI } from "./apiService";

const getUniqueVenuesByNames = (venues) => {
  const unique = {};
  venues.forEach((venue) => {
    if (!unique[venue.name]) {
      unique[venue.name] = venue;
    }
  });
  return Object.values(unique);
};

const randomizeVenues = (venues) => {
  for (let i = venues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [venues[i], venues[j]] = [venues[j], venues[i]];
  }
};

// Function to fetch all venues with query parameters
export const fetchVenues = async (queryParams) => {
  try {
    const response = await fetchAPI(`holidaze/venues${queryParams}`, "GET");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch venues:", error.message);
    throw new Error("Failed to fetch venues");
  }
};

// Function to fetch a venue by ID
export const fetchVenueById = async (id) => {
  const queryParams = "?_bookings=true&_owner=true";
  try {
    const response = await fetchAPI(
      `holidaze/venues/${id}${queryParams}`,
      "GET"
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch venue with ID ${id}:`, error.message);
    throw new Error(`Failed to fetch venue with ID ${id}`);
  }
};

// Function to fetch top-rated venues
export const fetchTopRatedVenues = async () => {
  const queryParams = "?sort=rating&sortOrder=desc&limit=50";
  try {
    const response = await fetchAPI(`holidaze/venues${queryParams}`, "GET");

    // Filter venues to include only those with images and limit to top 5
    const venuesWithImages = response.data.filter(
      (venue) => venue.media && venue.media.length > 0 && venue.media[0].url
    );

    return venuesWithImages.slice(0, 5); // Ensure only top 5 are returned
  } catch (error) {
    console.error("Failed to fetch top-rated venues:", error.message);
    throw new Error("Failed to fetch top-rated venues");
  }
};

// Function to fetch latest unique venues
export const fetchLatestUniqueVenues = async () => {
  try {
    const response = await fetchAPI(
      `holidaze/venues?limit=20&sort=created&sortOrder=desc`,
      "GET"
    );
    const uniqueVenues = Array.from(
      new Set(response.data.map((venue) => venue.name))
    )
      .slice(0, 5)
      .map((name) => response.data.find((venue) => venue.name === name));
    return uniqueVenues;
  } catch (error) {
    console.error("Failed to fetch latest unique venues:", error.message);
    throw new Error("Failed to fetch latest unique venues");
  }
};

export const createVenue = async (venueData, accessToken, apiKey) => {
  try {
    const response = await fetchAPI(
      "holidaze/venues",
      "POST",
      venueData,
      accessToken,
      apiKey
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create venue:", error.message);
    throw new Error("Failed to create venue");
  }
};

export const updateVenue = async (id, venueData, accessToken, apiKey) => {
  try {
    const response = await fetchAPI(
      `holidaze/venues/${id}`,
      "PUT",
      venueData,
      accessToken,
      apiKey
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update venue with ID ${id}:`, error.message);
    throw new Error(`Failed to update venue with ID ${id}`);
  }
};

// Fetch bookings for a specific venue
export const fetchBookingsForVenue = async (venueId, accessToken, apiKey) => {
  try {
    const response = await fetchAPI(
      `holidaze/bookings?venueId=${venueId}&_customer=true`,
      "GET",
      null,
      accessToken,
      apiKey
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch bookings for venue ${venueId}:`,
      error.message
    );
    throw new Error(`Failed to fetch bookings for venue ${venueId}`);
  }
};

export const deleteVenue = async (id, accessToken, apiKey) => {
  try {
    const response = await fetchAPI(
      `holidaze/venues/${id}`,
      "DELETE",
      null,
      accessToken,
      apiKey
    );

    if (response.status === 204) {
      return { success: true };
    }

    // If the response is not 204, try to parse it
    const data = await response.json();
    throw new Error(data.message || "Unexpected response status");
  } catch (error) {
    console.error(`Failed to delete venue with ID ${id}:`, error.message);
    throw new Error(`Failed to delete venue with ID ${id}`);
  }
};
