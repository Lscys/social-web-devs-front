import { useState } from 'react'
import { useAuth } from '@/context/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CreatePostBar from '@/components/layout/CreatePostBar';
import PostList from '@/components/post/PostList';
import CreatePostModal from '@/components/post/modal/CreatePostModal';
import { useNotifications } from '@/hooks/useNotifications';

const Social = () => {
    const { user } = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [refreshPosts, setRefreshPosts] = useState<() => void>(() => () => {});
    const [scrollToTop, setScrollToTop] = useState<() => void>(() => {});

    const {
        data: notifications = [],
        refetch,
    } = useNotifications(user?.iduser);

    const handleSetRefetch = (refetchFn: () => void, scrollFn: () => void) => {
        setRefreshPosts(() => refetchFn);
        setScrollToTop(() => scrollFn);
    };

    const hasUnreadNotifications = notifications?.some((n) => !n.seen);

    return (
        <div className="min-w-full min-h-full bg-gray-100 pt-4 pr-4 pl-4">
            <Header
                notifications={notifications}
                hasUnread={hasUnreadNotifications}
                reloadNotifications={refetch}
                reloadPosts={refreshPosts}
                scrollToTop={scrollToTop}
            />
            <div className="flex h-[calc(100vh-80px)] overflow-hidden">
                <Sidebar />
                <div className="mt-6 mb-20 flex-1 max-w-6xl max-h-full mx-auto px-6">
                    <CreatePostBar onCreate={() => setShowCreateModal(true)} />
                    <PostList setRefetchFn={handleSetRefetch}/>
                </div>
            </div>
            <CreatePostModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
        </div>
    );
}

export default Social;