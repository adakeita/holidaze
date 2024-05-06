import { useNavigate } from "react-router-dom";
import "./venuecard.css";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div
      className="CONTAINER_VENUECARD flex flex-col overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => navigate(`/venues/${venue.id}`)}
      style={{ height: "500px" }}
    >
      <figure className="IMG-WRAPPER_VENUECARD w-full">
        <img src={imageUrl} alt={venue.name} className="IMG_VENUECARD" />
      </figure>
      <section className="DETAILS_VENUECARD flex-col">
        <div className="HEADER-WRAPPER_VENUECARD">
          <h2 className="HEADER_VENUECARD text-gray-800">{venue.name}</h2>
        </div>
        <div className="VENUE-DESC-WRAPPER_VENUECARD px-1">
          <p className="VENUE-DESC_VENUECARD text-gray-600 flex-grow">
            {venue.description}
          </p>
        </div>
        <div className="VENUE-PRICE-WRAPPER_VENUECARD flex justify-end">
          <span className="VENUE-PRICE_VENUECARD font-semibold text-gray-900">
            ${venue.price}/night
          </span>
        </div>
        <div className="EXTRAS-WRAPPER_VENUECARD">
          {venue.meta.wifi && <span className="badge badge-accent">Wifi</span>}
          {venue.meta.pets && (
            <span className="badge  badge-accent">Pets Allowed</span>
          )}
          {venue.meta.breakfast && (
            <span className="badge badge-accent">Breakfast</span>
          )}
          {venue.meta.parking && (
            <span className="badge badge-accent">Parking</span>
          )}
        </div>
      </section>
    </div>
  );
};

export default VenueCard;
