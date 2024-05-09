import { useEffect, useState, useRef } from "react";
import { useVenues } from "../contexts/VenueContext";
import VenueCard from "../components/VenueCard/VenueCard";
import VenueCarousel from "../components/VenueCarousel/VenueCarousel";
import Filters from "../components/Filters/Filters";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "../styles/venuestyles.css";

const VenuesPage = () => {
  const { venues, fetchVenues, currentPage, setCurrentPage, hasMore, loading } =
    useVenues();
  const venueContainerRef = useRef(null);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [sort, setSort] = useState({ field: "created", order: "desc" });

  useEffect(() => {
    //Filter and sort every time venues or filters change
    const defaultImages = new Set([
      "https://url.com/image.jpg",
      "https://cdn.britannica.com/92/100692-050-5B69B59B/Mallard.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_XMSrr8pfFFGnGdhJy5HaTwEhi8LHPcYorbx5_B-ig&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_XMSrr8pfFFGnGdhJy5HaTwEhi8LHPcYorbx5_B-ig&s",
    ]);

    const sortedAndFiltered = venues
      .filter((venue) => {
        const notDefaultImage = !defaultImages.has(venue.media[0]);
        const notTestName =
          !venue.name.toLowerCase().includes("test") &&
          !venue.name.toLowerCase().includes("string");
        const matchesFilters = Object.entries(filters).every(
          ([key, value]) => !value || (venue.meta && venue.meta[key])
        );
        return notDefaultImage && notTestName && matchesFilters;
      })
      .sort((a, b) => {
        if (sort.field === "price") {
          return sort.order === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return sort.order === "asc"
            ? new Date(a.created) - new Date(b.created)
            : new Date(b.created) - new Date(a.created);
        }
      });

    setFilteredVenues(sortedAndFiltered);
  }, [venues, filters, sort]);

  const handleFilterChange = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleSortChange = (field, order) => {
    setSort({ field, order });
  };

  const loadMoreVenues = () => {
    if (hasMore) {
      setCurrentPage(currentPage + 1);
      fetchVenues(currentPage + 1, sort.field, sort.order); //Fetch more venues based on the current sort order
    }
  };

  return (
    <div className="VENUES-PAGE">
      <section className="CAROUSEL-SECTION">
        <VenueCarousel />
      </section>
      <div className="HEADER-SORTING-WRAPPER tw-w-full tw-py-2">
        <h1 className="VENUES-HEADER">Venues</h1>
        <Filters
          onChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>
      <section className="PAGE-CONTAINER" ref={venueContainerRef}>
        <div className="VENUES-CONTAINER tw-venues-grid tw-grid tw-grid-cols-1 tw-gap-9 tw-gap-row-12 md:tw-grid-cols-2 sm:tw-gap-9 lg:tw-gap-8 lg:tw-grid-cols-3 ">
          {loading && <LoadingSpinner />}
          {filteredVenues.map((venue) => (
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
