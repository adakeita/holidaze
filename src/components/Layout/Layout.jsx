import { useState, useEffect } from "react";
import { fetchSearchResults } from "../../services/apiService";
import useDebounce from "../../hooks/useDebounce";
import Header from "../Header";
import Footer from "../Footer";
import SearchOverlay from "../SearchOverlay/SearchOverlay";

const Layout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const search = async () => {
        try {
          const results = await fetchSearchResults(debouncedSearchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error("Failed to fetch search results:", error.message);
        }
      };

      search();
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="LAYOUT-CONTAINER">
      <Header onSearchChange={setSearchTerm} />
      {searchTerm && (
        <SearchOverlay
          searchTerm={searchTerm}
          searchResults={searchResults}
          onClose={() => setSearchTerm("")}
        />
      )}
      <div className="MAIN-CONTENT">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
