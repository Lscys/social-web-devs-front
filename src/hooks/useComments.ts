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

export const useUpdateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentsService.updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, userId }: { commentId: number; userId: number }) =>
      CommentsService.deleteComment(commentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};