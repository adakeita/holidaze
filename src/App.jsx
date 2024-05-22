import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContexts";

function App({ children }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <Layout>
          <main className="MAIN">{children}</main>
        </Layout>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
