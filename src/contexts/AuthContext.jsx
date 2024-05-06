import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAuthState = JSON.parse(localStorage.getItem("authState"));
  const initialAuthState = storedAuthState || {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    apiKey: null,
    isVenueManager: false,
  };

  const [authState, setAuthState] = useState(initialAuthState);

  const register = async (name, email, password) => {
    try {
      const { data } = await authService.register(name, email, password);
      const authData = {
        isAuthenticated: true,
        user: data,
        accessToken: data.accessToken,
        apiKey: data.apiKey,
        isVenueManager: data.venueManager || false,
      };
      localStorage.setItem("authState", JSON.stringify(authData));
      setAuthState(authData);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setAuthState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        apiKey: null,
        isVenueManager: false,
      });
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
      localStorage.setItem("authState", JSON.stringify(authData));
      setAuthState(authData);
    } catch (error) {
      console.error("Login failed:", error.message);
      setAuthState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        apiKey: null,
        isVenueManager: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("authState");
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      apiKey: null,
      isVenueManager: false,
    });
  };

  const updateUserInfo = (newUserInfo) => {
    const updatedState = {
      ...authState,
      user: { ...authState.user, ...newUserInfo },
    };
    localStorage.setItem("authState", JSON.stringify(updatedState));
    setAuthState(updatedState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateUserInfo, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
