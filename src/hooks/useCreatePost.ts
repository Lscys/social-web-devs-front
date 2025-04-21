// src/hooks/useCreatePost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostRequest } from "@/service/interface/Post";
import { PostService } from "@/service/post/post.service";

export const useCreatePost = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PostRequest) => PostService.registerPost(data),
        onSuccess: () => {
            // Refresca el cache de posts después de crear uno nuevo
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            onSuccess?.();
        },
    });
};
