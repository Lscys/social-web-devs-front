import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar, FaFilter, FaBell, FaUser, FaSearch } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../service/auth/auth.service";
import { useAuth } from "../context/useAuth";
import { Post } from "../service/post/Post";
import PostCard from "./PostCard";

export default function PostFeed() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Datos de ejemplo (en una app real vendrían de una API)
    useEffect(() => {
        // Simulamos una carga de datos
        const dummyPosts: Post[] = [
            {
                id: "1",
                authorName: "Pepito el Pensante",
                authorRole: "Full Stack Developer",
                title: "Iniciando el Proyecto de TODO LIST",
                description: "Este proyecto tratará sobre mejorar la gestión de mi día a día sobre las cosas que hago.",
                technologies: ["React", "TypeScript", "Node.js"],
                likes: 24,
                comments: 5,
                isStarred: false,
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                createdAt: "2 horas atrás"
            },
            {
                id: "2",
                authorName: "María Codeadora",
                authorRole: "Frontend Developer",
                title: "Nuevos hooks en React 18",
                description: "Comparto mi experiencia con los nuevos hooks introducidos en la última versión de React.",
                technologies: ["React", "JavaScript", "Hooks"],
                likes: 42,
                comments: 12,
                isStarred: true,
                createdAt: "5 horas atrás"
            },
            {
                id: "3",
                authorName: "Juan Desarrollador",
                authorRole: "Backend Engineer",
                title: "Optimizando consultas SQL",
                description: "Algunos tips para optimizar tus consultas SQL y mejorar el rendimiento de tu aplicación.",
                technologies: ["SQL", "PostgreSQL", "Optimización"],
                likes: 18,
                comments: 3,
                isStarred: false,
                imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                createdAt: "1 día atrás"
            }
        ];

        setTimeout(() => {
            setPosts(dummyPosts);
            setIsLoading(false);
        }, 1000); // Simulamos un delay de carga
    }, []);

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCreatePost = () => {
        // Lógica para crear un nuevo post
        console.log("Crear nuevo post");
    };

    const onLogout = () => {
        AuthService.logout();
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Topbar */}
            <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <div className="text-2xl font-bold">DEVS</div>
                <div className="flex gap-6 items-center">
                    <button className="flex items-center gap-1 border px-3 py-1 rounded-md hover:bg-gray-200">
                        <FaFilter /> Filter
                    </button>
                    <FaCommentDots className="text-2xl" />
                    <FaBell className="text-2xl" />
                    {/* <FaUser className="text-2xl" /> */}
                    <div className="relative" ref={menuRef}>
                        <FaUser
                            className="text-2xl cursor-pointer"
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    My Account
                                </button>
                                <button 
                                onClick={onLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Search & Create post */}
            <div className="mt-6 max-w-4xl mx-auto">
                <div className="flex justify-between mb-4">
                    <div className="relative w-2/3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border border-gray-300 rounded-md py-2 px-4"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button 
                    onClick={handleCreatePost}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        <MdOutlinePostAdd className="text-xl" />
                        Crear post
                    </button>
                </div>

                {/* Listado de Posts */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : posts.length > 0 ? (
                        posts.map(post => (
                            <PostCard
                                key={post.id}
                                id={post.id}
                                authorName={post.authorName}
                                authorRole={post.authorRole}
                                title={post.title}
                                description={post.description}
                                technologies={post.technologies}
                                likes={post.likes}
                                comments={post.comments}
                                isStarred={post.isStarred}
                                imageUrl={post.imageUrl}
                                createdAt={post.createdAt}
                            />
                        ))
                    ) : (
                        <div className="bg-white rounded-xl p-8 text-center">
                            <p className="text-gray-500">No hay posts disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}