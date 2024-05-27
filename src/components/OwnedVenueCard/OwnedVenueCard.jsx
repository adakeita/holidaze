import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import { fetchBookingsForVenue } from "../../services/venueService";
import { useAuth } from "../../contexts/AuthContext";
import "./ownedvenuecard.css";
import "../../styles/react-calendar.css";

const OwnedVenueCard = ({
  venue,
  onDelete,
  onUpdate,
  onShowBookingDetails,
}) => {
  const { authState } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await fetchBookingsForVenue(
          venue.id,
          authState.accessToken,
          authState.apiKey
        );
        setBookings(response);
      } catch (error) {
        console.error("Failed to fetch bookings:", error.message);
      }
    };

    if (isCalendarOpen) {
      loadBookings();
    }
  }, [isCalendarOpen, venue.id, authState.accessToken, authState.apiKey]);

  const handleDateClick = (date) => {
    const booking = bookings.find(
      (b) => new Date(b.dateFrom) <= date && new Date(b.dateTo) >= date
    );
    if (booking) {
      onShowBookingDetails(booking);
    }
  };

  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div className="OWNED-VENUE-CARD">
      <div className="DEFAULT-CARD_OWNED-VENUE">
        <figure className="IMG_WRAPPER_OWNED-VENUECARD">
          <img
            src={imageUrl}
            aria-labelledby="cardheader"
            className="IMG_OWNED-VENUECARD"
          />
        </figure>
        <div className="IMG-VENUEDETAILS_OWNED-VENUE">
          <section className="DETAILS_OWNED-VENUECARD">
            <div className="HEADER_WRAPPER_OWNED-VENUECARD">
              <h2 id="cardheader" className="HEADER_OWNED-VENUECARD">
                {venue.name}
              </h2>
            </div>
            <div className="VENUE_DESC_WRAPPER_OWNED-VENUECARD">
              <p className="VENUE_DESC_OWNED-VENUECARD">{venue.description}</p>
            </div>
            <div className="VENUE_LOCATION_WRAPPER_OWNED-VENUECARD">
              <span className="VENUE_LOCATION_OWNED-VENUECARD">
                {venue.location.city && venue.location.country
                  ? `${venue.location.city}, ${venue.location.country}`
                  : "No location provided"}
              </span>
            </div>
            <div className="VENUE_PRICE_WRAPPER_OWNED-VENUECARD">
              <span className="VENUE_PRICE_OWNED-VENUECARD">
                ${venue.price}/night
              </span>
            </div>
            <div className="EXTRAS_OWNED-VENUES">
              {venue.meta.wifi && (
                <span className="BADGE_OWNED-VENUE">Wifi</span>
              )}
              {venue.meta.pets && (
                <span className="BADGE_OWNED-VENUE">Pets Allowed</span>
              )}
              {venue.meta.breakfast && (
                <span className="BADGE_OWNED-VENUE">Breakfast</span>
              )}
              {venue.meta.parking && (
                <span className="BADGE_OWNED-VENUE">Parking</span>
              )}
              {!(
                venue.meta.wifi ||
                venue.meta.pets ||
                venue.meta.breakfast ||
                venue.meta.parking
              ) && <span>No extra amenities provided</span>}
            </div>
          </section>
          <div className="BUTTONS_WRAPPER_OWNED-VENUECARD">
            <div className="UPDATE-DELETE">
              <button className="UPDATE-BTN" onClick={() => onUpdate(venue)}>
                Update
              </button>
              <button className="DELETE-BTN" onClick={() => onDelete(venue.id)}>
                Delete
              </button>
            </div>
            <button
              className="VIEW-CALENDAR-BTN"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              {isCalendarOpen ? "Hide Calendar" : "View Calendar"}
            </button>
          </div>
        </div>
      </div>
      {isCalendarOpen && (
        <div className="CALENDAR_WRAPPER">
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date, view }) =>
              bookings.some(
                (booking) =>
                  new Date(booking.dateFrom) <= date &&
                  new Date(booking.dateTo) >= date
              )
                ? "booked"
                : "react-calendar__tile--disabled"
            }
            tileDisabled={({ date, view }) =>
              !bookings.some(
                (booking) =>
                  new Date(booking.dateFrom) <= date &&
                  new Date(booking.dateTo) >= date
              )
            }
          />
        </div>
      )}
    </div>
  );
};

OwnedVenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onShowBookingDetails: PropTypes.func.isRequired,
};

export default OwnedVenueCard;
