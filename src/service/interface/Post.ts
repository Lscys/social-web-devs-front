import { User } from "./User";

export interface Post {
    id: number;
    title: string;
    description: string;
    technologies: Technologies[];
    user: User;
    postStats: PostStats;
    comments: Comments[];
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

export interface Comments {
    id: number;
    content: string;
    createdAt: string;
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
    technologiesIds: string[];
    userId: number;
    imageUrl: string;
}