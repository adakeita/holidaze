import { useEffect, useRef } from "react";
import { useVenues } from "../contexts/VenueContext";
import VenueCard from "../components/VenueCard/VenueCard";
import VenueCarousel from "../components/VenueCarousel/VenueCarousel";
import Filters from "../components/Filters/Filters";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "../styles/venuestyles.css";

const VenuesPage = () => {
  const {
    venues,
    fetchVenues,
    currentPage,
    setCurrentPage,
    hasMore,
    loading,
    setSort,
  } = useVenues();
  const venueContainerRef = useRef(null);

  // Update the sort setting in context, which triggers a re-fetch if necessary
  const handleSortChange = (field, order) => {
    setSort({ field, order });
  };

  // Handle the 'Load More' functionality
  const loadMoreVenues = () => {
    if (hasMore && !loading) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="VENUES-PAGE">
      <section className="CAROUSEL-SECTION">
        <VenueCarousel />
      </section>
      <div className="HEADER-SORTING-WRAPPER tw-w-full tw-py-2">
        <h1 className="VENUES-HEADER">Venues</h1>
        <Filters onSortChange={handleSortChange} />
      </div>
      <section className="PAGE-CONTAINER" ref={venueContainerRef}>
        <div className="VENUES-CONTAINER tw-venues-grid tw-grid tw-grid-cols-1 tw-gap-9 tw-gap-row-12 md:tw-grid-cols-2 sm:tw-gap-9 lg:tw-gap-8 lg:tw-grid-cols-3">
          {loading && <LoadingSpinner />}
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
          <div className="LOAD-MORE-SECTION">
            {hasMore && (
              <button onClick={loadMoreVenues} className="LOAD-MORE-BTN">
                Load More
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenuesPage;
