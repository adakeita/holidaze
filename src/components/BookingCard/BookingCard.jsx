import { useNavigate } from "react-router-dom";
import "./bookingcard.css";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const venue = booking.venue;
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handleViewVenue = () => {
    navigate(`/venues/${venue.id}`);
  };

  return (
    <div className="CONTAINER_BOOKINGCARD" onClick={handleViewVenue}>
      <figure className="IMG_WRAPPER_BOOKINGCARD">
        <img src={imageUrl} alt={venue.name} className="IMG_BOOKINGCARD" />
      </figure>
      <section className="DETAILS_BOOKINGCARD">
        <div className="HEADER_WRAPPER_BOOKINGCARD">
          <h2 className="HEADER_BOOKINGCARD">{venue.name}</h2>
          <p className="DATES_BOOKINGCARD">
            {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
          </p>
        </div>
        <div className="VENUE_DESC_WRAPPER_BOOKINGCARD">
          <p className="VENUE_DESC_BOOKINGCARD">{venue.description}</p>
        </div>
        <div className="VENUE_LOCATION_WRAPPER_BOOKINGCARD">
          <p className="VENUE_LOCATION_BOOKINGCARD">
            {venue.location.city}, {venue.location.country}
          </p>
        </div>
        <div className="VENUE_PRICE_WRAPPER_BOOKINGCARD">
          <span className="VENUE_PRICE_BOOKINGCARD">${venue.price}/Night</span>
        </div>
        <div className="EXTRAS_WRAPPER_BOOKINGCARD">
          <div className="EXTRAS_BOOKINGCARD">
            {venue.meta.wifi && <span className="BADGE">Wifi</span>}
            {venue.meta.pets && <span className="BADGE">Pets Allowed</span>}
            {venue.meta.breakfast && <span className="BADGE">Breakfast</span>}
          </div>
          <div className="VIEWMORE_BTN_WRAPPER">
            <button
              onClick={() => navigate(`/venues/${venue.id}`)}
              className="VIEWMORE_BTN_BOOKINGCARD"
            >
              View more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingCard;
