import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContexts";
import { VenueProvider } from "./contexts/VenueContext";

function App({ children }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <VenueProvider>
          <Layout>
            <main className="MAIN">{children}</main>
          </Layout>
        </VenueProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
