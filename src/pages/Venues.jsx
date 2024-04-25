import { useEffect, useState } from "react";
import { useVenues } from "../contexts/VenueContext";
import VenueCard from "../components/VenueCard/VenueCard";
import VenueCarousel from "../components/VenueCarousel/VenueCarousel";
import "../styles/venuestyles.css";

const VenuesPage = () => {
  const { venues, fetchVenues } = useVenues();
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    const result = venues.filter(
      (venue) =>
        venue.media[0] !== "https://url.com/image.jpg" &&
        !venue.name.toLowerCase().includes("test") &&
        !venue.name.toLowerCase().includes("string")
    );
    setFilteredVenues(result);
  }, [venues]);

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
      <section className="PAGE-CONTAINER">
        <div className="venues-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12 lg:gap-8">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default VenuesPage;
