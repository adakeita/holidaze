import { fetchAPI } from "./apiService";

export const login = async (email, password) => {
  try {
    const response = await fetchAPI("auth/login", "POST", { email, password });
    if (response.data.accessToken) {
      const apiKeyResponse = await createAPIKey(response.data.accessToken);
      return {
        ...response,
        data: {
          ...response.data,
          apiKey: apiKeyResponse.data.key,
        },
      };
    }
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetchAPI("auth/register", "POST", userData);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const createAPIKey = async (accessToken) => {
  try {
    return await fetchAPI("auth/create-api-key", "POST", {}, accessToken);
  } catch (error) {
    console.error("API Key creation failed:", error);
    throw error;
  }
};

export const deleteUserProfile = async (profileName, token, apiKey) => {
  try {
    return await fetchAPI(
      `profiles/${profileName}`,
      "DELETE",
      null,
      token,
      apiKey
    );
  } catch (error) {
    console.error("Deleting user profile failed:", error);
    throw error;
  }
};

export const deleteUser = async (profileName, accessToken, apiKey) => {
  try {
    return await fetchAPI(`profiles/${profileName}`, "DELETE", null, accessToken, apiKey);
  } catch ( error ) {
    console.error(`Error deleting user profile ${profileName}:`, error.message);
    throw new Error(`Error deleting user profile: ${error.message}`);
  }
};