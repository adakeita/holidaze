import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    apiKey: null,
    isVenueManager: false,
  };

  const [authState, setAuthState] = useState(() => {
    const storedAuthState = sessionStorage.getItem("authState");
    return storedAuthState ? JSON.parse(storedAuthState) : initialAuthState;
  });

  useEffect(() => {
    const storedAuthState = sessionStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  const register = async (userData) => {
    try {
      const { data } = await authService.registerUser(userData);
      // Debugging statement
      await login(userData.email, userData.password); // Log in after registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error; // Re-throw error
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await authService.login(email, password);
      const authData = {
        isAuthenticated: true,
        user: data,
        accessToken: data.accessToken,
        apiKey: data.apiKey,
        isVenueManager:
          data.venueManager !== undefined ? data.venueManager : false,
      };
      sessionStorage.setItem("authState", JSON.stringify(authData));
      setAuthState(authData);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error; // Re-throw error
    }
  };

  const logout = () => {
    sessionStorage.removeItem("authState");
    setAuthState(initialAuthState);
  };

  const updateUserInfo = (newUserInfo) => {
    const updatedState = {
      ...authState,
      user: { ...authState.user, ...newUserInfo },
    };
    sessionStorage.setItem("authState", JSON.stringify(updatedState));
    setAuthState(updatedState);
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, updateUserInfo, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
3;

export const useAuth = () => useContext(AuthContext);
