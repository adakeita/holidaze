import { useEffect, useState } from "react";
import { fetchTopRatedVenues } from "../../services/venueService";
import { Link } from "react-router-dom";
import "./venuecarousel.css";

const VenueCarousel = () => {
  const [topRatedVenues, setTopRatedVenues] = useState([]);

  useEffect(() => {
    const loadTopRatedVenues = async () => {
      try {
        const venues = await fetchTopRatedVenues();
        setTopRatedVenues(venues);
      } catch (error) {
        console.error("Failed to load top-rated venues:", error);
      }
    };

    loadTopRatedVenues();
    return () => {};
  }, []);

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
    <div className="TOP-RATED_CAROUSEL tw-carousel tw-w-full">
      {topRatedVenues.map((venue, index) => (
        <div
          key={venue.id}
          id={`slide${index + 1}`}
          className="CAROUSEL-ITEM tw-carousel-item tw-relative tw-w-full tw-h-full"
        >
          <div
            className="IMG-WRAPPER_CAROUSEL carousel-background tw-relative"
            style={{
              backgroundImage: `url(${
                venue.media[0]?.url || "https://via.placeholder.com/400"
              })`,
            }}
          >
            <div className="background-filter"></div>
            <div className="CAROUSEL-CONTENT tw-h-full tw-py-4 tw-px-2">
              <div className="HEADER-WRAPPER_CAROUSEL tw-h-1/2">
                <h1 className="HEADER_CAROUSEL tw-font-bold tw-w-fit ">
                  {venue.name}
                </h1>
                <div className="RATING-CAROUSEL">
                  <span className="STARS_CAROUSEL">
                    {generateStars(venue.rating)}
                  </span>
                  <span className="tw-text-white tw-text-sm tw-shadow-black"></span>
                </div>
              </div>
              <div className="DETAILS-WRAPPER_CAROUSEL tw-h-1/2 tw-w-full tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-content-end tw-justify-between tw-sm:px-6">
                <div className="EXTRAS-WRAPPER_CAROUSEL">
                  {venue.meta.wifi && (
                    <span className="EXTRAS-BADGE_CAROUSEL">Wifi</span>
                  )}
                  {venue.meta.pets && (
                    <span className="EXTRAS-BADGE_CAROUSEL">Pets Allowed</span>
                  )}
                  {venue.meta.breakfast && (
                    <span className="EXTRAS-BADGE_CAROUSEL">Breakfast</span>
                  )}
                  {venue.meta.pool && (
                    <span className="EXTRAS-BADGE_CAROUSEL">Pool</span>
                  )}
                  {venue.meta.parking && (
                    <span className="EXTRAS-BADGE_CAROUSEL">Parking</span>
                  )}
                </div>
                <div className="PRICE-WRAPPER_CAROUSEL tw-p-2">
                  <span className="PRICE_CAROUSEL tw-rounded tw-text-white tw-font-semibold">
                    ${venue.price}
                  </span>
                </div>
              </div>
              <div className="VIEW-LINK_WRAPPER">
                <Link to={`/venues/${venue.id}`} className="VIEW-LINK_CAROUSEL">
                  View Here
                </Link>
              </div>
            </div>
            <nav className="NAVIGATION_CAROUSEL tw-absolute tw-flex tw-justify-between tw-transform-translate-y-1/2 tw-left-5 tw-right-5 tw-top-1/2">
              <a
                href={`#slide${index === 0 ? topRatedVenues.length : index}`}
                className="PREV-BTN_CAROUSEL tw-btn tw-btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === topRatedVenues.length - 1 ? 1 : index + 2
                }`}
                className="NEXT-BTN_CAROUSEL tw-btn tw-btn-circle"
              >
                ❯
              </a>
            </nav>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueCarousel;
