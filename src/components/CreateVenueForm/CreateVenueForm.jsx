import { useState } from "react";
import { createVenue } from "../../services/venueService";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";
import "./createvenueform.css";

const CreateVenueForm = ({ onClose }) => {
  const { authState } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [rating, setRating] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const venueData = {
      name,
      description,
      location: {
        address,
        city,
        country,
      },
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests, 10),
      rating: parseFloat(rating),
      meta: {
        wifi,
        parking,
        breakfast,
        pets,
      },
      media: [
        {
          url: image,
          alt: name,
        },
      ],
    };

    try {
      const response = await createVenue(
        venueData,
        authState.accessToken,
        authState.apiKey
      );
      setMessage("Venue created successfully!");
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Failed to create venue:", error.message);
      setMessage(`Failed to create venue: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <form className="create-venue-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        aria-describedby="nameHelp"
      />
      <small id="nameHelp" className="form-text">
        Enter the name of the venue.
      </small>

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        aria-describedby="descriptionHelp"
      />
      <small id="descriptionHelp" className="form-text">
        Provide a brief description of the venue.
      </small>

      <label htmlFor="address">Address:</label>
      <input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        aria-describedby="addressHelp"
      />
      <small id="addressHelp" className="form-text">
        Enter the venue's address.
      </small>

      <label htmlFor="city">City:</label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        aria-describedby="cityHelp"
      />
      <small id="cityHelp" className="form-text">
        Enter the city where the venue is located.
      </small>

      <label htmlFor="country">Country:</label>
      <input
        id="country"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        aria-describedby="countryHelp"
      />
      <small id="countryHelp" className="form-text">
        Enter the country where the venue is located.
      </small>

      <label htmlFor="price">Price per night:</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        aria-describedby="priceHelp"
      />
      <small id="priceHelp" className="form-text">
        Enter the price per night.
      </small>

      <label htmlFor="maxGuests">Max guests:</label>
      <input
        id="maxGuests"
        type="number"
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
        required
        aria-describedby="maxGuestsHelp"
      />
      <small id="maxGuestsHelp" className="form-text">
        Enter the maximum number of guests.
      </small>

      <label htmlFor="rating">Rating:</label>
      <input
        id="rating"
        type="number"
        step="0.1"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        aria-describedby="ratingHelp"
      />
      <small id="ratingHelp" className="form-text">
        Enter the rating for the venue.
      </small>

      <label htmlFor="image">Image URL:</label>
      <input
        id="image"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        aria-describedby="imageHelp"
      />
      <small id="imageHelp" className="form-text">
        Enter the URL for the venue image.
      </small>

      <div className="amenities">
        <label>
          <input
            type="checkbox"
            checked={wifi}
            onChange={() => setWifi(!wifi)}
          />
          Wifi
        </label>
        <label>
          <input
            type="checkbox"
            checked={parking}
            onChange={() => setParking(!parking)}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            checked={breakfast}
            onChange={() => setBreakfast(!breakfast)}
          />
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            checked={pets}
            onChange={() => setPets(!pets)}
          />
          Pets allowed
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Venue"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

CreateVenueForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateVenueForm;
