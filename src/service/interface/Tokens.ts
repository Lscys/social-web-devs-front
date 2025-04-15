export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenResponse {
    data: Tokens;
    status: number;
    message?: string;
}