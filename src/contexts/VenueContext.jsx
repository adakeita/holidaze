import { createContext, useContext, useState, useEffect } from "react";
import * as VenueService from "../services/venueService";
import { useAuth } from "./AuthContext";

const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const { apiKey } = useAuth();

  const fetchVenues = async () => {
    try {
      const response = await VenueService.fetchVenues("", apiKey);
      setVenues(response.data);
    } catch (error) {
      console.error("Fetching venues failed:", error.message);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [apiKey]);

  return (
    <VenueContext.Provider value={{ venues, fetchVenues }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenues = () => useContext(VenueContext);
