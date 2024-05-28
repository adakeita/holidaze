import FooterLogo from "../../assets/img/logo2.png";
import Github from "../../assets/logos/github-mark.png";
import LinkedIn from "../../assets/logos/LinkedIn-Blue-21@2x.png";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="FOOTER">
      <div className="FOOTER-CONTENT">
        <div className="DESKTOP-FLEX_FOOTER">
          <section className="FOOTER-CONTENT-LEFT">
            <div className="LOGO-WRAPPER_FOOTER">
              <img src={FooterLogo} alt="Footer Logo" className="LOGO_FOOTER" />
            </div>
            <div className="HEADER-WRAPPER_FOOTER">
              <h2 className="FOOTER-HEADER">Holidaze</h2>
              <div className="CONTACT-LINK-WRAPPER_FOOTER">
                <Link to="/contact" className="CONTACT-LINK_FOOTER">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
          <section className="FOOTER-CONTENT-MIDDLE">
            <ul className="LINKS-LIST_FOOTER">
              <li className="LINKS-LIST-ITEM_FOOTER">
                <Link to="/" className="LINK_FOOTER">
                  Home
                </Link>
              </li>
              <li className="LINKS-LIST-ITEM_FOOTER">
                <Link to="/about" className="LINK_FOOTER">
                  About
                </Link>
              </li>
              <li className="LINKS-LIST-ITEM_FOOTER">
                <Link to="/venues" className="LINK_FOOTER">
                  Venues
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <section className="FOOTER-CONTENT-RIGHT">
          <div className="SOCIAL-WRAPPER_FOOTER">
            <div className="SOCIAL-MEDIA-LINKS_FOOTER">
              <a
                href="https://github.com/adakeita"
                className="SOCIAL-MEDIA-LINK_FOOTER"
              >
                <img className="GITHUB" src={Github} alt="Github" />
              </a>
              <a
                href="https://www.linkedin.com/in/ada-mathilde-brakstad-keita-6828a122a/"
                className="SOCIAL-MEDIA-LINK_FOOTER"
              >
                <img className="LINKDIN" src={LinkedIn} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </section>
      </div>
      <section className="BOTTOM_FOOTER">
        <p className="COPYRIGHT_FOOTER">©Ada Keita 2024 .</p>
      </section>
    </footer>
  );
};

export default Footer;
