import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { Post } from "../interface/Post";

export const PostService = {
    getAllPosts: async () => {
        return apiClient.get<Post[]>(ENDPOINTS.POST.GET_ALL_POSTS);
    }
};