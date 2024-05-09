import Loading from "../../assets/svg/loading.svg";
import "./loadingspinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <img src={Loading} alt="Loading" />
    </div>
  );
};

export default LoadingSpinner;
