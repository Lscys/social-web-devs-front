import { useState } from "react";
import { RegisterCredential } from "../../service/interface/Credential";
import { AuthService } from "../../service/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [nameFull, setNameFull] = useState("");
    const [lastnameFull, setLastNameFull] = useState("");
    const [email, setEmail] = useState("");
    /* const [role, setRole] = useState("frontend"); */
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !nameFull || !lastnameFull) {
            setError('Todos los campos son obligatorios');
            return;
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor ingresa un email válido');
            return;
        }

        setLoading(true);
        setError(null);

        const registerCredential: RegisterCredential = { email, password, name: nameFull, last_name: lastnameFull };

        try {
            const response = await AuthService.register(registerCredential);

            alert('Registro exitoso! Redirigiendo al login...');

            console.log("Registrando:", registerCredential);
            // Redirigir al usuario después del login exitoso
            navigate('/login');
        } catch (err: any) {
            console.error("Error en registro:", err);
            setError(err.message || 'Error durante el registro. Por favor intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Crea tu cuenta</h2>
                <p className="text-center text-gray-500 mb-8">Únete a proyectos o crea los tuyos</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombres completos</label>
                        <input
                            type="text"
                            required
                            value={nameFull}
                            onChange={(e) => setNameFull(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Juan Dev"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos completo</label>
                        <input
                            type="text"
                            required
                            value={lastnameFull}
                            onChange={(e) => setLastNameFull(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Juan Dev"
                        />
                    </div>

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

                    {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol principal</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="mobile">Mobile</option>
              <option value="devops">DevOps</option>
            </select>
          </div> */}

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
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Registrarse
                    </button>
                </form>

                <div className="text-center mt-6 text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Inicia sesión
                    </a>
                </div>
            </div>
        </div>
    );
}
