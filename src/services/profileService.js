import { fetchAPI } from "./apiService";

// Update user profile with better error 
export const updateUserProfile = async (
  profileName,
  profileData,
  accessToken,
  apiKey
) => {
  try {
    return await fetchAPI(
      `holidaze/profiles/${profileName}`,
      "PUT",
      profileData,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(`Failed to update profile ${profileName}:`, error.message);
    throw new Error(`Failed to update profile due to ${error.message}`);
  }
};

// Retrieve user profile detailed inclusion
export const getUserProfile = async (
  profileName,
  accessToken,
  apiKey,
  details = false
) => {
  const query = details ? "?_bookings=true&_venues=true" : "";
  try {
    return await fetchAPI(
      `profiles/${profileName}${query}`,
      "GET",
      null,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(`Failed to retrieve profile ${profileName}:`, error.message);
    throw new Error(`Failed to retrieve profile due to ${error.message}`);
  }
};

export const getUserProfileById = async (id, accessToken, apiKey) => {
  return await fetchAPI(`profiles/${id}`, "GET", null, accessToken, apiKey);
};

// Delete user profile
export const deleteUserProfile = async (profileName, accessToken, apiKey) => {
  try {
    return await fetchAPI(
      `profiles/${profileName}`,
      "DELETE",
      null,
      accessToken,
      apiKey
    );
  } catch (error) {
    console.error(`Failed to delete profile ${profileName}:`, error.message);
    throw new Error(`Failed to delete profile due to ${error.message}`);
  }
};

// Fetch all profiles
export const getAllProfiles = async (apiKey) => {
  try {
    return await fetchAPI("profiles", "GET", null, null, apiKey);
  } catch (error) {
    console.error("Failed to fetch all profiles:", error.message);
    throw new Error("Failed to fetch all profiles");
  }
};

// Retrieve a single user by ID
export const getProfileById = async (id, apiKey) => {
  try {
    return await fetchAPI(`profiles/${id}`, "GET", null, null, apiKey);
  } catch (error) {
    console.error(`Failed to fetch profile by ID ${id}:`, error.message);
    throw new Error(`Failed to fetch profile by ID`);
  }
};
