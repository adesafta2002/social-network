export interface IUser {
    email: string;
    firstName?: string;
    lastName?: string
    password: string;
    gender?: string;
    birthDate?: string;
    address?: string;
    id?: number;
}

export interface IRelationship {
    id?: number;
    emit_user?: number;
    receive_user?: number;
    created_at?: number;
    pending?: number;
}