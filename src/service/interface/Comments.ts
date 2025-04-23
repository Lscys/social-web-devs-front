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

export interface UpdateComment {
    userId: number;
    content: string;
    commentId: number;
}

export interface DeleteComment {
    commentId: number;
    userId: number;
}