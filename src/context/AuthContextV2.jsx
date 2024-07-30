// ===========================================
// #00101
// ===========================================

import React, { createContext, useContext, useEffect, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;
    }
  }, [user]);

  const logout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user_data");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem("user_data")) {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      setUser(userData);
      setIsAuthenticated(true);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData?.token}`;
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,

        isAuthenticated,
        setIsAuthenticated,

        user,
        setUser,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {
    isLoading,
    setIsLoading,

    isAuthenticated,
    setIsAuthenticated,

    user,
    setUser,

    logout,
  } = useContext(AuthContext);

  return {
    isLoading,
    setIsLoading,

    isAuthenticated,
    setIsAuthenticated,

    user,
    setUser,

    logout,
  };
};
