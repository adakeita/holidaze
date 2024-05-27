import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import "./contactform.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 20) {
      newErrors.message = "Message must be at least 20 characters long";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="CONTACT-FORM-CONTAINER">
      <h1>Contact Us</h1>
      <p>Please use the form below to contact us. Thank you!</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="FORM-ITEM_WRAPPER_CONTACT">
          <label className="FORM-LABEL_CONTACT" htmlFor="name">
            Name
          </label>
          <input
            className={`FORM-INPUT_CONTACT ${errors.name ? "invalid" : ""}`}
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
            <span id="nameError" className="ERROR-MESSAGE_CONTACT">
              {errors.name}
            </span>
          )}
        </div>

        <div className="FORM-ITEM_WRAPPER_CONTACT">
          <label className="FORM-LABEL_CONTACT" htmlFor="email">
            Email
          </label>
          <input
            className={`FORM-INPUT_CONTACT ${errors.email ? "invalid" : ""}`}
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
            <span id="emailError" className="ERROR-MESSAGE_CONTACT">
              {errors.email}
            </span>
          )}
        </div>

        <div className="FORM-ITEM_WRAPPER_CONTACT">
          <label className="FORM-LABEL_CONTACT" htmlFor="subject">
            Subject
          </label>
          <select
            className={`FORM-SELECT_CONTACT ${errors.subject ? "invalid" : ""}`}
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby="subjectError"
          >
            <option className="FORM-OPTION_CONTACT" value="">
              Select a subject
            </option>
            <option className="FORM-OPTION_CONTACT" value="booking issue">
              Bookings
            </option>
            <option className="FORM-OPTION_CONTACT" value="billing issue">
              Billing
            </option>
            <option className="FORM-OPTION_CONTACT" value="technical issue">
              Technical Issue
            </option>
            <option className="FORM-OPTION_CONTACT" value="feedback">
              Feedback
            </option>
            <option className="FORM-OPTION_CONTACT" value="other">
              Other
            </option>
          </select>
          {errors.subject && (
            <span id="subjectError" className="ERROR-MESSAGE_CONTACT">
              {errors.subject}
            </span>
          )}
        </div>

        <div className="FORM-ITEM_WRAPPER_CONTACT">
          <label className="FORM-LABEL_CONTACT" htmlFor="message">
            Message
          </label>
          <textarea
            className={`FORM-TEXTAREA_CONTACT ${
              errors.message ? "invalid" : ""
            }`}
            id="message"
            name="message"
            placeholder="Enter your message, must be at least 20 characters long"
            value={formData.message}
            onChange={handleChange}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby="messageError"
          ></textarea>
          {errors.message && (
            <span id="messageError" className="ERROR-MESSAGE_CONTACT">
              {errors.message}
            </span>
          )}
        </div>
        <div className="SEND-BTN-WRAPPER_CONTACT">
          <button type="submit" className="SEND-BTN_CONTACT">
            Send Message
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Message Sent"
      >
        <p className="SUCCESS-MSG_CONTACT">
          Your message has been sent.
          <br />
          We will get back to you as soon as possible.
          <br />
          <br />
          Thank you for reaching out! :)
        </p>
        <div className="CLOSE-BTN-WRAPPER_CONTACT">
          <button onClick={handleCloseModal} className="CLOSE-BTN_CONTACT">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

ContactForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default ContactForm;
