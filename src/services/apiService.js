const API_BASE_URL = "https://v2.api.noroff.dev";

export async function fetchAPI(
  endpoint,
  method = "GET",
  data = null,
  token = null,
  apiKey = null
) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token) headers.append("Authorization", `Bearer ${token}`);
  if (apiKey) headers.append("X-Noroff-API-Key", apiKey);

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error Data:", errorData);
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const fetchSearchResults = async (searchTerm) => {
  try {
    const response = await fetchAPI("holidaze/venues");
    const { data } = response;

    const filteredData = data.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredData;
  } catch (error) {
    console.error("Failed to fetch venues:", error);
    throw error;
  }
};
