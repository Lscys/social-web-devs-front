import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../service/auth/auth.service';
import { Credential } from '../../service/interface/Credential';
import { useAuth } from '../../context/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const credentials: Credential = { email, password };

        try {
            await AuthService.login(credentials);

            const userData = await AuthService.me();
            setUser(userData);

            // Redirigir al usuario después del login exitoso
            navigate('/social');
        } catch (err) {
            console.error(err);
            setError('Credenciales inválidas o error de servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Bienvenido de nuevo</h2>
                <p className="text-center text-gray-500 mb-8">Inicia sesión para acceder a tu cuenta</p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="dev@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link to={"/register"}
                        className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </div>
            </div>
        </div>
    );
}
