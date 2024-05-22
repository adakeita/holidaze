import { useAuth } from "../contexts/AuthContext";
import AvatarManagement from "../components/AvatarManagement/AvatarManagement";
import VenueManagement from "../components/VenueManagement/VenueManagement";
import CustomerBookings from "../components/CustomerBookings/CustomerBookings";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const { authState, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    return (
      <div className="PAGE-CONTAINER">
        <h1>Dashboard</h1>
        <p>
          You need to be logged in to access the dashboard. Redirecting to login
        </p>
      </div>
    );
  }

  const userTitle = authState.isVenueManager ? "Venue Manager" : "Adventurer";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="user-title">{userTitle}</p>
      </header>
      <div className="avatar-section">
        <AvatarManagement />
      </div>
      <div className="bookings-section">
        {authState.isVenueManager ? <VenueManagement /> : <CustomerBookings />}
      </div>
    </div>
  );
};

export default Dashboard;
