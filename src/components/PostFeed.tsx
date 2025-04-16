import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar, FaFilter, FaBell, FaUser, FaSearch } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { AuthService } from "../service/auth/auth.service";
import { useAuth } from "../context/useAuth";
import { Post } from "../service/interface/Post";
import PostCard from "./PostCard";
import { PostService } from "../service/post/post.service";

export default function PostFeed() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulamos una carga de datos
        const dummyPosts: Post[] = [
            {
                id: 1,
                title: "Iniciando el Proyecto de TODO LIST",
                description: "Este proyecto tratará sobre mejorar la gestión de mi día a día sobre las cosas que hago.",
                technologies: [
                    {
                        idtech: 1,
                        name: "React",
                        image: "https://reactjs.org/logo-og.png"
                    },
                    {
                        idtech: 2,
                        name: "TypeScript",
                        image: "https://www.typescriptlang.org/assets/images/icons/apple-touch-icon-120x120.png"
                    },
                    {
                        idtech: 3,
                        name: "Node.js",
                        image: "https://nodejs.org/static/images/logo.svg"
                    }
                ],
                user: {
                    iduser: 1,
                    name: "hola",
                    last_name: "hola2",
                    email: "hola@gmail.com",
                    phone: "222111333",
                    image: "holaimage",
                    usuario: "Holausuario"
                },
                postStats:
                {
                    id: 1,
                    likesCount: 20,
                    imageUrl: "urlimagen",
                    starred: true
                }
                ,
                comments: [
                    {
                        id: 1,
                        content: "¡Qué buen proyecto! Me interesa seguir el avance.",
                        createdAt: "1 hora atrás"
                    },
                    {
                        id: 2,
                        content: "Me gustaría aportar con ideas para el diseño.",
                        createdAt: "30 minutos atrás"
                    }
                ],
                likes: [
                    {
                        id: 1,
                        post: {} as Post, // Se puede reemplazar luego con el post mismo para evitar referencia circular
                        user: {
                            iduser: 2,
                            name: "Usuario2",
                            last_name: "Apellido2",
                            email: "usuario2@gmail.com",
                            phone: "111222333",
                            image: "image2",
                            usuario: "usuario_2"
                        },
                        createdAt: "1 hora atrás"
                    },
                    {
                        id: 3,
                        post: {} as Post, // Se puede reemplazar luego con el post mismo para evitar referencia circular
                        user: {
                            iduser: 2,
                            name: "Usuario2",
                            last_name: "Apellido2",
                            email: "usuario2@gmail.com",
                            phone: "111222333",
                            image: "image2",
                            usuario: "usuario_2"
                        },
                        createdAt: "1 hora atrás"
                    }
                ],
                createdAt: "2 horas atrás"
            },
            {
                id: 2,
                title: "Desarrollo de una Red Social Minimalista",
                description: "Una red social enfocada en compartir momentos importantes sin distracciones.",
                technologies: [
                    {
                        idtech: 1,
                        name: "Vue.js",
                        image: "https://vuejs.org/images/logo.png"
                    },
                    {
                        idtech: 2,
                        name: "Firebase",
                        image: "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png"
                    },
                    {
                        idtech: 3,
                        name: "Tailwind CSS",
                        image: "https://tailwindcss.com/favicons/apple-touch-icon.png"
                    }
                ],
                user: {
                    iduser: 3,
                    name: "Carlos",
                    last_name: "Gómez",
                    email: "carlos@gmail.com",
                    phone: "555444333",
                    image: "carlos_image",
                    usuario: "carlos_dev"
                },
                postStats:
                {
                    id: 2,
                    likesCount: 45,
                    imageUrl: "url_imagen_red_social",
                    starred: true
                }
                ,
                comments: [
                    {
                        id: 3,
                        content: "Me encanta la idea de una red social minimalista. ¡Éxito!",
                        createdAt: "3 horas atrás"
                    },
                    {
                        id: 4,
                        content: "¿Pensaste en integrar mensajes privados?",
                        createdAt: "1 hora atrás"
                    }
                ],
                likes: [
                    {
                        id: 1,
                        post: {} as Post,
                        user: {
                            iduser: 4,
                            name: "Ana",
                            last_name: "López",
                            email: "ana@gmail.com",
                            phone: "777888999",
                            image: "ana_image",
                            usuario: "ana_design"
                        },


                        createdAt: "2 horas atrás"
                    }
                ],
                createdAt: "5 horas atrás"
            }

        ];

        const fetchData = async () => {
            try {
                // Obtenemos los posts reales
                const dataPosts: Post[] = await PostService.getAllPosts();

                // Usamos los posts reales o los dummy si no hay datos
                setPosts(dataPosts.length > 0 ? dataPosts : dummyPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts(dummyPosts);
            } finally {
                setIsLoading(false);
            }
        };

        setTimeout(() => {
            setIsLoading(false);
            fetchData(); // Llamamos a la función para obtener los datos reales
        }, 1000); // Simulamos un delay de carga
    }, []);

    console.log(posts)

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
        
        console.log("Crear nuevo post");
    };

    const onProfile = () => {
        console.log(isAuthenticated)
        if (isAuthenticated && location.pathname === "/social") {
            navigate("/profile");
        }
    }

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
                    <div className="relative" ref={menuRef}>
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                onClick={() => setShowMenu(!showMenu)}
                                className="w-8 h-8 rounded-full cursor-pointer object-cover"
                            />
                        ) : (
                            <FaUser
                                className="text-2xl cursor-pointer"
                                onClick={() => setShowMenu(!showMenu)}
                            />
                        )}
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
                                <button 
                                onClick={onProfile}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100">
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
                                title={post.title}
                                description={post.description}
                                technologies={post.technologies}
                                user={post.user}
                                postStats={post.postStats}
                                comments={post.comments}
                                likes={post.likes}
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