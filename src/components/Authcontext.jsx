// AuthProvider.jsx

import React, { createContext, useState, useEffect } from "react";
import { getCookie, deleteCookie } from "../utils/cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const accessToken = getCookie("accessToken");
      setIsLoggedIn(!!accessToken);

      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          setIsCreator(decodedToken.role === 2);
        } catch (error) {
          console.error("Error decoding JWT:", error);
          setIsCreator(false);
        }
      } else {
        setIsCreator(false);
      }
    };

    checkIsLoggedIn();

  }, [isLoggedIn]);

  const logout = () => {
    deleteCookie("accessToken");
    setIsLoggedIn(false);
    setIsCreator(false);
  };

  const updateIsCreator = (value) => {
    setIsCreator(value);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isCreator, setIsLoggedIn, logout, updateIsCreator }}
    >
      {children}
    </AuthContext.Provider>
  );
};
