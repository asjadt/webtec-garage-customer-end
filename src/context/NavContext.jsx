// ===========================================
// #00102
// ===========================================

import React, { createContext, useContext, useState } from "react";

// Create the authentication context
export const NavContext = createContext();

// Create the authentication provider component
export const NavProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const { isNavOpen, setIsNavOpen } = useContext(NavContext);
  const [isDark, setIsDark] = useState(false);
  return {
    isNavOpen,
    setIsNavOpen,
    isDark,
    setIsDark,
  };
};
