import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Verifica roles si es necesario
    /* const hasAccess = true; // Lógica de permisos personalizada
    if (!hasAccess) {
        return <Navigate to="/unauthorized" replace />;
    } */

    return <Outlet />;
}

export default PrivateRoute;