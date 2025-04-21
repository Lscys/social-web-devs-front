import { CommentResponse } from "./Comments";
import { User } from "./User";

export interface Post {
    idrelease: number;
    title: string;
    description: string;
    technologies: Technologies[];
    user: User;
    postStats: PostStats;
    comments: CommentResponse[];
    likes: Likes[];    
    createdAt: string;
}

export interface Technologies {
    idtech: number;
    name: string;
    image: string;
}

export interface PostStats {
    id: number;
    likesCount: number;
    imageUrl: string;
    starred: boolean;
}

export interface Likes {
    id: number;
    post: Post;
    user: User;
    createdAt: string;
}

export interface PostRequest {
    title: string;
    description: string;
    technologiesIds: Number[];
    userId: number;
    imageUrl: string;
}

export type PaginatedResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};