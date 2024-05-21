import { fetchAPI } from "./apiService";

export const fetchVenues = async (queryParams) => {
  console.log("Query Params:", queryParams);
  try {
    const response = await fetchAPI(`holidaze/venues${queryParams}`, "GET");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Failed to fetch venues:", error.message);
    throw new Error("Failed to fetch venues");
  }
};

export const fetchVenueById = async (id, apiKey) => {
  try {
    return await fetchAPI(`holidaze/venues/${id}`, "GET", null, null, apiKey);
  } catch (error) {
    console.error(`Failed to fetch venue with ID ${id}:`, error.message);
    throw new Error(`Failed to fetch venue with ID ${id}`);
  }
};

export const fetchTopRatedVenues = async (apiKey) => {
  const queryParams = "?sort=rating&sortOrder=desc&limit=50";
  try {
    const response = await fetchAPI(
      `holidaze/venues${queryParams}`,
      "GET",
      null,
      null,
      apiKey
    );
    if (response.data && response.data.length) {
      const uniqueVenues = getUniqueVenuesByNames(response.data);
      randomizeVenues(uniqueVenues);
      return uniqueVenues.slice(0, Math.min(5, uniqueVenues.length));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch top-rated venues:", error.message);
    throw new Error("Failed to fetch top-rated venues");
  }
};

//Unique venue names
const getUniqueVenuesByNames = (venues) => {
  const unique = {};
  venues.forEach((venue) => {
    if (!unique[venue.name]) {
      unique[venue.name] = venue;
    }
  });
  return Object.values(unique);
};

// Randomize venues
const randomizeVenues = (venues) => {
  for (let i = venues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [venues[i], venues[j]] = [venues[j], venues[i]];
  }
};

// venueservice.js
export const fetchLatestUniqueVenues = async () => {
  console.log("Fetching latest unique venues");
  try {
    const response = await fetchAPI(`holidaze/venues?limit=20&sort=created&sortOrder=desc`, "GET");
    console.log("API Response Data:", response.data);
    const uniqueVenues = Array.from(new Set(response.data.map(venue => venue.name)))
      .slice(0, 5)
      .map(name => response.data.find(venue => venue.name === name));
    console.log("Filtered unique venues:", uniqueVenues); // Add this line
    return uniqueVenues;
  } catch (error) {
    console.error("Failed to fetch latest unique venues:", error.message);
    throw new Error("Failed to fetch latest unique venues");
  }
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
