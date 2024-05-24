import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./venuecard.css";

const VenueCard = ({ venue }) => {
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="CONTAINER_VENUECARD"
      aria-label={`View details for ${venue.name}`}
    >
      <figure className="IMG_WRAPPER_VENUECARD">
        <img
          src={imageUrl}
          aria-labelledby="cardheader"
          className="IMG_VENUECARD"
        />
      </figure>
      <section className="DETAILS_VENUECARD">
        <div className="HEADER_WRAPPER_VENUECARD">
          <h2 id="cardheader" className="HEADER_VENUECARD">
            {venue.name}
          </h2>
        </div>
        <div className="VENUE_DESC_WRAPPER_VENUECARD">
          <p className="VENUE_DESC_VENUECARD">
            {venue.description || "No description provided"}
          </p>
        </div>
        <div className="VENUE_LOCATION_WRAPPER_VENUECARD">
          <span className="VENUE_LOCATION_VENUECARD">
            {venue.location.city && venue.location.country
              ? `${venue.location.city}, ${venue.location.country}`
              : "No location provided"}
          </span>
        </div>
        <div className="VENUE_PRICE_WRAPPER_VENUECARD">
          <span className="VENUE_PRICE_VENUECARD">    {venue.price ? `$${venue.price}/night` : "No price provided"}</span>
        </div>
        <div className="EXTRAS_WRAPPER_VENUECARD">
          {venue.meta.wifi && <span className="BADGE_VENUECARD">Wifi</span>}
          {venue.meta.pets && (
            <span className="BADGE_VENUECARD">Pets Allowed</span>
          )}
          {venue.meta.breakfast && (
            <span className="BADGE_VENUECARD">Breakfast</span>
          )}
          {venue.meta.parking && (
            <span className="BADGE_VENUECARD">Parking</span>
          )}
        </div>
      </section>
    </Link>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
};

export default VenueCard;
