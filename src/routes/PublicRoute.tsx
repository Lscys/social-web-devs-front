import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicRoute = () => {
    const { user, isAuthenticated, login, logout } = useAuth();

  // Si el usuario está autenticado, redirige al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;