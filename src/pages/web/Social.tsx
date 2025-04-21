import { useEffect, useState } from 'react'
import { useAuth } from '@/context/useAuth';
import { NotificationsService } from '@/service/notifications/notifications.service';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CreatePostBar from '@/components/layout/CreatePostBar';
import PostList from '@/components/post/PostList';
import CreatePostModal from '@/components/post/modal/CreatePostModal';
import { Notification } from '@/service/interface/Notification';

const Social = () => {
    const { user } = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    const loadNotifications = async () => {
        if (!user?.iduser) return;

        try {
            const response = await NotificationsService.getNotifications(user.iduser);
            setNotifications(response);
            setHasUnreadNotifications(response.some(n => !n.seen));
        } catch {
            console.error("Error al cargar notificaciones");
        }
    };

    useEffect(() => {
        if (user?.iduser) loadNotifications();
    }, [user?.iduser]);

    return (
        <div className="min-w-full min-h-full bg-gray-100 pt-4 pr-4 pl-4">
            <Header
                notifications={notifications}
                hasUnread={hasUnreadNotifications}
                reloadNotifications={loadNotifications}
            />
            <div className="flex h-[calc(100vh-80px)] overflow-hidden">
                <Sidebar />
                <div className="mt-6 mb-20 flex-1 max-w-6xl max-h-full mx-auto px-6">
                    <CreatePostBar onCreate={() => setShowCreateModal(true)} />
                    <PostList />
                </div>
            </div>
            <CreatePostModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
        </div>
    );
}

export default Social;