import { useAuth } from "../contexts/AuthContext";
import AvatarManagement from "../components/AvatarManagement/AvatarManagement";
import VenueManagement from "../components/VenueManagement/VenueManagement";
import CustomerBookings from "../components/CustomerBookings/CustomerBookings";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

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
      <section className="TOP-SECTION_DASHBOARD">
        <div className="avatar-section">
          <AvatarManagement />
        </div>
        <div className="INFO-SECTION">
          <h2 className="HEADER-INFO_DASHBOARD">Profile Information</h2>
          <div className="ROLE-WRAPPER_DASHBOARD">
          <p>{authState.isVenueManager ? 'Logged in as venuemanager' : 'Logged in as customer'}</p>
          </div>
          <p>{authState.user.name}</p>
          <p>
            {authState.user.email}
          </p>
        </div>
      </section>
      <div className="bookings-section">
        {authState.isVenueManager ? <VenueManagement /> : <CustomerBookings />}
      </div>
    </div>
  );
};

export default Dashboard;
