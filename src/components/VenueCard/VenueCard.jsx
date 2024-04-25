import { useNavigate } from "react-router-dom";
import "./venuecard.css";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div
      className="CONTAINER_VENUECARD flex flex-col w-full xl:w-11/12 2xl:w-10/12 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => navigate(`/venues/${venue.id}`)}
      style={{ height: "500px" }}
    >
      <figure className="IMG-WRAPPER_VENUECARD h-1/2 w-full">
        <img
          src={imageUrl}
          alt={venue.name}
          className="IMG_VENUECARD w-full h-full object-cover"
        />
      </figure>
      <section className="DETAILS_VENUECARD card-body h-1/2 p-4 flex flex-col justify-around">
        <div className="HEADER-WRAPPER_VENUECARD h-1/5">
          <h2 className="HEADER_VENUECARD card-title text-lg font-semibold text-gray-900">
            {venue.name}
          </h2>
        </div>
        <div className="VENUE-DESC-WRAPPER_VENUECARD px-1 h-2/5">
          <p className="VENUE-DESC_VENUECARD text-gray-600 text-sm flex-grow">
            {venue.description}
          </p>
        </div>
        <div className="VENUE-PRICE-WRAPPER_VENUECARD flex justify-end h-1/5">
          <span className="VENUE-PRICE_VENUECARD text-lg font-semibold text-gray-900">
            ${venue.price}/Night
          </span>
        </div>
        <div className="EXTRAS-WRAPPER_VENUECARD h-1/5">
          <div className="card-actions flex justify-end mt-2">
            {venue.meta.wifi && (
              <span className="badge badge-outline badge-accent">Wifi</span>
            )}
            {venue.meta.pets && (
              <span className="badge badge-outline badge-accent">
                Pets Allowed
              </span>
            )}
            {venue.meta.breakfast && (
              <span className="badge badge-outline badge-accent">
                Breakfast
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenueCard;
