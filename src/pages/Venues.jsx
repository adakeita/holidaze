import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard/VenueCard";
import VenueCarousel from "../components/VenueCarousel/VenueCarousel";
import Filters from "../components/Filters/Filters";
import FloatingBtn from "../components/FloatingBtn/FloatingBtn";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Modal from "../components/Modal/Modal";
import CreateVenueForm from "../components/CreateVenueForm/CreateVenueForm";
import { fetchVenues } from "../services/venueService";
import { useAuth } from "../contexts/AuthContext";
import "../styles/venuestyles.css";

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({ field: "created", order: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { authState } = useAuth();

  const loadVenues = async (
    page = 1,
    sortField = sort.field,
    sortOrder = sort.order
  ) => {
    setLoading(true);
    try {
      const queryParams = `?limit=20&page=${page}&sort=${sortField}&sortOrder=${sortOrder}`;
      const response = await fetchVenues(queryParams);
      if (page === 1) {
        setVenues(response);
      } else {
        setVenues((prevVenues) => [...prevVenues, ...response]);
      }
    } catch (error) {
      console.error("Failed to fetch venues:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVenues(currentPage, sort.field, sort.order);
  }, [sort, currentPage]);

  useEffect(() => {
    return () => {
      console.log("VenuesPage unmounted");
    };
  }, []);

  const handleSortChange = (field, order) => {
    setSort({ field, order });
    setCurrentPage(1); // Reset to first page on sort change
  };

  const loadMoreVenues = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <section className="PAGE-CONTAINER">
        <div className="VENUES-CONTAINER tw-venues-grid tw-grid tw-grid-cols-1 tw-gap-9 tw-gap-row-9 md:tw-grid-cols-2 sm:tw-gap-row-2  sm:tw-gap-4 lg:tw-gap-4 lg:tw-grid-cols-3">
          {loading && <LoadingSpinner />}
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        {venues.length > 0 && !loading && (
          <div className="LOAD-MORE-SECTION">
            <button onClick={loadMoreVenues} className="LOAD-MORE-BTN">
              Load More
            </button>
          </div>
        )}
        {authState.isVenueManager && <FloatingBtn onClick={openModal} />}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Create a New Venue"
        >
          <CreateVenueForm onClose={closeModal} />
        </Modal>
      </section>
    </div>
  );
};

export default VenuesPage;
