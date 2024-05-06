import { createContext, useContext, useState, useEffect } from "react";
import * as VenueService from "../services/venueService";
import { useAuth } from "./AuthContext";

const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { apiKey } = useAuth();

  const fetchVenues = async (page) => {
    try {
      const response = await VenueService.fetchVenues(
        page,
        20,
        "created",
        "desc",
        apiKey
      );
      if (response.data.length > 0) {
        const newVenues = response.data;
        const allVenues = [...venues, ...newVenues];
        const uniqueVenues = [];

        const ids = new Set();
        for (const venue of allVenues) {
          if (!ids.has(venue.id)) {
            uniqueVenues.push(venue);
            ids.add(venue.id);
          }
        }

        setVenues(uniqueVenues);
        setHasMore(newVenues.length === 20);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetching venues failed:", error.message);
    }
  };

  useEffect(() => {
    fetchVenues(currentPage);
  }, [apiKey, currentPage]);

  return (
    <VenueContext.Provider
      value={{ venues, fetchVenues, currentPage, setCurrentPage, hasMore }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenues = () => useContext(VenueContext);
