import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaThumbsUp, FaCommentDots, FaStar, FaFilter, FaBell, FaUser, FaSearch } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../service/auth/auth.service";
import { useAuth } from "../context/useAuth";
import { Post } from "../service/interface/Post";
import PostCard from "./PostCard";
import { PostService } from "../service/post/post.service";
import CreatePostModal from './post/modal/CreatePostModal';
import NotificationList from "./NotificationList";
import { NotificationsService } from "@/service/notifications/notifications.service";
import { Notification } from "@/service/interface/Notification";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

export type PaginatedResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};

export default function PostFeed() {
    const navigate = useNavigate();
    const { user, isAuthenticated, setIsAuthenticated } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false); // Estado para verificar si hay notificaciones no leídas
    const [visibleCount, setVisibleCount] = useState(4);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const notificationsRef = useRef<HTMLDivElement | null>(null);
    const notificationsIconRef = useRef<HTMLDivElement | null>(null);
    const { ref, inView } = useInView({
        threshold: 0.5, // Solo se activa cuando al menos 50% del elemento está visible
    });
    const isFetchingRef = useRef(false);


    const fetchPosts = async (pageNumber: number, isInitial = false) => {
        if (isFetchingRef.current || !hasMore) return;

        isFetchingRef.current = true;
        if (isInitial) setIsLoading(true);

        try {
            const data = await PostService.getAllPosts(pageNumber, 10);
            setPosts(prev => [...prev, ...data.content]);
            setHasMore(!data.last);
        } catch (error) {
            toast.error('Error al cargar los posts', {
                description: 'Error al cargar los posts, por favor intenta más tarde',
                duration: 4000,
            });
        } finally {
            isFetchingRef.current = false;
            if (isInitial) setIsLoading(false);
        }
    };

    // Primer fetch
    useEffect(() => {
        fetchPosts(0, true);
    }, []);

    // Scroll infinito
    useEffect(() => {
        if (inView && hasMore && !isFetchingRef.current) {
            fetchPosts(page + 1);
            setPage(prev => prev + 1);
        }
    }, [inView]);

    // Manejo de clics fuera del área de notificaciones
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                notificationsRef.current && !notificationsRef.current.contains(event.target as Node) &&
                notificationsIconRef.current && !notificationsIconRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false); // Cierra las notificaciones si haces clic fuera
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Cargar las notificaciones
    const loadNotifications = async () => {
        try {
            if (user?.iduser) {
                const response = await NotificationsService.getNotifications(user.iduser);
                setNotifications(response);

                // Verificamos si hay notificaciones no leídas
                const unreadNotifications = response.filter(notification => !notification.seen);
                setHasUnreadNotifications(unreadNotifications.length > 0);
            }
        } catch (error) {
            toast.error('Error al cargar las notificaciones', {
                description: 'Error al cargar las notificaciones, por favor intenta más tarde',
                duration: 4000,
            });
        }
    };

    /* // Marcar todas las notificaciones como leídas
    const markAllAsRead = async () => {
        if (user?.iduser) {
            await NotificationsService.markAllAsRead(user.iduser);
            loadNotifications(); // Recargamos las notificaciones para que se actualicen
        }
    }; */

    // Cambiar el estado de mostrar/notificar notificaciones
    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
    };

    useEffect(() => {
        if (user?.iduser) {
            loadNotifications(); // Cargar las notificaciones cuando el usuario esté disponible
        }
    }, [user?.iduser]);



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
        setShowCreateModal(true);
    };

    const onProfile = () => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }

    const onLogout = () => {
        setIsAuthenticated(false);
        AuthService.logout();
        navigate("/");
    }


    return (
        <div className="min-w-full min-h-full bg-gray-100 pt-4 pr-4 pl-4">
            {/* Topbar */}
            <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <div className="text-2xl font-bold">DEVS</div>
                <div className="flex gap-6 items-center">
                    <button className="flex items-center gap-1 border px-3 py-1 rounded-md hover:bg-gray-200">
                        <FaFilter /> Filter
                    </button>
                    <FaCommentDots className="text-2xl" />

                    {/* ... Otros iconos */}
                    <div className="relative">
                        <div ref={notificationsIconRef} className="relative inline-block">
                            <FaBell
                                className="text-2xl cursor-pointer"
                                onClick={toggleNotifications}
                            />
                            {hasUnreadNotifications && (
                                <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></div>
                            )}

                            {showNotifications && (
                                <div
                                    ref={notificationsRef}
                                    className="absolute top-full right-0 mt-2 w-96 max-h-96 overflow-y-auto bg-white shadow-lg rounded-md p-4 z-50"
                                >
                                    <h3 className="text-lg font-semibold mb-2">Notificaciones</h3>

                                    <NotificationList
                                        notifications={notifications.slice(0, visibleCount)}
                                        reloadNotifications={loadNotifications}
                                    />

                                    {visibleCount < notifications.length && (
                                        <button
                                            onClick={() => setVisibleCount(prev => prev + 4)}
                                            className="mt-2 text-blue-500 text-sm underline"
                                        >
                                            Ver más notificaciones
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* ... Resto del código */}
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


            <div className="flex h-[calc(100vh-80px)] overflow-hidden">
                <aside className="w-64 bg-black rounded-2xl text-white min-h-[90%] max-h-[100%] flex-shrink-0 p-6 mt-2.5 mb-2.5 flex flex-col gap-6">
                    <div className="text-xl font-bold mb-6">DEVS</div>
                    <nav className="space-y-4">
                        <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <FaUserCircle />
                            <span>Inicio</span>
                        </div>
                        <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <FaSearch />
                            <span>Buscar</span>
                        </div>
                        <div className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <MdOutlinePostAdd />
                            <span>Crear</span>
                        </div>
                    </nav>
                </aside>
                {/* Search & Create post */}
                <div className="mt-6 mb-20 flex-1 max-w-6xl max-h-full mx-auto px-6">
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

                    {/* <div className="flex-1 max-w-6xl mx-auto px-6 h-full overflow-y-auto mt-6"> */}
                    {/* Listado de Posts */}
                    <div className="space-y-4 flex-1 max-w-6xl mx-auto h-full overflow-y-auto mt-6">
                        {isLoading && posts.length === 0 ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : posts.length > 0 ? (
                            Array.isArray(posts) && posts.map((post) => (
                                <PostCard key={post.idrelease} post={post} />
                            ))
                        ) : (
                            <div className="bg-white rounded-xl p-8 text-center">
                                <p className="text-gray-500">No hay posts disponibles</p>
                            </div>
                        )}
                        {hasMore && (
                            <div ref={ref} className="h-12 flex justify-center items-center">
                                {isLoading ? (
                                    <span className="text-gray-500">Cargando...</span>
                                ) : (
                                    <span className="text-gray-400">Desliza para cargar más</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CreatePostModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
        </div>
    );
}