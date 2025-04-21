// src/hooks/useNotifications.ts
import { useQuery } from "@tanstack/react-query";
import { NotificationsService } from "@/service/notifications/notifications.service";

export const useNotifications = (userId?: number) =>
    useQuery({
        queryKey: ["notifications", userId],
        queryFn: () => NotificationsService.getNotifications(userId!),
        enabled: !!userId,
    });
