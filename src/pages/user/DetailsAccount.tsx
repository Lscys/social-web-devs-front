import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { AuthService } from '../../service/auth/auth.service';
import { Link } from 'react-router-dom';

export default function DetailsAccount() {

    // Datos del usuario que pueden venir del contexto o backend
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    
    const handleSave = () => {
        // lógica para guardar cambios
        console.log({ name, lastName, username, phone });
      };
    
      const handlePasswordChange = () => {
        // lógica para cambiar la contraseña
        console.log("Cambiar password:", password);
      };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <Link to={"/social"} className="text-blue-600 font-semibold">&larr; Volver</Link>
                <h1 className="text-xl font-bold">Detalle de tu cuenta</h1>
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center border p-4 rounded-lg">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-600">
                            👤
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-blue-500 text-white px-3 py-1 text-xs rounded-full hover:bg-blue-600">
                            Cambiar foto
                        </button>
                    </div>
                    <p className="mt-4 font-medium text-lg">{name} {lastName}</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">{user?.name}</label>
                            <input
                                type="text"
                                value={user?.name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">{user?.last_name}</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-600">{user?.phone}</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">{user?.usuario}</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                </div>
            </div>

            {/* Sección contraseña */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md self-center space-y-4">
                <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="text-sm text-gray-600">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <button
                    onClick={handlePasswordChange}
                    className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-black"
                >
                    Cambiar password
                </button>
            </div>
        </div>
    )
}
