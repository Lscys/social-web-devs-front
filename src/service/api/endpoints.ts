export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/signup',
        REFRESH: '/auth/refresh',
        ME: '/users/me'
    },
    USER: '/users',
    PRODUCTS: '/products',
    NOTIFICATIONS: {
        GET_ONE: (id: number) => `/notifications/user/${id}`,
        GET_UNREAD: (id: number) => `/notifications/user/${id}/unread`,
        MARK_AS_READ: (id: number) => `/notifications/${id}/read`,
        MARK_ALL_AS_READ: (id: number) => `/notifications/user/${id}/read-all`
    },
    TECHNOLOGIES: {
        GET_ALL: '/technologies/all',
        GET_ONE: (id: number) => `/technologies/${id}`,
        CREATE: '/technologies/create',
        UPDATE: (id: number) => `/technologies/${id}`,
        DELETE: (id: number) => `/technologies/${id}`
    },
    POST: {
        GET_ALL_POSTS: '/post/all',
        GET_POST: (id: number) => `/posts/${id}`,
        CREATE_POST: '/post/create',
        UPDATE_POST: (id: number) => `/posts/${id}`,
        DELETE_POST: (id: number) => `/posts/${id}`
    }
    // ... otros endpoints
};