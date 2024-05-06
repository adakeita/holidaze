import { useState, useContext } from "react";
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
    <header className="HEADER-CONTAINER py-4">
      <div className="HEADER-CONTENT  sm:flex-row">
        <div className="MOBILE-MENU-WRAPPER sm:w-1/6">
          <div className="LOGO-WRAPPER  sm:w-full md:w-2/1">
            <Link to="/" className="LOGO-LINK">
              <img src={Logo} alt="Logo-link" />
            </Link>
          </div>
          {/* Hamburger Button */}
          <button
            className="HAMBURGER-BTN sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="HAMBURGER-ICON h-9 w-9 items-center"
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
          className={`MENU-CONTENT-WRAPPER sm:py-0 sm:w-full sm:flex-row sm:items-center sm:justify-between ${
            isMenuOpen ? "flex" : "hidden sm:flex"
          }`}
        >
          <section className="SEARCH-WRAPPER  sm:w-2/5 sm:py-2 sm:mb-0 sm:max-w-search-cart-max sm:justify-between md:max-w-lg-search-cart-max">
            <input
              type="search"
              role="search"
              id="search"
              placeholder="Search for venues..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="SEARCHBAR p-2 border
                bg-white border-gray-300 rounded-lg flex justify-center w-full sm:w-10/12 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-logo-green text-gray-800 italic focus:border-transparent transition-all ease-in-out duration-300 shadow-search hover:scale-105"
            />
          </section>
          {/* Navigation Links */}
          <nav className="NAVLINKS-WRAPPER flex justify-start text-md font-semibold flex-col sm:flex-row w-11/12 mx-auto sm:mx-0 my-2 sm:w-2/5 sm:justify-around ">
            <Link
              to="/venues"
              className="NAVLINK_HEADER flex justify-center w-1/3 p-2 rounded-md  bg-white 
              text-center ml-2 sm:mx-0 shadow-header
              transition-all ease-in-out text-logo-green-hover hover:scale-105 
              hover:border-logo-green hover:border-2 sm:mb-0 lg:w-1/3 "
            >
              Venues
            </Link>
            {authState.isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="NAVLINK_HEADER flex justify-center p-2 rounded-md  bg-white 
              text-center ml-2 sm:mx-0 shadow-header
              transition-all ease-in-out text-logo-green-hover hover:scale-105 
              hover:border-logo-green hover:border-2 sm:mb-0 sm:w-1/4"
                >
                  Dashboard
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="NAVLINK_HEADER flex justify-center w-1/4 p-2 rounded-md  bg-white 
              text-center ml-2 shadow-header transition-all ease-in-out  text-logo-green-hover hover:scale-105 
              hover:border-logo-green hover:border-2 sm:mx-0 sm:w-1/4
              sm:mb-0"
            >
              Contact
            </Link>
          </nav>
          {authState.isAuthenticated && (
            <div className="logout-wrapper sm:w-1/5 flex">
              <button onClick={handleLogout} className="logout-btn w-full">
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
