import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostService } from '@/service/post/post.service';
import { PostRequest } from '@/service/interface/Post';
import { toast } from 'sonner';

interface UpdatePostParams {
    id: number;
    data: PostRequest;
}

export const useUpdatePost = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UpdatePostParams) => {
            return await PostService.updatePost(id, data);
        },
        onSuccess: (_, { id }) => {
            toast.success('Post actualizado correctamente');
            queryClient.invalidateQueries({ queryKey: ['posts'] }); // Invalida el feed o lista de posts
            queryClient.invalidateQueries({ queryKey: ['post', id] }); // Invalida el detalle del post si está en cache
            onSuccessCallback?.();
        },
        onError: () => {
            toast.error('Error al actualizar el post', {
                description: 'Verifica tu conexión o intenta más tarde.',
            });
        },
    });
};
