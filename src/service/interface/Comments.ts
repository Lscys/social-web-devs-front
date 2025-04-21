export interface CommentRequest {
    postId: number;
    userId: number;
    content: string;
}

export interface CommentResponse {
    id: number;
    content: string;
    createdAt: string;
    user: {
        iduser: number;
        name: string;
        last_name: string;
        image?: string;
    };
}