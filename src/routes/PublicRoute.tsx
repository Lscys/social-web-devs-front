import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return null;

    // Si el usuario está logueado y está en "/", redirigirlo a /social
    if (isAuthenticated && location.pathname === "/login") {
        return <Navigate to="/social" replace />;
    }

  return <Outlet />;
};

export default PublicRoute;