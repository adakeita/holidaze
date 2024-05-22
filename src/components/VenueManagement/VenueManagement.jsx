import { useState } from "react";
import { fetchVenues } from "../../services/venueService";

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);

  const handleFetchVenues = async () => {
    try {
      const response = await fetchVenues(
        "?limit=20&sort=created&sortOrder=desc"
      );
      setVenues(response);
    } catch (error) {
      console.error("Failed to fetch venues:", error.message);
    }
  };

  return (
    <div>
      <h2>Venue Management Dashboard</h2>
      <button onClick={handleFetchVenues}>Refresh Venues</button>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h3>{venue.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default VenueManagement;
