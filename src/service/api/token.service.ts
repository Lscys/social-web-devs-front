import { Tokens, RefreshTokenResponse } from "../interface/Tokens";
import { apiClient } from "./apiClient";


class TokenService {
    private static ACCESS_TOKEN_KEY = 'access_token';
    private static REFRESH_TOKEN_KEY = 'refresh_token';

    static getToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    static getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    static saveToken(token: string): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }

    static saveRefreshToken(token: string): void {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }

    static clearTokens(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    static async refreshToken(refreshToken: string): Promise<Tokens> {
        // Implementa la lógica para refrescar el token
        const response = await apiClient.post<RefreshTokenResponse>(
            '/auth/refresh-token'
            , { refreshToken }
        );

        if (!response.data.accessToken || !response.data.refreshToken) {
            throw new Error('Invalid token response format');
        }
    
        return {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
        };
    }
}

export { TokenService };