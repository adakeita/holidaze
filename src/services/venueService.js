import { fetchAPI } from "./apiService";

export const fetchVenues = async (queryParams = "", apiKey) => {
  try {
    return await fetchAPI(
      `holidaze/venues${queryParams}`,
      "GET",
      null,
      null,
      apiKey
    );
  } catch (error) {
    console.error("Failed to fetch venues:", error.message);
    throw new Error("Failed to fetch venues");
  }
};

// Fetch a single venue by ID
export const fetchVenueById = async (id, apiKey) => {
  try {
    return await fetchAPI(`holidaze/venues/${id}`, "GET", null, null, apiKey);
  } catch (error) {
    console.error(`Failed to fetch venue with ID ${id}:`, error.message);
    throw new Error(`Failed to fetch venue with ID ${id}`);
  }
};

export const fetchTopRatedVenues = async (apiKey) => {
  const queryParams = "?sort=rating&sortOrder=desc&limit=25";
  try {
    const response = await fetchVenues(queryParams, apiKey);
    const venues = response.data;
    const uniqueVenues = getUniqueVenuesByNames(venues);
    randomizeVenues(uniqueVenues);
    console.log("Top-rated venues:", uniqueVenues);
    return uniqueVenues.slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch top-rated venues:", error.message);
    throw new Error("Failed to fetch top-rated venues");
  }
};

const randomizeVenues = (venues) => {
  for (let i = venues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = venues[i];
    venues[i] = venues[j];
    venues[j] = temp;
  }
};

const getUniqueVenuesByNames = (venues) => {
  const unique = {};
  venues.forEach((venue) => {
    if (!unique[venue.name]) {
      unique[venue.name] = venue;
    }
  });
  return Object.values(unique);
};

// Create a new venue
export const createVenue = async (venueData, accessToken, apiKey) => {
  try {
    return await fetchAPI(
      "holidaze/venues",
      "POST",
      venueData,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error("Failed to create venue:", error.message);
    throw new Error("Failed to create venue");
  }
};

// Update a venue
export const updateVenue = async (id, venueData, accessToken, apiKey) => {
  try {
    return await fetchAPI(
      `holidaze/venues/${id}`,
      "PUT",
      venueData,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(`Failed to update venue with ID ${id}:`, error.message);
    throw new Error(`Failed to update venue with ID ${id}`);
  }
};

// Delete a venue
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
    throw new Error("Unexpected response status");
  } catch (error) {
    console.error(`Failed to delete venue with ID ${id}:`, error.message);
    throw new Error(`Failed to delete venue with ID ${id}`);
  }
};
