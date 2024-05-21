import "./filters.css";

const Filters = ({ onSortChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const sortField = checked ? `meta.${name}` : "created";
    const sortOrder = checked ? "asc" : "desc";
    onSortChange(sortField, sortOrder);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split(":");
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
          {["wifi", "pets", "breakfast", "parking"].map((feature) => (
            <div key={feature} className="CHECKBOX-ITEM">
              <label className="CHECKBOX-LABEL">
                <input
                  type="checkbox"
                  name={feature}
                  onChange={handleCheckboxChange}
                />
                <span className="CHECKBOX-CUSTOM"></span>{" "}
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
