import { useState } from "react";
import PropTypes from "prop-types";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import CustomerBookingForm from "../CustomerBookingForm/CustomerBookingForm";
import Modal from "../Modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Croissant from "../../assets/svg/croissant.svg";
import Parking from "../../assets/svg/parking.svg";
import Pets from "../../assets/svg/pet.svg";
import Wifi from "../../assets/svg/wifi.svg";
import "./singlevenuecard.css";

const SingleVenueCard = ({ venue }) => {
  const imageUrl =
    venue.media[0]?.url ||
    "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
  const { authState } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingSuccess = () => {
    setIsBookingModalOpen(false);
    navigate("/dashboard");
  };

  const bookedRanges = venue.bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index}>★</span>
        ))}
        {halfStar && <span>☆</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index + fullStars + 1}>☆</span>
        ))}
      </>
    );
  };

  return (
    <div className="SINGLEVENUE-CARD">
      <div
        className="IMG_SINGLEVENUE"
        alt={venue.name}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="IMG-OVERLAY_SINGLEVENUE"></div>
        <div className="IMG-INFO_SINGLEVENUE">
          <div className="HEADER_SINGLEVENUE-IMG">
            <h1 className="NAME_SINGLEVENUE-IMG">{venue.name}</h1>
            <div className="RATING-WRAPPER_SINGLEVENUE-IMG">
              <span className="STARS_SINGLEVENUE_IMG">{generateStars(venue.rating)}</span>
            </div>
          </div>
          <div className="EXTRAS-WRAPPER_SINGLEVENUE-IMG">
            {venue.meta.wifi && <span className="IMG-BADGE_SINGLEVENUE">Wifi</span>}
            {venue.meta.pets && <span className="IMG-BADGE_SINGLEVENUE">Pets allowed</span>}
            {venue.meta.breakfast && <span className="IMG-BADGE_SINGLEVENUE">Breakfast</span>}
            {venue.meta.parking && <span className="IMG-BADGE_SINGLEVENUE">Parking</span>}
          </div>
        </div>
      </div>
      <section className="BOTTOM-SECTION_SINGLEVENUE">
        <div className="HEADER-WRAPPER_SINGLEVENUE">
          <h2 className="VENUE-NAME_SINGLEVENUE">{venue.name}</h2>
          <div className="VENUE-RATING_SINGLEVENUE">
            <span className="RATING_SINGLEVENUE">{venue.rating}/5</span>
            <span className="STARS_SINGLEVENUE">{generateStars(venue.rating)}</span>
          </div>
        </div>
        <div className="INFO-BOOKING-WRAPPER_SINGLEVENUE">
          <div className="VENUEINFO_BOTTOM-SECTION">
            <div className="VENUE-LOCATION_SINGLEVENUE">
              <h4 className="VENUE-INFO-HEADER">Location</h4>
              <p className="VENUE-LOCATION-TEXT_SINGLEVENUE">
                {venue.location.address &&
                venue.location.city &&
                venue.location.country
                  ? `${venue.location.address}, ${venue.location.city}, ${venue.location.country}`
                  : "No location provided"}
              </p>
            </div>
            <div className="VENUE-DESC_SINGLEVENUE">
              <h4 className="VENUE-INFO-HEADER">Description</h4>
              <p>{venue.description}</p>
            </div>
            <div className="VENUE-PRICE_SINGLEVENUE">
              <h4 className="VENUE-INFO-HEADER">Price</h4>
              <p className="VENUE-PRICE-P">${venue.price}</p>
            </div>
            <div className="VENUE-MAX_SINGLEVENUE">
              <h4 className="VENUE-INFO-HEADER">Max Guests</h4>
              <p className="VENUE-MAX-P">{venue.maxGuests}</p>
            </div>
          </div>
          <div className="VENUE-EXTRAS_SINGLEVENUE">
            <h4 className="VENUE-INFO-HEADER">Amenities</h4>
            <ul className="VENUE-EXTRAS-LIST">
              {venue.meta.wifi && (
                <li className="VENUE-EXTRAS-ITEM">
                  <img src={Wifi} alt="wifi" /> Wifi
                </li>
              )}
              {venue.meta.parking && (
                <li className="VENUE-EXTRAS-ITEM">
                  <img src={Parking} alt="parking" /> Parking
                </li>
              )}
              {venue.meta.breakfast && (
                <li className="VENUE-EXTRAS-ITEM">
                  <img src={Croissant} alt="breakfast" /> Breakfast
                </li>
              )}
              {venue.meta.pets && (
                <li className="VENUE-EXTRAS-ITEM">
                  <img src={Pets} alt="pets" /> Pet friendly
                </li>
              )}
              {!(
                venue.meta.wifi ||
                venue.meta.parking ||
                venue.meta.breakfast ||
                venue.meta.pets
              ) && (
                <li className="VENUE-EXTRAS-ITEM">
                  No extra amenities provided
                </li>
              )}
            </ul>
          </div>
          <div className="BOOKING-SECTION_SINGLEVENUE">
            <h4 className="VENUE-INFO-HEADER">Available dates</h4>
            <BookingCalendar bookedDates={bookedRanges} />
            {authState.isAuthenticated ? (
              <button
                className="BOOK-NOW-BTN_SINGLEVENUE"
                onClick={handleOpenBookingModal}
              >
                Book Now
              </button>
            ) : (
              <div className="LOGIN-SIGNUP-WRAPPER">
                <p className="LOGIN-MSG_SINGLEVENUE">
                  Log in to book this venue.
                </p>
                <div className="LOGIN_SINGLEVENUE">
                  <Link
                    role="button"
                    to="/login"
                    className="LOGIN-BTN_SINGLEVENUE"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        title="Book this venue"
      >
        <CustomerBookingForm
          venue={venue}
          onClose={handleCloseBookingModal}
          onBookingSuccess={handleBookingSuccess}
        />
      </Modal>
    </div>
  );
};

SingleVenueCard.propTypes = {
  venue: PropTypes.object.isRequired,
};

export default SingleVenueCard;

