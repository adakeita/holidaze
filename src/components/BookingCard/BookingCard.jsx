import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./bookingcard.css";

const BookingCard = ({ booking }) => {
  const venue = booking.venue;
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="CONTAINER_BOOKINGCARD">
      <Link
        to={`/venues/${venue.id}`}
        className="IMG_WRAPPER_BOOKINGCARD"
        aria-label={`View details for ${venue.name}`}
      >
        <img
          src={imageUrl}
          alt={`Image of ${venue.name}`}
          className="IMG_BOOKINGCARD"
        />
      </Link>
      <section className="DETAILS_BOOKINGCARD">
        <div className="HEADER_WRAPPER_BOOKINGCARD">
          <h2 className="HEADER_BOOKINGCARD" id={`header-${booking.id}`}>
            {venue.name}
          </h2>
          <p
            className="DATES_BOOKINGCARD"
            aria-describedby={`header-${booking.id}`}
          >
            {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
          </p>
        </div>
        <div className="VENUE_DESC_WRAPPER_BOOKINGCARD">
          <p className="VENUE_DESC_BOOKINGCARD">
            {venue.description || "No description provided"}
          </p>
        </div>
        <div className="VENUE_LOCATION_WRAPPER_BOOKINGCARD">
          <p className="VENUE_LOCATION_BOOKINGCARD">
            {venue.location.city && venue.location.country
              ? `${venue.location.city}, ${venue.location.country}`
              : "No location provided"}
          </p>
        </div>
        <div className="VENUE_PRICE_WRAPPER_BOOKINGCARD">
          <span className="VENUE_PRICE_BOOKINGCARD">
            {venue.price ? `$${venue.price}/night` : "No price provided"}
          </span>
        </div>
        <div className="EXTRAS_WRAPPER_BOOKINGCARD">
          <div className="EXTRAS_BOOKINGCARD">
            {venue.meta.wifi && <span className="BADGE_BOOKINGCARD">Wifi</span>}
            {venue.meta.pets && (
              <span className="BADGE_BOOKINGCARD">Pets Allowed</span>
            )}
            {venue.meta.breakfast && (
              <span className="BADGE_BOOKINGCARD">Breakfast</span>
            )}
            {venue.meta.parking && (
              <span className="BADGE_BOOKINGCARD">Parking</span>
            )}
            {!(
              venue.meta.wifi ||
              venue.meta.pets ||
              venue.meta.breakfast ||
              venue.meta.parking
            ) && <span>No extra amenities provided</span>}
          </div>
          <div className="VIEWMORE_BTN_WRAPPER">
            <Link
              to={`/venues/${venue.id}`}
              className="VIEWMORE_BTN_BOOKINGCARD"
            >
              View more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.object.isRequired,
};

export default BookingCard;
