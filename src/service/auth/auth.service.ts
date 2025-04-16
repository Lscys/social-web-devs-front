import { apiClient } from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import { TokenService } from '../api/token.service';
import { Credential, RegisterCredential } from '../interface/Credential';
import { RefreshTokenResponse, Tokens } from '../interface/Tokens';
import { User } from '../interface/User';


export const AuthService = {
    login: async (credentials: Credential): Promise<void> => {
        try {
            const response = await apiClient.post<Tokens>(ENDPOINTS.AUTH.LOGIN, credentials);

            const token = response;
            
            if (!token.accessToken|| !token.refreshToken) {
                throw new Error('Tokens no recibidos en la respuesta');
            }
            
            TokenService.saveToken(token.accessToken);
            TokenService.saveRefreshToken(token.refreshToken);
        } catch (error) {
            console.error('Error en AuthService.login:', error);
            throw error;
        }
    },

    register: async (userData: RegisterCredential) => {
        return apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    },

    refreshToken: async () => {
        return apiClient.post(ENDPOINTS.AUTH.REFRESH);
    },

    me: async () => {
        return apiClient.get<User>(ENDPOINTS.AUTH.ME);
    },

    logout: async () => {
        // Limpiar token localmente
        localStorage.removeItem('user');
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        
    }
};