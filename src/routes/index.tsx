import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('../pages/Home'))
const Dashboard = lazy(() => import('../pages/admin/Dashboard'))
const Login = lazy(() => import("../pages/auth/Login"));
const NotFound = lazy(() => import("../pages/notfound/NotFound"));
const LoadingSpinner = lazy(() => import("../components/loading/LoadingSpinner"));
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
const Register = lazy(() => import('../pages/auth/Register'));
import { ForgotPassword } from '../pages/auth/ForgotPassword';
const Social = lazy(() => import('../pages/web/Social'));
const DetailsAccount = lazy(() => import('../pages/user/DetailsAccount'));


const AppRoutes = () => {

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/social" element={<Social />} />
                </Route>

                {/* Rutas privadas */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<DetailsAccount />} />
                </Route>

                {/* Ruta para 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
   
}

export default AppRoutes;