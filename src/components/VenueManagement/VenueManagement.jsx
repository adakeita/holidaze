import { useVenues } from "../../contexts/VenueContext";

const VenueManagement = () => {
  const { venues, fetchVenues } = useVenues();

  return (
    <div>
      <h2>Venue Management Dashboard</h2>
      <button onClick={fetchVenues}>Refresh Venues</button>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h3>{venue.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default VenueManagement;
