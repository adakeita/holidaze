import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenueById } from "../services/venueService";
import SingleVenueCard from "../components/SingleVenueCard/SingleVenueCard";
import CustomerBookingForm from "../components/CustomerBookingForm/CustomerBookingForm";
import { useAuth } from "../contexts/AuthContext";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { authState } = useAuth();
  console.log(authState);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        const fetchedVenue = await fetchVenueById(id);
        setVenue(fetchedVenue.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch venue details.");
        setLoading(false);
      }
    };

    loadVenue();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="venue-details-page">
      <SingleVenueCard venue={venue} />
      {authState.isAuthenticated && (
        <div className="booking-section">
          {venue && <CustomerBookingForm venueId={venue.id} />}
        </div>
      )}
      {!authState.isAuthenticated && <p>Log in to book this venue.</p>}
    </div>
  );
};

export default VenueDetails;
