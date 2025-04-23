import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { CommentRequest, CommentResponse, UpdateComment } from "../interface/Comments";


export const CommentsService = {
    
    getAllCommentForPostById: async (userId: number) => {
        return await apiClient.get<CommentResponse[]>(ENDPOINTS.COMMENTS.GET_ALL_BY_ID_POST(userId));
    },

    createComment: async (data: CommentRequest) => {
        return await apiClient.post<CommentRequest>(ENDPOINTS.COMMENTS.CREATE, data);
    },

    updateComment: async (data: UpdateComment) => {
        return await apiClient.put<CommentRequest>(ENDPOINTS.COMMENTS.UPDATE, data);
    },

    deleteComment: async (commentId: number, userId: number) => {
        return await apiClient.delete(ENDPOINTS.COMMENTS.DELETE(commentId, userId));
    }


};