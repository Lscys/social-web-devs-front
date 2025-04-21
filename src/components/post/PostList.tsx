import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "@/service/interface/Post";
import PostCard from "./PostCard";
import { PostService } from "@/service/post/post.service";
import { toast } from "sonner";
import { usePosts } from "@/hooks/usePosts";

export default function PostList() {
    const { ref, inView } = useInView({ threshold: 0.5 });
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = usePosts();

    // Scroll infinito
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    const posts = data?.pages.flatMap((page) => page.content) ?? [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (isError) {
        return <p className="text-center text-red-500">Error al cargar los posts</p>;
    }

    return (
        <div className="space-y-4 flex-1 max-w-6xl mx-auto h-full overflow-y-auto mt-6">
            {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.idrelease} post={post} />)
            ) : (
                <div className="bg-white rounded-xl p-8 text-center">
                    <p className="text-gray-500">No hay posts disponibles</p>
                </div>
            )}

            {hasNextPage && (
                <div ref={ref} className="h-12 flex justify-center items-center">
                    {isFetchingNextPage ? (
                        <span className="text-gray-500">Cargando más...</span>
                    ) : (
                        <span className="text-gray-400">Desliza para cargar más</span>
                    )}
                </div>
            )}
        </div>
    );
}
