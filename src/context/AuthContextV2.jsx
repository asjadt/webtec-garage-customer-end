// ===========================================
// #00101
// ===========================================

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import CustomPopup from "../components/CustomPopup";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
    Swal.fire({
      title: "Sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout!",
      customClass: {
        title: "text-primary",
        container: "",
        popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
        icon: "text-red-500",
        cancelButton: "bg-green-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user_data");
        setIsLoading(false);
      }
    });
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

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });

  // HANDLER FOR CLOSE POPUP
  const handleClosePopup = (e) => {
    setPopupOption({
      open: false,
      type: "",
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      overlayStyle: { background: "red" },
      closeOnDocumentClick: false,
    });
  };

  // HANDLER OPEN LOGIN POPUP
  const handleOpenLoginPopup = (e) => {
    setPopupOption({
      open: true,
      type: "login",
      title: "Login",
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      overlayStyle: { background: "red" },
      closeOnDocumentClick: false,
    });
  };

  // HANDLER OPEN SIGN UP POPUP
  const handleOpenSignUpPopup = (e) => {
    setPopupOption({
      open: true,
      type: "register",
      title: "Register",
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      overlayStyle: { background: "red" },
      closeOnDocumentClick: false,
    });
  };

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
        handleClosePopup,
        handleOpenLoginPopup,
        handleOpenSignUpPopup,
      }}
    >
      <CustomPopup
        popupClasses={
          popupOption?.type === "register"
            ? `w-full sm:w-[80vw] md:w-[90vw] lg:w-[80vw]`
            : `w-full sm:w-[70vw] md:w-[70vw] lg:w-[50vw]`
        }
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "login" && <Login />}
            {popupOption?.type === "register" && <Register />}
          </>
        }
      />
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

    handleClosePopup,
    handleOpenLoginPopup,
    handleOpenSignUpPopup,
  } = useContext(AuthContext);

  return {
    isLoading,
    setIsLoading,

    isAuthenticated,
    setIsAuthenticated,

    user,
    setUser,

    logout,

    handleClosePopup,
    handleOpenLoginPopup,
    handleOpenSignUpPopup,
  };
};
