import { createContext, useContext, useState, useEffect } from "react";
import * as VenueService from "../services/venueService";
import { useAuth } from "./AuthContext";

const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
  const [allVenues, setAllVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { apiKey } = useAuth();

  const fetchVenues = async (
    page,
    filters,
    sort = "created",
    sortOrder = "desc"
  ) => {
    setLoading(true);
    try {
      let fetchedData = [];
      console.log("Fetching venues...");
      let attemptPage = page;
      console.log("Attempt page:", attemptPage);
      while (fetchedData.length < 20 && hasMore) {
        const response = await VenueService.fetchVenues(
          attemptPage++,
          20,
          sort,
          sortOrder,
          apiKey
        );
        if (response.data) {
          const filteredData = response.data.filter((venue) => {
            return Object.entries(filters).every(([key, value]) => {
              return !value || (venue.meta && venue.meta[key]);
            });
          });
          fetchedData = [...fetchedData, ...filteredData];
          console.log("Fetched data:", fetchedData.length);
          console.log("Response venues:", response.data);
          setHasMore(response.data.length === 20);
        } else {
          setHasMore(false);
        }
      }

      const newVenues = fetchedData.slice(0, 20);
      const venueMap = new Map(allVenues.map((v) => [v.id, v]));
      newVenues.forEach((venue) => venueMap.set(venue.id, venue));
      setAllVenues(Array.from(venueMap.values()));
    } catch (error) {
      console.error("Fetching venues failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues(currentPage, {});
  }, [apiKey, currentPage]);

  return (
    <VenueContext.Provider
      value={{
        venues: allVenues,
        fetchVenues,
        currentPage,
        setCurrentPage,
        hasMore,
        loading,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenues = () => useContext(VenueContext);
