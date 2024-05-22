import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [error, setError] = useState(""); // State to manage error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "venueManager" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message
    try {
      await register(formData); // Use the register function from AuthContext
      navigate("/"); // Navigate to the home page or another protected route after successful registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      if (error.message.includes("Profile already exists")) {
        setError("Profile already exists");
      } else {
        setError("Failed to register. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Register as Venue Manager:
        <input
          type="checkbox"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
