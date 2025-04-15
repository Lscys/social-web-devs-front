import React, { lazy, Suspense } from 'react'
import App from '../App'


const Home = lazy(() => import('../pages/Home'))
const Dashboard = lazy(() => import('../pages/admin/Dashboard'))
const Login = lazy(() => import("../pages/auth/Login"));
const NotFound = lazy(() => import("../pages/notfound/NotFound"));
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { Post } from '../pages/web/Post';


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
                    <Route path="/social" element={<Post />} />
                </Route>

                {/* Rutas privadas */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* Ruta para 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
   
}

export default AppRoutes;