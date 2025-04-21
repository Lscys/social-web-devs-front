import { PaginatedResponse } from "@/components/PostFeed";
import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { Post, PostRequest } from "../interface/Post";

export const PostService = {
    getAllPosts: async (page: number, size: number = 10) => {
        return apiClient.get<PaginatedResponse<Post>>(`${ENDPOINTS.POST.GET_ALL_POSTS}?page=${page}&size=${size}`);
    },

    registerPost: async (request: PostRequest) => {
        return apiClient.post<Post>(ENDPOINTS.POST.CREATE_POST, request);
    }

};