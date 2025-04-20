// types/Notification.ts
export interface Notification {
    id: number;
    title: string;
    message: string;
    seen: boolean;
    createdAt: string;
    user: {
        iduser: number; // o el nombre del campo real del backend
        name: string;
    };
}