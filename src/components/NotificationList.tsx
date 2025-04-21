import { NotificationsService } from '@/service/notifications/notifications.service';
import { Notification } from '@/service/interface/Notification';
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"


const NotificationList = ({
    notifications,
    reloadNotifications,
}: {
    notifications: Notification[],
    reloadNotifications: () => void
}) => {

    const handleMarkAsRead = async (id: number, userid: number) => {
        console.log("📤 Enviando notificación como leída con", id)
        try {
            // Marca la notificación como leída en el backend
            await NotificationsService.markNotificationAsRead(id, userid);
            // Llama a la función para recargar las notificaciones y reflejar el cambio
            reloadNotifications();
        } catch (error) {
            console.error("Error al marcar la notificación como leída:", error);
        }
    };

    return (
        <ul className="space-y-2">
            {notifications.map((notif) => (
                <li key={notif.id} className={`p-3 rounded-md ${notif.seen ? 'bg-gray-100' : 'bg-blue-100'}`}>
                    <h5 className="font-semibold">{notif.title}</h5>
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: es })}</p>
                    {!notif.seen && (
                        <button
                            onClick={() => handleMarkAsRead(notif.id, notif.user.iduser)}
                            className="mt-2 text-blue-500 text-xs"
                        >
                            Marcar como leído
                        </button>
                    )}

                </li>
            ))}
        </ul>
    );
};

export default NotificationList;
