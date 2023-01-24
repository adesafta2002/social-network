export interface IPost {
    id?: number;
    userId?: number;
    content?: string;
    likesCount?: number;
    author?: IAuthor;
    timestamp?: string;
    userLikedPost?: boolean;
}

export interface ILike {
    id?: number;
    userId?: number;
    postId?: number
}

interface IAuthor {
    id: number;
    display: string;
}