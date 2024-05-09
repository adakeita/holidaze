import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/svg/logoipsum.svg";
import "./header.css";

const Header = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, authState } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="HEADER-CONTAINER tw-py-4">
      <div className="HEADER-CONTENT">
        <div className="MOBILE-MENU-WRAPPER">
          <div className="LOGO-WRAPPER  sm:tw-w-full md:tw-w-2/1">
            <Link to="/" className="LOGO-LINK">
              <img src={Logo} alt="Logo-link" />
            </Link>
          </div>
          {/* Hamburger Button */}
          <button
            className="HAMBURGER-BTN sm:tw-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="HAMBURGER-ICON tw-h-9 tw-w-9 tw-items-center"
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

        {/* Screen size >= 640px && isMenuOpen*/}
        <div
          className={`MENU-CONTENT-WRAPPER sm:tw-py-0 ${
            isMenuOpen ? "tw-flex" : "tw-hidden sm:tw-flex"
          }`}
        >
          <section className="SEARCH-WRAPPER">
            <input
              type="search"
              role="search"
              id="search"
              placeholder="Search for venues..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="SEARCHBAR focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-logo-green focus:tw-border-transparent hover:tw-scale-105"
            />
          </section>
          {/* Navigation Links */}
          <nav className="NAVLINKS-WRAPPER">
            <Link
              to="/venues"
              className="NAVLINK_NAVIGATION "
            >
              Venues
            </Link>
            {authState.isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="NAVLINK_NAVIGATION "
                >
                  Dashboard
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="NAVLINK_NAVIGATION "
            >
              Contact
            </Link>
          </nav>
          {authState.isAuthenticated && (
            <div className="logout-wrapper">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
          <section className="LOGIN-SIGNUP-WRAPPER">
            {!authState.isAuthenticated && (
              <>
                <div className="LOGIN">
                  <Link
                    to="/login"
                    className="LOGIN-BTN w-1/3 p-2 rounded-md bg-white text-center ml-2 shadow-header transition-all ease-in-out text-logo-green-hover hover:scale-105 hover:border-logo-green hover:border-2 sm:mx-0 sm:w-1/4 sm:mb-0"
                  >
                    Login
                  </Link>
                </div>
                <div className="SIGNUP">
                  <Link
                    to="/register"
                    className="REGISTER-BTN w-1/3 p-2 rounded-md bg-white text-center ml-2 shadow-header transition-all ease-in-out text-logo-green-hover hover:scale-105 hover:border-logo-green hover:border-2 sm:mx-0 sm:w-1/4 sm:mb-0"
                  >
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
