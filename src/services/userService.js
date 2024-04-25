import { fetchAPI } from "./apiService";

export const updateUserProfile = async (profileName, data, token, apiKey) => {
  return await fetchAPI(`profiles/${profileName}`, "PUT", data, token, apiKey);
};

// Fetch User Profile
export const getUserProfile = async (profileName, token, apiKey) => {
  return await fetchAPI(`profiles/${profileName}`, "GET", null, token, apiKey);
};

// Fetch User Profile by ID
export const getUserProfileById = async (id, token, apiKey) => {
  return await fetchAPI(`profiles/${id}`, "GET", null, token, apiKey);
};

// Delete User Profile

// Fetch all users
export const getAllUsers = async (apiKey) => {
  return await fetchAPI("profiles", "GET", null, null, apiKey);
};

// Fetch a single user by ID
export const getUserById = async (id, apiKey) => {
  return await fetchAPI(`profiles/${id}`, "GET", null, null, apiKey);
};

export const updateUserRole = (profileName, isVenueManager, token, apiKey) => {
  const profileData = { venueManager: isVenueManager };
  return fetchAPI(`profiles/${profileName}`, "PUT", profileData, token, apiKey);
};
