import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentsService } from '@/service/comments/comments.service';
import { CommentResponse } from '@/service/interface/Comments';

export const useComments = (postId: number) => {
  return useQuery<CommentResponse[]>({
    queryKey: ['comments', postId],
    queryFn: () => CommentsService.getAllCommentForPostById(postId),
  });
};

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentsService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};
