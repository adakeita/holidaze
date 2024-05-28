import { useState } from "react";
import PropTypes from "prop-types";
import "./updatevenueform.css";

const UpdateVenueForm = ({ venue, onSave, onCancel }) => {
  const [name, setName] = useState(venue.name);
  const [description, setDescription] = useState(venue.description);
  const [address, setAddress] = useState(venue.location.address || "");
  const [city, setCity] = useState(venue.location.city || "");
  const [country, setCountry] = useState(venue.location.country || "");
  const [price, setPrice] = useState(venue.price);
  const [maxGuests, setMaxGuests] = useState(venue.maxGuests);
  const [rating, setRating] = useState(venue.rating);
  const [wifi, setWifi] = useState(venue.meta.wifi);
  const [parking, setParking] = useState(venue.meta.parking);
  const [breakfast, setBreakfast] = useState(venue.meta.breakfast);
  const [pets, setPets] = useState(venue.meta.pets);
  const [image, setImage] = useState(venue.media[0]?.url || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedVenue = {
      ...venue,
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
      await onSave(updatedVenue);
      setMessage("Venue updated successfully!");
      setLoading(false);
      onCancel(); // Close modal
    } catch (error) {
      console.error("Failed to update venue:", error.message);
      setMessage(`Failed to update venue: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <form className="update-venue-form" onSubmit={handleSubmit}>
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
        {loading ? "Updating..." : "Update Venue"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

UpdateVenueForm.propTypes = {
  venue: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UpdateVenueForm;

