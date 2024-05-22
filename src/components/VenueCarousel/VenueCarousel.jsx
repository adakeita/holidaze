import { useEffect, useState } from "react";
import { fetchTopRatedVenues } from "../../services/venueService";
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

    console.log("VenueCarousel mounted");
    loadTopRatedVenues();
    return () => {
      console.log("VenueCarousel unmounted");
    };
  }, []);

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
                  <span className="tw-text-white tw-text-lg tw-font-semibold tw-shadow-black">
                    {venue.rating}
                  </span>
                  <span className="tw-text-white tw-text-sm tw-shadow-black">
                    /5
                  </span>
                </div>
              </div>
              <div className="DETAILS-WRAPPER_CAROUSEL tw-h-1/2 tw-w-full tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-content-end tw-justify-between tw-sm:px-6">
                <div className="EXTRAS-WRAPPER_CAROUSEL">
                  {venue.meta.wifi && (
                    <span className=" EXTRAS-BADGE tw-text-white tw-badge tw-mx-1 tw-badge-success  tw-badge-lg tw-shadow-badge">
                      Wifi
                    </span>
                  )}
                  {venue.meta.pets && (
                    <span className="EXSTRAS-BADGE tw-text-white tw-badge tw-mx-1 tw-badge-success  tw-badge-lg tw-shadow-badge">
                      Pets Allowed
                    </span>
                  )}
                  {venue.meta.breakfast && (
                    <span className="EXSTRAS-BADGE tw-text-white tw-badge tw-mx-1 tw-badge-success  tw-badge-lg tw-shadow-badge">
                      Breakfast
                    </span>
                  )}
                  {venue.meta.pool && (
                    <span className="EXSTRAS-BADGE tw-text-white tw-badge tw-mx-1 tw-badge-success  tw-badge-lg tw-shadow-badge">
                      Pool
                    </span>
                  )}
                  {venue.meta.parking && (
                    <span className="EXSTRAS-BADGE tw-text-white tw-badge tw-mx-1 tw-badge-success  tw-badge-lg tw-shadow-badge">
                      Parking
                    </span>
                  )}
                </div>
                <div className="PRICE-WRAPPER_CAROUSEL  tw-bg-gray-900 tw-border tw-border-white tw-bg-opacity-70 tw-rounded-md tw-p-2">
                  <span className="PRICE_CAROUSEL tw-rounded tw-text-white tw-text-lg tw-font-semibold">
                    ${venue.price}/Night
                  </span>
                </div>
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
