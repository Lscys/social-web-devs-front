import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { Post, PostRequest } from "../interface/Post";

export const PostService = {
    getAllPosts: async () => {
        return apiClient.get<Post[]>(ENDPOINTS.POST.GET_ALL_POSTS);
    },

    registerPost: async (request: PostRequest) => {
        return apiClient.post<Post>(ENDPOINTS.POST.CREATE_POST, request);
    }

};