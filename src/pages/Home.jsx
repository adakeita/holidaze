import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchLatestUniqueVenues } from "../services/venueService";
import { useAuth } from "../contexts/AuthContext";
import CreateVenueForm from "../components/CreateVenueForm/CreateVenueForm";
import FloatingBtn from "../components/FloatingBtn/FloatingBtn";
import Modal from "../components/Modal/Modal";
import Mainimg from "../assets/img/home-img.png";
import View from "../assets/img/view.png";
import Register from "../assets/svg/signup.svg";
import Browse from "../assets/svg/browse.svg";
import Book from "../assets/svg/booking.svg";
import Arrow from "../assets/svg/home-arrow.svg";
import Directions from "../assets/svg/reload-arrows.svg";
import Add from "../assets/svg/add.svg";
import Guest from "../assets/svg/guest.svg";
import Crowd from "../assets/img/crowd.png";
import "../styles/homestyles.css";

function Home() {
  const navigate = useNavigate();
  const [latestUniqueVenues, setLatestUniqueVenues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authState } = useAuth();

  useEffect(() => {
    const loadLatestUniqueVenues = async () => {
      try {
        const venues = await fetchLatestUniqueVenues();
        setLatestUniqueVenues(venues);
      } catch (error) {
        console.error("Failed to load latest unique venues:", error);
      }
    };

    loadLatestUniqueVenues();
  }, []);

  const handleNavigate = () => {
    navigate("/venues");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="HOMEPAGE">
      <div className="HERO-WRAPPER_HOME">
        <img className="HERO-IMG" src={Mainimg} alt="home main image" />
        <div className="HERO-HEADER_HOME">
          <h1 className="HERO-TEXT_HOME">Holidaze</h1>
        </div>
      </div>
      <div className="PAGE-CONTAINER">
        <section className="TOP-SECTION-WRAPPER">
          <div className="TOP-SECTION-TEXT-WRAPPER">
            <p className="TOP-SECTION_TEXT">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              deleniti distinctio quam culpa! Id, a! Repudiandae, maxime quam ea
              sunt est libero inventore quod at repellat dolorum eos quas quasi.
            </p>
          </div>
          <div className="TOP-IMG-WRAPPER">
            <div className="POLAROID">
              <img
                src={View}
                alt="people looking at mountain view"
                className="IMG_TOP-SECTION"
              />
              <div className="POLAROID-TEXT">
                Looking at the Mountain View 2023
              </div>
            </div>
          </div>
        </section>
        <section className="CUSTOMER-SECTION-WRAPPER">
          <div className="CUSTOMER-SECTION-HEADER">
            <h2 className="CUSTOMER-HEADER">Book your next adventure</h2>
            <p className="CUSTOMER-HEADER-TEXT">
              Booking your next holiday home has never been easier. Follow these
              simple steps to get started.
            </p>
          </div>
          <div className="CUSTOMER-SECTION-STEPS">
            <Link to="/register" className="STEP-LINK">
              <div className="REGISTER-WRAPPER_HOME">
                <img src={Register} alt="register" className="REGISTER-IMG" />
                <p className="TEXT-STEPS_CUSTOMER">Register</p>
              </div>
            </Link>
            <div className="ARROW-WRAPPER">
              <img
                src={Directions}
                alt="circle arrow icon"
                className="ARROW-IMG"
              />
            </div>
            <Link to="/venues" className="STEP-LINK">
              <div className="BROWSE-WRAPPER">
                <img src={Browse} alt="browse icon" className="BROWSE-IMG" />
                <p className="TEXT-STEPS_CUSTOMER">Browse</p>
              </div>
            </Link>
            <div className="ARROW-WRAPPER">
              <img src={Arrow} alt="arrow icon" className="ARROW-IMG" />
            </div>
            <div className="BOOK-WRAPPER NOT-BTN_HOME">
              <img src={Book} alt="book" className="BOOK-IMG" />
              <p className="TEXT-STEPS_CUSTOMER">Book</p>
            </div>
          </div>
        </section>
        <section className="MIDDLE-SECTION-WRAPPER">
          <div className="MIDDLE-IMG-WRAPPER">
            <div className="POLAROID">
              <img
                src={Crowd}
                alt="friends toasting at a table outside"
                className="IMG_MIDDLE-SECTION"
              />
              <div className="POLAROID-TEXT">Toast To Friendships 2019</div>
            </div>
          </div>
          <div className="MIDDLE-SECTION-TEXT">
            <p className="MIDDLE-TEXT">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              deleniti distinctio quam culpa! Id, a! Repudiandae, maxime quam ea
              sunt est libero inventore quod at repellat dolorum eos quas quasi.
            </p>
          </div>
        </section>
        <section className="VIEW-VENUES-SECTION">
          <div className="VIEW-VENUES-HEADER">
            <h2 className="VENUES-HEADER_HOME">View our venues</h2>
            <p className="VENUES-HEADER-TEXT">
              Browse through our selection of holiday homes and find the perfect
              venue for your next holiday.
            </p>
          </div>
          {/* Animated Btn */}
          <div className="VIEW-VENUES-BUTTON-WRAPPER">
            <Link to="/venues" className="VIEW-VENUES-BUTTON">
              {latestUniqueVenues &&
                latestUniqueVenues.map((venue, index) => (
                  <img
                    key={index}
                    src={
                      venue.media && venue.media.length > 0
                        ? venue.media[0].url
                        : "fallback-image-url"
                    } // !img = fallback
                    alt={venue.name}
                    className="VIEW-VENUES-IMAGE"
                    style={{ animationDelay: `${index * 4}s` }}
                  />
                ))}
              <div className="VIEW-VENUES-TEXT">Go to venues</div>
            </Link>
          </div>
        </section>
        <section className="VENUE-SECTION-WRAPPER">
          <div className="VENUE-SECTION-HEADER">
            <h2 className="VENUE-HEADER">List your holiday venue</h2>
            <p className="VENUE-HEADER-TEXT">
              Do you want to rent out your holiday home? List your venue with us
              and let guests find you.
            </p>
          </div>
          <div className="VENUE-STEPS-WRAPPER">
            <div className="REGISTER-WRAPPER_HOME">
              <img
                src={Register}
                alt="register icon"
                className="IMG_VENUE-SECTION"
              />
              <p className="TEXT-STEPS_CUSTOMER">Register</p>
            </div>
            <div className="ARROW-WRAPPER">
              <img src={Arrow} alt="arrow icon" className="ARROW-IMG" />
            </div>
            <div className="ADD-WRAPPER_VENUE-SECTION NOT-BTN_HOME">
              <img
                src={Add}
                alt="add venue icon"
                className="IMG_VENUE-SECTION"
              />
              <p className="TEXT-STEPS_CUSTOMER">List</p>
            </div>
            <div className="ARROW-WRAPPER">
              <img src={Arrow} alt="arrow icon" className="ARROW-IMG" />
            </div>
            <div className="WAIT-WRAPPER_VENUE-SECTION NOT-BTN_HOME">
              <img src={Guest} alt="guest icon" className="IMG_VENUE-SECTION" />
              <p className="TEXT-STEPS_CUSTOMER">Greet</p>
            </div>
          </div>
        </section>
        {authState.isVenueManager && <FloatingBtn onClick={openModal} />}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Create a New Venue"
        >
          <CreateVenueForm onClose={closeModal} />
        </Modal>
      </div>
    </div>
  );
}

export default Home;
