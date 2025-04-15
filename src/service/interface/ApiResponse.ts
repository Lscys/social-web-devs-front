import { AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export interface ApiResponse<T = any> {
    data: T;
    status: number;
    message?: string;
    error?: string;
    headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config?: AxiosRequestConfig;
}