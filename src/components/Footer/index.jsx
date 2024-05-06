const Footer = () => {
  return (
    <footer className="FOOTER">
      <div className="FOOTER-CONTENT">
        <section className="FOOTER-CONTENT-LEFT">
          <div className="LOGO-WRAPPER_FOOTER">
            <img
              src="https://via.placeholder.com/150"
              alt="Logo"
              className="LOGO_FOOTER"
            />
          </div>
          <p className="FOOTER-TEXT">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            blandit, sapien non aliquet lacinia, nunc nisl tincidunt nunc, nec
            fringilla mi nunc id nisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi.
          </p>
        </section>
        <div className="FOOTER-CONTENT-RIGHT">
          <h2 className="FOOTER-HEADER">Contact Us</h2>
          <p className="FOOTER-TEXT">1234 Main St.</p>
          <p className="FOOTER-TEXT">Springfield, IL 62701</p>
          <p className="FOOTER-TEXT">Phone: (555) 555-5555</p>
          <p className="FOOTER-TEXT">Email: </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
