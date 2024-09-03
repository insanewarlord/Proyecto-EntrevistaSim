import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Spinner from "./components/spinner";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};
