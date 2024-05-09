import { useNavigate } from "react-router-dom";
import "./venuecard.css";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div
      className="CONTAINER_VENUECARD tw-flex tw-flex-col tw-overflow-hidden tw-cursor-pointer tw-transition-transform tw-duration-300 hover:tw-scale-105 tw-p-2"
      onClick={() => navigate(`/venues/${venue.id}`)}
      style={{ height: "500px" }}
    >
      <figure className="IMG-WRAPPER_VENUECARD tw-w-full">
        <img src={imageUrl} alt={venue.name} className="IMG_VENUECARD" />
      </figure>
      <section className="DETAILS_VENUECARD tw-flex-col">
        <div className="HEADER-WRAPPER_VENUECARD">
          <h2 className="HEADER_VENUECARD tw-text-gray-800">{venue.name}</h2>
        </div>
        <div className="VENUE-DESC-WRAPPER_VENUECARD tw-px-1">
          <p className="VENUE-DESC_VENUECARD tw-text-gray-600 tw-flex-grow">
            {venue.description}
          </p>
        </div>
        <div className="VENUE-PRICE-WRAPPER_VENUECARD tw-flex tw-justify-end">
          <span className="VENUE-PRICE_VENUECARD tw-font-semibold tw-text-gray-900">
            ${venue.price}/night
          </span>
        </div>
        <div className="EXTRAS-WRAPPER_VENUECARD">
          {venue.meta.wifi && <span className="tw-badge tw-badge-accent tw-mx-1">Wifi</span>}
          {venue.meta.pets && (
            <span className="tw-badge  tw-badge-accent">Pets Allowed</span>
          )}
          {venue.meta.breakfast && (
            <span className="tw-badge tw-badge-accent tw-mx-1">Breakfast</span>
          )}
          {venue.meta.parking && (
            <span className="tw-badge tw-badge-accent  tw-mx-1">Parking</span>
          )}
        </div>
      </section>
    </div>
  );
};

export default VenueCard;
