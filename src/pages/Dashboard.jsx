import { useAuth } from "../contexts/AuthContext";
import AvatarManagement from "../components/AvatarManagement/AvatarManagement";
import VenueManagement from "../components/VenueManagement/VenueManagement";
import CustomerBookings from "../components/CustomerBookings/CustomerBookings";

const Dashboard = () => {
  const { authState, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PAGE-CONTAINER">
      <h1>Dashboard</h1>
      {authState.isAuthenticated ? (
        <>
          <AvatarManagement />
          {authState.isVenueManager ? (
            <VenueManagement />
          ) : (
            <CustomerBookings />
          )}
        </>
      ) : (
        <p>Please log in to see this page.</p>
      )}
    </div>
  );
};

export default Dashboard;
