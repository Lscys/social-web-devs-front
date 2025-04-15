export interface Post {
    id: string;
    authorName: string;
    authorRole: string;
    title: string;
    description: string;
    technologies: string[];
    likes: number;
    comments: number;
    isStarred: boolean;
    imageUrl?: string;
    createdAt: string;
}