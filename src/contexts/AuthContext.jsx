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

  // This useEffect should only run once when the component mounts
  useEffect(() => {
    const storedAuthState = sessionStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  const register = async (userData) => {
    try {
      const { data } = await authService.registerUser(userData);
      console.log("Registration successful:", data);
      await login(userData.email, userData.password); // Automatically log in after registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error; // Re-throw the error to be caught in the form
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
        isVenueManager: data.venueManager || false,
      };
      sessionStorage.setItem("authState", JSON.stringify(authData));
      setAuthState(authData);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error; // Re-throw the error to be caught in the form
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

export const useAuth = () => useContext(AuthContext);
