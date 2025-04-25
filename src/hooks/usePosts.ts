import { useInfiniteQuery } from "@tanstack/react-query";
import { PostService } from "@/service/post/post.service";

export const usePosts = () => {
    return useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
            console.log("Fetching posts, page:", pageParam);
            const data = await PostService.getAllPosts(pageParam, 10);
            return data;
        },
        getNextPageParam: (lastPage: { last: boolean; number: number }) => {
            return lastPage.last ? undefined : lastPage.number + 1;
        },
        initialPageParam: 0,
    });
};