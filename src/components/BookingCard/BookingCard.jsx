import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const venue = booking.venue;
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

  return (
    <div
      className="CONTAINER_BOOKINGCARD flex flex-col w-full sm:w-96 bg-white shadow-md rounded-lg overflow-hidden"
      style={{ height: "500px" }}
    >
      <figure className="IMG-WRAPPER_BOOKINGCARD h-1/2 w-full">
        <img
          src={imageUrl}
          alt={venue.name}
          className="IMG_BOOKINGCARD w-full h-full object-cover"
        />
      </figure>
      <section className="DETAILS_BOOKINGCARD card-body h-1/2 p-4 flex flex-col justify-around">
        <div className="HEADER-WRAPPER_BOOKINGCARD h-1/5">
          <h2 className="HEADER_BOOKINGCARD card-title text-lg font-semibold text-gray-900">
            {venue.name}
          </h2>
          <p className="DATES_BOOKINGCARD text-sm text-gray-600">
            {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
        </div>
        <div className="VENUE-DESC-WRAPPER_BOOKINGCARD px-4 h-2/5">
          <p className="VENUE-DESC_BOOKINGCARD text-gray-600 text-sm flex-grow">
            {venue.description}
          </p>
        </div>
        <div className="VENUE-PRICE-WRAPPER_BOOKINGCARD flex justify-end h-1/5">
          <span className="VENUE-PRICE_BOOKINGCARD text-lg font-semibold text-gray-900">
            ${venue.price}/Night
          </span>
        </div>
        <div className="EXTRAS-WRAPPER_BOOKINGCARD h-1/5">
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
          <div className="VIEVMORE-BTN">
            <button
              onClick={() => navigate(`/venues/${venue.id}`)}
              className="VIEWMORE-BTN w-full p-2 rounded-md bg-logo-green text-center text-white mt-2"
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
