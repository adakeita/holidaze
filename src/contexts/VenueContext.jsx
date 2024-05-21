import { createContext, useContext, useState, useEffect } from "react";
import * as VenueService from "../services/venueService";
import { useAuth } from "./AuthContext";

const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
  const [allVenues, setAllVenues] = useState([]);
  const [latestUniqueVenues, setLatestUniqueVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({ field: "created", order: "desc" });
  const { apiKey } = useAuth();

  const fetchVenues = async () => {
    if (loading) return;
    setLoading(true);
    let queryParams = `?limit=20&page=${currentPage}&sort=${sort.field}&sortOrder=${sort.order}`;
    if (apiKey) {
      queryParams += `&apiKey=${apiKey}`;
    }
    try {
      const response = await VenueService.fetchVenues(queryParams);
      if (response.data) {
        const venueMap = new Map();
        response.data.forEach((venue) => venueMap.set(venue.id, venue));
        setAllVenues(Array.from(venueMap.values()));
        setHasMore(response.data.length === 20);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetching venues failed:", error.message);
      console.error("Query Params:", queryParams);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestUniqueVenues = async () => {
    try {
      const uniqueVenues = await VenueService.fetchLatestUniqueVenues();
      setLatestUniqueVenues(uniqueVenues);
      console.log("Latest unique venues:", uniqueVenues);
    } catch (error) {
      console.error("Fetching latest unique venues failed:", error.message);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [currentPage, sort.field, sort.order]);

  useEffect(() => {
    fetchLatestUniqueVenues();
  }, []);

  return (
    <VenueContext.Provider
      value={{
        venues: allVenues,
        latestUniqueVenues,
        fetchVenues,
        fetchLatestUniqueVenues,
        currentPage,
        setCurrentPage,
        hasMore,
        loading,
        sort,
        setSort,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenues = () => useContext(VenueContext);
