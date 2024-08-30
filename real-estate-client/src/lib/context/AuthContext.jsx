import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SecureStorageService from "../store/secure-store";
import { getStoredValue } from "../utils/custom";

export const AuthContext = createContext(undefined);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return getStoredValue("isLoggedIn", false);
  });

  const [role, setRole] = useState(() => {
    return getStoredValue("role", null);
  });

  const [image, setImage] = useState(() => {
    return getStoredValue("image", null);
  });

  const navigate = useNavigate();

  useEffect(() => {
    SecureStorageService.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (role) {
      SecureStorageService.setItem("role", role);
    } else {
      SecureStorageService.removeItem("role");
    }
  }, [role]);

  useEffect(() => {
    SecureStorageService.setItem("image", image);
  }, [image]);

  const login = (role, route) => {
    setIsLoggedIn(true);
    setRole(role);
    navigate(route);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(undefined);
    navigate("");
  };

  const setUserImage = (path) => {
    setImage(path);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, image, login, logout, setUserImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
