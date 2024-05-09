import React from "react";
import "./filters.css";

const Filters = ({ onChange, onSortChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const [field, order] = value.split(":");
    onSortChange(field, order);
  };

  return (
    <div className="FILTER-CONTAINER">
      <h2 className="FILTER-HEADER">Filter</h2>
      <div className="FILTER-OPTIONS">
        <div className="SORT-WRAPPER">
          <select onChange={handleSortChange}>
            <option value="created:desc">Newest First</option>
            <option value="created:asc">Oldest First</option>
            <option value="price:asc">Price Low to High</option>
            <option value="price:desc">Price High to Low</option>
          </select>
        </div>
        <div className="FILTER-CHECKBOX-WRAPPER">
          <div className="CHECKBOX-ITEM">
            <label className="CHECKBOX-LABEL">
              <input
                className="CHECKBOX-INPUT"
                type="checkbox"
                name="wifi"
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
              />
              <span className="CHECKBOX-CUSTOM"></span> WiFi
            </label>
          </div>
          <div className="CHECKBOX-ITEM">
            <label className="CHECKBOX-LABEL">
              <input
                className="CHECKBOX-INPUT"
                type="checkbox"
                name="pets"
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
              />
              <span className="CHECKBOX-CUSTOM"></span> Pet Friendly
            </label>
          </div>
          
          <div className="CHECKBOX-ITEM">
            <label className="CHECKBOX-LABEL">
              <input
                className="CHECKBOX-INPUT"
                type="checkbox"
                name="breakfast"
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
              />
              <span className="CHECKBOX-CUSTOM"></span> Free Breakfast
            </label>
          </div>
          <div className="CHECKBOX-ITEM">
            <label className="CHECKBOX-LABEL">
              <input
                className="CHECKBOX-INPUT"
                type="checkbox"
                name="parking"
                onChange={handleCheckboxChange}
                style={{ display: "none" }}
              />
              <span className="CHECKBOX-CUSTOM"></span> Parking
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
