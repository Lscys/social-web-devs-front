import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenService } from '../api/token.service'; // Servicio para manejar el token
import { ApiResponse } from '../interface/ApiResponse';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

class ApiClient {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Interceptor de request 
        this.instance.interceptors.request.use(
            (config) => {
                const token = TokenService.getToken();
                if (token && !this.isPublicEndpoint(config.url)) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Interceptor de response 
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                // Manejo de errores que devuelve una AxiosResponse válida
                if (error.response) {
                    return Promise.reject(this.transformErrorData(error.response));
                }
                return Promise.reject(this.transformNetworkError(error));
            }
        );
    }

    private transformErrorData(error: AxiosResponse): ApiResponse {
        return {
            data: error.data,
            status: error.status,
            message: error.statusText || 'Error occurred',
            error: error.data?.error || 'Unknown error',
            headers: error.headers,
            config: error.config
        };
    }

    private transformNetworkError(error: any): ApiResponse {
        return {
            data: null,
            status: 0,
            message: 'Network Error',
            error: error.message || 'Failed to connect to server',
            config: error.config
        };
    }

    private isPublicEndpoint(url?: string): boolean {
        // Define aquí los endpoints públicos que no requieren token
        const publicEndpoints = [
            '/auth/login',
            '/auth/register',
            '/auth/refresh-token'
        ];

        return publicEndpoints.some(endpoint => url?.includes(endpoint));
    }

    private async handleError(error: any) {
        // Manejo centralizado de errores
        if (error.response?.status === 401) {
            // Token expirado - puedes intentar refresh aquí
            await this.handle401Error(error);
        }

        return Promise.reject(error.response?.data || error.message);
    }

    private async handle401Error(error: any) {
        try {
            const refreshToken = TokenService.getRefreshToken();
            if (refreshToken) {
                // Intenta refrescar el token
                const newTokens = await TokenService.refreshToken(refreshToken);
                TokenService.saveToken(newTokens.accessToken);
                TokenService.saveRefreshToken(newTokens.refreshToken);

                // Reintenta la petición original
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                return this.instance(originalRequest);
            }
        } catch (refreshError) {
            TokenService.clearTokens();
            // Redirigir a login o manejar como prefieras
            window.location.href = '/login';
        }
    }

     // Métodos HTTP públicos simplificados
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }
}

export const apiClient = new ApiClient();