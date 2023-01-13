export interface INotification {
    id?: number;
    emit_user?: number;
    receive_user?: number;
    type?: string;
    content?: string;
    postId?: string;
    userDisplay?: string;
}