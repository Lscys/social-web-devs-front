import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "@/service/interface/Post";
import PostCard from "./PostCard";
import { PostService } from "@/service/post/post.service";
import { toast } from "sonner";

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const isFetchingRef = useRef(false);
    const { ref, inView } = useInView({ threshold: 0.5 });

    const fetchPosts = async (pageNumber: number, isInitial = false) => {
        if (isFetchingRef.current || !hasMore) return;

        isFetchingRef.current = true;
        if (isInitial) setIsLoading(true);

        try {
            const data = await PostService.getAllPosts(pageNumber, 10);
            setPosts(prev => [...prev, ...data.content]);
            setHasMore(!data.last);
        } catch (error) {
            toast.error("Error al cargar los posts");
        } finally {
            isFetchingRef.current = false;
            if (isInitial) setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(0, true);
    }, []);

    useEffect(() => {
        if (inView && hasMore && !isFetchingRef.current) {
            fetchPosts(page + 1);
            setPage(prev => prev + 1);
        }
    }, [inView]);

    return (
        <div className="space-y-4 flex-1 max-w-6xl mx-auto h-full overflow-y-auto mt-6">
            {isLoading && posts.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
                </div>
            ) : posts.length > 0 ? (
                posts.map(post => <PostCard key={post.idrelease} post={post} />)
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
    );
}
