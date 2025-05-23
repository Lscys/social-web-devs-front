import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { Technologies } from "../interface/Post";

export const TechnologiesService = {
    getAllTechnologies: async () => {
        return await apiClient.get<Technologies[]>(ENDPOINTS.TECHNOLOGIES.GET_ALL);
    },


};