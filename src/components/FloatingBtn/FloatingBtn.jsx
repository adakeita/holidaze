import React from "react";
import PropTypes from "prop-types";
import "./floatingbtn.css";
import Add from "../../assets/svg/add.svg";

const FloatingBtn = ({ onClick }) => {
  return (
    <div className="floating-btn">
      <button className="create-btn" onClick={onClick}>
        <img src={Add} alt="add" />
      </button>
    </div>
  );
};

FloatingBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FloatingBtn;
