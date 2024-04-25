import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/svg/logoipsum.svg";

const Header = ({ onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="HEADER-CONTAINER bg-white py-4">
      <div className="HEADER-CONTENT flex flex-col sm:flex-row items-center justify-between w-11/12 mx-auto">
        <div className="LOGO-MENU-BTN-WRAPPER flex justify-center sm:w-1/6">
          <div className="LOGO-WRAPPER w-1/3 sm:w-full md:w-2/1">
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
          className={`MENU-CONTENT-WRAPPER py-4 sm:py-0 sm:w-full flex-col sm:flex-row sm:items-center sm:justify-between ${
            isMenuOpen ? "flex" : "hidden sm:flex"
          } w-full sm:w-auto`}
        >
          <section className="SEARCH-WRAPPER h-full flex flex-row w-full sm:w-2/5 justify-around items-center py-2 sm:py-2 mb-4 sm:mb-0 transition-all ease-in-out sm:max-w-search-cart-max sm:justify-between md:max-w-lg-search-cart-max">
            <div className="SEARCHBAR-WRAPPER flex w-3/5 sm:w-full justify-center">
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="SEARCHBAR p-2 border
                bg-white border-gray-300 rounded-lg flex justify-center w-full sm:w-10/12 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-logo-green text-gray-800 italic focus:border-transparent transition-all ease-in-out duration-300 shadow-search hover:scale-105"
              />
            </div>
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
            <Link
              to="/dashboard"
              className="NAVLINK_HEADER flex justify-center p-2 rounded-md  bg-white 
              text-center ml-2 sm:mx-0 shadow-header
              transition-all ease-in-out text-logo-green-hover hover:scale-105 
              hover:border-logo-green hover:border-2 sm:mb-0 sm:w-1/4"
            >
              Dashboard
            </Link>
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
          <div className="logout-wrapper sm:w-1/5 flex">
            <button className="logout-btn w-full">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
