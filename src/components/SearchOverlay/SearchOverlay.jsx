import VenueCard from "../VenueCard/VenueCard";
import "./searchoverlay.css";

const SearchOverlay = ({ searchTerm, searchResults, onClose }) => {
  if (!searchTerm) return null;

  const handleSearchClick = () => {
    onClose();
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-50 tw-flex tw-justify-center tw-items-center tw-sm:w-full">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-relative tw-w-full tw-md:w-11/12 tw-h-5/6 tw-overflow-y-auto">
        <button
          onClick={onClose}
          className="tw-absolute tw-top-2 tw-right-2 tw-text-4xl tw-font-bold"
        >
          &times;
        </button>

        <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-800 mb-4">
          Search Results for "{searchTerm}"
        </h2>
        <div className="searchresult-wrapper tw-items-center tw-w-11/12 tw-h-full tw-overflow-scroll tw-flex tw-justify-around tw-flex-wrap">
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
