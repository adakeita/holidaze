import React, { useState } from "react";
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
      console.log("Venue created:", response);
      setLoading(false);
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error("Failed to create venue:", error.message);
      setMessage(`Failed to create venue: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <form className="create-venue-form" onSubmit={handleSubmit}>
      <h2>Create a New Venue</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Price per night:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Max guests:
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
        />
      </label>
      <label>
        Rating:
        <input
          type="number"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>
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
