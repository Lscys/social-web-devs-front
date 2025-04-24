import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import { usePosts } from "@/hooks/usePosts";
import { useQueryClient } from "@tanstack/react-query";
import PostSkeleton from "../skeleton/PostSkeleton";


type PostListProps = {
    setRefetchFn?: (refetchFn: () => void, scrollToTop: () => void) => void;
};

export default function PostList({ setRefetchFn }: PostListProps) {
    const queryClient = useQueryClient();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { ref, inView } = useInView({ threshold: 0.5 });
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
    } = usePosts();

    // Scroll infinito
    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView]);

    useEffect(() => {
        if (setRefetchFn) {
            setRefetchFn(
                () => {
                    // Hacemos scroll primero
                    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

                    // Se espera un poco para que se vea el scroll, y luego limpiamos y refetcheamos
                    setTimeout(() => {
                        queryClient.removeQueries({ queryKey: ['posts'] });
                        refetch();
                    }, 800);
                },
                () => {
                    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                }
            );
        }
    }, [refetch]);

    const posts = data?.pages.flatMap((page) => page.content) ?? [];

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <PostSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (isError) {
        return <p className="text-center text-red-500">Error al cargar los posts</p>;
    }

    return (
        <div
            ref={containerRef}
            className="space-y-4 flex-1 max-w-6xl mx-auto h-full overflow-y-auto mt-6"
        >
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
