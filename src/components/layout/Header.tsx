import { FaBell, FaUser } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import NotificationList from "../notifications/NotificationList";
import { Notification } from "@/service/interface/Notification";
import { AuthService } from "@/service/auth/auth.service";

type HeaderProps = {
    notifications: Notification[];
    hasUnread: boolean;
    reloadNotifications: () => void;
};

export default function Header({ notifications, hasUnread, reloadNotifications }: HeaderProps) {
    const { user, setIsAuthenticated, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const notificationsRef = useRef<HTMLDivElement | null>(null);
    const notificationsIconRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [visibleCount, setVisibleCount] = useState(4);

    // Click fuera del área de notificaciones
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target as Node) &&
                notificationsIconRef.current &&
                !notificationsIconRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }

            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onProfile = () => {
        if (isAuthenticated) navigate("/profile");
    };

    const onLogout = () => {
        setIsAuthenticated(false);
        AuthService.logout();
        navigate("/");
    };

    return (
        <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
            <div className="text-2xl font-bold">DEVS</div>
            <div className="flex gap-6 items-center">
                <div className="relative" ref={notificationsIconRef}>
                    <FaBell
                        className="text-2xl cursor-pointer"
                        onClick={() => setShowNotifications(prev => !prev)}
                    />
                    {hasUnread && (
                        <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full" />
                    )}

                    {showNotifications && (
                        <div
                            ref={notificationsRef}
                            className="absolute top-full right-0 mt-2 w-96 max-h-96 overflow-y-auto bg-white shadow-lg rounded-md p-4 z-50"
                        >
                            <h3 className="text-lg font-semibold mb-2">Notificaciones</h3>

                            <NotificationList
                                notifications={notifications.slice(0, visibleCount)}
                                reloadNotifications={reloadNotifications}
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
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                My Account
                            </button>
                            <button
                                onClick={onLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
