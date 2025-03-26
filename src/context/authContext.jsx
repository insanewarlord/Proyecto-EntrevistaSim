import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import {
  verifyTokenRequest,
  LoginRequest,
  registerRequest,
  logoutRequest,
  deleteUserRequest,
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
  const [errorMesage, setErrorMesage] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const response = await verifyTokenRequest();
        if (response.data.error) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(response.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const signin = async (user) => {
    try {
      const response = await LoginRequest(user);
      console.log("Response from LoginRequest:", response);
      if (response.data.error) {
        setErrorMesage(response.data.message);
        setIsAuthenticated(false);
        return { error: true, message: response.data.message };
      }
      setUser(response.data);
      setIsAuthenticated(true);
      setErrorMesage(null);
      localStorage.setItem("token", response.data.tokenSession);
      return { error: false, message: "Inicio de sesión exitoso" };
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      setErrorMesage(errorMessage);
      return { error: true, message: errorMessage };
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

  const signout = async () => {
    try {
      await logoutRequest();
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Error 401: No autorizado. No se pudo cerrar sesión.");
      } else {
        console.error(
          "Error durante el cierre de sesión:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const deleteUser = async (user) => {
    try {
      await deleteUserRequest(user);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Error 401: No autorizado. No se pudo cerrar sesión.");
      } else {
        console.error(
          "Error durante la eliminación del usuario:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signin,
        signup,
        signout,
        deleteUser,
        errorMesage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
