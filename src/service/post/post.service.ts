import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { PaginatedResponse, Post, PostRequest } from "../interface/Post";

export const PostService = {
    getAllPosts: async (page: number, size: number = 10) => {
        return apiClient.get<PaginatedResponse<Post>>(`${ENDPOINTS.POST.GET_ALL_POSTS}?page=${page}&size=${size}`);
    },

    registerPost: async (request: PostRequest) => {
        return apiClient.post<Post>(ENDPOINTS.POST.CREATE_POST, request);
    },

    updatePost: async (id: number, request: PostRequest) => {
        return apiClient.put<Post>(ENDPOINTS.POST.UPDATE_POST(id), request);
    },
    
    deletePost: async (id: number, userId: number) => {
        return apiClient.delete<void>(`${ENDPOINTS.POST.DELETE_POST(id)}?userId=${userId}`);
    }

};