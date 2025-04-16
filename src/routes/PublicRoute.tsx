import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicRoute = () => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    // Si el usuario está logueado y está en "/", redirigirlo a /social
    if (isAuthenticated && location.pathname === "/login") {
        return <Navigate to="/social" replace />;
    }

  return <Outlet />;
};

export default PublicRoute;