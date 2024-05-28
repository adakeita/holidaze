import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";
import "./registerform.css";

const RegisterForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@stud\.noroff\.no$/.test(formData.email)) {
      newErrors.email = "Email must end with @stud.noroff.no";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.avatarUrl && !/^https?:\/\/.+\..+/.test(formData.avatarUrl)) {
      newErrors.avatarUrl = "Avatar URL must be a valid URL";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const profileData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          venueManager: formData.venueManager,
          avatar: {
            url:
              formData.avatarUrl ||
              "https://images.unsplash.com/photo-1536164261511-3a17e671d380?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
            alt: formData.name,
          },
        };
        await register(profileData); // Use AuthContext
        setIsModalOpen(true);
        setTimeout(() => navigate("/dashboard"), 3000); // 3 seconds Redirect
      } catch (error) {
        console.error("Registration failed:", error);

        const apiErrors = error.response?.data?.errors || [];
        const newErrors = apiErrors.reduce((acc, apiError) => {
          if (apiError.path && apiError.path.length > 0) {
            apiError.path.forEach((path) => {
              acc[path] = apiError.message;
            });
          } else {
            acc.form =
              apiError.message || "Failed to register. Please try again.";
          }
          return acc;
        }, {});
        if (!newErrors.form) {
          newErrors.form =
            "Failed to register. Check the form and try again. The username or email might be taken.";
        }
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="REGISTER-FORM-CONTAINER">
      <h1>Register</h1>
      <p>Create an account to access all features.</p>
      <form onSubmit={handleSubmit}>
        <div className="FORM-ITEM_WRAPPER_REGISTER">
          <label className="FORM-LABEL_REGISTER" htmlFor="name">
            Name
          </label>
          <input
            className={`FORM-INPUT_REGISTER ${errors.name ? "invalid" : ""}`}
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="nameError"
          />
          {errors.name && (
            <span id="nameError" className="ERROR-MESSAGE_REGISTER">
              {errors.name}
            </span>
          )}
        </div>

        <div className="FORM-ITEM_WRAPPER_REGISTER">
          <label className="FORM-LABEL_REGISTER" htmlFor="email">
            Email
          </label>
          <input
            className={`FORM-INPUT_REGISTER ${errors.email ? "invalid" : ""}`}
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="emailError"
          />
          {errors.email && (
            <span id="emailError" className="ERROR-MESSAGE_REGISTER">
              {errors.email}
            </span>
          )}
        </div>

        <div className="FORM-ITEM_WRAPPER_REGISTER">
          <label className="FORM-LABEL_REGISTER" htmlFor="password">
            Password
          </label>
          <input
            className={`FORM-INPUT_REGISTER ${
              errors.password ? "invalid" : ""
            }`}
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="passwordError"
          />
          {errors.password && (
            <span id="passwordError" className="ERROR-MESSAGE_REGISTER">
              {errors.password}
            </span>
          )}
        </div>

        <div className="FORM-ITEM_WRAPPER_REGISTER">
          <label className="FORM-LABEL_REGISTER" htmlFor="avatarUrl">
            Avatar URL <span>(optional)</span>
          </label>
          <input
            className={`FORM-INPUT_REGISTER ${
              errors.avatarUrl ? "invalid" : ""
            }`}
            id="avatarUrl"
            type="url"
            name="avatarUrl"
            placeholder="Enter avatar URL"
            value={formData.avatarUrl}
            onChange={handleChange}
            aria-invalid={errors.avatarUrl ? "true" : "false"}
            aria-describedby="avatarUrlHelp"
          />
          {errors.avatarUrl && (
            <span id="avatarUrlError" className="ERROR-MESSAGE_REGISTER">
              {errors.avatarUrl}
            </span>
          )}
        </div>
        <div className="FORM-ITEM_WRAPPER_REGISTER MANAGER-WRAPPER_REGISTER">
          <label
            className="FORM-LABEL_REGISTER MANAGER_REGISTER"
            htmlFor="venueManager"
          >
            Register as Venue Manager
          </label>
          <input
            className="FORM-INPUT_REGISTER MANAGER_INPUT"
            id="venueManager"
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
          />
        </div>

        <div className="SEND-BTN-WRAPPER_REGISTER">
          <button type="submit" className="SEND-BTN_REGISTER">
            Register
          </button>
        </div>

        <div className="ERROR-CONTAINER_REGISTER">
          {errors.form && (
            <span className="GENERAL-ERROR-MESSAGE_REGISTER">
              {errors.form}
            </span>
          )}
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registration Successful"
      >
        <p className="SUCCESS-MSG_REGISTER">
          Registration successful!
          <br />
          Redirecting to your dashboard...
        </p>
        <div className="CLOSE-BTN-WRAPPER_REGISTER">
          <button
            onClick={() => setIsModalOpen(false)}
            className="CLOSE-BTN_REGISTER"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterForm;
