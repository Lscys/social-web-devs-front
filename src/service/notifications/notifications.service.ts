import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { Notification } from "../interface/Notification";

export const NotificationsService = {
    // Obtener todas las notificaciones del usuario
    getNotifications: async (userId: number) => {
        return await apiClient.get<Notification[]>(ENDPOINTS.NOTIFICATIONS.GET_ONE(userId));
    },

    // Obtener solo las no leídas
    getUnreadNotifications: async (userId: number) => {
        return await apiClient.get<Notification[]>(ENDPOINTS.NOTIFICATIONS.GET_UNREAD(userId));
    },

    // Marcar una como leída
    markNotificationAsRead: async (notificationId: number, userId: number) => {
        await apiClient.put(ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(notificationId), null, {
            params: { userId }
        });
    },

    // Marcar todas como leídas
    markAllAsRead: async (userId: number) => {
        await apiClient.put(ENDPOINTS.NOTIFICATIONS.MARK_ALL_AS_READ(userId));
    }

};