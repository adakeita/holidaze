import PropTypes from "prop-types";
import CustomerBookingForm from "../CustomerBookingForm/CustomerBookingForm";
import { useAuth } from "../../contexts/AuthContext";
import "./singlevenuecard.css";

const SingleVenueCard = ({ venue }) => {
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
  const { authState } = useAuth();

  return (
    <div className="SINGLEVENUE-CARD">
      <div
        className="IMG_SINGLEVENUE"
        alt={venue.name}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="IMG-OVERLAY_SINGLEVENUE">
          <div className="IMG-INFO_SINGLEVENUE">
            <div className="HEADER_SINGLEVENUE-IMG">
              <h1 className="NAME_SINGLEVENUE-IMG">{venue.name}</h1>
              <div className="RATING-WRAPPER_SINGLEVENUE-IMG">
                <span className="STARS_SINGLEVENUE_IMG">★★★★★</span>
              </div>
            </div>
            <div className="EXTRAS-WRAPPER_SINGLEVENUE-IMG">
              {venue.meta.wifi && <span className="badge">Wifi</span>}
              {venue.meta.pets && <span className="badge">Pets allowed</span>}
              {venue.meta.breakfast && <span className="badge">Breakfast</span>}
              {venue.meta.parking && <span className="badge">Parking</span>}
            </div>
          </div>
        </div>
      </div>
      <section className="BOTTOM-SECTION_SINGLEVENUE">
        <div className="venue-details">
          <h1 className="venue-name">{venue.name}</h1>
          <div className="venue-rating">
            <span>{venue.rating}/5</span>
            <span className="stars">★★★☆☆</span>
          </div>
          <div className="VENUEINFORMATION_BOTTOM-SECTION">
            <div className="venue-location">
              <h3>Location</h3>
              <p>
                {venue.location.address}, {venue.location.city},{" "}
                {venue.location.country}
              </p>
            </div>
            <div className="venue-description">
              <h3>Description</h3>
              <p>{venue.description}</p>
            </div>
            <div className="venue-price">
              <h3>${venue.price} per night</h3>
              <p>Max guests: {venue.maxGuests}</p>
            </div>
            <div className="venue-ammeneties">
              <h3>Ammeneties</h3>
              <ul>
                {venue.meta.wifi && <li>Wifi</li>}
                {venue.meta.parking && <li>Parking</li>}
                {venue.meta.breakfast && <li>Breakfast</li>}
                {venue.meta.pets && <li>Pets allowed</li>}
              </ul>
            </div>
          </div>
          <div className="booking-section">
            {authState.isAuthenticated ? (
              <CustomerBookingForm venue={venue} />
            ) : (
              <p className="error-msg_venuedetails">
                Log in to book this venue.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

SingleVenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
};

export default SingleVenueCard;
