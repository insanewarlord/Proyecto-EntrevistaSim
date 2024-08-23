import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import {
  verifyTokenRequest,
  LoginRequest,
  registerRequest,
} from "../api/auth.js";
import { useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  console.log("AuthContext value:", context);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      console.log("Cookies:", cookies);
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        console.error(
          "Error al verificar el token:",
          error.response ? error.response.data : error.message
        );
      }
    };
    checkLogin();
  }, []);

  const signin = async (user) => {
    try {
      const response = await LoginRequest(user);
      console.log("Response from LoginRequest:", response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Error durante el inicio de sesión:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log("Response from registerRequest:", response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Error durante el registro:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const signout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
