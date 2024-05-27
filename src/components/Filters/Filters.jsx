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
      </div>
    </div>
  );
};

export default Filters;
