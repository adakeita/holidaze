import { useEffect, useState, useRef } from "react";
import { useVenues } from "../contexts/VenueContext";
import VenueCard from "../components/VenueCard/VenueCard";
import VenueCarousel from "../components/VenueCarousel/VenueCarousel";
import "../styles/venuestyles.css";

const VenuesPage = () => {
  const { venues, currentPage, setCurrentPage, hasMore } = useVenues();
  const [filteredVenues, setFilteredVenues] = useState([]);
  const venueContainerRef = useRef(null);

  useEffect(() => {
    const result = venues.filter(
      (venue) =>
        venue.media[0] !== "https://url.com/image.jpg" &&
        venue.media[0] !==
          "https://cdn.britannica.com/92/100692-050-5B69B59B/Mallard.jpg" &&
        venue.media[0] !==
          "https://cdn.britannica.com/92/100692-050-5B69B59B/Mallard.jpg" &&
        venue.media[0] !==
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_XMSrr8pfFFGnGdhJy5HaTwEhi8LHPcYorbx5_B-ig&s" &&
        !venue.name.toLowerCase().includes("test") &&
        !venue.name.toLowerCase().includes("string")
    );
    setFilteredVenues(result);
  }, [venues]);

  const loadMoreVenues = () => {
    if (hasMore) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    // Scroll to the top of the venue container
    if (venueContainerRef.current) {
      venueContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div className="venues-page">
      <section className="CAROUSEL-SECTION">
        <VenueCarousel />
      </section>
      <div className="HEADER-SORTING-WRAPPER w full py-6 mb-12">
        <h1 className="text-3xl font-bold text-center sm:text-left text-black mb-12">
          Browse All Venues
        </h1>
      </div>
      <section className="PAGE-CONTAINER" ref={venueContainerRef}>
        <div className="VENUES-CONTAINER venues-grid grid grid-cols-1 gap-9 gap-row-12 md:grid-cols-2 sm:gap-9 lg:gap-8 lg:grid-cols-3 ">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        {hasMore && (
          <button onClick={loadMoreVenues} className="load-more-button">
            Load More
          </button>
        )}
      </section>
    </div>
  );
};

export default VenuesPage;
