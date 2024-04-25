import VenueCard from "../VenueCard/VenueCard";
import "./searchoverlay.css";

const SearchOverlay = ({ searchTerm, searchResults, onClose }) => {
  if (!searchTerm) return null;

  const handleSearchClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center sm:w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-full md:w-11/12 h-5/6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Search Results for "{searchTerm}"
        </h2>
        <div className="searchresult-wrapper items-center w-11/12 h-full overflow-scroll flex justify-center flex-wrap">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <VenueCard
                key={result.id}
                venue={result}
                onClick={handleSearchClick}
              />
            ))
          ) : (
            <p>No results found for "{searchTerm}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
