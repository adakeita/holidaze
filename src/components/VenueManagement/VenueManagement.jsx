import { useState, useEffect } from "react";
import {
  fetchVenues,
  deleteVenue,
  updateVenue,
} from "../../services/venueService";
import { useAuth } from "../../contexts/AuthContext";
import OwnedVenueCard from "../OwnedVenueCard/OwnedVenueCard";
import Modal from "../Modal/Modal";
import UpdateVenueForm from "../UpdateVenueForm/UpdateVenueForm";
import "./venuemanagement.css";

const VenueManagement = () => {
  const { authState } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVenue, setEditingVenue] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const loadVenues = async () => {
      if (authState.isAuthenticated && authState.isVenueManager) {
        try {
          const queryParams = `?_owner=true`;
          const fetchedVenues = await fetchVenues(queryParams);
          const userVenues = fetchedVenues.filter(
            (venue) => venue.owner && venue.owner.name === authState.user.name
          );
          setVenues(userVenues);
        } catch (error) {
          console.error("Failed to fetch venues:", error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    loadVenues();
  }, [authState]);

  const handleDelete = async (id) => {
    try {
      await deleteVenue(id, authState.accessToken, authState.apiKey);
      setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== id));
    } catch (error) {
      console.error("Failed to delete venue:", error.message);
    }
  };

  const handleUpdate = (venue) => {
    setEditingVenue(venue);
  };

  const handleSaveUpdate = async (updatedVenue) => {
    try {
      const response = await updateVenue(
        updatedVenue.id,
        updatedVenue,
        authState.accessToken,
        authState.apiKey
      );
      setVenues((prevVenues) =>
        prevVenues.map((venue) =>
          venue.id === updatedVenue.id ? response : venue
        )
      );
      setEditingVenue(null);
    } catch (error) {
      console.error("Failed to update venue:", error.message);
    }
  };

  const handleCancelUpdate = () => {
    setEditingVenue(null);
  };

  const handleShowBookingDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseBookingDetails = () => {
    setSelectedBooking(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="VENUE-MANAGEMENT-CONTAINER">
      <h3 className="HEADER_USER-VENUES">Your Venues || Management</h3>
      <div className="VENUE-LIST tw-venues-grid tw-grid tw-grid-cols-1 tw-gap-9 tw-gap-row-9 md:tw-grid-cols-2 sm:tw-gap-row-2 sm:tw-gap-8">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <OwnedVenueCard
              key={venue.id}
              venue={venue}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onShowBookingDetails={handleShowBookingDetails}
            />
          ))
        ) : (
          <p>You have no venues posted.</p>
        )}
      </div>
      {(editingVenue || selectedBooking) && (
        <Modal
          isOpen={Boolean(editingVenue || selectedBooking)}
          onClose={
            editingVenue ? handleCancelUpdate : handleCloseBookingDetails
          }
          title={editingVenue ? "Update Venue" : "Booking Details"}
        >
          {editingVenue ? (
            <UpdateVenueForm
              venue={editingVenue}
              onSave={handleSaveUpdate}
              onCancel={handleCancelUpdate}
            />
          ) : (
            selectedBooking && (
              <div className="BOOKING-DETAILS">
                <p>
                  <strong>Booking ID:</strong> {selectedBooking.id}
                </p>
                <p>
                  <strong>Customer:</strong> {selectedBooking.customer.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.customer.email}
                </p>
                <img
                  src={selectedBooking.customer.avatar.url}
                  alt={selectedBooking.customer.avatar.alt}
                  className="BOOKING-AVATAR"
                />
                <p>
                  <strong>From:</strong> {selectedBooking.dateFrom}
                </p>
                <p>
                  <strong>To:</strong> {selectedBooking.dateTo}
                </p>
                <p>
                  <strong>Guests:</strong> {selectedBooking.guests}
                </p>
              </div>
            )
          )}
        </Modal>
      )}
    </div>
  );
};

export default VenueManagement;
