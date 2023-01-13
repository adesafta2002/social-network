export interface IUserNotification {
    id?: number,
    emit_user?: number,
    receive_user?: number,
    type?: string,
    content?: string,
    userDisplay?: string,
    postId?: string;
}