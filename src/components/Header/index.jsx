import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/img/logo1.png";
import "./header.css";

const Header = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, authState } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="HEADER-CONTAINER">
      <div className="HEADER-CONTENT">
        <div className="MOBILE-MENU-WRAPPER">
          <div className="LOGO-WRAPPER">
            <Link to="/" className="LOGO-LINK">
              <img src={Logo} alt="Logo-link" />
            </Link>
          </div>
          <button
            className="HAMBURGER-BTN"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="HAMBURGER-ICON"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className={`MENU-CONTENT-WRAPPER ${isMenuOpen ? "OPEN" : ""}`}>
          <section className="SEARCH-WRAPPER">
            <input
              type="search"
              role="search"
              id="search"
              placeholder="Search for venues..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="SEARCHBAR"
            />
          </section>
          <nav className="NAVLINKS-WRAPPER">
            <Link to="/venues" className="NAVLINK_NAVIGATION">
              Venues
            </Link>
            {authState.isAuthenticated && (
              <>
                <Link to="/dashboard" className="NAVLINK_NAVIGATION">
                  Dashboard
                </Link>
              </>
            )}
            <Link to="/contact" className="NAVLINK_NAVIGATION">
              Contact
            </Link>
          </nav>
          {authState.isAuthenticated && (
            <div className="LOGOUT-WRAPPER">
              <button onClick={handleLogout} className="LOGOUT-BTN">
                Logout
              </button>
            </div>
          )}
          <section className="LOGIN-SIGNUP-WRAPPER">
            {!authState.isAuthenticated && (
              <>
                <div className="LOGIN">
                  <Link to="/login" className="LOGIN-BTN">
                    Login
                  </Link>
                </div>
                <div className="SIGNUP">
                  <Link to="/register" className="REGISTER-BTN">
                    Register
                  </Link>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </header>
  );
};

export default Header;
