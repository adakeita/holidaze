import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopRatedVenues } from "../../services/venueService.js";
import "./venuecarousel.css";

const VenueCarousel = () => {
  const [topRatedVenues, setTopRatedVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopRatedVenues = async () => {
      try {
        let venues = await fetchTopRatedVenues("");
        venues = venues.filter(
          (venue) =>
            venue.media[0] !== "https://url.com/image.jpg" &&
            !venue.name.toLowerCase().includes("test")
        );
        setTopRatedVenues(venues);
      } catch (error) {
        console.error("Failed to load top-rated venues:", error);
      }
    };

    loadTopRatedVenues();
  }, []);

  const handleDirectionClick = (direction) => {
    e.preventDefault();
  };

  return (
    <div className="TOP-RATED_CAROUSEL carousel w-full">
      {topRatedVenues.map((venue, index) => (
        <div
          key={venue.id}
          id={`slide${index + 1}`}
          className="CAROUSEL-ITEM carousel-item relative w-full h-full"
        >
          <div
            className="IMG-WRAPPER_CAROUSEL carousel-background relative"
            style={{
              backgroundImage: `url(${
                venue.media[0]?.url || "https://via.placeholder.com/400"
              })`,
            }}
          >
            <div className="background-filter"></div>
            <div className="CAROUSEL-CONTENT h-full py-4 px-2">
              <div className="HEADER-WRAPPER_CAROUSEL h-1/2">
                <h2 className="HEADER_CAROUSEL text-2xl font-bold text-white w-fit px-4 text-shadow-md shadow-black">
                  {venue.name}
                </h2>
              </div>
              <div className="DETAILS-WRAPPER_CAROUSEL h-1/2 w-full flex flex-row items-center flex-wrap content-end justify-between sm:px-6">
                <div className="EXTRAS-WRAPPER_CAROUSEL">
                  {venue.meta.wifi && (
                    <span className=" EXTRAS-BADGE text-white badge mx-1 badge-success  badge-lg shadow-badge">
                      Wifi
                    </span>
                  )}
                  {venue.meta.pets && (
                    <span className="EXSTRAS-BADGE text-white badge mx-1 badge-success badge-lg shadow-badge">
                      Pets Allowed
                    </span>
                  )}
                  {venue.meta.breakfast && (
                    <span className="EXSTRAS-BADGE text-white badge mx-1 badge-success badge-lg shadow-badge">
                      Breakfast
                    </span>
                  )}
                  {venue.meta.pool && (
                    <span className="EXSTRAS-BADGE text-white badge mx-1 badge-success badge-lg shadow-badge">
                      Pool
                    </span>
                  )}
                  {venue.meta.parking && (
                    <span className="EXSTRAS-BADGE text-white badge mx-1 badge-success badge-lg shadow-badge">
                      Parking
                    </span>
                  )}
                </div>
                <div className="PRICE-WRAPPER_CAROUSEL  bg-gray-900 border border-white bg-opacity-70 rounded-md p-2">
                  <span className="PRICE_CAROUSEL rounded text-white text-lg font-semibold">
                    ${venue.price}/Night
                  </span>
                </div>
              </div>
            </div>
            <nav className="NAVIGATION_CAROUSEL absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? topRatedVenues.length : index}`}
                className="PREV-BTN_CAROUSEL btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === topRatedVenues.length - 1 ? 1 : index + 2
                }`}
                className="NEXT-BTN_CAROUSEL btn btn-circle"
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
