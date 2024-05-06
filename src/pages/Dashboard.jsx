import { useAuth } from "../contexts/AuthContext";
import AvatarManagement from "../components/AvatarManagement/AvatarManagement";
import VenueManagement from "../components/VenueManagement/VenueManagement";
import CustomerBookings from "../components/CustomerBookings/CustomerBookings";
import { useNavigate } from "react-router-dom";

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
        <p>You need to be logged in to access the dashboard. Rediredicting to login</p>
      </div>
    );
  }

  return (
    <div className="PAGE-CONTAINER">
      <h1>Dashboard</h1>
      <AvatarManagement />
      {authState.isVenueManager ? <VenueManagement /> : <CustomerBookings />}
    </div>
  );
};

export default Dashboard;
