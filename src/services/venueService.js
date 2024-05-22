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
  console.log("fetchVenues called with params:", queryParams);
  try {
    const response = await fetchAPI(`holidaze/venues${queryParams}`, "GET");
    console.log("fetchVenues response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch venues:", error.message);
    throw new Error("Failed to fetch venues");
  }
};

// Function to fetch a venue by ID
export const fetchVenueById = async (id) => {
  try {
    const response = await fetchAPI(`holidaze/venues/${id}`, "GET");
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch venue with ID ${id}:`, error.message);
    throw new Error(`Failed to fetch venue with ID ${id}`);
  }
};

// Function to fetch top-rated venues
export const fetchTopRatedVenues = async () => {
  console.log("fetchTopRatedVenues called");
  const queryParams = "?sort=rating&sortOrder=desc&limit=50";
  try {
    const response = await fetchAPI(`holidaze/venues${queryParams}`, "GET");
    console.log("fetchTopRatedVenues response:", response.data);

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
  console.log("fetchLatestUniqueVenues called");
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
    console.log("Filtered unique venues:", uniqueVenues);
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
