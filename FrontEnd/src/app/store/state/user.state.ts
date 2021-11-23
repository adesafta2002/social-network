import { IAccessToken } from "src/app/models/access-token.interface";
import { IUser } from "src/app/models/user.interface";

export interface IUserState {
    user: IUser;
    loading?: boolean;
    token?: string;
}

export const initialUserState: IUserState = {
    user: null,
    loading: false,
    token: null,
}