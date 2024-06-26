import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./loginform.css";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setGeneralError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="LOGINFORM-CONTAINER">
      <form onSubmit={handleSubmit} className="LOGINFORM" noValidate>
        <div className="HEADER-WRAPPER_LOGINFORM">
          <h2 className="HEADER_LOGINFORM">Login</h2>
        </div>
        <section className="INPUT-SECTION_LOGINFORM">
          <div className="FORMFIELD_LOGINFORM">
            <label htmlFor="email" className="LABEL_LOGINFORM">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`INPUT_LOGINFORM ${emailError ? "invalid" : ""}`}
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby="emailError"
            />
            {emailError && (
              <p id="emailError" className="ERROR_MSG">
                {emailError}
              </p>
            )}
          </div>
          <div className="FORMFIELD_LOGINFORM">
            <label htmlFor="password" className="LABEL_LOGINFORM">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`INPUT_LOGINFORM ${passwordError ? "invalid" : ""}`}
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby="passwordError"
            />
            {passwordError && (
              <p id="passwordError" className="ERROR_MSG">
                {passwordError}
              </p>
            )}
          </div>
        </section>
        <button type="submit" className="SUBMIT-BTN_LOGINFORM">
          Login
        </button>
        {generalError && <p className="GENERAL-ERROR_MSG">{generalError}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
